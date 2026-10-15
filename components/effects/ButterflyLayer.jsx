"use client";

import { useEffect, useState, useRef, useId, useCallback } from "react";
import { fireGoldenCelebration } from "../../animations/confetti";

// Individual 3D Fluttering Butterfly Component with realistic layered wings
function FlutterButterfly({
  size = 42,
  color = "gold",
  speed = "0.34s",
  style = {},
  className = "",
  onClick,
  isTapped = false,
}) {
  const uniqueId = useId();
  const colorMap = {
    gold: {
      forewingGrad: ["#FFFDF9", "#DFC896", "#C5A66A", "#8F6F33"],
      hindwingGrad: ["#DFC896", "#B89858", "#594116"],
      vein: "#6A4F1E",
      body: "#2A211D",
      glow: "rgba(197, 166, 106, 0.55)",
      sparkle: "#FFEBB2",
    },
    rose: {
      forewingGrad: ["#FFF9F8", "#EED7D5", "#D7AAA6", "#A86F6B"],
      hindwingGrad: ["#EED7D5", "#C89591", "#6E4441"],
      vein: "#8B5753",
      body: "#2A211D",
      glow: "rgba(215, 170, 166, 0.55)",
      sparkle: "#FFDFDC",
    },
    emerald: {
      forewingGrad: ["#F6FAF4", "#D4DDD0", "#A8B5A0", "#5C6A52"],
      hindwingGrad: ["#D4DDD0", "#8E9E84", "#43523B"],
      vein: "#4A5A40",
      body: "#2A211D",
      glow: "rgba(168, 181, 160, 0.55)",
      sparkle: "#E0EED9",
    },
    champagne: {
      forewingGrad: ["#FFFFFF", "#F7E7CE", "#E5C287", "#A47E43"],
      hindwingGrad: ["#F7E7CE", "#CFA259", "#785623"],
      vein: "#7A5726",
      body: "#2A211D",
      glow: "rgba(229, 194, 135, 0.6)",
      sparkle: "#FFF5E1",
    },
  };

  const c = colorMap[color] || colorMap.gold;
  const gradId = `bf-grad-${color}-${uniqueId.replace(/:/g, "")}`;

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Interactive ${color} butterfly`}
      className={`butterfly-3d-wrapper relative select-none cursor-pointer transition-transform duration-300 ${
        isTapped ? "butterfly-tap-loop" : ""
      } ${className}`}
      style={{
        width: `${size}px`,
        height: `${size * 0.8}px`,
        perspective: "900px",
        filter: `drop-shadow(0 6px 12px ${c.glow})`,
        ...style,
      }}
    >
      <div
        className="butterfly-body-container relative w-full h-full flex items-center justify-center pointer-events-auto"
        style={{ transformStyle: "preserve-3d" }}
      >
        <svg
          viewBox="0 0 100 80"
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        >
          <defs>
            <linearGradient id={`${gradId}-fw`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={c.forewingGrad[0]} stopOpacity="0.95" />
              <stop offset="35%" stopColor={c.forewingGrad[1]} stopOpacity="0.88" />
              <stop offset="70%" stopColor={c.forewingGrad[2]} stopOpacity="0.82" />
              <stop offset="100%" stopColor={c.forewingGrad[3]} stopOpacity="0.92" />
            </linearGradient>
            <linearGradient id={`${gradId}-hw`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={c.hindwingGrad[0]} stopOpacity="0.92" />
              <stop offset="55%" stopColor={c.hindwingGrad[1]} stopOpacity="0.86" />
              <stop offset="100%" stopColor={c.hindwingGrad[2]} stopOpacity="0.92" />
            </linearGradient>
            {/* Shimmer Highlight on wing upper crest */}
            <linearGradient id={`${gradId}-shimmer`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Left Wing Assembly (Pivots smoothly at x=50, y=40) */}
          <g
            className="butterfly-wing-left origin-[50px_40px]"
            style={{ animationDuration: speed }}
          >
            {/* Left Forewing */}
            <path
              d="M50 38 C40 14 16 4 4 16 C-6 28 2 54 48 40 Z"
              fill={`url(#${gradId}-fw)`}
              stroke={c.vein}
              strokeWidth="0.85"
            />
            {/* Soft Upper Shimmer */}
            <path
              d="M50 38 C42 16 22 8 8 18"
              stroke={`url(#${gradId}-shimmer)`}
              strokeWidth="1.2"
              fill="none"
              opacity="0.8"
            />
            {/* Wing Vein Details */}
            <path
              d="M48 38 Q30 22 14 20 M48 38 Q24 32 12 36 M48 38 Q32 42 22 46"
              stroke={c.vein}
              strokeWidth="0.55"
              fill="none"
              opacity="0.65"
            />
            {/* Left Hindwing */}
            <path
              d="M48 40 C38 48 14 66 10 52 C6 38 30 36 48 40 Z"
              fill={`url(#${gradId}-hw)`}
              stroke={c.vein}
              strokeWidth="0.85"
            />
            <path
              d="M48 40 Q28 48 18 54 M48 40 Q34 56 24 58"
              stroke={c.vein}
              strokeWidth="0.55"
              fill="none"
              opacity="0.6"
            />
          </g>

          {/* Right Wing Assembly (Pivots smoothly at x=50, y=40) */}
          <g
            className="butterfly-wing-right origin-[50px_40px]"
            style={{ animationDuration: speed }}
          >
            {/* Right Forewing */}
            <path
              d="M50 38 C60 14 84 4 96 16 C106 28 98 54 52 40 Z"
              fill={`url(#${gradId}-fw)`}
              stroke={c.vein}
              strokeWidth="0.85"
            />
            {/* Soft Upper Shimmer */}
            <path
              d="M50 38 C58 16 78 8 92 18"
              stroke={`url(#${gradId}-shimmer)`}
              strokeWidth="1.2"
              fill="none"
              opacity="0.8"
            />
            {/* Wing Vein Details */}
            <path
              d="M52 38 Q70 22 86 20 M52 38 Q76 32 88 36 M52 38 Q68 42 78 46"
              stroke={c.vein}
              strokeWidth="0.55"
              fill="none"
              opacity="0.65"
            />
            {/* Right Hindwing */}
            <path
              d="M52 40 C62 48 86 66 90 52 C94 38 70 36 52 40 Z"
              fill={`url(#${gradId}-hw)`}
              stroke={c.vein}
              strokeWidth="0.85"
            />
            <path
              d="M52 40 Q72 48 82 54 M52 40 Q66 56 76 58"
              stroke={c.vein}
              strokeWidth="0.55"
              fill="none"
              opacity="0.6"
            />
          </g>

          {/* Slender Butterfly Body, Head & Antennae with Diamond Crest */}
          <g fill={c.body} stroke={c.body}>
            <ellipse cx="50" cy="40" rx="1.9" ry="8.5" />
            <circle cx="50" cy="29.5" r="1.7" />
            {/* Antennae */}
            <path
              d="M49 29 Q42 19 36 17 M51 29 Q58 19 64 17"
              strokeWidth="0.85"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="36" cy="17" r="1" fill={c.sparkle} />
            <circle cx="64" cy="17" r="1" fill={c.sparkle} />
          </g>
        </svg>

        {/* Ambient Golden Fairy Dust Halo */}
        <div
          className="butterfly-glow absolute inset-0 rounded-full pointer-events-none opacity-45 blur-[3px]"
          style={{ background: c.glow }}
        />
      </div>
    </div>
  );
}

