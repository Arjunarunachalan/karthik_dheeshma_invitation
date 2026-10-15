"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { prefersReducedMotion } from "../../animations/introAnimations";
import { fireGoldenCelebration } from "../../animations/confetti";
import { invitationData as defaultData } from "../../data/invitation";

export default function CoupleSection({ data = defaultData }) {
  const couple = data.couple;
  const sectionData = data.coupleSection;

  const sectionRef = useRef(null);
  const imageFrameRef = useRef(null);
  const textContentRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  useLayoutEffect(() => {
    const isReduced = prefersReducedMotion();
    const section = sectionRef.current;
    if (!section) return;

    if (isReduced) {
      hasAnimatedRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;

          const tl = gsap.timeline();
          tl.fromTo(
            imageFrameRef.current,
            { opacity: 0, scale: 0.94, y: 35 },
            { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power2.out" },
          ).fromTo(
            textContentRef.current?.children || [],
            { opacity: 0, y: 22 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.14,
              ease: "power2.out",
            },
            "-=0.6",
          );

          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="couple"
      className="relative w-full max-w-[430px] mx-auto px-4 py-16 bg-[#0d0b0a] text-center overflow-hidden"
      aria-label="Couple Story and Editorial Portrait"
    >
      {/* Editorial Card Base in Warm Ivory & Fine Gold Hairline with Gold Sheen */}
      <div className="card-gold-sheen editorial-hover-card relative mx-auto rounded-[6px] bg-[#F7F1E8] p-6 sm:p-8 text-[#332A27] shadow-[0_14px_45px_rgba(0,0,0,0.38)] overflow-hidden">
        {/* Subtle Double Hairline Frame */}
        <div
          className="absolute inset-[8px] pointer-events-none rounded-[4px] border border-[#C5A66A]/35"
          aria-hidden="true"
        />

        {/* Cinematic Soft Gold Aura */}
        <div className="cinematic-glow-aura absolute inset-0 pointer-events-none" aria-hidden="true" />

        {/* Section Pre-heading */}
        <div className="relative z-10 flex flex-col items-center">
          <div
            className="flex items-center justify-center gap-2 mb-2"
            aria-hidden="true"
          >
            <span className="h-[0.5px] w-8 bg-[#C5A66A]/60" />
            <span className="text-[0.6rem] text-[#C5A66A]">✦</span>
            <span className="h-[0.5px] w-8 bg-[#C5A66A]/60" />
          </div>

          <h2 className="font-serif text-[0.68rem] sm:text-[0.74rem] uppercase tracking-[0.32em] text-[#7B866D] font-medium">
            {sectionData.heading}
          </h2>

          {/* Tasteful Handwritten Script Accent with Ambient Floating Effect */}
          <p className="script-float font-script text-[1.85rem] sm:text-[2.2rem] text-[#C5A66A] mt-1 mb-3">
            {sectionData.scriptAccent}
          </p>
        </div>

        {/* Arch-Framed Editorial Photograph Container with Moving Shimmer Border */}
        <div
          ref={imageFrameRef}
          className="relative z-10 mx-auto my-4 w-full max-w-[310px] aspect-[3/4] overflow-hidden rounded-t-[140px] rounded-b-[6px] border border-[#C5A66A]/50 bg-[#EDE5D8] shadow-[0_10px_30px_rgba(51,42,39,0.14)] p-1.5 transition-all duration-500 hover:shadow-[0_16px_40px_rgba(197,166,106,0.35)] hover:border-[#C5A66A]"
        >
          <div className="relative w-full h-full overflow-hidden rounded-t-[136px] rounded-b-[4px]">
            <Image
              src={sectionData.imagePath}
              alt={sectionData.imageAlt}
              fill
              className="object-cover object-[center_20%] transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 430px) 100vw, 310px"
              priority
            />
          </div>

          {/* Interactive Monogram Badge Overlay (triggers celebratory golden burst) */}
          <button
            type="button"
            onClick={fireGoldenCelebration}
            className="absolute bottom-3 right-3 rounded-full bg-[#F7F1E8]/92 border border-[#C5A66A]/60 px-2.5 py-1 backdrop-blur-sm shadow-sm transition hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Celebrate with golden confetti"
          >
            <span className="font-serif text-[0.64rem] font-medium tracking-widest text-[#332A27]">
              {sectionData.monogram} ✦
            </span>
          </button>
        </div>

        {/* Couple Typography & Editorial Story */}
        <div ref={textContentRef} className="relative z-10 mt-5 space-y-3">
          <div className="flex items-baseline justify-center gap-2">
            <span className="font-serif text-[2rem] sm:text-[2.35rem] font-normal tracking-tight text-[#332A27]">
              {couple.groomName}
            </span>
            <span className="font-serif italic text-[1.35rem] text-[#C5A66A]">
              &amp;
            </span>
            <span className="font-serif text-[2rem] sm:text-[2.35rem] font-normal tracking-tight text-[#332A27]">
              {couple.brideName}
            </span>
          </div>

          <p className="max-w-[260px] mx-auto font-serif text-[0.82rem] sm:text-[0.88rem] italic leading-relaxed text-[#5A4E4A]">
            {sectionData.quote}
          </p>

          <p className="max-w-[280px] mx-auto font-sans text-[0.74rem] sm:text-[0.78rem] leading-relaxed text-[#7B866D] font-light">
            {sectionData.storyText}
          </p>

          {/* Date Badge */}
          <div className="pt-2 flex items-center justify-center gap-2">
            <span className="inline-block rounded-full bg-[#A8B5A0]/20 px-3 py-1 font-serif text-[0.62rem] uppercase tracking-[0.24em] text-[#7B866D]">
              {sectionData.dateBadge} • PALAKKAD
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
