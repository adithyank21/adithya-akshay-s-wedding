import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import wedding1 from "@/assets/wedding-1.jpeg.asset.json";
import wedding2 from "@/assets/wedding-2.jpeg.asset.json";
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

const WEDDING_DATE = new Date("2026-08-22T11:00:00+05:30").getTime();

function useCountdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, WEDDING_DATE - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

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
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-royal px-5 py-3 text-[--cream] shadow-royal backdrop-blur transition hover:scale-105"
        style={{ color: "var(--cream)" }}
      >
        <span className={`inline-block h-2 w-2 rounded-full ${playing ? "bg-[--gold] animate-pulse" : "bg-[--gold-soft]"}`} />
        <span className="font-display text-xs">{playing ? "Pause" : "Play"} · Radha Rahasya</span>
      </button>
    </>
  );
}

function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown();
  const items = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];
  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-6">
      {items.map((i) => (
        <div key={i.label} className="rounded-lg border border-[--gold]/40 bg-[--cream]/60 px-2 py-4 text-center backdrop-blur shadow-gold">
          <div className="font-display text-2xl sm:text-4xl text-maroon">
            {String(i.value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[--henna]">
            {i.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`relative w-full px-6 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-4xl">{children}</div>
    </section>
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-[--gold]" />
      <img src={lotus} alt="" aria-hidden className="h-10 w-auto opacity-80" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-[--gold]" />
    </div>
  );
}

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <MusicToggle />

      {/* HERO */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <img
          src={mandala}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[800px] w-[800px] -translate-x-1/2 opacity-20 animate-spin-slow"
        />
        <div className="relative z-10 animate-fade-up">
          <p className="font-display text-xs sm:text-sm uppercase tracking-[0.5em] text-[--henna]">
            ॐ · Save the Date · ॐ
          </p>
          <div className="my-6 flex items-center justify-center">
            <img src={lotus} alt="" aria-hidden className="h-14 w-auto" />
          </div>
          <h1 className="font-script text-6xl sm:text-8xl md:text-9xl leading-none text-maroon">
            Adithya
          </h1>
          <p className="my-4 font-display text-xl tracking-[0.4em] gold-text">&nbsp;WEDS&nbsp;</p>
          <h1 className="font-script text-6xl sm:text-8xl md:text-9xl leading-none text-maroon">
            Akshay
          </h1>
          <p className="mt-10 font-serif-body text-lg sm:text-xl italic text-[--henna]">
            "Two souls, one journey — bound by love, blessed by tradition."
          </p>
          <p className="mt-6 font-display text-sm tracking-[0.3em] text-maroon">
            22 · 08 · 2026
          </p>
        </div>
      </section>

      {/* COUNTDOWN */}
      <Section>
        <Divider />
        <h2 className="text-center font-display text-sm uppercase tracking-[0.4em] text-[--henna]">
          Counting every moment
        </h2>
        <p className="mt-3 text-center font-script text-5xl text-maroon">until forever begins</p>
        <div className="mx-auto mt-10 max-w-2xl">
          <Countdown />
        </div>
      </Section>

      {/* IMAGE 1 */}
      <Section className="!py-12">
        <div className="relative mx-auto max-w-2xl overflow-hidden rounded-sm shadow-royal">
          <img
            src={wedding1.url}
            alt="Hands with henna and engagement ring"
            className="h-auto w-full object-cover"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[--gold]/40" />
        </div>
      </Section>

      {/* COUPLE */}
      <Section>
        <Divider />
        <div className="grid gap-12 sm:grid-cols-2">
          <div className="text-center animate-fade-up">
            <p className="font-display text-xs uppercase tracking-[0.4em] text-[--henna]">The Bride</p>
            <h3 className="mt-4 font-script text-6xl text-maroon">Adithya</h3>
            <p className="mt-6 font-serif-body text-base leading-relaxed text-[--henna]">
              A heart full of grace, a spirit of light — stepping into a new chapter, hand in hand.
            </p>
          </div>
          <div className="text-center animate-fade-up">
            <p className="font-display text-xs uppercase tracking-[0.4em] text-[--henna]">The Groom</p>
            <h3 className="mt-4 font-script text-6xl text-maroon">Akshay</h3>
            <p className="mt-6 font-serif-body text-base leading-relaxed text-[--henna]">
              A steady soul, a tender promise — ready to walk every season of life together.
            </p>
          </div>
        </div>
      </Section>

      {/* EVENTS */}
      <section className="relative bg-royal px-6 py-24 text-[--cream]">
        <img src={mandala} alt="" aria-hidden className="pointer-events-none absolute -right-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 opacity-10" />
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="font-display text-xs uppercase tracking-[0.4em] text-[--gold]">
              With the blessings of our families
            </p>
            <h2 className="mt-3 font-script text-5xl sm:text-6xl gold-text">
              We invite you
            </h2>
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {/* Wedding */}
            <div className="relative rounded-sm border border-[--gold]/30 bg-black/10 p-8 text-center backdrop-blur transition hover:-translate-y-1 hover:shadow-gold">
              <img src={lotus} alt="" aria-hidden className="mx-auto h-10 w-auto opacity-90 animate-float-slow" />
              <p className="mt-4 font-display text-xs uppercase tracking-[0.4em] text-[--gold]">The Wedding</p>
              <h3 className="mt-4 font-script text-5xl text-[--cream]">Muhurtham</h3>
              <div className="my-6 h-px w-16 mx-auto bg-[--gold]/60" />
              <p className="font-display text-2xl tracking-widest">22 · AUG · 2026</p>
              <p className="mt-2 font-serif-body text-lg italic text-[--gold-soft]">Saturday · 11:00 AM</p>
              <p className="mt-6 font-serif-body text-lg leading-relaxed">
                Meenkulam Sreekrishna Temple<br />
                Olayambadi, Kannur
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Meenkulam+Sreekrishna+Temple+Olayambadi+Kannur"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-block border border-[--gold] px-6 py-2 font-display text-xs uppercase tracking-[0.3em] text-[--gold] transition hover:bg-[--gold] hover:text-[--maroon-deep]"
              >
                View on Map
              </a>
            </div>

            {/* Reception */}
            <div className="relative rounded-sm border border-[--gold]/30 bg-black/10 p-8 text-center backdrop-blur transition hover:-translate-y-1 hover:shadow-gold">
              <img src={lotus} alt="" aria-hidden className="mx-auto h-10 w-auto opacity-90 animate-float-slow" />
              <p className="mt-4 font-display text-xs uppercase tracking-[0.4em] text-[--gold]">The Celebration</p>
              <h3 className="mt-4 font-script text-5xl text-[--cream]">Reception</h3>
              <div className="my-6 h-px w-16 mx-auto bg-[--gold]/60" />
              <p className="font-display text-2xl tracking-widest">23 · AUG · 2026</p>
              <p className="mt-2 font-serif-body text-lg italic text-[--gold-soft]">Sunday · 4:00 – 8:00 PM</p>
              <p className="mt-6 font-serif-body text-lg leading-relaxed">
                Century Auditorium<br />
                Manjery, Malappuram
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Century+Auditorium+Manjery+Malappuram"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-block border border-[--gold] px-6 py-2 font-display text-xs uppercase tracking-[0.3em] text-[--gold] transition hover:bg-[--gold] hover:text-[--maroon-deep]"
              >
                View on Map
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE 2 */}
      <Section className="!py-16">
        <Divider />
        <div className="relative mx-auto max-w-2xl overflow-hidden rounded-sm shadow-royal">
          <img
            src={wedding2.url}
            alt="Couple holding hands"
            className="h-auto w-full object-cover"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[--gold]/40" />
        </div>
        <p className="mt-10 text-center font-serif-body text-lg italic text-[--henna]">
          "And in their eyes, a thousand promises whispered in silence."
        </p>
      </Section>

      {/* BLESSING */}
      <Section>
        <Divider />
        <div className="rounded-sm border border-[--gold]/40 bg-[--cream]/70 p-10 text-center shadow-royal backdrop-blur">
          <p className="font-display text-xs uppercase tracking-[0.4em] text-[--henna]">
            A humble request
          </p>
          <h3 className="mt-6 font-script text-5xl sm:text-6xl text-maroon">
            Bless us with your presence
          </h3>
          <p className="mx-auto mt-6 max-w-xl font-serif-body text-lg leading-relaxed text-[--henna]">
            Your warmth, your smiles, and your blessings will make our day truly complete.
            We look forward to sharing this beautiful moment with you.
          </p>
          <p className="mt-10 font-script text-3xl gold-text">— Adithya & Akshay</p>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="relative border-t border-[--gold]/30 bg-[--maroon-deep] py-10 text-center text-[--cream]">
        <img src={lotus} alt="" aria-hidden className="mx-auto mb-4 h-8 w-auto opacity-90" />
        <p className="font-script text-3xl gold-text">Adithya &amp; Akshay</p>
        <p className="mt-2 font-display text-[10px] uppercase tracking-[0.4em] text-[--gold-soft]">
          22 August 2026 · Kannur
        </p>
      </footer>
    </main>
  );
}
