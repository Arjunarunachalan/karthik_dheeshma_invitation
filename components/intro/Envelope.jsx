"use client";

import WaxSeal from "./WaxSeal";

export default function Envelope({
  envelopeRef,
  backRef,
  pocketRef,
  flapRef,
  innerRef,
  cardRef,
  sealRef,
  fragmentARef,
  fragmentBRef,
  fragmentCRef,
  fragmentDRef,
  initialARef,
  ampersandRef,
  initialRRef,
  subtitleRef,
  dividerRef,
  inviteTextRef,
  detailsRef,
  invitation,
  isOpening = false,
}) {
  const [leftInitial, rightInitial] = invitation.initials.split("&").map((part) => part.trim());

  return (
    <div className="envelope-stage w-[84%] max-w-[325px] relative">
      <div
        ref={envelopeRef}
        className="envelope envelope-shadow relative mx-auto aspect-[4/5] w-full will-change-transform"
      >
        {/* Layer 1: Back wall of envelope */}
        <div ref={backRef} className="envelope-back paper-ivory" />

        {/* Layer 2: Inner luxury lining */}
        <div ref={innerRef} className="envelope-inner" />

        {/* Layer 3: Flap (folds open backwards around top hinge) */}
        <div
          ref={flapRef}
          className="envelope-flap paper-ivory z-20 will-change-transform"
        />

        {/* Layer 4: The Invitation Card (rests inside, slides UP) */}
        <article
          ref={cardRef}
          className="invitation-sheet paper-ivory absolute left-[6%] right-[6%] top-[10%] h-[80%] z-10 flex flex-col items-center justify-between px-5 py-6 text-center will-change-transform"
        >
          {/* Subtle gold double hairline frame */}
          <div className="invitation-inner-border absolute inset-[7px] pointer-events-none rounded-[2px]" />

          {/* Top header */}
          <div className="relative z-10 flex flex-col items-center pt-2">
            <span
              ref={subtitleRef}
              className="font-serif text-[0.58rem] sm:text-[0.62rem] uppercase tracking-[0.32em] text-[#6b5e51]"
            >
              {invitation.subtitle}
            </span>
          </div>

          {/* Center: Foil-pressed Monogram Initials */}
          <div className="relative z-10 my-auto flex items-baseline justify-center gap-2.5 text-[#1a1613]">
            <span
              ref={initialARef}
              className="font-serif leading-none tracking-tight text-[#1a1613] drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]"
              style={{ fontSize: "clamp(2.8rem, 24cqi, 3.8rem)" }}
            >
              {leftInitial}
            </span>
            <span
              ref={ampersandRef}
              className="font-serif italic text-[#a88955] drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]"
              style={{ fontSize: "clamp(1.35rem, 12cqi, 1.85rem)" }}
            >
              &
            </span>
            <span
              ref={initialRRef}
              className="font-serif leading-none tracking-tight text-[#1a1613] drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]"
              style={{ fontSize: "clamp(2.8rem, 24cqi, 3.8rem)" }}
            >
              {rightInitial}
            </span>
          </div>

          {/* Bottom invitation text & details */}
          <div className="relative z-10 flex flex-col items-center pb-2">
            {/* Elegant antique gold divider */}
            <div
              ref={dividerRef}
              className="mb-3 flex items-center justify-center gap-2 opacity-0"
            >
              <span className="h-[0.5px] w-8 bg-[#a88955]/40" />
              <span className="text-[0.5rem] text-[#a88955]">◆</span>
              <span className="h-[0.5px] w-8 bg-[#a88955]/40" />
            </div>

            <p
              ref={inviteTextRef}
              className="font-serif text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.22em] text-[#2c241e]"
            >
              {invitation.invitationText}
            </p>

            <p
              ref={detailsRef}
              className="mt-2 font-serif text-[0.54rem] sm:text-[0.58rem] uppercase tracking-[0.26em] text-[#6b5e51]"
            >
              {invitation.dateText || "25 · 11 · 2026 • PALAKKAD"}
            </p>
          </div>
        </article>

        {/* Layer 5: Envelope Front Pocket (covers lower half of card) */}
        <div ref={pocketRef} className="envelope-pocket z-15 paper-ivory pointer-events-none" />

        {/* Layer 6: Wax Seal (seals the flap apex to the pocket) */}
        <div className="absolute left-1/2 top-[48%] z-30 -translate-x-1/2 -translate-y-1/2">
          {/* Delicate Perched Butterfly that takes off when opened */}
          <div
            className={`perched-butterfly absolute -top-4 -right-4 z-40 pointer-events-none transition-all duration-1000 ${
              isOpening
                ? "translate-x-16 -translate-y-36 scale-125 opacity-0 rotate-45"
                : "opacity-95"
            }`}
            aria-hidden="true"
          >
            <div className="relative w-7 h-6" style={{ perspective: "600px" }}>
              <svg viewBox="0 0 60 50" className="w-full h-full overflow-visible">
                <g className={`origin-[30px_25px] ${isOpening ? "animate-flap-fast" : "animate-perched-breathe"}`}>
                  <path
                    d="M30 25 C24 10 10 4 2 12 C-4 20 2 36 28 27 Z"
                    fill="url(#sealBfGrad)"
                    stroke="#8F6F33"
                    strokeWidth="0.8"
                  />
                  <path
                    d="M30 25 C36 10 50 4 58 12 C64 20 58 36 32 27 Z"
                    fill="url(#sealBfGrad)"
                    stroke="#8F6F33"
                    strokeWidth="0.8"
                  />
                  <ellipse cx="30" cy="25" rx="1.5" ry="5" fill="#332A27" />
                  <defs>
                    <linearGradient id="sealBfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFDF9" />
                      <stop offset="50%" stopColor="#DFC896" />
                      <stop offset="100%" stopColor="#8F6F33" />
                    </linearGradient>
                  </defs>
                </g>
              </svg>
            </div>
          </div>

          <WaxSeal
            sealRef={sealRef}
            fragmentARef={fragmentARef}
            fragmentBRef={fragmentBRef}
            fragmentCRef={fragmentCRef}
            fragmentDRef={fragmentDRef}
            initials={invitation.initials || "K & D"}
          />
        </div>
      </div>
    </div>
  );
}
