import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import wedding1 from "@/assets/wedding-1.jpeg.asset.json";
import mandala from "@/assets/mandala.png";
import lotus from "@/assets/lotus.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adithya weds Akshay — 22 Aug 2026" },
      { name: "description", content: "Join us in celebrating the wedding of Adithya & Akshay on 22 August 2026 at Meenkulam Sreekrishna Temple, Kannur." },
      { property: "og:title", content: "Adithya weds Akshay" },
      { property: "og:description", content: "With the blessings of our families — 22 Aug 2026, Kannur · Reception 23 Aug, Manjery." },
      { property: "og:image", content: wedding1.url },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const toggle = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const command = playing ? "pauseVideo" : "playVideo";
    iframe.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: command, args: [] }),
      "*"
    );
    setPlaying(!playing);
  };
  return (
    <>
      <iframe
        ref={iframeRef}
        title="Radha Rahasya"
        src="https://www.youtube.com/embed/cVZ_57VWnXc?enablejsapi=1&autoplay=0&loop=1&playlist=cVZ_57VWnXc"
        allow="autoplay; encrypted-media"
        className="hidden"
      />
      <button
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play Radha Rahasya"}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-royal px-4 py-2.5 shadow-royal transition hover:scale-105"
        style={{ color: "var(--cream)" }}
      >
        <span className={`inline-block h-2 w-2 rounded-full ${playing ? "bg-[--gold] animate-pulse" : "bg-[--gold-soft]"}`} />
        <span className="font-display text-[10px] tracking-widest">{playing ? "PAUSE" : "PLAY"} · MUSIC</span>
      </button>
    </>
  );
}

function Event({ label, date, day, time, venue, place, mapQuery }: {
  label: string; date: string; day: string; time: string; venue: string; place: string; mapQuery: string;
}) {
  return (
    <div className="text-center">
      <p className="font-display text-[10px] uppercase tracking-[0.4em] text-[--gold]">{label}</p>
      <p className="mt-3 font-display text-lg tracking-[0.25em] text-[--cream]">{date}</p>
      <p className="mt-1 font-serif-body text-sm italic text-[--gold-soft]">{day} · {time}</p>
      <p className="mt-3 font-serif-body text-sm leading-relaxed text-[--cream]/90">
        {venue}<br />
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

function Index() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <MusicToggle />

      <img
        src={mandala}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[600px] w-[600px] -translate-x-1/2 opacity-[0.08] animate-spin-slow"
      />

      <article className="relative w-full max-w-md animate-fade-up">
        {/* Card */}
        <div className="relative overflow-hidden rounded-sm border border-[--gold]/40 bg-[--cream]/80 shadow-royal backdrop-blur">
          {/* Top crest */}
          <div className="px-8 pt-10 text-center">
            <img src={lotus} alt="" aria-hidden className="mx-auto h-10 w-auto" />
            <p className="mt-5 font-display text-[10px] uppercase tracking-[0.5em] text-[--henna]">
              Save the Date
            </p>
          </div>

          {/* Names */}
          <div className="px-8 pt-6 text-center">
            <h1 className="font-script text-6xl leading-none text-maroon">Adithya</h1>
            <div className="my-3 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[--gold]" />
              <span className="font-display text-[10px] tracking-[0.4em] gold-text">WEDS</span>
              <span className="h-px w-10 bg-[--gold]" />
            </div>
            <h1 className="font-script text-6xl leading-none text-maroon">Akshay</h1>
          </div>

          {/* Image */}
          <div className="mx-8 mt-8 overflow-hidden rounded-sm ring-1 ring-[--gold]/40">
            <img
              src={wedding1.url}
              alt="Adithya & Akshay"
              className="h-56 w-full object-cover"
            />
          </div>

          {/* Quote */}
          <p className="px-10 pt-6 text-center font-serif-body text-sm italic leading-relaxed text-[--henna]">
            "Two souls, one journey — bound by love, blessed by tradition."
          </p>

          {/* Events */}
          <div className="mx-6 mt-8 rounded-sm bg-royal px-6 py-8">
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
              <span className="text-[--gold] text-xs">✦</span>
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
          <div className="px-8 pb-10 pt-8 text-center">
            <p className="font-serif-body text-sm italic text-[--henna]">
              Together with our families, we request the honour of your presence.
            </p>
            <p className="mt-4 font-script text-2xl gold-text">Adithya &amp; Akshay</p>
          </div>

          {/* Bottom flourish */}
          <div className="border-t border-[--gold]/30 px-8 py-4 text-center">
            <p className="font-display text-[9px] uppercase tracking-[0.4em] text-[--henna]/70">
              22 August 2026 · Kannur
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
