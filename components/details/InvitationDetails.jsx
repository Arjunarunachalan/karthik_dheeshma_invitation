"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "../../animations/introAnimations";
import { invitationData as defaultData } from "../../data/invitation";
import "./details.css";

// Calculate remaining time against exact ISO target (Asia/Kolkata +05:30)
function calculateTimeRemaining(targetIsoString) {
  const target = new Date(targetIsoString).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isPassed: false };
}

export default function InvitationDetails({ data = defaultData }) {
  const { couple, details } = data;
  const { reception, ceremony, host, family, compliments, location } = details;

  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const headerRef = useRef(null);
  const countdownRef = useRef(null);
  const receptionCardRef = useRef(null);
  const ceremonyCardRef = useRef(null);
  const familyRef = useRef(null);
  const complimentsRef = useRef(null);
  const locationRef = useRef(null);

  const hasAnimatedRef = useRef(false);

  // Countdown state initialized with exact target
  const [timeLeft, setTimeLeft] = useState(() =>
    calculateTimeRemaining(reception.targetTimestampISO),
  );

  // Update countdown every second and clean up on unmount
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(reception.targetTimestampISO));
    }, 1000);

    return () => clearInterval(timer);
  }, [reception.targetTimestampISO]);

  // Viewport entrance animation (runs once)
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

          const elements = [
            headerRef.current,
            countdownRef.current,
            receptionCardRef.current,
            ceremonyCardRef.current,
            familyRef.current,
            complimentsRef.current,
            locationRef.current,
          ].filter(Boolean);

          gsap.fromTo(
            elements,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.16,
              ease: "power2.out",
            },
          );

          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="invitation-details"
      className="details-section relative w-full max-w-[430px] mx-auto px-4 py-16 bg-[#0d0b0a] text-center"
      aria-label="Wedding Invitation Details and Countdown"
    >
      {/* Outer Paper Card Container with Vintage Texture */}
      <article
        ref={cardRef}
        className="details-paper-card relative mx-auto w-full rounded-[4px] p-6 sm:p-8 text-[#1a1613] overflow-hidden"
      >
        {/* Subtle Double Hairline Gold Border */}
        <div className="details-inner-frame absolute inset-[6px] pointer-events-none rounded-[2px]" />

        {/* 1. Small Ornamental Divider */}
        <div
          ref={headerRef}
          className="relative z-10 flex flex-col items-center pt-2"
        >
          <div className="flex items-center justify-center gap-2.5 mb-3" aria-hidden="true">
            <span className="h-[0.5px] w-8 bg-[#a88955]/60" />
            <span className="text-[0.5rem] text-[#a88955]">✦</span>
            <span className="h-[0.5px] w-8 bg-[#a88955]/60" />
          </div>

          {/* 2. Heading: "WITH JOY IN OUR HEARTS" */}
          <h2 className="font-serif text-[0.68rem] sm:text-[0.74rem] uppercase tracking-[0.34em] text-[#a88955] font-medium">
            {details.heading}
          </h2>

          {/* 3. Couple Names: Karthik & Dheeshma */}
          <div className="my-3 flex items-baseline justify-center gap-2 text-[#1a1613]">
            <span className="font-serif text-[1.85rem] sm:text-[2.2rem] font-normal tracking-tight text-[#1a1613]">
              {couple.groomName}
            </span>
            <span className="font-serif italic text-[1.25rem] text-[#a88955]">&</span>
            <span className="font-serif text-[1.85rem] sm:text-[2.2rem] font-normal tracking-tight text-[#1a1613]">
              {couple.brideName}
            </span>
          </div>

          {/* 4. Invitation Paragraph */}
          <p className="mt-2 max-w-[20rem] mx-auto font-serif text-[0.76rem] sm:text-[0.82rem] leading-relaxed text-[#4a3e35]">
            {details.invitationWording}
          </p>

          <div className="my-5 h-[0.5px] w-16 bg-[#a88955]/40 mx-auto" aria-hidden="true" />
        </div>

        {/* 5. Countdown to Confirmed Reception: 25 November 2026, 5:00 PM IST */}
        <div
          ref={countdownRef}
          className="relative z-10 my-4 flex flex-col items-center"
          aria-label={`Countdown to reception: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, and ${timeLeft.seconds} seconds`}
          suppressHydrationWarning
        >
          <span
            className="font-serif text-[0.58rem] sm:text-[0.62rem] uppercase tracking-[0.28em] text-[#6b5c50] mb-3"
            suppressHydrationWarning
          >
            {timeLeft.isPassed ? "CELEBRATION IN PROGRESS" : "COUNTING DOWN TO THE RECEPTION"}
          </span>

          <div
            className="grid grid-cols-4 gap-2 w-full max-w-[320px]"
            aria-hidden="true"
          >
            {/* Days */}
            <div className="countdown-tile rounded-[3px] py-2 px-1 flex flex-col items-center">
              <span
                className="font-serif text-[1.4rem] sm:text-[1.65rem] font-normal leading-tight text-[#1a1613]"
                suppressHydrationWarning
              >
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="font-serif text-[0.5rem] tracking-[0.22em] text-[#a88955] uppercase mt-0.5">
                Days
              </span>
            </div>

            {/* Hours */}
            <div className="countdown-tile rounded-[3px] py-2 px-1 flex flex-col items-center">
              <span
                className="font-serif text-[1.4rem] sm:text-[1.65rem] font-normal leading-tight text-[#1a1613]"
                suppressHydrationWarning
              >
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="font-serif text-[0.5rem] tracking-[0.22em] text-[#a88955] uppercase mt-0.5">
                Hours
              </span>
            </div>

            {/* Minutes */}
            <div className="countdown-tile rounded-[3px] py-2 px-1 flex flex-col items-center">
              <span
                className="font-serif text-[1.4rem] sm:text-[1.65rem] font-normal leading-tight text-[#1a1613]"
                suppressHydrationWarning
              >
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="font-serif text-[0.5rem] tracking-[0.22em] text-[#a88955] uppercase mt-0.5">
                Mins
              </span>
            </div>

            {/* Seconds */}
            <div className="countdown-tile rounded-[3px] py-2 px-1 flex flex-col items-center">
              <span
                className="font-serif text-[1.4rem] sm:text-[1.65rem] font-normal leading-tight text-[#1a1613]"
                suppressHydrationWarning
              >
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="font-serif text-[0.5rem] tracking-[0.22em] text-[#a88955] uppercase mt-0.5">
                Secs
              </span>
            </div>
          </div>
        </div>

        {/* 6. Reception Date, Venue and Time in a Clearly Structured Event Card */}
        <div
          ref={receptionCardRef}
          className="event-card event-card-highlight relative z-10 my-4 rounded-[4px] p-5 text-center"
        >
          <span className="inline-block rounded-full bg-[#a88955]/12 px-3 py-0.5 font-serif text-[0.54rem] uppercase tracking-[0.26em] text-[#6e5527] font-medium mb-2">
            Confirmed Event
          </span>

          <h3 className="font-serif text-[1.2rem] sm:text-[1.35rem] font-normal text-[#1a1613] tracking-wide">
            {reception.title}
          </h3>

          <div className="mt-2 text-[#4a3e35]">
            <time className="block font-serif text-[0.88rem] sm:text-[0.94rem] font-medium text-[#1a1613]">
              {reception.dateFormatted}
            </time>
            <span className="block font-serif text-[0.74rem] text-[#6e5527] mt-0.5 tracking-wider">
              {reception.time}
            </span>
          </div>

          <div className="my-2.5 h-[0.5px] w-12 bg-[#a88955]/30 mx-auto" aria-hidden="true" />

          <address className="not-italic font-serif text-[0.76rem] text-[#4a3e35]">
            <strong className="block text-[#1a1613] font-medium">{reception.venueName}</strong>
            <span className="block text-[#6b5c50] text-[0.72rem]">{reception.venueLocation}</span>
          </address>
        </div>

        {/* 7. Separate Ceremony Details Block (Thalikettu) */}
        <div
          ref={ceremonyCardRef}
          className="event-card relative z-10 my-4 rounded-[4px] p-5 text-center"
        >
          <div className="flex items-center justify-center gap-1.5 mb-1.5">
            <span className="inline-block rounded-full bg-[#6b5c50]/10 px-3 py-0.5 font-serif text-[0.52rem] uppercase tracking-[0.24em] text-[#6b5c50]">
              Traditional Ritual
            </span>
          </div>

          <h3 className="font-serif text-[1.15rem] sm:text-[1.28rem] font-normal text-[#1a1613] tracking-wider uppercase">
            {ceremony.ritual}
          </h3>

          <p className="font-serif text-[0.72rem] text-[#6e5527] mt-1 font-medium tracking-wide">
            Muhurtam: {ceremony.muhurtam}
          </p>

          <address className="not-italic font-serif text-[0.76rem] text-[#4a3e35] mt-2">
            <strong className="block text-[#1a1613] font-medium">{ceremony.venueName}</strong>
          </address>

          {/* Explicit Unconfirmed Date Status */}
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-[2px] border border-[#a88955]/30 bg-[#f7f2ea] px-2.5 py-1 text-[0.62rem] text-[#6e5527] font-serif">
            <span className="text-[0.55rem] text-[#a88955]">ℹ</span>
            <span>Ceremony Date: {ceremony.dateStatus}</span>
          </div>
        </div>

        {/* 8. Host and Family Details in a Readable Secondary Section */}
        <div
          ref={familyRef}
          className="relative z-10 my-5 pt-3 border-t border-[#a88955]/25 text-center"
        >
          {/* Host info */}
          <div className="mb-4">
            <span className="font-serif text-[0.54rem] uppercase tracking-[0.26em] text-[#a88955] block mb-1">
              Warmly Invited By
            </span>
            <p className="font-serif text-[0.86rem] text-[#1a1613] font-medium">
              {host.name}
            </p>
            <p className="font-serif text-[0.68rem] text-[#6b5c50] italic">
              {host.relation}
            </p>
            <address className="not-italic font-serif text-[0.68rem] text-[#4a3e35] max-w-[17rem] mx-auto mt-1 leading-snug">
              {host.address}
            </address>

            {/* Clickable Phone Number */}
            <div className="mt-2">
              <a
                href={host.contactTel}
                className="contact-link inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-serif text-[0.68rem] tracking-wider"
                aria-label={`Call host at ${host.contactNumber}`}
              >
                <span aria-hidden="true">📞</span>
                <span>{host.contactNumber}</span>
              </a>
            </div>
          </div>

          {/* Bride Family details */}
          <div className="pt-3 border-t border-[#a88955]/15">
            <span className="font-serif text-[0.52rem] uppercase tracking-[0.24em] text-[#a88955] block mb-0.5">
              Bride&apos;s Family
            </span>
            <p className="font-serif text-[0.78rem] text-[#1a1613]">
              <span className="italic text-[#6e5527] mr-1">{family.relationPrefix}</span>
              <strong className="font-medium">{family.parentsName}</strong>
            </p>
            <address className="not-italic font-serif text-[0.66rem] text-[#6b5c50] max-w-[17rem] mx-auto mt-0.5 leading-snug">
              {family.address}
            </address>
          </div>
        </div>

        {/* 9. Compliments Line */}
        <div
          ref={complimentsRef}
          className="relative z-10 my-4 pt-2 border-t border-[#a88955]/20 text-center"
        >
          <p className="font-serif text-[0.66rem] sm:text-[0.72rem] italic tracking-wide text-[#5a483a]">
            &ldquo;{compliments}&rdquo;
          </p>
        </div>

        {/* 10. Location Action with Clearly Marked Status */}
        <div
          ref={locationRef}
          className="relative z-10 mt-5 pt-3 border-t border-[#a88955]/20 flex flex-col items-center"
        >
          {location.isVerified && location.receptionMapUrl ? (
            <a
              href={location.receptionMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[3px] border border-[#a88955] bg-[#a88955] px-4 py-2 font-serif text-[0.66rem] uppercase tracking-[0.24em] text-[#f4efe5] transition hover:bg-[#8e7446]"
            >
              <span>📍 View Reception on Maps</span>
            </a>
          ) : (
            <div className="flex flex-col items-center gap-1 rounded-[3px] border border-[#a88955]/30 bg-[#f4ece0]/60 p-3 w-full max-w-[280px]">
              <div className="flex items-center gap-1.5 text-[0.7rem] text-[#1a1613] font-serif font-medium">
                <span aria-hidden="true">📍</span>
                <span>{location.venueName}</span>
              </div>
              <span className="text-[0.6rem] text-[#6b5c50] font-serif">
                {location.locality}
              </span>
              <span className="inline-block mt-1 rounded bg-[#a88955]/15 px-2 py-0.5 font-serif text-[0.52rem] uppercase tracking-wider text-[#6e5527]">
                Location Link Pending Verification
              </span>
            </div>
          )}
        </div>
      </article>
    </section>
  );
}