export default function ButterflyLayer() {
  const [isReduced, setIsReduced] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  const [scrollY, setScrollY] = useState(0);
  const [tappedId, setTappedId] = useState(null);
  const [butterfliesBurst, setButterfliesBurst] = useState(false);
  const layerRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => setIsReduced(e.matches);
    mq.addEventListener("change", handler);

    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      mq.removeEventListener("change", handler);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleTap = useCallback((id) => {
    setTappedId(id);
    fireGoldenCelebration();
    setTimeout(() => {
      setTappedId(null);
    }, 1200);
  }, []);

  const handleBurstTrigger = useCallback(() => {
    setButterfliesBurst(true);
    fireGoldenCelebration();
    setTimeout(() => {
      setButterfliesBurst(false);
    }, 4000);
  }, []);

  if (isReduced) {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute right-6 top-32 opacity-25">
          <FlutterButterfly size={26} color="gold" />
        </div>
      </div>
    );
  }

  // Scroll factor calculations for fluid 3D flight paths across sections
  const scrollOffset1 = (scrollY * 0.24) % 1000;
  const scrollOffset2 = (scrollY * 0.18) % 1200;
  const scrollOffset3 = (scrollY * 0.3) % 1100;
  const scrollOffset4 = (scrollY * 0.15) % 900;

  return (
    <div
      ref={layerRef}
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Golden Monarch Butterfly (Upper Viewport: drifts across hero & couple heading) */}
      <div
        className="butterfly-path-1 absolute pointer-events-auto"
        style={{
          left: "5%",
          top: "18%",
          transform: `translate3d(${Math.sin(scrollY * 0.005) * 50}px, ${-scrollOffset1 * 0.35}px, 0) rotate(${
            -12 + Math.cos(scrollY * 0.006) * 16
          }deg)`,
          transition: "transform 0.25s ease-out",
        }}
      >
        <FlutterButterfly
          size={42}
          color="gold"
          speed="0.32s"
          isTapped={tappedId === 1}
          onClick={() => handleTap(1)}
        />
      </div>

      {/* 2. Soft Blush Rose Butterfly (Gliding gracefully around couple editorial) */}
      <div
        className="butterfly-path-2 absolute pointer-events-auto"
        style={{
          right: "7%",
          top: "42%",
          transform: `translate3d(${-Math.cos(scrollY * 0.004) * 45}px, ${-scrollOffset2 * 0.3}px, 0) rotate(${
            16 + Math.sin(scrollY * 0.005) * 18
          }deg)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <FlutterButterfly
          size={36}
          color="rose"
          speed="0.36s"
          isTapped={tappedId === 2}
          onClick={() => handleTap(2)}
        />
      </div>

      {/* 3 & 4. Twin Love Butterflies (Karthik & Dheeshma) circling in infinity harmony */}
      <div
        className="butterfly-path-twin-karthik absolute pointer-events-auto"
        style={{
          left: "18%",
          top: "58%",
          transform: `translate3d(${Math.sin(scrollY * 0.006) * 36}px, ${
            Math.cos(scrollY * 0.006) * 20 - scrollOffset3 * 0.28
          }px, 0) rotate(${-6 + Math.sin(scrollY * 0.005) * 22}deg)`,
          transition: "transform 0.28s ease-out",
        }}
      >
        <FlutterButterfly
          size={32}
          color="champagne"
          speed="0.3s"
          isTapped={tappedId === 3}
          onClick={() => handleTap(3)}
        />
      </div>

      <div
        className="butterfly-path-twin-dheeshma absolute pointer-events-auto"
        style={{
          left: "26%",
          top: "62%",
          transform: `translate3d(${-Math.sin(scrollY * 0.006) * 36}px, ${
            -Math.cos(scrollY * 0.006) * 20 - scrollOffset3 * 0.28
          }px, 0) rotate(${12 - Math.sin(scrollY * 0.005) * 22}deg)`,
          transition: "transform 0.28s ease-out",
        }}
      >
        <FlutterButterfly
          size={28}
          color="rose"
          speed="0.33s"
          isTapped={tappedId === 4}
          onClick={() => handleTap(4)}
        />
      </div>

      {/* 5. Soft Emerald / Sage Butterfly (Fluttering playfully near Muhurtham / Venue) */}
      <div
        className="butterfly-path-5 absolute pointer-events-auto"
        style={{
          left: "12%",
          top: "76%",
          transform: `translate3d(${Math.sin(scrollY * 0.006) * 42}px, ${-scrollOffset4 * 0.32}px, 0) rotate(${
            -8 + Math.cos(scrollY * 0.004) * 14
          }deg)`,
          transition: "transform 0.28s ease-out",
        }}
      >
        <FlutterButterfly
          size={30}
          color="emerald"
          speed="0.29s"
          isTapped={tappedId === 5}
          onClick={() => handleTap(5)}
        />
      </div>

      {/* 6. Champagne Stardust Flutterer (Gliding near Photo Gallery and Download card) */}
      <div
        className="butterfly-path-6 absolute pointer-events-auto"
        style={{
          right: "10%",
          top: "86%",
          transform: `translate3d(${Math.cos(scrollY * 0.005) * 35}px, ${-scrollOffset1 * 0.26}px, 0) rotate(${
            20 + Math.cos(scrollY * 0.005) * 15
          }deg)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <FlutterButterfly
          size={34}
          color="gold"
          speed="0.34s"
          isTapped={tappedId === 6}
          onClick={() => handleTap(6)}
        />
      </div>

      {/* Extra Celebration Swarm Burst when triggered */}
      {butterfliesBurst && (
        <>
          <div className="absolute left-[30%] top-[40%] animate-fly-up pointer-events-none">
            <FlutterButterfly size={36} color="gold" speed="0.25s" />
          </div>
          <div className="absolute right-[30%] top-[45%] animate-fly-up-delay-1 pointer-events-none">
            <FlutterButterfly size={32} color="rose" speed="0.28s" />
          </div>
          <div className="absolute left-[45%] top-[50%] animate-fly-up-delay-2 pointer-events-none">
            <FlutterButterfly size={28} color="champagne" speed="0.24s" />
          </div>
        </>
      )}

      {/* Interactive Floating Butterfly Magic Button */}
      <div className="fixed bottom-6 left-5 z-40 pointer-events-auto">
        <button
          onClick={handleBurstTrigger}
          className="group flex items-center gap-1.5 rounded-full border border-[#C5A66A]/50 bg-[#1A1613]/85 px-3 py-1.5 text-[0.68rem] font-serif uppercase tracking-[0.16em] text-[#DFC896] backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.45)] transition-all duration-300 hover:scale-105 hover:border-[#C5A66A] hover:bg-[#1A1613] hover:text-[#FFFDF9] active:scale-95 focus:outline-none"
          title="Release butterflies and fairy sparkles"
        >
          <span className="text-[0.75rem] transition-transform duration-300 group-hover:rotate-45">
            🦋
          </span>
          <span className="hidden sm:inline">Butterflies</span>
          <span className="text-[0.55rem] text-[#C5A66A]">✦</span>
        </button>
      </div>

      {/* CSS 3D Wing Flap and Flight Keyframe Styles */}
      <style jsx global>{`
        /* Authentic 3D Wing Flapping using perspective rotateY */
        @keyframes flapLeftWing {
          0%,
          100% {
            transform: rotateY(0deg) rotateZ(0deg);
          }
          50% {
            transform: rotateY(-72deg) rotateZ(-6deg);
          }
        }

        @keyframes flapRightWing {
          0%,
          100% {
            transform: rotateY(0deg) rotateZ(0deg);
          }
          50% {
            transform: rotateY(72deg) rotateZ(6deg);
          }
        }

        .butterfly-wing-left {
          animation: flapLeftWing linear infinite;
          transform-style: preserve-3d;
        }

        .butterfly-wing-right {
          animation: flapRightWing linear infinite;
          transform-style: preserve-3d;
        }

        /* Ambient floating hover effect when hovering a butterfly */
        .butterfly-3d-wrapper:hover {
          filter: drop-shadow(0 8px 18px rgba(223, 200, 150, 0.85)) !important;
          transform: scale(1.18) !important;
        }

        /* 360-degree aerial loop when tapped */
        @keyframes butterflyTapLoop {
          0% {
            transform: scale(1) rotate(0deg);
          }
          40% {
            transform: scale(1.35) translateY(-35px) rotate(-180deg);
          }
          75% {
            transform: scale(1.2) translateY(-15px) rotate(-320deg);
          }
          100% {
            transform: scale(1) translateY(0) rotate(-360deg);
          }
        }

        .butterfly-tap-loop {
          animation: butterflyTapLoop 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards !important;
        }

        /* Burst flight animations */
        @keyframes flyUp {
          0% {
            transform: translate3d(0, 0, 0) scale(0.6);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate3d(-60px, -220px, 0) scale(1.2);
            opacity: 0;
          }
        }

        .animate-fly-up {
          animation: flyUp 3.2s cubic-bezier(0.2, 0.8, 0.4, 1) forwards;
        }

        .animate-fly-up-delay-1 {
          animation: flyUp 3.5s 0.25s cubic-bezier(0.2, 0.8, 0.4, 1) forwards;
        }

        .animate-fly-up-delay-2 {
          animation: flyUp 3.8s 0.5s cubic-bezier(0.2, 0.8, 0.4, 1) forwards;
        }
      `}</style>
    </div>
  );
}
