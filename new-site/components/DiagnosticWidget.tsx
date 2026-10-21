"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, ArrowRight, RotateCcw, Send } from "lucide-react";
import { BUSINESS, FORMSPREE_URL } from "@/lib/constants";
import { gtagEvent } from "@/lib/gtag";

const QUESTIONS = [
  {
    question: "What type of gate or door do you have?",
    options: ["Sliding Gate", "Swing Gate", "Garage Door", "Not Sure"],
  },
  {
    question: "What's the problem?",
    options: [
      "Won't open",
      "Won't close",
      "Making noise",
      "Opens partially",
      "Remote not working",
      "Gate is off track",
    ],
  },
  {
    question: "How long has this been happening?",
    options: [
      "Just started today",
      "A few days",
      "A week or more",
      "Getting worse over time",
    ],
  },
  {
    question: "Have you tried anything to fix it?",
    options: [
      "Yes — reprogrammed the remote",
      "Yes — manually opened it",
      "No — I haven't touched it",
      "Not sure",
    ],
  },
];

interface Diagnosis {
  badgeLabel: string;
  badgeColor: string;
  title: string;
  message: string;
  cta: string;
}

function getDiagnosis(answers: string[]): Diagnosis {
  const [deviceType, problem, duration, tried] = answers;
  const isGarage = deviceType === "Garage Door";
  const device = isGarage ? "garage door" : "gate";
  const gettingWorse = duration === "Getting worse over time";
  const triedReprogram = tried === "Yes — reprogrammed the remote";

  const high = gettingWorse || problem === "Won't open" || problem === "Gate is off track";
  const urgency = high ? "high" : problem === "Won't close" || problem === "Remote not working" ? "medium" : "low";

  const badgeColor = urgency === "high" ? "var(--error)" : urgency === "medium" ? "#9A6B00" : "var(--success)";
  const badgeLabel = urgency === "high" ? "Urgent" : urgency === "medium" ? "Service Recommended" : "Quick Fix";

  const map: Record<string, { title: string; message: string; cta: string }> = {
    "Won't open": {
      title: "Motor or Operator Failure",
      message: `A ${device} that won't open at all typically has a failed motor, blown control board, or a power loss to the operator. ${triedReprogram ? "Since reprogramming the remote didn't help, it's likely an electrical or motor fault — not the remote itself." : "Our technician will arrive with the right parts for a same-day repair."}`,
      cta: "This is a same-day repair — call now and we'll be there within the hour.",
    },
    "Won't close": {
      title: "Safety Sensor or Limit Switch Issue",
      message: `A ${device} that won't close is almost always a misaligned safety sensor, a triggered obstruction detector, or a down-limit switch out of adjustment. Fast to diagnose and fix in a single visit.`,
      cta: "Usually fixed in under an hour — call us now or request a free estimate.",
    },
    "Making noise": {
      title: "Spring, Roller, or Lubrication Issue",
      message: `Grinding, squeaking, or clunking usually means worn rollers, dry hinges, a loose chain, or a spring beginning to fail. ${gettingWorse ? "The fact that it's getting worse means the component is actively degrading — don't wait." : "Caught early, this is a quick and affordable repair."}`,
      cta: "Preventative repairs save hundreds. Book a same-day service call.",
    },
    "Opens partially": {
      title: "Limit Switch or Drive System",
      message: `When a ${device} stops before fully opening or closing, the limit switch is usually miscalibrated or there's a partial drive obstruction. Simple to adjust and takes under an hour.`,
      cta: "An easy fix — we can have your ${device} running smoothly today.",
    },
    "Remote not working": {
      title: "Remote, Board, or Signal Issue",
      message: `${triedReprogram ? "Since reprogramming didn't fix it, the issue is likely a failed control board, a dead receiver, or signal interference — not the remote itself." : "Could be a dead battery, a programming issue, or a failed receiver board. We'll diagnose it in minutes and quote before touching anything."}`,
      cta: "We carry board replacements for all major brands. Call for same-day service.",
    },
    "Gate is off track": {
      title: "Track Alignment or Wheel Failure",
      message: `An off-track ${device} is a safety hazard — do not continue operating it until it's repaired. This usually means a bent track section, a broken wheel, or a structural impact. Needs immediate attention.`,
      cta: "Stop using it until repaired. Call us now — we respond to emergencies within 90 minutes.",
    },
  };

  const result = map[problem] ?? {
    title: "Service Recommended",
    message: `Based on your answers, your ${device} needs a professional inspection. Our technicians diagnose most issues in under 30 minutes and carry parts for same-day repairs across Los Angeles & Southern California.`,
    cta: "Call us or request a free estimate — we'll have you sorted today.",
  };

  return { badgeLabel, badgeColor, ...result };
}

interface DiagnosticWidgetProps {
  /** Section eyebrow. Default suits the homepage. */
  eyebrow?: string;
  /** Section heading (may contain an <em> emphasis). */
  heading?: React.ReactNode;
  /** Sub-heading line under the heading. */
  subheading?: React.ReactNode;
}

