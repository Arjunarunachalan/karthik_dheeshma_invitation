"use client";

import Image from "next/image";
import { invitationData as defaultData } from "../../data/invitation";

export default function VenueSection({ data = defaultData }) {
  const venue = data.venue;

  return (
    <section
      id="venue"
      className="relative w-full max-w-[430px] mx-auto px-4 py-16 bg-[#0d0b0a] text-center"
      aria-label="Auditorium Location and Directions"
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
        <div className="relative z-10 flex flex-col items-center mb-4">
          <div
            className="flex items-center justify-center gap-2 mb-2"
            aria-hidden="true"
          >
            <span className="h-[0.5px] w-8 bg-[#C5A66A]/60" />
            <span className="text-[0.6rem] text-[#C5A66A]">✦</span>
            <span className="h-[0.5px] w-8 bg-[#C5A66A]/60" />
          </div>

          <h2 className="font-serif text-[0.68rem] sm:text-[0.74rem] uppercase tracking-[0.32em] text-[#7B866D] font-medium">
            {venue.heading}
          </h2>

          <p className="script-float font-script text-[1.85rem] sm:text-[2.15rem] text-[#C5A66A] mt-0.5">
            {venue.subheading}
          </p>
        </div>

        {/* Venue Information */}
        <div className="relative z-10 my-3">
          <h3 className="font-serif text-[1.4rem] sm:text-[1.6rem] font-normal text-[#332A27]">
            {venue.venueName}
          </h3>
          <p className="font-serif text-[0.85rem] text-[#7B866D] mt-0.5 font-medium">
            {venue.locality}
          </p>
          <address className="not-italic font-sans text-[0.74rem] text-[#5A4E4A] max-w-[260px] mx-auto mt-2 leading-relaxed">
            {venue.fullAddress}
          </address>
          <p className="font-sans text-[0.72rem] text-[#C5A66A] mt-1.5 font-medium">
            {venue.date} • {venue.time}
          </p>
        </div>

        {/* Interactive Google Maps Embed */}
        <div className="relative z-10 my-5 overflow-hidden rounded-[5px] border border-[#C5A66A]/45 bg-[#FFFDF9] shadow-[0_4px_16px_rgba(51,42,39,0.08)]">
          {venue.embedUrl ? (
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#EDE5D8]">
              <iframe
                src={venue.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Swamy Auditorium Google Maps Location"
                className="w-full h-full border-0"
              />
            </div>
          ) : (
            <div className="relative w-full aspect-[3/2] overflow-hidden">
              <Image
                src={venue.mapPreviewImage}
                alt="Swamy Auditorium Architectural Sketch"
                fill
                className="object-cover"
                sizes="(max-width: 430px) 100vw, 360px"
              />
            </div>
          )}

          {/* Confirmed Auditorium Location Badge */}
          <div className="border-t border-[#C5A66A]/20 bg-[#FAF6EF] p-2.5 text-center flex items-center justify-center gap-1.5">
            <span className="text-[0.65rem] text-[#7B866D]">✓</span>
            <span className="font-serif text-[0.62rem] uppercase tracking-wider text-[#7B866D] font-medium">
              {venue.demoLabel}
            </span>
          </div>
        </div>

        {/* Action Buttons: Get Directions & Open in Google Maps */}
        <div className="relative z-10 flex flex-col gap-2.5 max-w-[280px] mx-auto mt-4">
          <a
            href={venue.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-[4px] border border-[#C5A66A] bg-[#C5A66A] px-4 py-2.5 font-serif text-[0.72rem] uppercase tracking-[0.22em] text-[#FFFDF9] shadow-sm transition hover:bg-[#8F6F33] active:scale-[0.98]"
          >
            <span>📍 Get Directions (Google Maps)</span>
          </a>

          <a
            href={venue.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-[4px] border border-[#C5A66A]/40 bg-[#FFFDF9] px-4 py-2 font-serif text-[0.68rem] uppercase tracking-[0.2em] text-[#332A27] transition hover:bg-[#FAF6EF] active:scale-[0.98]"
          >
            <span>Open in Maps App</span>
          </a>
        </div>
      </div>
    </section>
  );
}
