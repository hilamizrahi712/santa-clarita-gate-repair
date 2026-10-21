export default function IronDivider() {
  return (
    <div style={{ background: "var(--navy)", padding: "14px 0" }} aria-hidden="true">
      <div className="container-max flex items-end justify-between">
        {Array.from({ length: 22 }).map((_, i) => (
          <div key={i} style={{ width: 2, height: 10, background: "var(--brown-warm)" }} />
        ))}
      </div>
    </div>
  );
}
