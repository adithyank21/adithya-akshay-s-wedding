import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import mandala from "@/assets/mandala.png";
import lotus from "@/assets/lotus.png";
import { MusicToggle } from "@/components/MusicToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adithya weds Akshay — 22 Aug 2026" },
      {
        name: "description",
        content:
          "A heartfelt invitation to the wedding of Adithya & Akshay — 22 August 2026, Kannur.",
      },
      { property: "og:title", content: "Adithya weds Akshay" },
      {
        property: "og:description",
        content: "With the blessings of our families — 22 Aug 2026, Kannur.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(() => navigate({ to: "/invitation" }), 1400);
  };

  return (
    <main
      className="relative min-h-[100svh] overflow-hidden bg-[--maroon-deep]"
      style={{
        backgroundImage:
          "linear-gradient(135deg, oklch(0.22 0.10 25 / 0.96) 0%, oklch(0.31 0.12 27 / 0.96) 100%), radial-gradient(circle at 15% 20%, oklch(0.72 0.13 80 / 0.16), transparent 24%), radial-gradient(circle at 85% 80%, oklch(0.24 0.05 20 / 0.22), transparent 32%)",
      }}
    >
      <MusicToggle />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, oklch(0.96 0.025 75 / 0.12) 0%, transparent 54%)",
        }}
      />
      <img
        src={mandala}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[160vmin] w-[160vmin] -translate-x-1/2 -translate-y-1/2 opacity-[0.10] animate-spin-slow"
      />

      {/* Center content (revealed as doors open) */}
      <div
        className={`absolute inset-0 z-0 flex flex-col items-center justify-center px-6 text-center transition-opacity duration-700 ${
          opening ? "opacity-100" : "opacity-0"
        }`}
        style={{ color: "var(--cream)" }}
      >
        <img src={lotus} alt="" aria-hidden className="h-16 w-auto" />
        <p className="mt-6 font-script text-5xl gold-text">Welcome</p>
      </div>

      {/* LEFT DOOR */}
      <div
        className="absolute inset-y-0 left-0 z-10 w-1/2 origin-left transition-transform duration-[1400ms] ease-[cubic-bezier(.7,.05,.3,1)]"
        style={{
          transform: opening ? "translateX(-100%)" : "translateX(0)",
          background:
            "linear-gradient(110deg, oklch(0.22 0.10 25) 0%, oklch(0.32 0.12 25) 55%, oklch(0.26 0.11 25) 100%)",
          boxShadow: "inset -1px 0 0 oklch(0.72 0.13 80 / 0.7), inset -8px 0 28px oklch(0 0 0 / 0.4)",
        }}
      >
        <DoorOrnament side="left" />
      </div>

      {/* RIGHT DOOR */}
      <div
        className="absolute inset-y-0 right-0 z-10 w-1/2 origin-right transition-transform duration-[1400ms] ease-[cubic-bezier(.7,.05,.3,1)]"
        style={{
          transform: opening ? "translateX(100%)" : "translateX(0)",
          background:
            "linear-gradient(250deg, oklch(0.22 0.10 25) 0%, oklch(0.32 0.12 25) 55%, oklch(0.26 0.11 25) 100%)",
          boxShadow: "inset 1px 0 0 oklch(0.72 0.13 80 / 0.7), inset 8px 0 28px oklch(0 0 0 / 0.4)",
        }}
      >
        <DoorOrnament side="right" />
      </div>

      {/* Centerpiece content (sits above doors while closed, fades on open) */}
      <div
        className={`absolute inset-0 z-20 flex items-center justify-center px-5 transition-opacity duration-500 ${
          opening ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="w-full max-w-md animate-fade-up text-center" style={{ color: "var(--cream)" }}>
          {/* Medallion */}
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-[--gold]/70 bg-[--maroon-deep]/60 shadow-gold backdrop-blur-sm">
            <span className="font-script text-5xl gold-text leading-none">A&amp;A</span>
          </div>

          <p className="mt-6 font-display text-[10px] tracking-[0.6em] text-[--gold]">
            WEDDING · INVITATION
          </p>

          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[--gold]/60" />
            <span className="text-[--gold]">✦</span>
            <span className="h-px w-12 bg-[--gold]/60" />
          </div>

          <h1 className="mt-6 font-script text-6xl leading-[1.05] text-[--cream] drop-shadow-[0_2px_10px_oklch(0_0_0/0.35)] sm:text-7xl">
            Adithya <span className="gold-text">&amp;</span> Akshay
          </h1>

          <p className="mx-auto mt-6 max-w-sm font-serif-body text-[17px] italic leading-[1.7] text-[--cream]/85">
            With joy and gratitude, we invite you to celebrate our wedding ceremony.
          </p>

          <p className="mt-7 font-display text-[11px] tracking-[0.55em] text-[--gold-soft]">
            22 · AUGUST · 2026
          </p>

          <button
            type="button"
            onClick={handleOpen}
            className="btn-gold group relative mt-9 inline-flex items-center gap-3 overflow-hidden rounded-full px-9 py-3.5 font-display text-[11px] uppercase tracking-[0.45em]"
          >
            <span>Open Invitation</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </button>

          <p className="mt-8 font-serif-body text-xs italic tracking-wide text-[--cream]/60">
            tap to open the doors
          </p>
        </div>
      </div>
    </main>
  );
}

function DoorOrnament({ side }: { side: "left" | "right" }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* gold border inset */}
      <div className="absolute inset-3 border border-[--gold]/30 sm:inset-5" />
      <div className="absolute inset-5 border border-[--gold]/15 sm:inset-8" />
      {/* arch top */}
      <div
        className="absolute left-1/2 top-8 h-24 w-24 -translate-x-1/2 rounded-full border border-[--gold]/40"
        style={{ clipPath: "inset(50% 0 0 0)" }}
      />
      {/* handle */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 ${
          side === "left" ? "right-3" : "left-3"
        } h-16 w-1.5 rounded-full bg-[--gold]/70 shadow-[0_0_10px_oklch(0.72_0.13_80/0.6)]`}
      />
      {/* center motif */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 ${
          side === "left" ? "right-10" : "left-10"
        } hidden sm:block`}
      >
        <div className="grid h-14 w-14 place-items-center rounded-full border border-[--gold]/40">
          <span className="font-script text-2xl text-[--gold]">
            {side === "left" ? "A" : "A"}
          </span>
        </div>
      </div>
    </div>
  );
}