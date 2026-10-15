import confetti from "canvas-confetti";

export function fireGoldenCelebration() {
  if (typeof window === "undefined") return;

  // Custom luxury wedding color palette: champagne gold, soft ivory, rose gold
  const colors = ["#DFC896", "#C5A66A", "#F7F1E8", "#D7AAA6", "#EED7D5"];

  // Burst 1: Center soft starburst
  confetti({
    particleCount: 45,
    spread: 70,
    origin: { y: 0.65 },
    colors: colors,
    shapes: ["circle"],
    scalar: 0.9,
    ticks: 220,
    gravity: 0.85,
  });

  // Burst 2: Left gentle shower
  setTimeout(() => {
    confetti({
      particleCount: 25,
      angle: 60,
      spread: 55,
      origin: { x: 0.15, y: 0.7 },
      colors: colors,
      scalar: 0.8,
      ticks: 200,
    });
  }, 180);

  // Burst 3: Right gentle shower
  setTimeout(() => {
    confetti({
      particleCount: 25,
      angle: 120,
      spread: 55,
      origin: { x: 0.85, y: 0.7 },
      colors: colors,
      scalar: 0.8,
      ticks: 200,
    });
  }, 320);
}
