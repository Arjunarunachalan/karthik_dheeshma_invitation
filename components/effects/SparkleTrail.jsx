"use client";

import { useEffect, useRef } from "react";

export default function SparkleTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Respect user motion preferences
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize, { passive: true });

    const particles = [];
    const maxParticles = 45;
    const colors = [
      "#FFFFFF",
      "#FFFDF9",
      "#DFC896",
      "#C5A66A",
      "#EED7D5",
      "#F3E5AB",
    ];

    const addParticle = (x, y) => {
      if (particles.length >= maxParticles) {
        particles.shift();
      }
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 - 0.6,
          size: Math.random() * 2.8 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.025 + 0.02,
          spin: Math.random() * 0.2 - 0.1,
          angle: Math.random() * Math.PI * 2,
        });
      }
    };

    let lastMoveTime = 0;
    const handleMove = (x, y) => {
      const now = performance.now();
      if (now - lastMoveTime > 35) {
        addParticle(x, y);
        lastMoveTime = now;
      }
    };

    const onPointerMove = (e) => {
      handleMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    let animationFrameId;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.angle += p.spin;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        // Draw 4-point golden star sparkle
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;

        ctx.beginPath();
        const s = p.size;
        ctx.moveTo(0, -s * 2);
        ctx.quadraticCurveTo(0, 0, s * 2, 0);
        ctx.quadraticCurveTo(0, 0, 0, s * 2);
        ctx.quadraticCurveTo(0, 0, -s * 2, 0);
        ctx.quadraticCurveTo(0, 0, 0, -s * 2);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      aria-hidden="true"
    />
  );
}
