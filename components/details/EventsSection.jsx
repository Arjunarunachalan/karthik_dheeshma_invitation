"use client";

import { invitationData as defaultData } from "../../data/invitation";

export default function EventsSection({ data = defaultData }) {
  const events = data.events;
  const { reception, ceremony, host, family, compliments } = events;

  return (
    <section
      id="events"
      className="relative w-full max-w-[430px] mx-auto px-4 py-16 bg-[#0d0b0a] text-center"
      aria-label="Wedding Events and Ceremony Schedule"
    >
      <div className="card-gold-sheen editorial-hover-card relative mx-auto rounded-[6px] bg-[#F7F1E8] p-6 sm:p-8 text-[#332A27] shadow-[0_14px_45px_rgba(0,0,0,0.38)] overflow-hidden">
        {/* Subtle Frame */}
        <div
          className="absolute inset-[8px] pointer-events-none rounded-[4px] border border-[#C5A66A]/30"
          aria-hidden="true"
        />

        {/* Cinematic Soft Gold Aura */}
        <div className="cinematic-glow-aura absolute inset-0 pointer-events-none" aria-hidden="true" />

        {/* Section Heading */}
        <div className="relative z-10 flex flex-col items-center mb-6">
          <div
            className="flex items-center justify-center gap-2 mb-2"
            aria-hidden="true"
          >
            <span className="h-[0.5px] w-8 bg-[#C5A66A]/60" />
            <span className="text-[0.6rem] text-[#C5A66A]">✦</span>
            <span className="h-[0.5px] w-8 bg-[#C5A66A]/60" />
          </div>

          <h2 className="font-serif text-[0.68rem] sm:text-[0.74rem] uppercase tracking-[0.32em] text-[#7B866D] font-medium">
            {events.sectionHeading}
          </h2>

          <p className="script-float font-script text-[1.75rem] sm:text-[2.05rem] text-[#C5A66A] mt-0.5">
            {events.sectionSubheading}
          </p>
        </div>

        {/* EVENT 1: Confirmed Reception Card */}
        <div className="relative z-10 mb-6 rounded-[5px] border border-[#C5A66A]/45 bg-[#FFFDF9] p-5 text-center shadow-[0_4px_16px_rgba(51,42,39,0.06)]">
          <span className="inline-block rounded-full bg-[#A8B5A0]/25 px-3 py-0.5 font-serif text-[0.55rem] uppercase tracking-[0.24em] text-[#7B866D] font-medium mb-2.5">
            {reception.tag}
          </span>

          <h3 className="font-serif text-[1.25rem] sm:text-[1.4rem] font-normal text-[#332A27] tracking-wide">
            {reception.title}
          </h3>

          <div className="mt-2 text-[#5A4E4A]">
            <time className="block font-serif text-[0.92rem] sm:text-[0.98rem] font-medium text-[#332A27]">
              {reception.dateFormatted}
            </time>
            <span className="block font-sans text-[0.76rem] text-[#C5A66A] mt-0.5 font-normal tracking-wide">
              {reception.time}
            </span>
          </div>

          <div
            className="my-3 h-[0.5px] w-14 bg-[#C5A66A]/30 mx-auto"
            aria-hidden="true"
          />

          <address className="not-italic font-serif text-[0.78rem] text-[#5A4E4A] leading-relaxed">
            <strong className="block text-[#332A27] font-medium">
              {reception.venueName}
            </strong>
            <span className="block text-[#7B866D] text-[0.74rem]">
              {reception.venueAddress}
            </span>
          </address>

          <p className="mt-3 font-sans text-[0.7rem] text-[#7B866D] italic">
            {reception.description}
          </p>
        </div>

        {/* EVENT 2: Traditional Ceremony (Thalikettu) */}
        <div className="relative z-10 mb-6 rounded-[5px] border border-[#7B866D]/25 bg-[#FAF6EF] p-5 text-center shadow-[0_2px_12px_rgba(51,42,39,0.04)]">
          <span className="inline-block rounded-full bg-[#D7AAA6]/25 px-3 py-0.5 font-serif text-[0.55rem] uppercase tracking-[0.24em] text-[#8F6F33] font-medium mb-2.5">
            {ceremony.tag}
          </span>

          <h3 className="font-serif text-[1.22rem] sm:text-[1.35rem] font-normal text-[#332A27] tracking-wider uppercase">
            {ceremony.ritual}
          </h3>

          <p className="font-serif text-[0.84rem] text-[#332A27] mt-1 font-medium tracking-wide">
            Muhurtam: {ceremony.muhurtam}
          </p>

          <address className="not-italic font-serif text-[0.78rem] text-[#5A4E4A] mt-2 leading-relaxed">
            <strong className="block text-[#332A27] font-medium">
              {ceremony.venueName}
            </strong>
            <span className="block text-[#7B866D] text-[0.74rem]">
              {ceremony.venueAddress}
            </span>
          </address>

          {/* Explicit Unconfirmed Date Badge */}
          <div className="mt-3.5 inline-flex items-center gap-1.5 rounded-[3px] border border-[#C5A66A]/35 bg-[#FFFDF9] px-3 py-1 text-[0.62rem] text-[#8F6F33] font-serif">
            <span className="text-[0.55rem] text-[#C5A66A]">ℹ</span>
            <span>Ceremony Date: {ceremony.dateStatus}</span>
          </div>

          <p className="mt-3 font-sans text-[0.7rem] text-[#7B866D] italic">
            {ceremony.description}
          </p>
        </div>

        {/* Host & Family Details */}
        <div className="relative z-10 pt-4 border-t border-[#C5A66A]/25 text-center">
          {/* Host */}
          <div className="mb-4">
            <span className="font-serif text-[0.56rem] uppercase tracking-[0.28em] text-[#7B866D] block mb-1">
              {host.label}
            </span>
            <p className="font-serif text-[0.88rem] text-[#332A27] font-medium">
              {host.name}
            </p>
            <p className="font-serif text-[0.7rem] text-[#7B866D] italic">
              {host.relation}
            </p>
            <address className="not-italic font-serif text-[0.7rem] text-[#5A4E4A] max-w-[280px] mx-auto mt-1 leading-snug">
              {host.address}
            </address>

            {/* Clickable Phone Number */}
            <div className="mt-2.5">
              <a
                href={host.contactTel}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#C5A66A]/40 bg-[#FFFDF9] px-3.5 py-1 text-[0.7rem] font-serif text-[#332A27] shadow-sm transition hover:bg-[#C5A66A] hover:text-[#FFFDF9]"
                aria-label={`Call host at ${host.contactNumber}`}
              >
                <span aria-hidden="true">📞</span>
                <span>{host.contactNumber}</span>
              </a>
            </div>
          </div>

          {/* Bride Family */}
          <div className="pt-3 border-t border-[#C5A66A]/20">
            <span className="font-serif text-[0.54rem] uppercase tracking-[0.26em] text-[#7B866D] block mb-0.5">
              {family.label}
            </span>
            <p className="font-serif text-[0.8rem] text-[#332A27]">
              <span className="italic text-[#C5A66A] mr-1">
                {family.relationPrefix}
              </span>
              <strong className="font-medium">{family.parentsName}</strong>
            </p>
            <address className="not-italic font-serif text-[0.68rem] text-[#7B866D] max-w-[280px] mx-auto mt-0.5 leading-snug">
              {family.address}
            </address>
          </div>

          {/* Compliments */}
          <div className="mt-4 pt-3 border-t border-[#C5A66A]/20">
            <p className="font-serif text-[0.7rem] sm:text-[0.76rem] italic tracking-wide text-[#5A4E4A]">
              &ldquo;{compliments}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
