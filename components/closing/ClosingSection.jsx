"use client";

import { invitationData as defaultData } from "../../data/invitation";

export default function ClosingSection({ data = defaultData }) {
  const closing = data.closing;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative w-full max-w-[430px] mx-auto px-4 pt-14 pb-20 bg-[#0d0b0a] text-center"
      aria-label="Closing Scene"
    >
      <div className="card-gold-sheen editorial-hover-card relative mx-auto rounded-[6px] bg-[#F7F1E8] p-8 sm:p-10 text-[#332A27] shadow-[0_14px_45px_rgba(0,0,0,0.38)] overflow-hidden">
        {/* Subtle Frame */}
        <div
          className="absolute inset-[8px] pointer-events-none rounded-[4px] border border-[#C5A66A]/30"
          aria-hidden="true"
        />

        {/* Cinematic Soft Gold Aura */}
        <div className="cinematic-glow-aura absolute inset-0 pointer-events-none" aria-hidden="true" />

        {/* Small Delicate Butterfly Illustration */}
        <div className="flex justify-center mb-3" aria-hidden="true">
          <svg width="38" height="30" viewBox="0 0 100 80" fill="none">
            <path
              d="M50 38 C42 20 22 8 8 20 C-2 30 8 50 48 40 Z"
              fill="#C5A66A"
              fillOpacity="0.4"
              stroke="#C5A66A"
              strokeWidth="1.2"
            />
            <path
              d="M50 38 C58 20 78 8 92 20 C102 30 92 50 52 40 Z"
              fill="#C5A66A"
              fillOpacity="0.4"
              stroke="#C5A66A"
              strokeWidth="1.2"
            />
            <path
              d="M48 41 C40 50 20 62 15 52 C10 42 32 38 48 41 Z"
              fill="#D7AAA6"
              fillOpacity="0.4"
            />
            <path
              d="M52 41 C60 50 80 62 85 52 C90 42 68 38 52 41 Z"
              fill="#D7AAA6"
              fillOpacity="0.4"
            />
            <ellipse cx="50" cy="40" rx="1.5" ry="7" fill="#8F6F33" />
          </svg>
        </div>

        {/* Quote with Floating Ambient Sway */}
        <p className="script-float font-script text-[1.85rem] sm:text-[2.2rem] text-[#C5A66A] mb-2">
          {closing.quote}
        </p>

        {/* Heading */}
        <h2 className="font-serif text-[0.85rem] sm:text-[0.95rem] font-medium tracking-[0.24em] text-[#332A27] uppercase max-w-[280px] mx-auto leading-relaxed">
          {closing.title}
        </h2>

        {/* Names & Date */}
        <div className="my-4">
          <p className="font-serif text-[1.6rem] sm:text-[1.8rem] font-normal text-[#332A27]">
            {closing.names}
          </p>
          <p className="font-serif text-[0.74rem] uppercase tracking-[0.26em] text-[#7B866D] mt-1 font-medium">
            {closing.date} • {closing.location}
          </p>
        </div>

        <div
          className="my-5 h-[0.5px] w-16 bg-[#C5A66A]/35 mx-auto"
          aria-hidden="true"
        />

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 rounded-full border border-[#C5A66A]/40 bg-[#FFFDF9] px-4 py-1.5 font-serif text-[0.66rem] uppercase tracking-[0.2em] text-[#332A27] transition hover:bg-[#C5A66A] hover:text-[#FFFDF9] shadow-sm cursor-pointer"
          aria-label="Back to top of wedding invitation"
        >
          <span>↑ Back to Top</span>
        </button>

        <p className="mt-6 font-sans text-[0.58rem] tracking-wider text-[#A8B5A0] uppercase">
          Karthik &amp; Dheeshma Wedding Celebration
        </p>
      </div>
    </footer>
  );
}
