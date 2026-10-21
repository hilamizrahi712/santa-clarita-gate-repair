import Link from "next/link";

// Renders data copy where inline links are written as [text](/path).
export default function InlineLinks({ text }: { text: string }) {
  // split with 2 capture groups yields [text, label, href, text, ...]
  const parts = text.split(/\[([^\]]+)\]\((\/[^)]+)\)/);
  return (
    <>
      {parts.map((part, i) => {
        if (i % 3 === 1) return null;
        if (i % 3 === 2) {
          return <Link key={i} href={part} style={{ color: "var(--brown-warm)", textDecoration: "underline" }}>{parts[i - 1]}</Link>;
        }
        return part;
      })}
    </>
  );
}
