import { createFileRoute, Link } from "@tanstack/react-router";
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

function Event({
  label,
  date,
  day,
  time,
  venue,
  place,
  mapQuery,
}: {
  label: string;
  date: string;
  day: string;
  time: string;
  venue: string;
  place: string;
  mapQuery: string;
}) {
  return (
    <div className="text-center">
      <p className="font-display text-[10px] uppercase tracking-[0.4em] text-[--gold]">
        {label}
      </p>
      <p className="mt-3 font-display text-base tracking-[0.25em] text-[--cream] sm:text-lg">
        {date}
      </p>
      <p className="mt-1 font-serif-body text-sm italic text-[--gold-soft]">
        {day} · {time}
      </p>
      <p className="mt-3 font-serif-body text-sm leading-relaxed text-[--cream]/90">
        {venue}
        <br />
        <span className="text-[--gold-soft]">{place}</span>
      </p>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-block border border-[--gold]/70 px-4 py-1.5 font-display text-[10px] uppercase tracking-[0.3em] text-[--gold] transition hover:bg-[--gold] hover:text-[--maroon-deep]"
      >
        View Map
      </a>
    </div>
  );
}

function Invitation() {
  return (
    <main className="relative flex min-h-[100svh] items-start justify-center overflow-hidden px-4 py-8 sm:py-12">
      <MusicToggle />

      <img
        src={mandala}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[140vmin] w-[140vmin] -translate-x-1/2 -translate-y-1/2 opacity-[0.07] animate-spin-slow"
      />

      <article className="relative w-full max-w-[460px] animate-fade-up">
        {/* Back link */}
        <div className="mb-4 flex justify-center">
          <Link
            to="/"
            className="font-display text-[10px] uppercase tracking-[0.35em] text-[--henna] transition hover:text-maroon"
          >
            ← back to cover
          </Link>
        </div>

        <div
          className="relative overflow-hidden rounded-sm border border-[--gold]/50 shadow-royal"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.97 0.025 78) 0%, oklch(0.93 0.035 75) 100%)",
          }}
        >
          {/* Paper lines */}
          <div
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent 0, transparent 27px, oklch(0.55 0.10 35 / 0.08) 28px)",
            }}
          />

          <div className="relative m-3 border border-[--gold]/50 sm:m-4">
            {/* Corner ornaments */}
            <span className="absolute -left-1.5 -top-1.5 h-3 w-3 border-l border-t border-[--gold]" />
            <span className="absolute -right-1.5 -top-1.5 h-3 w-3 border-r border-t border-[--gold]" />
            <span className="absolute -bottom-1.5 -left-1.5 h-3 w-3 border-b border-l border-[--gold]" />
            <span className="absolute -bottom-1.5 -right-1.5 h-3 w-3 border-b border-r border-[--gold]" />

            {/* Header */}
            <div className="px-6 pb-2 pt-8 text-center sm:px-8">
              <img src={lotus} alt="" aria-hidden className="mx-auto h-10 w-auto" />
              <p className="mt-4 font-display text-[10px] uppercase tracking-[0.5em] text-[--henna]">
                The Invitation
              </p>
            </div>

            {/* Names */}
            <div className="px-6 pt-4 text-center sm:px-8">
              <h1 className="font-script text-5xl leading-none text-maroon sm:text-6xl">
                Adithya
              </h1>
              <div className="my-2 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-[--gold]" />
                <span className="font-display text-[10px] tracking-[0.4em] gold-text">
                  WEDS
                </span>
                <span className="h-px w-10 bg-[--gold]" />
              </div>
              <h1 className="font-script text-5xl leading-none text-maroon sm:text-6xl">
                Akshay
              </h1>
            </div>

            {/* Image */}
            <div className="mx-6 mt-6 overflow-hidden rounded-sm ring-1 ring-[--gold]/40 sm:mx-8">
              <img
                src={wedding1.url}
                alt="Adithya & Akshay"
                className="h-48 w-full object-cover sm:h-56"
              />
            </div>

            {/* Quote */}
            <p className="px-8 pt-5 text-center font-serif-body text-sm italic leading-relaxed text-[--henna] sm:px-10">
              "Two souls, one journey — bound by love, blessed by tradition."
            </p>

            {/* Events */}
            <div className="mx-4 mt-7 rounded-sm bg-royal px-5 py-7 sm:mx-6 sm:px-6">
              <Event
                label="Wedding"
                date="22 · 08 · 2026"
                day="Saturday"
                time="11:00 AM"
                venue="Meenkulam Sreekrishna Temple"
                place="Olayambadi, Kannur"
                mapQuery="Meenkulam Sreekrishna Temple Olayambadi Kannur"
              />
              <div className="my-6 flex items-center justify-center gap-3">
                <span className="h-px w-12 bg-[--gold]/60" />
                <span className="text-xs text-[--gold]">✦</span>
                <span className="h-px w-12 bg-[--gold]/60" />
              </div>
              <Event
                label="Reception"
                date="23 · 08 · 2026"
                day="Sunday"
                time="4:00 – 8:00 PM"
                venue="Century Auditorium"
                place="Manjery, Malappuram"
                mapQuery="Century Auditorium Manjery Malappuram"
              />
            </div>

            {/* Closing */}
            <div className="px-6 pb-8 pt-7 text-center sm:px-8">
              <p className="font-serif-body text-sm italic text-[--henna]">
                Together with our families, we request the honour of your presence.
              </p>
              <p className="mt-4 font-script text-2xl gold-text">
                Adithya &amp; Akshay
              </p>
            </div>

            <div className="border-t border-[--gold]/30 px-6 py-3 text-center">
              <p className="font-display text-[9px] uppercase tracking-[0.4em] text-[--henna]/70">
                22 August 2026 · Kannur
              </p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}