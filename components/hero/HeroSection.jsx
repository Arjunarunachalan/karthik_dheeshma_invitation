"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import {
  createHeroEntranceTimeline,
  createScrollIndicatorPulse,
  prefersReducedMotion,
  setHeroInitialState,
  setHeroSettledState,
} from "../../animations/heroAnimations";
import { invitationData as defaultData } from "../../data/invitation";
import "./hero.css";

export default function HeroSection({
  data = defaultData,
  active = false,
  onHeroReady,
}) {
  const rootRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);
  const darkOverlayRef = useRef(null);
  const introLineRef = useRef(null);
  const firstNameRef = useRef(null);
  const ampersandRef = useRef(null);
  const secondNameRef = useRef(null);
  const dividerRef = useRef(null);
  const weddingDateRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const scrollArrowRef = useRef(null);

  const hasAnimatedRef = useRef(false);
  const pulseLoopRef = useRef(null);

  const { couple, hero } = data;

  useLayoutEffect(() => {
    const isReduced = prefersReducedMotion();

    const elements = {
      imageWrapper: imageWrapperRef.current,
      image: imageRef.current,
      darkOverlay: darkOverlayRef.current,
      introLine: introLineRef.current,
      firstName: firstNameRef.current,
      ampersand: ampersandRef.current,
      secondName: secondNameRef.current,
      divider: dividerRef.current,
      weddingDate: weddingDateRef.current,
      scrollIndicator: scrollIndicatorRef.current,
    };

    const ctx = gsap.context(() => {
      if (isReduced) {
        setHeroSettledState(elements);
        hasAnimatedRef.current = true;
        onHeroReady?.();
        return;
      }

      // If not yet active, ensure elements remain poised in initial state
      if (!active && !hasAnimatedRef.current) {
        setHeroInitialState(elements);
        return;
      }

      // Only animate once when active becomes true
      if (active && !hasAnimatedRef.current) {
        hasAnimatedRef.current = true;
        setHeroInitialState(elements);

        const tl = createHeroEntranceTimeline(elements, {
          onComplete: () => {
            pulseLoopRef.current = createScrollIndicatorPulse(
              scrollIndicatorRef.current,
              scrollArrowRef.current,
            );
            onHeroReady?.();
          },
        });

        return () => {
          tl?.kill?.();
        };
      }
    }, rootRef);

    return () => {
      pulseLoopRef.current?.kill?.();
      pulseLoopRef.current = null;
      ctx.revert();
    };
  }, [active, onHeroReady]);

  return (
    <section
      ref={rootRef}
      id="wedding-hero"
      className="hero-section relative flex min-h-[100svh] w-full max-w-[430px] mx-auto flex-col justify-between overflow-hidden bg-[#0d0b0a] text-center select-none"
      aria-label="Wedding Hero"
    >
      {/* Background Photography Area or Designed Editorial Fallback */}
      <div
        ref={imageWrapperRef}
        className="hero-image-wrapper absolute inset-0 z-0 will-change-transform"
      >
        <div ref={imageRef} className="relative h-full w-full will-change-transform">
          {hero.imagePath ? (
            <Image
              src={hero.imagePath}
              alt={hero.imageAlt || `${couple.firstName} & ${couple.secondName}`}
              fill
              priority
              sizes="(max-width: 430px) 100vw, 430px"
              className="object-cover object-[center_30%]"
            />
          ) : (
            /* Designed Editorial Portrait Fallback Composition */
            <div className="hero-fallback-backdrop absolute inset-0 flex items-center justify-center">
              {/* Subtle architectural arched oval cameo frame */}
              <div className="hero-cameo-frame relative mx-auto h-[80%] w-[86%] max-w-[350px] rounded-[180px/230px] overflow-hidden flex flex-col items-center justify-between p-6">
                {/* Ambient gold radial glow */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-40"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 48%, rgba(168, 137, 85, 0.22) 0%, rgba(13, 11, 10, 0) 70%)",
                  }}
                />

                {/* Top architectural crown flourish */}
                <div className="relative z-10 pt-4 flex flex-col items-center opacity-40">
                  <span className="text-[0.6rem] text-[#a88955]">✦</span>
                  <span className="mt-1 h-[0.5px] w-8 bg-[#a88955]/50" />
                </div>

                {/* Bottom architectural flourish */}
                <div className="relative z-10 pb-4 flex flex-col items-center opacity-40">
                  <span className="mb-1 h-[0.5px] w-8 bg-[#a88955]/50" />
                  <span className="text-[0.6rem] text-[#a88955]">✦</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dark editorial overlay for optimal typography legibility */}
        <div
          ref={darkOverlayRef}
          className="hero-editorial-overlay absolute inset-0 z-10 pointer-events-none"
        />
      </div>

      {/* Top spacing / Introductory Line */}
      <header className="relative z-20 pt-16 px-6 flex flex-col items-center">
        <p
          ref={introLineRef}
          className="hero-subtle-shadow font-serif text-[0.64rem] sm:text-[0.7rem] uppercase tracking-[0.34em] text-[#c5a869]"
        >
          {hero.introText}
        </p>
      </header>

      {/* Center: Couple Names and Date */}
      <div className="relative z-20 my-auto flex flex-col items-center justify-center px-6 py-4">
        {/* First Name */}
        <h1
          ref={firstNameRef}
          className="hero-name-shadow font-serif text-[2.85rem] sm:text-[3.4rem] font-normal leading-[0.96] tracking-[0.06em] text-[#f4efe5]"
        >
          {couple.firstName}
        </h1>

        {/* Ampersand */}
        <span
          ref={ampersandRef}
          className="hero-subtle-shadow my-2 font-serif italic text-[1.85rem] sm:text-[2.2rem] leading-none text-[#c5a869]"
        >
          {hero.ampersand || couple.ampersand || "&"}
        </span>

        {/* Second Name */}
        <h2
          ref={secondNameRef}
          className="hero-name-shadow font-serif text-[2.85rem] sm:text-[3.4rem] font-normal leading-[0.96] tracking-[0.06em] text-[#f4efe5]"
        >
          {couple.secondName}
        </h2>

        {/* Delicate antique gold divider */}
        <div
          ref={dividerRef}
          className="my-5 flex items-center justify-center gap-2.5"
          aria-hidden="true"
        >
          <span className="h-[0.5px] w-9 bg-[#a88955]/50" />
          <span className="text-[0.52rem] text-[#c5a869]">◆</span>
          <span className="h-[0.5px] w-9 bg-[#a88955]/50" />
        </div>

        {/* Wedding Date */}
        <time
          ref={weddingDateRef}
          className="hero-subtle-shadow font-serif text-[0.82rem] sm:text-[0.88rem] font-medium uppercase tracking-[0.32em] text-[#e8dfd0]"
        >
          {hero.weddingDate || hero.dateText || "25 · 11 · 2026"}
        </time>
      </div>

      {/* Bottom: Subtle Scroll Indicator */}
      <footer className="relative z-20 pb-10 px-6 flex flex-col items-center">
        <div
          ref={scrollIndicatorRef}
          className="flex flex-col items-center gap-1.5 font-serif text-[0.58rem] sm:text-[0.62rem] uppercase tracking-[0.36em] text-[#a88955] opacity-80"
          aria-label="Scroll to explore invitation"
        >
          <span>{hero.scrollHintText}</span>
          <span
            ref={scrollArrowRef}
            className="hero-scroll-arrow text-[0.75rem] leading-none opacity-75"
            aria-hidden="true"
          >
            ↓
          </span>
        </div>
      </footer>
    </section>
  );
}
