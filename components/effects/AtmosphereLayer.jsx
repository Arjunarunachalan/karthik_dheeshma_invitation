"use client";

import { useEffect, useState } from "react";

export default function AtmosphereLayer() {
  const [isReduced, setIsReduced] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => setIsReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (isReduced) return null;

  // Generate deterministic floating particles
  const particles = [
    { id: 1, left: "10%", delay: "0s", dur: "14s", size: 14, type: "petal" },
    { id: 2, left: "25%", delay: "3s", dur: "18s", size: 8, type: "gold" },
    { id: 3, left: "40%", delay: "7s", dur: "16s", size: 16, type: "petal" },
    { id: 4, left: "60%", delay: "1.5s", dur: "20s", size: 10, type: "gold" },
    { id: 5, left: "75%", delay: "5s", dur: "15s", size: 13, type: "petal" },
    { id: 6, left: "88%", delay: "9s", dur: "17s", size: 7, type: "gold" },
    { id: 7, left: "18%", delay: "11s", dur: "19s", size: 15, type: "petal" },
    { id: 8, left: "82%", delay: "4s", dur: "22s", size: 9, type: "gold" },
  ];

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => {
        if (p.type === "petal") {
          return (
            <div
              key={p.id}
              className="atmospheric-petal absolute top-[-50px]"
              style={{
                left: p.left,
                animation: `driftPetal ${p.dur} ease-in-out infinite`,
                animationDelay: p.delay,
              }}
            >
              {/* Organic Soft Rose & Ivory Petal SVG */}
              <svg
                width={p.size}
                height={p.size * 1.3}
                viewBox="0 0 30 40"
                fill="none"
                className="opacity-60"
              >
                <path
                  d="M15 0 C25 10 32 25 22 36 C12 42 2 30 0 20 C-1 10 8 2 15 0 Z"
                  fill="url(#petalGrad)"
                />
                <defs>
                  <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF9F8" stopOpacity="0.85" />
                    <stop offset="50%" stopColor="#EED7D5" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#D7AAA6" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          );
        }

        // Gold dust ember
        return (
          <div
            key={p.id}
            className="atmospheric-gold-dust absolute top-[-20px] rounded-full blur-[0.5px]"
            style={{
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background:
                "radial-gradient(circle, rgba(223, 200, 150, 0.8) 0%, rgba(197, 166, 106, 0.4) 60%, transparent 100%)",
              animation: `driftGold ${p.dur} ease-in-out infinite`,
              animationDelay: p.delay,
            }}
          />
        );
      })}

      <style jsx>{`
        @keyframes driftPetal {
          0% {
            transform: translate3d(0, -40px, 0) rotate(0deg) scale(0.9);
            opacity: 0;
          }
          10% {
            opacity: 0.75;
          }
          50% {
            transform: translate3d(35px, 50vh, 0) rotate(160deg) scale(1);
            opacity: 0.85;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translate3d(-25px, 105vh, 0) rotate(320deg) scale(0.85);
            opacity: 0;
          }
        }

        @keyframes driftGold {
          0% {
            transform: translate3d(0, -20px, 0) scale(0.6);
            opacity: 0;
          }
          15% {
            opacity: 0.7;
          }
          50% {
            transform: translate3d(-20px, 50vh, 0) scale(1.1);
            opacity: 0.85;
          }
          85% {
            opacity: 0.6;
          }
          100% {
            transform: translate3d(25px, 105vh, 0) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
