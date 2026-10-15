"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { id: "couple", label: "Story" },
  { id: "countdown", label: "Countdown" },
  { id: "events", label: "Events" },
  { id: "venue", label: "Venue" },
  { id: "gallery", label: "Gallery" },
  { id: "invitation", label: "Card" },
];

export default function NavHeader({ active = false }) {
  const [activeSection, setActiveSection] = useState("couple");

  useEffect(() => {
    if (!active) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_LINKS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(NAV_LINKS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [active]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!active) return null;

  return (
    <nav
      className="sticky top-3 z-30 mx-auto w-full max-w-[410px] px-3 pointer-events-auto transition-opacity duration-700"
      aria-label="Wedding Invitation Navigation"
    >
      <div className="flex items-center justify-between rounded-full border border-[#C5A66A]/35 bg-[#F7F1E8]/90 px-3 py-1.5 shadow-[0_4px_20px_rgba(51,42,39,0.08)] backdrop-blur-md">
        <span className="font-serif text-[0.8rem] font-medium tracking-wider text-[#332A27] pl-1">
          K &amp; D
        </span>
        <div className="flex items-center gap-1 sm:gap-1.5">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`rounded-full px-2 py-0.5 font-serif text-[0.62rem] sm:text-[0.68rem] tracking-wider transition-all duration-200 ${
                activeSection === link.id
                  ? "bg-[#C5A66A] text-[#FFFDF9] font-medium shadow-sm"
                  : "text-[#5A4E4A] hover:text-[#332A27] hover:bg-[#C5A66A]/10"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
