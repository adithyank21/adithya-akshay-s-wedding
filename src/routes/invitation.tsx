import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import wedding1 from "@/assets/wedding-1.jpeg.asset.json";
import wedding2 from "@/assets/wedding-2.jpeg.asset.json";
import wedding3 from "@/assets/wedding-3.jpeg";
import wedding4 from "@/assets/wedding-4.jpeg";
import mandala from "@/assets/mandala.png";
import lotus from "@/assets/lotus.png";

const SITE_URL = "https://adithya-akshay-s-wedding.vercel.app";
const INVITATION_URL = `${SITE_URL}/invitation`;
const INVITATION_IMAGE_URL = new URL(wedding2.url, SITE_URL).href;

export const Route = createFileRoute("/invitation")({
  head: () => ({
    meta: [
      { title: "Adithya ❤️ Akshay | Wedding Invitation" },
      {
        name: "description",
        content:
          "Two hearts...❤️ One journey...☺️ A lifetime of love begins here 🤗",
      },
      { property: "og:title", content: "Adithya ❤️ Akshay | Wedding Invitation" },
      {
        property: "og:description",
        content:
          "Two hearts...❤️ One journey...☺️ A lifetime of love begins here 🤗",
      },
      { property: "og:url", content: INVITATION_URL },
      { property: "og:site_name", content: "adithya-akshay-s-wedding.vercel.app" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: INVITATION_IMAGE_URL },
      { property: "og:image:alt", content: "Adithya and Akshay wedding invitation" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Adithya ❤️ Akshay | Wedding Invitation" },
      {
        name: "twitter:description",
        content:
          "Two hearts...❤️ One journey...☺️ A lifetime of love begins here 🤗",
      },
      { name: "twitter:url", content: INVITATION_URL },
      { name: "twitter:image", content: INVITATION_IMAGE_URL },
      { name: "twitter:site", content: "@adithya_akshay" },
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
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-[--gold]/40 bg-[--maroon-deep]/70 p-7 backdrop-blur-sm transition duration-500 hover:-translate-y-0.5 hover:border-[--gold] hover:shadow-[0_20px_50px_-20px_oklch(0.72_0.13_80/0.35)]">
      <span className="absolute right-5 top-5 font-display text-[9px] uppercase tracking-[0.45em] text-[--gold]">
        {badge}
      </span>
      <h3 className="mt-8 font-script text-[32px] leading-[1.1] text-[--cream] min-h-[5rem] flex items-end">{title}</h3>
      <p className="mt-3 font-serif-body text-[15px] italic tracking-wide text-[--gold-soft]">{place}</p>
      <p className="mt-5 font-display text-[10px] tracking-[0.4em] text-[--cream]">{when}</p>
      <p className="mt-5 font-serif-body text-[15px] leading-[1.75] text-[--cream]/80">{blurb}</p>
      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}&travelmode=driving`}
        target="_blank"
        rel="noreferrer"
        className="mt-auto pt-6 inline-flex items-center gap-2 self-start font-display text-[10px] uppercase tracking-[0.4em] text-[--gold] transition hover:text-[--gold-soft]"
      >
        <span className="border-b border-[--gold]/60 pb-0.5 transition group-hover:border-[--gold]">Get directions</span>
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">↗</span>
      </a>
    </div>
  );
}

function CountBox({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-[--gold]/40 bg-[--maroon-deep]/50 px-3 py-5 backdrop-blur-sm transition duration-500 hover:border-[--gold]/80">
      <span className="font-display text-3xl text-[--gold] tabular-nums sm:text-[2rem]">
        {String(n).padStart(2, "0")}
      </span>
      <span className="mt-2 font-display text-[9px] tracking-[0.4em] text-[--cream]/70">
        {label}
      </span>
    </div>
  );
}

function Invitation() {
  const { d, h, m, s } = useCountdown();

  return (
    <main
      className="relative min-h-[100svh]"
      style={{
        background:
          "radial-gradient(circle at 50% -10%, oklch(0.40 0.13 28) 0%, oklch(0.22 0.10 25) 60%, oklch(0.16 0.08 25) 100%)",
        color: "var(--cream)",
      }}
    >
      <img
        src={mandala}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[160vmin] w-[160vmin] -translate-x-1/2 -translate-y-1/2 opacity-[0.07] animate-spin-slow"
      />

      <div className="relative mx-auto w-full max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        {/* HERO CARD */}
        <section className="animate-fade-up rounded-xl border border-[--gold]/40 bg-[--maroon-deep]/50 px-6 py-12 text-center shadow-royal backdrop-blur-sm transition duration-500 hover:border-[--gold]/70 sm:px-14 sm:py-20">
          <img src={lotus} alt="" aria-hidden className="mx-auto h-12 w-auto" />
          <p className="mt-6 font-display text-[10px] tracking-[0.6em] text-[--gold]">
            WEDDING · INVITATION
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:items-baseline sm:justify-center sm:gap-8">
            <div className="text-center">
              <h1 className="font-script text-6xl leading-[1.05] text-[--cream] drop-shadow-[0_2px_10px_oklch(0_0_0/0.3)] sm:text-7xl">Adithya N K</h1>
              <p className="mt-2 font-serif-body text-[13px] italic tracking-wide text-[--gold-soft]">
                D/O V P Damodaran &amp; Rema N K
              </p>
            </div>
            <p className="font-script text-5xl gold-text sm:text-6xl">&amp;</p>
            <div className="text-center">
              <h1 className="font-script text-6xl leading-[1.05] text-[--cream] drop-shadow-[0_2px_10px_oklch(0_0_0/0.3)] sm:text-7xl">Akshay M</h1>
              <p className="mt-2 font-serif-body text-[13px] italic tracking-wide text-[--gold-soft]">
                S/O Sunil Kumar M &amp; Sheeja T K
              </p>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-[--gold]/50" />
            <span className="text-[--gold]">✦</span>
            <span className="h-px w-16 bg-[--gold]/50" />
          </div>

          <p className="mt-7 font-display text-xs tracking-[0.5em] text-[--cream]">
            22 · AUGUST · 2026  ·  KANNUR
          </p>

          <div className="mx-auto mt-8 flex max-w-[220px] flex-col items-center gap-2 rounded-full border border-[--gold]/40 bg-[--gold]/10 px-4 py-3 text-[10px] uppercase tracking-[0.4em] text-[--gold] shadow-[0_10px_30px_-20px_oklch(0.72_0.13_80/0.5)] sm:hidden">
            <span>Scroll for details</span>
            <span className="text-2xl animate-bounce">↓</span>
          </div>
        </section>

        {/* BANNER */}
        <section className="mt-12 grid items-center gap-7 rounded-xl border border-[--gold]/30 bg-[--maroon-deep]/40 p-6 backdrop-blur-sm transition duration-500 hover:border-[--gold]/60 sm:grid-cols-2 sm:p-8">
          <div className="overflow-hidden rounded-lg ring-1 ring-[--gold]/40">
            <img
              src={wedding3}
              alt="Adithya & Akshay"
              className="aspect-[4/5] w-full object-cover transition duration-[900ms] ease-out hover:scale-[1.06]"
            />
          </div>
          <div className="text-center sm:text-left">
            <p className="font-script text-4xl gold-text leading-[1.15] sm:text-[2.75rem]">
              “Two hearts, one promise, and a lifetime of beautiful beginnings.”
            </p>
            <h2 className="mt-6 font-serif-body text-lg italic leading-relaxed text-[--cream]/90 sm:text-xl">
              Celebrate love, tradition, and togetherness with us.
            </h2>
          </div>
        </section>

        {/* COUNTDOWN */}
        <section className="mt-14 text-center">
          <p className="font-display text-[10px] tracking-[0.55em] text-[--gold]">
            COUNTDOWN TO THE MUHURTHAM
          </p>
          <div className="mx-auto mt-6 grid max-w-md grid-cols-4 gap-3">
            <CountBox n={d} label="DAYS" />
            <CountBox n={h} label="HOURS" />
            <CountBox n={m} label="MINUTES" />
            <CountBox n={s} label="SECONDS" />
          </div>
        </section>

        {/* PHOTO GALLERY */}
        <section className="mt-16">
          <div className="mb-8 text-center">
            <p className="font-display text-[10px] tracking-[0.55em] text-[--gold]">
              WHERE TO ARRIVE
            </p>
            <h3 className="mt-4 font-script text-4xl leading-tight text-[--cream] sm:text-5xl">
              Both venues are ready to welcome you.
            </h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
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
              title="Century  Convention Center"
              place="Manjery, Malappuram"
              when="23 AUG 2026 · SUNDAY · 11:00 AM – 2:00 PM"
              blurb="An evening of music, feasting and joyful togetherness."
              mapQuery="Century Convention Center Manjery Malappuram"
            />
          </div>
        </section>

        {/* CLOSING */}
        <section className="mt-16 text-center">
          <img
            src={wedding4}
            alt=""
            aria-hidden
            className="mx-auto mb-7 h-28 w-28 rounded-full object-cover ring-2 ring-[--gold]/50 shadow-gold"
          />
          <p className="mx-auto max-w-xl font-serif-body text-[17px] italic leading-[1.8] text-[--cream]/85 sm:text-lg">
            Together with our families, we request the honour of your presence
            as we begin this beautiful journey of love.
          </p>
          <p className="mt-6 font-script text-5xl gold-text">Adithya &amp; Akshay</p>
          <p className="mt-4 font-display text-[10px] tracking-[0.55em] text-[--gold-soft]">
            WITH LOVE FROM KANNUR · 2026
          </p>
        </section>
      </div>
    </main>
  );
}