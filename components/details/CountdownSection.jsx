"use client";

import { useEffect, useState } from "react";
import { invitationData as defaultData } from "../../data/invitation";

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

export default function CountdownSection({ data = defaultData }) {
  const countdown = data.countdown;

  const [timeLeft, setTimeLeft] = useState(() =>
    calculateTimeRemaining(countdown.targetTimestampISO),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(countdown.targetTimestampISO));
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown.targetTimestampISO]);

  return (
    <section
      id="countdown"
      className="relative w-full max-w-[430px] mx-auto px-4 py-14 bg-[#0d0b0a] text-center"
      aria-label="Wedding Date and Live Reception Countdown"
    >
      {/* Save-the-Date Card in Soft Warm Ivory with Gold Accents & Sheen */}
      <div className="card-gold-sheen relative mx-auto rounded-[6px] bg-[#F7F1E8] p-6 sm:p-8 text-[#332A27] shadow-[0_14px_45px_rgba(0,0,0,0.38)] overflow-hidden">
        {/* Subtle Frame */}
        <div
          className="absolute inset-[8px] pointer-events-none rounded-[4px] border border-[#C5A66A]/30"
          aria-hidden="true"
        />

        {/* Small Ornamental Butterfly Illustration */}
        <div className="flex justify-center mb-2" aria-hidden="true">
          <svg width="34" height="26" viewBox="0 0 100 80" fill="none">
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

        {/* Header */}
        <h2 className="font-serif text-[0.66rem] sm:text-[0.72rem] uppercase tracking-[0.32em] text-[#7B866D] font-medium">
          {countdown.heading}
        </h2>

        <p className="script-float font-script text-[1.95rem] sm:text-[2.25rem] text-[#C5A66A] mt-1 mb-2">
          {countdown.coupleDisplay}
        </p>

        {/* Date Display */}
        <time className="block font-serif text-[1.05rem] sm:text-[1.15rem] font-medium text-[#332A27] tracking-wide">
          {countdown.dateFormatted}
        </time>

        <p className="font-sans text-[0.74rem] text-[#7B866D] mt-1 font-light tracking-wider">
          {countdown.receptionTime} • {countdown.eventNote}
        </p>

        <div
          className="my-5 h-[0.5px] w-20 bg-[#C5A66A]/40 mx-auto"
          aria-hidden="true"
        />

        {/* Live Countdown Grid */}
        <div
          className="relative z-10 flex flex-col items-center"
          aria-label={`Countdown: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds`}
          suppressHydrationWarning
        >
          <span
            className="font-serif text-[0.58rem] sm:text-[0.62rem] uppercase tracking-[0.26em] text-[#7B866D] mb-3 font-medium"
            suppressHydrationWarning
          >
            {timeLeft.isPassed
              ? "CELEBRATION IN PROGRESS"
              : countdown.subheading}
          </span>

          <div
            className="grid grid-cols-4 gap-2 w-full max-w-[310px]"
            aria-hidden="true"
          >
            {/* Days */}
            <div className="countdown-heartbeat rounded-[4px] border border-[#C5A66A]/30 bg-[#FFFDF9] py-2.5 px-1 shadow-[0_2px_8px_rgba(51,42,39,0.06)] flex flex-col items-center">
              <span
                className="font-serif text-[1.5rem] sm:text-[1.75rem] font-normal leading-tight text-[#332A27]"
                suppressHydrationWarning
              >
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="font-serif text-[0.52rem] tracking-[0.2em] text-[#C5A66A] uppercase mt-0.5 font-medium">
                Days
              </span>
            </div>

            {/* Hours */}
            <div className="countdown-heartbeat rounded-[4px] border border-[#C5A66A]/30 bg-[#FFFDF9] py-2.5 px-1 shadow-[0_2px_8px_rgba(51,42,39,0.06)] flex flex-col items-center">
              <span
                className="font-serif text-[1.5rem] sm:text-[1.75rem] font-normal leading-tight text-[#332A27]"
                suppressHydrationWarning
              >
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="font-serif text-[0.52rem] tracking-[0.2em] text-[#C5A66A] uppercase mt-0.5 font-medium">
                Hours
              </span>
            </div>

            {/* Minutes */}
            <div className="countdown-heartbeat rounded-[4px] border border-[#C5A66A]/30 bg-[#FFFDF9] py-2.5 px-1 shadow-[0_2px_8px_rgba(51,42,39,0.06)] flex flex-col items-center">
              <span
                className="font-serif text-[1.5rem] sm:text-[1.75rem] font-normal leading-tight text-[#332A27]"
                suppressHydrationWarning
              >
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="font-serif text-[0.52rem] tracking-[0.2em] text-[#C5A66A] uppercase mt-0.5 font-medium">
                Mins
              </span>
            </div>

            {/* Seconds */}
            <div className="countdown-heartbeat rounded-[4px] border border-[#C5A66A]/30 bg-[#FFFDF9] py-2.5 px-1 shadow-[0_2px_8px_rgba(51,42,39,0.06)] flex flex-col items-center">
              <span
                className="font-serif text-[1.5rem] sm:text-[1.75rem] font-normal leading-tight text-[#332A27]"
                suppressHydrationWarning
              >
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="font-serif text-[0.52rem] tracking-[0.2em] text-[#C5A66A] uppercase mt-0.5 font-medium">
                Secs
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
