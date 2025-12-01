"use client";
import { useState, useEffect, useRef } from "react";

export default function MusicPlayer() {
  const tracks = ["/music/song1.mp3", "/music/song2.mp3", "/music/song3.mp3"];

  const [current, setCurrent] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch((e) => {
        console.log("Autoplay blocked:", e);
      });
      setIsPlaying(true);
    }
  };

  const handleEnded = () => {
    setCurrent((prev) => (prev + 1) % tracks.length);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const pct = (audio.currentTime / audio.duration) * 100 || 0;
      setProgress(pct);

      const formatTime = (time) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60)
          .toString()
          .padStart(2, "0");
        return `${mins}:${secs}`;
      };

      setCurrentTime(formatTime(audio.currentTime));
      setDuration(formatTime(audio.duration || 0));
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
    };
  }, [current]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.play();
      setIsPlaying(true);
    }
  }, [current]);

  return (
    <div className="rounded-2xl shadow-xl border-4 border-amber-700 p-6 text-center w-[340px] sm:w-[400px] text-amber-200 font-serif transition-all">
      <h2 className="text-2xl mb-3 font-bold text-amber-300 drop-shadow-lg tracking-widest">
        🎵 Songs of the Middle Earth
      </h2>

      <audio ref={audioRef} src={tracks[current]} onEnded={handleEnded} />

      <div className="bg-black/50 p-4 rounded-xl flex items-center gap-4">
        <div className="flex-1 h-2 bg-yellow-700 rounded-full">
          <div
            className="h-2 bg-yellow-300 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <span className="text-yellow-200 text-sm">
          {currentTime} / {duration}
        </span>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={audioRef.current?.volume || 1}
          onChange={(e) => {
            if (audioRef.current) audioRef.current.volume = e.target.value;
          }}
          className="w-24 accent-yellow-400"
        />
      </div>

      <p className="text-lg italic my-4">
        Track {current + 1} of {tracks.length}
      </p>
      
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={togglePlay}
          className="px-6 py-2 rounded-full bg-amber-700 hover:bg-amber-800 transition-all shadow-md hover:shadow-amber-500/30 border border-amber-500 font-semibold"
        >
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>

        <button
          onClick={() => setCurrent((current + 1) % tracks.length)}
          className="px-6 py-2 rounded-full bg-amber-700 hover:bg-amber-800 transition-all shadow-md hover:shadow-amber-500/30 border border-amber-500 font-semibold"
        >
          ▶ Next Song
        </button>
      </div>
    </div>
  );
}
