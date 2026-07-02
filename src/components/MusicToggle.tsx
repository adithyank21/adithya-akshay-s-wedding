import { useRef, useState, useEffect } from "react";
import weddingMusic from "@/assets/wedding-music.mp3";

// Use a local Audio element instead of the YouTube iframe. This is more reliable
// for autoplay on a user gesture and avoids postMessage/player-ready race issues.

declare global {
  interface Window {
    weddingMusicControl?: {
      play?: () => Promise<void> | void;
      pause?: () => void;
      toggle?: () => Promise<void> | void;
      isPlaying?: () => boolean;
    };
  }
}

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(weddingMusic);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.7;
    audioRef.current = audio;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    // Expose controller
    window.weddingMusicControl = {
      play: async () => {
        try {
          await audio.play();
        } catch (e) {
          // play may reject if not a user gesture; caller should handle UI fallback
          console.warn("Audio play rejected:", e);
        }
      },
      pause: () => audio.pause(),
      toggle: async () => {
        if (audio.paused) {
          try {
            await audio.play();
          } catch (e) {
            console.warn("Audio play rejected:", e);
          }
        } else {
          audio.pause();
        }
      },
      isPlaying: () => !audio.paused,
    };

    return () => {
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      if (window.weddingMusicControl) delete window.weddingMusicControl;
      audioRef.current = null;
    };
  }, []);

  const handleToggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
      } catch (e) {
        console.warn("Play failed:", e);
      }
    } else {
      audio.pause();
    }
  };

  return (
    <>
      {/* keep the floating UI the same */}
      <button
        onClick={handleToggle}
        aria-label={playing ? "Pause music" : "Play music"}
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
