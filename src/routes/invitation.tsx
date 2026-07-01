import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import wedding1 from "@/assets/wedding-1.jpeg.asset.json";
import wedding2 from "@/assets/wedding-2.jpeg.asset.json";
import mandala from "@/assets/mandala.png";
import lotus from "@/assets/lotus.png";
import { MusicToggle } from "@/components/MusicToggle";

export const Route = createFileRoute("/invitation")({
  head: () => ({
    meta: [
      { title: "The Invitation — Adithya & Akshay" },
      {
        name: "description",
        content:
          "Wedding on 22 Aug 2026 at Meenkulam Sreekrishna Temple, Kannur. Reception on 23 Aug at Century Auditorium, Manjery.",
      },
      { property: "og:title", content: "The Invitation — Adithya & Akshay" },
      {
        property: "og:description",
        content: "Join us for the wedding and reception of Adithya & Akshay.",
      },
      { property: "og:image", content: wedding2.url },
    ],
  }),
  component: Invitation,
});

const WEDDING_DATE = new Date("2026-08-22T11:00:00+05:30").getTime();

function useCountdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, WEDDING_DATE - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

function VenueCard({
  badge,
  title,
  place,
  when,
  blurb,
  mapQuery,
}: {
  badge: string;
  title: string;
  place: string;
  when: string;
  blurb: string;
  mapQuery: string;
}) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-md border border-[--gold]/40 bg-[--maroon-deep]/70 p-6 backdrop-blur-sm transition hover:border-[--gold]">
      <span className="absolute right-4 top-4 font-display text-[9px] uppercase tracking-[0.35em] text-[--gold]">
        {badge}
      </span>
      <h3 className="mt-6 font-script text-[28px] leading-tight text-[--cream] min-h-[4.5rem] flex items-end">{title}</h3>
      <p className="mt-2 font-serif-body text-sm italic text-[--gold-soft]">{place}</p>
      <p className="mt-4 font-display text-[10px] tracking-[0.3em] text-[--cream]">{when}</p>
      <p className="mt-4 font-serif-body text-sm leading-relaxed text-[--cream]/80">{blurb}</p>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
        target="_blank"
        rel="noreferrer"
        className="mt-auto pt-5 inline-flex items-center gap-2 self-start font-display text-[10px] uppercase tracking-[0.3em] text-[--gold] transition hover:text-[--gold-soft]"
      >
        <span className="border-b border-[--gold]/60 pb-0.5">Get directions</span> <span aria-hidden>↗</span>
      </a>
    </div>
  );
}

function CountBox({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-md border border-[--gold]/40 bg-[--maroon-deep]/50 px-3 py-4 backdrop-blur-sm">
      <span className="font-display text-2xl text-[--gold] tabular-nums sm:text-3xl">
        {String(n).padStart(2, "0")}
      </span>
      <span className="mt-1 font-display text-[9px] tracking-[0.3em] text-[--cream]/70">
        {label}
      </span>
    </div>
  );
}

