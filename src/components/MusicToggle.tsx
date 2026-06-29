import { useRef, useState } from "react";

export function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const toggle = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const command = playing ? "pauseVideo" : "playVideo";
    iframe.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: command, args: [] }),
      "*",
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
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-royal px-3.5 py-2 shadow-royal transition hover:scale-105 sm:bottom-6 sm:right-6 sm:px-4 sm:py-2.5"
        style={{ color: "var(--cream)" }}
      >
        <span
          className={`inline-block h-2 w-2 rounded-full ${
            playing ? "bg-[--gold] animate-pulse" : "bg-[--gold-soft]"
          }`}
        />
        <span className="font-display text-[9px] tracking-widest sm:text-[10px]">
          {playing ? "PAUSE" : "PLAY"} · MUSIC
        </span>
      </button>
    </>
  );
}