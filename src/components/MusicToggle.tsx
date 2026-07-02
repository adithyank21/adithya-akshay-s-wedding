import { useRef, useState, useEffect } from "react";

// Expose a simple controller on window so other parts of the app (the Open Invitation
// button) can trigger play/pause. We keep the same iframe-based YouTube approach
// (enablejsapi=1) and send postMessage commands like the existing toggle did.

declare global {
  interface Window {
    weddingMusicControl?: {
      play?: () => void;
      pause?: () => void;
      toggle?: () => void;
      isPlaying?: () => boolean;
    };
  }
}

export function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const sendCommand = (command: string) => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    iframe.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: command, args: [] }),
      "*",
    );
  };

  const play = () => {
    sendCommand("playVideo");
    setPlaying(true);
  };
  const pause = () => {
    sendCommand("pauseVideo");
    setPlaying(false);
  };
  const toggle = () => {
    if (playing) pause();
    else play();
  };

  // Expose controller on window so other files can call window.weddingMusicControl.play()
  useEffect(() => {
    window.weddingMusicControl = {
      play,
      pause,
      toggle,
      isPlaying: () => playing,
    };
    return () => {
      // only remove if it's our controller
      if (window.weddingMusicControl?.isPlaying === (() => playing)) {
        delete window.weddingMusicControl;
      } else if (window.weddingMusicControl && window.weddingMusicControl.isPlaying) {
        // best-effort: don't clobber other controllers
        delete window.weddingMusicControl;
      }
    };
  }, [playing]);

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
