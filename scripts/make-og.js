const sharp = require("sharp");
const fs = require("fs");

async function createOgBanner() {
  const coupleJpg = await sharp("public/images/couple/couple-real.jpg")
    .resize(520, 630, { fit: "cover", position: "top" })
    .toBuffer();

  const svgOverlay = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#0D0B0A" />
          <stop offset="50%" stop-color="#14100E" />
          <stop offset="70%" stop-color="#14100E" stop-opacity="0.9" />
          <stop offset="100%" stop-color="transparent" />
        </linearGradient>
        <linearGradient id="goldText" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#FFFDF9" />
          <stop offset="60%" stop-color="#DFC896" />
          <stop offset="100%" stop-color="#C5A66A" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="750" height="630" fill="url(#bgGrad)" />

      <!-- Gold double hairline border -->
      <rect x="24" y="24" width="1152" height="582" fill="none" stroke="#C5A66A" stroke-width="1.5" opacity="0.45" rx="6" />
      <rect x="30" y="30" width="1140" height="570" fill="none" stroke="#C5A66A" stroke-width="0.75" opacity="0.3" rx="4" />

      <!-- Header -->
      <text x="75" y="145" font-family="Georgia, serif" font-size="18" letter-spacing="8" fill="#A8B5A0">WEDDING INVITATION</text>
      
      <!-- Couple Names -->
      <text x="75" y="235" font-family="Georgia, serif" font-size="52" font-weight="bold" fill="url(#goldText)">Karthik &amp; Dheeshma</text>
      
      <!-- Divider -->
      <line x1="75" y1="275" x2="360" y2="275" stroke="#C5A66A" stroke-width="1.5" opacity="0.6" />
      <circle cx="217" cy="275" r="4" fill="#C5A66A" />

      <!-- Date -->
      <text x="75" y="338" font-family="Georgia, serif" font-size="30" font-style="italic" fill="#DFC896">Wednesday, 25 November 2026</text>
      
      <!-- Venue -->
      <text x="75" y="405" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#FFFDF9" letter-spacing="2">SWAMY AUDITORIUM • KULAVANMUKKU</text>
      <text x="75" y="440" font-family="Arial, sans-serif" font-size="18" fill="#A8B5A0" letter-spacing="1">Kuzhalmannam, Palakkad, Kerala</text>

      <!-- Badge -->
      <rect x="75" y="485" width="290" height="44" rx="22" fill="#C5A66A" fill-opacity="0.22" stroke="#C5A66A" stroke-width="1.5" />
      <text x="100" y="513" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#FFFDF9" letter-spacing="3">TAP TO VIEW INVITATION ✦</text>
    </svg>
  `);

  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 13, g: 11, b: 10, alpha: 1 },
    },
  })
    .composite([
      { input: coupleJpg, left: 680, top: 0 },
      { input: svgOverlay, left: 0, top: 0 },
    ])
    .jpeg({ quality: 95 })
    .toFile("public/og-image.jpg");

  console.log("Created public/og-image.jpg successfully");
}

createOgBanner().catch(console.error);
