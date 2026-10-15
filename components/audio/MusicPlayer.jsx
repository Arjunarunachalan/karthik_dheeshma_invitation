"use client";

import { useState, useRef, useEffect } from "react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioCtxRef = useRef(null);
  const isPlayingRef = useRef(false);
  const loopTimerRef = useRef(null);

  // Synthesize an ethereal romantic instrumental ambient harp/tanpura melody (Web Audio API)
  const startRomanticSynth = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      isPlayingRef.current = true;

      // Indian classical / romantic Raag Yaman / Bhupali pentatonic frequencies (warm flute & harp tone)
      const scale = [220, 247.5, 277.18, 329.63, 370, 440, 495, 554.37, 659.25];

      const playPluck = (freq, time, dur = 3.5, gainVal = 0.08) => {
        if (!isPlayingRef.current) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, time);

        // Warm acoustic filter
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1400, time);
        filter.frequency.exponentialRampToValueAtTime(350, time + dur);

        // Envelope: gentle attack, lingering warm decay
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(gainVal, time + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + dur);
      };

      // Swelling ambient chord loop
      let step = 0;
      const chords = [
        [scale[0], scale[2], scale[4]],
        [scale[1], scale[3], scale[5]],
        [scale[2], scale[4], scale[6]],
        [scale[0], scale[3], scale[4]],
      ];

      const scheduleLoop = () => {
        if (!isPlayingRef.current) return;
        const now = ctx.currentTime;
        const chord = chords[step % chords.length];

        chord.forEach((freq, idx) => {
          playPluck(freq, now + idx * 0.45, 4.0, 0.06);
          // High shimmering harmonic note
          playPluck(freq * 2, now + 1.2 + idx * 0.35, 3.0, 0.025);
        });

        step++;
        loopTimerRef.current = setTimeout(scheduleLoop, 4200);
      };

      scheduleLoop();
    } catch {
      // Audio context fallback
    }
  };

  const stopRomanticSynth = () => {
    isPlayingRef.current = false;
    if (loopTimerRef.current) {
      clearTimeout(loopTimerRef.current);
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "running") {
      audioCtxRef.current.suspend();
    }
  };

  const toggleMusic = () => {
    setHasInteracted(true);
    if (isPlaying) {
      stopRomanticSynth();
      setIsPlaying(false);
    } else {
      startRomanticSynth();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopRomanticSynth();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-4 z-40 select-none">
      <button
        onClick={toggleMusic}
        className={`group relative flex items-center gap-2 rounded-full border border-[#C5A66A]/50 bg-[#F7F1E8]/95 px-3 py-2 shadow-[0_6px_22px_rgba(51,42,39,0.18)] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
          isPlaying ? "border-[#C5A66A] ring-2 ring-[#C5A66A]/30" : ""
        }`}
        aria-label={isPlaying ? "Mute romantic background music" : "Play romantic background music"}
      >
        {/* Animated Vinyl / Disc Icon */}
        <div
          className={`relative flex h-6 w-6 items-center justify-center rounded-full bg-[#332A27] text-[#DFC896] transition-transform ${
            isPlaying ? "animate-spin [animation-duration:4s]" : ""
          }`}
        >
          <span className="text-[0.65rem]">♫</span>
          <div className="absolute inset-0 rounded-full border border-[#C5A66A]/40" />
        </div>

        {/* Text / Soundwave Indicator */}
        <div className="flex items-center gap-1.5 pr-1">
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-3 bg-[#C5A66A] rounded-full animate-bounce [animation-delay:0.1s]" />
              <span className="w-0.5 h-2 bg-[#C5A66A] rounded-full animate-bounce [animation-delay:0.3s]" />
              <span className="w-0.5 h-3.5 bg-[#C5A66A] rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-0.5 h-2.5 bg-[#C5A66A] rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          ) : (
            <span className="font-serif text-[0.68rem] tracking-wider text-[#332A27]">
              Play Music
            </span>
          )}
        </div>

        {/* First time gentle pulsing hint banner */}
        {!hasInteracted && (
          <span className="absolute -top-7 right-0 whitespace-nowrap rounded-full bg-[#C5A66A] px-2 py-0.5 font-serif text-[0.55rem] tracking-wider text-[#FFFDF9] shadow-sm animate-pulse">
            ♫ Romantic Audio
          </span>
        )}
      </button>
    </div>
  );
}
