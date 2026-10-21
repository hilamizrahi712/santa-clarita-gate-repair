"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Props {
  primary: React.ReactNode;
  rest: React.ReactNode;
  /** true = rest is auto-visible on desktop (md+) and only collapsed on mobile */
  mobileOnly?: boolean;
}

export default function ServiceGridReveal({ primary, rest, mobileOnly = false }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {primary}
      <div className={open ? "contents" : mobileOnly ? "hidden md:contents" : "hidden"}>
        {rest}
      </div>
      {!open && (
        <div
          className={mobileOnly ? "md:hidden" : ""}
          style={{ gridColumn: "1 / -1", textAlign: "center", marginTop: "0.5rem" }}
        >
          <button onClick={() => setOpen(true)} className="btn-secondary text-sm" style={{ display: "inline-flex" }}>
            See more services <ChevronDown size={14} />
          </button>
        </div>
      )}
    </>
  );
}