export default function DiagnosticWidget({
  eyebrow = "Free Diagnosis",
  heading = (
    <>
      Tell Us What&apos;s Wrong — <em>We&apos;ll Fix It Today</em>
    </>
  ),
  subheading = "Answer 4 quick questions and we'll tell you what's likely wrong — then we'll call you back within 30 minutes with a real answer.",
}: DiagnosticWidgetProps = {}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [pendingIdx, setPendingIdx] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [leadPhone, setLeadPhone] = useState("");
  const [leadSending, setLeadSending] = useState(false);
  const [leadSent, setLeadSent] = useState(false);

  const handleOption = (text: string, idx: number) => {
    if (pendingIdx !== null) return;
    // Fire wizard_start once per browser session, on the first answer.
    try {
      if (typeof window !== "undefined" && !sessionStorage.getItem("wizard_started")) {
        sessionStorage.setItem("wizard_started", "1");
        gtagEvent("wizard_start");
      }
    } catch {
      /* sessionStorage unavailable (private mode) — skip */
    }
    setPendingIdx(idx);
    setTimeout(() => {
      const next = [...answers.slice(0, stepIndex), text];
      setAnswers(next);
      setPendingIdx(null);
      if (stepIndex < QUESTIONS.length - 1) {
        setStepIndex(stepIndex + 1);
      } else {
        setShowResult(true);
      }
    }, 280);
  };

  const handleReset = () => {
    setStepIndex(0);
    setAnswers([]);
    setPendingIdx(null);
    setShowResult(false);
    setLeadPhone("");
    setLeadSent(false);
  };

  const diag = showResult ? getDiagnosis(answers) : null;

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadPhone.trim() || leadSending) return;
    setLeadSending(true);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          phone: leadPhone,
          diagnosis: diag?.title,
          answers: answers.join(" | "),
          _subject: "New diagnostic widget lead",
        }),
      });
      if (res.ok) {
        gtagEvent("wizard_submit");
        setLeadSent(true);
        window.location.href = "/thank-you";
        return;
      }
    } finally {
      setLeadSending(false);
    }
  };

  return (
    <section className="section-padding" style={{ background: "var(--bg-muted)" }}>
      <div className="container-max" style={{ maxWidth: 820 }}>
        {/* Heading */}
        <div className="text-center" style={{ marginBottom: "2.5rem" }}>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{heading}</h2>
          <p className="diag-subhead">{subheading}</p>
        </div>

        <div className="diag-card">
          {!showResult ? (
            /* ── QUESTION STEPS ── */
            <>
              {/* Progress bar */}
              <div className="diag-progress" aria-label={`Step ${stepIndex + 1} of ${QUESTIONS.length}`}>
                {QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className={`diag-dot${i < stepIndex ? " done" : i === stepIndex ? " active" : ""}`}
                  />
                ))}
              </div>

              <p className="diag-step-counter">Step {stepIndex + 1} of {QUESTIONS.length}</p>
              <h3 className="diag-question">{QUESTIONS[stepIndex].question}</h3>

              <div className="diag-options">
                {QUESTIONS[stepIndex].options.map((opt, idx) => (
                  <button
                    key={opt}
                    type="button"
                    className={`diag-option${pendingIdx === idx ? " selected" : ""}`}
                    onClick={() => handleOption(opt, idx)}
                    disabled={pendingIdx !== null}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </>
          ) : (
            /* ── RESULT ── */
            <>
              {/* Badge */}
              <div className="diag-type-badge" style={{ background: diag!.badgeColor }}>
                {diag!.badgeLabel}
              </div>

              {/* Diagnosis */}
              <h3 className="diag-result-title">{diag!.title}</h3>
              <p className="diag-result-msg">{diag!.message}</p>

              {/* CTA line */}
              <p className="diag-result-cta-line">{diag!.cta}</p>

              {/* Answer summary */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "20px 0 28px" }}>
                {answers.map((a, i) => (
                  <span key={i} className="diag-answer-chip">{a}</span>
                ))}
              </div>

              {/* Phone capture */}
              {leadSent ? (
                <p className="diag-result-cta-line" style={{ marginBottom: "1.25rem" }}>
                  Got it — we&apos;ll call you within 30 minutes.
                </p>
              ) : (
                <form onSubmit={handleLeadSubmit} style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1.25rem" }}>
                  <input
                    type="tel"
                    required
                    placeholder="Your phone number"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    style={{
                      flex: "1 1 200px",
                      border: "1px solid var(--line-strong)",
                      borderRadius: "var(--radius)",
                      padding: "0.65rem 0.875rem",
                      fontSize: "0.9rem",
                      fontFamily: "inherit",
                    }}
                  />
                  <button type="submit" disabled={leadSending} className="btn-primary" style={{ flexShrink: 0 }}>
                    <Send size={15} />
                    {leadSending ? "Sending…" : "Send My Diagnosis"}
                  </button>
                </form>
              )}

              {/* Action buttons */}
              <div className="diag-result-actions">
                <a href={BUSINESS.phoneHref} className="btn-primary">
                  <Phone size={17} />
                  Call {BUSINESS.phone}
                </a>
                <Link href="/contact" className="btn-secondary">
                  Get a Free Estimate <ArrowRight size={15} />
                </Link>
              </div>

              <p className="diag-reassurance">
                We answer 24/7 · Same-day service available · Upfront pricing, no surprises
              </p>

              <button className="diag-reset" onClick={handleReset} type="button">
                <RotateCcw size={13} />
                Start Over
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
