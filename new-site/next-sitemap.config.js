/** @type {import('next-sitemap').IConfig} */
const { execSync } = require("child_process");

// Low-competition markets get crawled first.
const AREA_TIER_1 = ["fresno", "bakersfield", "lancaster", "palmdale", "oxnard", "ventura-county", "santa-barbara"];
const AREA_TIER_2 = ["santa-clarita", "glendora", "hacienda-heights", "torrance", "manhattan-beach", "long-beach", "orange-county"];
const AREA_TIER_3 = ["calabasas", "encino", "sherman-oaks", "woodland-hills", "beverly-hills", "glendale", "burbank", "pasadena", "los-angeles"];

// Content for dynamic routes lives in a shared lib/*-data.ts file; static routes
// are their own app/**/page.tsx. lastmod reflects whichever file actually holds
// the content for that route.
function sourceFileFor(urlPath) {
  if (urlPath === "/") return "app/page.tsx";
  if (urlPath.startsWith("/services/")) return "lib/services-data.ts";
  if (urlPath.startsWith("/areas/")) return "lib/cities-data.ts";
  if (urlPath.startsWith("/brands/")) return "lib/brands-data.ts";
  if (urlPath.startsWith("/tips/") && urlPath !== "/tips") return "lib/blog-data.ts";
  return `app${urlPath}/page.tsx`;
}

const lastmodCache = new Map();
function getLastmod(sourceFile) {
  if (lastmodCache.has(sourceFile)) return lastmodCache.get(sourceFile);
  let lastmod;
  try {
    const out = execSync(`git log -1 --format=%cI -- "${sourceFile}"`, { encoding: "utf8" }).trim();
    lastmod = out || new Date().toISOString();
  } catch {
    lastmod = new Date().toISOString();
  }
  lastmodCache.set(sourceFile, lastmod);
  return lastmod;
}

module.exports = {
  siteUrl: "https://santaclaritagaterepair.com",
  outDir: "./out",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    // The wildcard policy already allows every crawler, AI included. These entries
    // are listed explicitly so the intent to allow AI-engine crawling is documented
    // in the file itself, not just implied by the absence of a disallow rule.
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
  },
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/privacy-policy", "/blog", "/blog/*", "/pricing", "/thank-you"],
  transform: async (config, urlPath) => {
    let priority = config.priority;
    let changefreq = config.changefreq;
    if (urlPath === "/") { priority = 1.0; changefreq = "weekly"; }
    else if (urlPath.startsWith("/services/")) { priority = 0.9; changefreq = "weekly"; }
    else if (urlPath.startsWith("/brands/")) { priority = 0.6; changefreq = "monthly"; }
    else if (urlPath.startsWith("/areas/")) {
      const slug = urlPath.replace("/areas/", "").replace(/\/$/, "");
      if (AREA_TIER_1.includes(slug)) priority = 1.0;
      else if (AREA_TIER_2.includes(slug)) priority = 0.9;
      else if (AREA_TIER_3.includes(slug)) priority = 0.85;
      else priority = 0.7;
      changefreq = "monthly";
    }
    else if (urlPath.startsWith("/tips/")) { priority = 0.7; changefreq = "monthly"; }
    else if (urlPath.startsWith("/blog/")) { priority = 0.1; changefreq = "never"; }
    return { loc: urlPath, changefreq, priority, lastmod: getLastmod(sourceFileFor(urlPath)) };
  },
};
