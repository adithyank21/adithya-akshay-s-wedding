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

export function MusicToggle({ showButton = true }: { showButton?: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const getAudio = () => {
    if (audioRef.current) return audioRef.current;
    if (typeof window === "undefined") return null;

    const audio = new Audio(weddingMusic);
    audio.loop = true;
    audio.preload = "none";
    audio.volume = 0.7;
    audioRef.current = audio;
    return audio;
  };

  useEffect(() => {
    const audio = getAudio();
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    const controller = {
      play: async () => {
        const audio = getAudio();
        if (!audio) return;
        try {
          await audio.play();
        } catch (e) {
          console.warn("Audio play rejected:", e);
        }
      },
      pause: () => {
        const audio = audioRef.current;
        if (audio) audio.pause();
      },
      toggle: async () => {
        const audio = getAudio();
        if (!audio) return;
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
      isPlaying: () => {
        const audio = audioRef.current;
        return !!audio && !audio.paused;
      },
    };

    window.weddingMusicControl = controller;

    return () => {
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      if (window.weddingMusicControl) delete window.weddingMusicControl;
      audioRef.current = null;
    };
  }, []);

  const handleToggle = async () => {
    const audio = getAudio();
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

  if (!showButton) return null;

  return (
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
        {playing ? "MUTE" : "PLAY"} · MUSIC
      </span>
    </button>
  );
}
