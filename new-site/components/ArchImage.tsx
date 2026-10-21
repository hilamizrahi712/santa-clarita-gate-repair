import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  aspect?: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

export default function ArchImage({ src, alt, aspect = "3/4", sizes, className = "", priority }: Props) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio: aspect,
        borderRadius: "999px 999px 12px 12px",
        border: "2px solid var(--brown-warm)",
      }}
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} priority={priority} />
    </div>
  );
}
