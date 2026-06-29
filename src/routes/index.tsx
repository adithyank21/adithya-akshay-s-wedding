import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import wedding1 from "@/assets/wedding-1.jpeg.asset.json";
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
      { property: "og:image", content: wedding1.url },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  const [opening, setOpening] = useState(false);
  return (
    <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 py-8 sm:py-12">
      <MusicToggle />

      {/* Soft mandala backdrop */}
      <img
        src={mandala}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[140vmin] w-[140vmin] -translate-x-1/2 -translate-y-1/2 opacity-[0.07] animate-spin-slow"
      />

      {/* Envelope / Letter */}
      <div
        className={`relative w-full max-w-[420px] transition-all duration-700 ${
          opening ? "-translate-y-4 scale-[1.02] opacity-90" : ""
        }`}
      >
        {/* Wax seal floating */}
        <div className="pointer-events-none absolute -top-5 left-1/2 z-20 -translate-x-1/2">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-royal shadow-royal ring-2 ring-[--gold]/60">
            <span className="font-script text-2xl text-[--gold]">A</span>
          </div>
        </div>

        {/* Letter paper */}
        <article
          className="relative animate-fade-up overflow-hidden rounded-sm border border-[--gold]/50 shadow-royal"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.97 0.025 78) 0%, oklch(0.93 0.035 75) 100%)",
          }}
        >
          {/* Paper texture lines */}
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent 0, transparent 27px, oklch(0.55 0.10 35 / 0.08) 28px)",
            }}
          />

          {/* Decorative inner frame */}
          <div className="relative m-3 border border-[--gold]/50 p-6 sm:m-4 sm:p-8">
            {/* Corner ornaments */}
            <span className="absolute -left-1.5 -top-1.5 h-3 w-3 border-l border-t border-[--gold]" />
            <span className="absolute -right-1.5 -top-1.5 h-3 w-3 border-r border-t border-[--gold]" />
            <span className="absolute -bottom-1.5 -left-1.5 h-3 w-3 border-b border-l border-[--gold]" />
            <span className="absolute -bottom-1.5 -right-1.5 h-3 w-3 border-b border-r border-[--gold]" />

            <div className="pt-4 text-center">
              <img
                src={lotus}
                alt=""
                aria-hidden
                className="mx-auto h-10 w-auto opacity-90 sm:h-12"
              />
              <p className="mt-4 font-display text-[10px] uppercase tracking-[0.5em] text-[--henna]">
                ~ A humble invitation ~
              </p>
            </div>

            <div className="my-6 text-center">
              <p className="font-serif-body text-sm italic text-[--henna]/80">
                with the blessings of our families
              </p>
              <p className="mt-2 font-serif-body text-sm italic text-[--henna]/80">
                we joyfully announce the wedding of
              </p>
            </div>

            {/* Names */}
            <div className="text-center">
              <h1 className="font-script text-[3.5rem] leading-[0.9] text-maroon sm:text-7xl">
                Adithya
              </h1>
              <div className="my-3 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-[--gold] sm:w-14" />
                <span className="font-display text-[10px] tracking-[0.45em] gold-text">
                  WEDS
                </span>
                <span className="h-px w-10 bg-[--gold] sm:w-14" />
              </div>
              <h1 className="font-script text-[3.5rem] leading-[0.9] text-maroon sm:text-7xl">
                Akshay
              </h1>
            </div>

            {/* Date stamp */}
            <div className="mx-auto mt-7 w-max rotate-[-2deg] border-2 border-dashed border-[--maroon]/40 px-4 py-2 text-center">
              <p className="font-display text-[10px] tracking-[0.35em] text-maroon">
                22 · AUG · 2026
              </p>
              <p className="mt-0.5 font-serif-body text-[11px] italic text-[--henna]">
                Kannur, Kerala
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8 flex justify-center">
              <Link
                to="/invitation"
                onClick={() => setOpening(true)}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-sm bg-royal px-6 py-3 font-display text-[11px] uppercase tracking-[0.35em] shadow-royal transition hover:scale-[1.03] sm:px-8 sm:py-3.5"
                style={{ color: "var(--cream)" }}
              >
                <span className="relative z-10">Open Invitation</span>
                <span
                  aria-hidden
                  className="relative z-10 transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[--gold]/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
            </div>

            <p className="mt-6 text-center font-serif-body text-[11px] italic text-[--henna]/70">
              your presence is our blessing
            </p>
          </div>
        </article>

        {/* Shadow flap to hint envelope */}
        <div
          className="mx-auto mt-2 h-3 w-[92%] rounded-b-full bg-[--maroon-deep]/20 blur-md"
          aria-hidden
        />
      </div>
    </main>
  );
}