function Invitation() {
  const { d, h, m, s } = useCountdown();

  return (
    <main
      className="relative min-h-[100svh] overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 50% -10%, oklch(0.40 0.13 28) 0%, oklch(0.22 0.10 25) 60%, oklch(0.16 0.08 25) 100%)",
        color: "var(--cream)",
      }}
    >
      <MusicToggle />

      <img
        src={mandala}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[160vmin] w-[160vmin] -translate-x-1/2 -translate-y-1/2 opacity-[0.07] animate-spin-slow"
      />

      <div className="relative mx-auto w-full max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        {/* Back link */}
        <div className="mb-6 flex justify-center">
          <Link
            to="/"
            className="font-display text-[10px] uppercase tracking-[0.4em] text-[--gold]/80 transition hover:text-[--gold]"
          >
            ← back to cover
          </Link>
        </div>

        {/* HERO CARD */}
        <section className="animate-fade-up rounded-lg border border-[--gold]/40 bg-[--maroon-deep]/50 px-6 py-12 text-center shadow-royal backdrop-blur-sm sm:px-12 sm:py-16">
          <img src={lotus} alt="" aria-hidden className="mx-auto h-12 w-auto" />
          <p className="mt-5 font-display text-[10px] tracking-[0.55em] text-[--gold]">
            WEDDING · INVITATION
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:items-baseline sm:justify-center sm:gap-6">
            <div className="text-center">
              <h1 className="font-script text-5xl text-[--cream] sm:text-6xl">Adithya N K</h1>
              <p className="mt-1 font-serif-body text-xs italic text-[--gold-soft]">
                D/O V P Damodaran &amp; Rema N K
              </p>
            </div>
            <p className="font-script text-4xl gold-text sm:text-5xl">&amp;</p>
            <div className="text-center">
              <h1 className="font-script text-5xl text-[--cream] sm:text-6xl">Akshay M</h1>
              <p className="mt-1 font-serif-body text-xs italic text-[--gold-soft]">
                S/O Sunil Kumar M &amp; Sheeja T K
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-[--gold]/50" />
            <span className="text-[--gold]">✦</span>
            <span className="h-px w-16 bg-[--gold]/50" />
          </div>

          <p className="mt-6 font-display text-xs tracking-[0.4em] text-[--cream]">
            22 · AUGUST · 2026  ·  KANNUR
          </p>
        </section>

        {/* BANNER */}
        <section className="mt-10 grid items-center gap-6 rounded-lg border border-[--gold]/30 bg-[--maroon-deep]/40 p-5 backdrop-blur-sm sm:grid-cols-2 sm:p-7">
          <div className="overflow-hidden rounded-md ring-1 ring-[--gold]/40">
            <img
              src={wedding1.url}
              alt="Adithya & Akshay"
              className="aspect-[4/5] w-full object-cover transition duration-700 hover:scale-105"
            />
          </div>
          <div className="text-center sm:text-left">
            <p className="font-script text-3xl gold-text leading-snug sm:text-4xl">
              “Two hearts, one promise, and a lifetime of beautiful beginnings.”
            </p>
            <h2 className="mt-5 font-serif-body text-lg italic text-[--cream]/90 sm:text-xl">
              Celebrate love, tradition, and togetherness with us.
            </h2>
          </div>
        </section>

        {/* COUNTDOWN */}
        <section className="mt-10 text-center">
          <p className="font-display text-[10px] tracking-[0.45em] text-[--gold]">
            COUNTDOWN TO THE MUHURTHAM
          </p>
          <div className="mx-auto mt-5 grid max-w-md grid-cols-4 gap-3">
            <CountBox n={d} label="DAYS" />
            <CountBox n={h} label="HOURS" />
            <CountBox n={m} label="MINUTES" />
            <CountBox n={s} label="SECONDS" />
          </div>
        </section>

        {/* VENUES */}
        <section className="mt-12">
          <div className="mb-6 text-center">
            <p className="font-display text-[10px] tracking-[0.45em] text-[--gold]">
              WHERE TO ARRIVE
            </p>
            <h3 className="mt-3 font-script text-3xl text-[--cream] sm:text-4xl">
              Both venues are ready to welcome you.
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <VenueCard
              badge="CEREMONY"
              title="Meenkulam Sreekrishna Temple"
              place="Olayambadi, Kannur"
              when="22 AUG 2026 · SATURDAY · 11:00 AM"
              blurb="Traditional temple ceremony with the blessings of family."
              mapQuery="Meenkulam Sreekrishna Temple Olayambadi Kannur"
            />
            <VenueCard
              badge="RECEPTION"
              title="Century Auditorium"
              place="Manjery, Malappuram"
              when="23 AUG 2026 · SUNDAY · 4:00 – 8:00 PM"
              blurb="An evening of music, feasting and joyful togetherness."
              mapQuery="Century Auditorium Manjery Malappuram"
            />
          </div>
        </section>

        {/* CLOSING */}
        <section className="mt-12 text-center">
          <img
            src={wedding2.url}
            alt=""
            aria-hidden
            className="mx-auto mb-6 h-28 w-28 rounded-full object-cover ring-2 ring-[--gold]/50"
          />
          <p className="mx-auto max-w-xl font-serif-body text-base italic leading-relaxed text-[--cream]/85 sm:text-lg">
            Together with our families, we request the honour of your presence
            as we begin this beautiful journey of love.
          </p>
          <p className="mt-5 font-script text-4xl gold-text">Adithya &amp; Akshay</p>
          <p className="mt-3 font-display text-[10px] tracking-[0.45em] text-[--gold-soft]">
            WITH LOVE FROM KANNUR · 2026
          </p>
        </section>
      </div>
    </main>
  );
}