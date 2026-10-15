"use client";

import { useEffect, useState } from "react";

const chapters = [
  { id: "wedding-hero", title: "The Royal Reveal" },
  { id: "couple", title: "Karthik & Dheeshma" },
  { id: "countdown", title: "Auspicious Muhurtham" },
  { id: "events", title: "Ceremony & Reception" },
  { id: "venue", title: "Swamy Auditorium" },
  { id: "gallery", title: "Cherished Memories" },
  { id: "download", title: "Download Invitation" },
  { id: "closing", title: "With Gratitude" },
];

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [currentChapter, setCurrentChapter] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const rawProgress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, rawProgress)));

      // Only show after initial scroll past opening/hero
      setIsVisible(scrollY > 250);

      // Determine active chapter
      let activeTitle = "";
      for (const ch of chapters) {
        const el = document.getElementById(ch.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.15) {
            activeTitle = ch.title;
          }
        }
      }
      if (activeTitle) {
        setCurrentChapter(activeTitle);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 right-0 z-40 flex flex-col items-center select-none transition-opacity duration-500"
      aria-hidden="true"
    >
      {/* Golden Filigree Hairline Progress Bar */}
      <div className="relative w-full h-[2.5px] bg-[#1A1613]/30 backdrop-blur-[2px]">
        <div
          className="h-full bg-gradient-to-r from-[#8F6F33] via-[#DFC896] to-[#FFEBB2] shadow-[0_0_8px_rgba(223,200,150,0.8)] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
        {/* Diamond Star Traveler at the tip */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 text-[8px] text-[#FFEBB2] drop-shadow-[0_0_4px_#DFC896] transition-[left] duration-150 ease-out"
          style={{ left: `${progress}%` }}
        >
          ◆
        </div>
      </div>

      {/* Floating Active Chapter Pill */}
      {currentChapter && (
        <div className="mt-2.5 flex items-center gap-1.5 rounded-full border border-[#C5A66A]/35 bg-[#14100E]/80 px-3 py-0.5 text-[0.58rem] font-serif uppercase tracking-[0.24em] text-[#DFC896] backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-all duration-300">
          <span className="text-[0.55rem] text-[#C5A66A]">✦</span>
          <span>{currentChapter}</span>
          <span className="text-[0.55rem] text-[#C5A66A]">✦</span>
        </div>
      )}
    </div>
  );
}
