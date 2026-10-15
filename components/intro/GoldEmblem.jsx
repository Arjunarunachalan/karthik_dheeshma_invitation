export default function GoldEmblem({
  emblemRef,
  leftInitial = "K",
  rightInitial = "D",
}) {
  return (
    <div
      ref={emblemRef}
      className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center opacity-0"
      aria-hidden="true"
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Soft atmospheric ambient gold glow */}
        <div
          className="absolute -inset-8 rounded-full blur-2xl pointer-events-none opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(168, 137, 85, 0.35) 0%, rgba(168, 137, 85, 0) 70%)",
          }}
        />

        <svg
          viewBox="0 0 180 180"
          className="h-32 w-32 md:h-36 md:w-36 text-[#a88955] drop-shadow-[0_2px_12px_rgba(168,137,85,0.25)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle outer dashed/dotted ring */}
          <circle
            cx="90"
            cy="90"
            r="82"
            stroke="url(#emblem-gold-gradient)"
            strokeWidth="0.75"
            strokeDasharray="2 4"
            opacity="0.6"
          />

          {/* Thin inner solid ring */}
          <circle
            cx="90"
            cy="90"
            r="75"
            stroke="url(#emblem-gold-gradient)"
            strokeWidth="1"
            opacity="0.85"
          />

          {/* Innermost hairline ring */}
          <circle
            cx="90"
            cy="90"
            r="67"
            stroke="url(#emblem-gold-gradient)"
            strokeWidth="0.5"
            opacity="0.45"
          />

          {/* Cardinal diamond accents */}
          <path d="M 90 10 L 92.5 13 L 90 16 L 87.5 13 Z" fill="#c5a869" opacity="0.9" />
          <path d="M 90 164 L 92.5 167 L 90 170 L 87.5 167 Z" fill="#c5a869" opacity="0.9" />
          <path d="M 10 90 L 13 92.5 L 16 90 L 13 87.5 Z" fill="#c5a869" opacity="0.9" />
          <path d="M 164 90 L 167 92.5 L 170 90 L 167 87.5 Z" fill="#c5a869" opacity="0.9" />

          {/* Delicate botanical laurel arcs */}
          <g stroke="url(#emblem-gold-gradient)" strokeWidth="0.75" fill="none" opacity="0.7">
            {/* Left arc */}
            <path d="M 45 90 C 45 62 64 36 86 32" strokeLinecap="round" />
            <path d="M 45 90 C 45 118 64 144 86 148" strokeLinecap="round" />
            {/* Left leaves */}
            <path d="M 49 58 Q 42 53 45 47 Q 52 50 49 58 Z" fill="#a88955" fillOpacity="0.3" />
            <path d="M 44 76 Q 37 72 40 66 Q 47 69 44 76 Z" fill="#a88955" fillOpacity="0.3" />
            <path d="M 44 104 Q 37 108 40 114 Q 47 111 44 104 Z" fill="#a88955" fillOpacity="0.3" />
            <path d="M 49 122 Q 42 127 45 133 Q 52 130 49 122 Z" fill="#a88955" fillOpacity="0.3" />

            {/* Right arc */}
            <path d="M 135 90 C 135 62 116 36 94 32" strokeLinecap="round" />
            <path d="M 135 90 C 135 118 116 144 94 148" strokeLinecap="round" />
            {/* Right leaves */}
            <path d="M 131 58 Q 138 53 135 47 Q 128 50 131 58 Z" fill="#a88955" fillOpacity="0.3" />
            <path d="M 136 76 Q 143 72 140 66 Q 133 69 136 76 Z" fill="#a88955" fillOpacity="0.3" />
            <path d="M 136 104 Q 143 108 140 114 Q 133 111 136 104 Z" fill="#a88955" fillOpacity="0.3" />
            <path d="M 131 122 Q 138 127 135 133 Q 128 130 131 122 Z" fill="#a88955" fillOpacity="0.3" />
          </g>

          {/* Monogram */}
          <text
            x="76"
            y="96"
            textAnchor="middle"
            fontFamily="var(--font-cormorant), Cormorant Garamond, Georgia, serif"
            fontSize="32"
            fontWeight="500"
            fill="url(#emblem-gold-gradient)"
            letterSpacing="-0.02em"
          >
            {leftInitial}
          </text>
          <text
            x="91"
            y="92"
            textAnchor="middle"
            fontFamily="var(--font-cormorant), Cormorant Garamond, Georgia, serif"
            fontSize="18"
            fontStyle="italic"
            fontWeight="400"
            fill="#d8bf85"
          >
            &
          </text>
          <text
            x="106"
            y="96"
            textAnchor="middle"
            fontFamily="var(--font-cormorant), Cormorant Garamond, Georgia, serif"
            fontSize="32"
            fontWeight="500"
            fill="url(#emblem-gold-gradient)"
            letterSpacing="-0.02em"
          >
            {rightInitial}
          </text>

          {/* Gradients */}
          <defs>
            <linearGradient id="emblem-gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dfca9b" />
              <stop offset="35%" stopColor="#a88955" />
              <stop offset="70%" stopColor="#c5a869" />
              <stop offset="100%" stopColor="#7a5f2e" />
            </linearGradient>
          </defs>
        </svg>

        <span className="mt-4 font-serif text-[0.62rem] uppercase tracking-[0.42em] text-[#a88955] opacity-80">
          Wedding Invitation
        </span>
      </div>
    </div>
  );
}
