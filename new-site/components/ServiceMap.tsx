// Lazy Google Maps embed of the service area (no API key needed for the q= embed).
export default function ServiceMap() {
  return (
    <section className="section-padding" style={{ background: "var(--bg-base)" }}>
      <div className="container-max">
        <div className="mb-8">
          <span className="eyebrow">Map</span>
          <h2>Where our technicians drive</h2>
        </div>
        <div style={{ border: "1px solid var(--line-strong)", aspectRatio: "16/9", minHeight: 320 }}>
          <iframe
            title="Map of Santa Clarita, CA and the surrounding service area"
            src="https://www.google.com/maps?q=Santa+Clarita,+CA&z=10&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ width: "100%", height: "100%", border: 0, display: "block" }}
          />
        </div>
      </div>
    </section>
  );
}
