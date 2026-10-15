"use client";

const PARTICLES = [
  { left: "8%", top: "18%", size: 1.5, opacity: 0.18 },
  { left: "16%", top: "72%", size: 1, opacity: 0.12 },
  { left: "22%", top: "41%", size: 2, opacity: 0.16 },
  { left: "31%", top: "12%", size: 1, opacity: 0.1 },
  { left: "38%", top: "86%", size: 1.5, opacity: 0.14 },
  { left: "47%", top: "28%", size: 1, opacity: 0.11 },
  { left: "54%", top: "63%", size: 2, opacity: 0.15 },
  { left: "61%", top: "9%", size: 1, opacity: 0.09 },
  { left: "68%", top: "48%", size: 1.5, opacity: 0.13 },
  { left: "74%", top: "81%", size: 1, opacity: 0.1 },
  { left: "81%", top: "22%", size: 2, opacity: 0.14 },
  { left: "87%", top: "57%", size: 1, opacity: 0.11 },
  { left: "12%", top: "54%", size: 1, opacity: 0.08 },
  { left: "93%", top: "36%", size: 1.5, opacity: 0.12 },
  { left: "5%", top: "91%", size: 1, opacity: 0.09 },
  { left: "43%", top: "6%", size: 1, opacity: 0.1 },
  { left: "27%", top: "96%", size: 1.5, opacity: 0.11 },
  { left: "76%", top: "4%", size: 1, opacity: 0.08 },
  { left: "58%", top: "93%", size: 1, opacity: 0.1 },
  { left: "35%", top: "33%", size: 1.5, opacity: 0.12 },
];

export default function IntroParticles({ particlesRef, reducedMotion }) {
  if (reducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {PARTICLES.map((particle, index) => (
        <span
          key={`${particle.left}-${particle.top}`}
          ref={(node) => {
            if (!particlesRef?.current) return;
            particlesRef.current[index] = node;
          }}
          className="intro-particle"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  );
}
