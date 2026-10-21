// Submit URLs to IndexNow (Bing, Yandex, ...).
//   npm run indexnow                      -> every URL in the sitemap
//   npm run indexnow -- /areas/encino ... -> only these (paths or full URLs)
import { readFileSync, existsSync } from "node:fs";

const HOST = "santaclaritagaterepair.com";
const SITE = `https://${HOST}`;
// Key lives in lib/constants.ts (INDEXNOW_KEY); read it from there so there is one source.
const key = readFileSync(new URL("../lib/constants.ts", import.meta.url), "utf8").match(
  /INDEXNOW_KEY = "([0-9a-f]{32})"/
)?.[1];
if (!key) throw new Error("INDEXNOW_KEY not found in lib/constants.ts");

async function sitemapUrls() {
  const local = new URL("../out/sitemap-0.xml", import.meta.url);
  const xml = existsSync(local)
    ? readFileSync(local, "utf8")
    : await (await fetch(`${SITE}/sitemap-0.xml`)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

const args = process.argv.slice(2);
const urlList = args.length
  ? args.map((a) => (a.startsWith("http") ? a : SITE + (a.startsWith("/") ? a : `/${a}`)))
  : await sitemapUrls();
if (!urlList.length) throw new Error("No URLs to submit");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key, keyLocation: `${SITE}/${key}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} (${urlList.length} URLs)`);
const body = await res.text();
if (body) console.log(body);
// 200 = accepted, 202 = accepted, key validation pending
if (res.status !== 200 && res.status !== 202) process.exit(1);
