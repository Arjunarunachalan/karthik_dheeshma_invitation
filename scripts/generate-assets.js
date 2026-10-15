/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

// 1. Botanical Wreath SVG
const botanicalWreathSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#DFC896"/>
      <stop offset="50%" stop-color="#C5A66A"/>
      <stop offset="100%" stop-color="#8F6F33"/>
    </linearGradient>
  </defs>
  <!-- Oval Wreath -->
  <path d="M100 20 C145 20 180 55 180 100 C180 145 145 180 100 180 C55 180 20 145 20 100 C20 55 55 20 100 20" stroke="url(#goldGrad)" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/>
  <!-- Botanical leaves Left -->
  <path d="M35 80 C25 70 30 55 45 65 C40 75 35 80 35 80Z" fill="#A8B5A0" opacity="0.85"/>
  <path d="M28 100 C15 95 18 80 32 88 C30 95 28 100 28 100Z" fill="#7B866D" opacity="0.8"/>
  <path d="M35 120 C22 125 20 140 38 132 C36 125 35 120 35 120Z" fill="#A8B5A0" opacity="0.85"/>
  <path d="M50 145 C40 155 50 168 62 155 C55 148 50 145 50 145Z" fill="#7B866D" opacity="0.75"/>
  <!-- Botanical leaves Right -->
  <path d="M165 80 C175 70 170 55 155 65 C160 75 165 80 165 80Z" fill="#A8B5A0" opacity="0.85"/>
  <path d="M172 100 C185 95 182 80 168 88 C170 95 172 100 172 100Z" fill="#7B866D" opacity="0.8"/>
  <path d="M165 120 C178 125 180 140 162 132 C164 125 165 120 165 120Z" fill="#A8B5A0" opacity="0.85"/>
  <path d="M150 145 C160 155 150 168 138 155 C145 148 150 145 150 145Z" fill="#7B866D" opacity="0.75"/>
  <!-- Soft Dusty Rose Floral Accents -->
  <circle cx="100" cy="20" r="4" fill="#D7AAA6" opacity="0.9"/>
  <circle cx="95" cy="18" r="2.5" fill="#EED7D5"/>
  <circle cx="105" cy="18" r="2.5" fill="#EED7D5"/>
  <circle cx="100" cy="180" r="4" fill="#D7AAA6" opacity="0.9"/>
  <circle cx="95" cy="182" r="2.5" fill="#EED7D5"/>
  <circle cx="105" cy="182" r="2.5" fill="#EED7D5"/>
</svg>`;

// 2. Butterfly Illustration SVG
const butterflySvg = (color = "#C5A66A") => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80" fill="none">
  <g opacity="0.9">
    <!-- Left Forewing -->
    <path d="M50 38 C42 20 22 8 8 20 C-2 30 8 50 48 40 Z" fill="${color}" fill-opacity="0.25" stroke="${color}" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M48 38 C38 26 25 18 15 24 C10 28 18 42 46 39 Z" fill="${color}" fill-opacity="0.4"/>
    <!-- Left Hindwing -->
    <path d="M48 41 C40 50 20 62 15 52 C10 42 32 38 48 41 Z" fill="${color}" fill-opacity="0.3" stroke="${color}" stroke-width="1.2"/>
    <!-- Right Forewing -->
    <path d="M50 38 C58 20 78 8 92 20 C102 30 92 50 52 40 Z" fill="${color}" fill-opacity="0.25" stroke="${color}" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M52 38 C62 26 75 18 85 24 C90 28 82 42 54 39 Z" fill="${color}" fill-opacity="0.4"/>
    <!-- Right Hindwing -->
    <path d="M52 41 C60 50 80 62 85 52 C90 42 68 38 52 41 Z" fill="${color}" fill-opacity="0.3" stroke="${color}" stroke-width="1.2"/>
    <!-- Antennae -->
    <path d="M49 32 Q45 22 40 20" stroke="${color}" stroke-width="0.9" stroke-linecap="round"/>
    <path d="M51 32 Q55 22 60 20" stroke="${color}" stroke-width="0.9" stroke-linecap="round"/>
    <circle cx="40" cy="20" r="1.2" fill="${color}"/>
    <circle cx="60" cy="20" r="1.2" fill="${color}"/>
    <!-- Body -->
    <ellipse cx="50" cy="40" rx="1.8" ry="8" fill="${color}"/>
  </g>
</svg>`;

// 3. Editorial Couple Portrait Placeholder SVG (Arch, Warm Sunset Silhouette, Film Grain)
const coupleHeroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F2E6D8"/>
      <stop offset="40%" stop-color="#EED7D5"/>
      <stop offset="70%" stop-color="#DFC896"/>
      <stop offset="100%" stop-color="#D4DDD0"/>
    </linearGradient>
    <radialGradient id="sunGlow" cx="50%" cy="45%" r="35%">
      <stop offset="0%" stop-color="#FFFDF9" stop-opacity="0.85"/>
      <stop offset="40%" stop-color="#DFC896" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#DFC896" stop-opacity="0"/>
    </radialGradient>
    <filter id="filmGrain">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.2  0 0 0 0 0.18  0 0 0 0 0.16  0 0 0 0.05 0"/>
      <feBlend mode="multiply" in="SourceGraphic" in2="noise"/>
    </filter>
    <clipPath id="archClip">
      <path d="M30 300 C30 150 150 30 300 30 C450 30 570 150 570 300 L570 770 L30 770 Z"/>
    </clipPath>
  </defs>

  <!-- Background Base -->
  <rect width="600" height="800" fill="#F7F1E8"/>

  <!-- Arch Frame Container -->
  <g clip-path="url(#archClip)" filter="url(#filmGrain)">
    <!-- Sky & Warm Sunset Glow -->
    <rect x="0" y="0" width="600" height="800" fill="url(#skyGrad)"/>
    <circle cx="300" cy="400" r="220" fill="url(#sunGlow)"/>

    <!-- Subtle Palm / Botanical Silhouettes in Distance -->
    <path d="M-20 600 Q120 480 200 520 Q260 550 320 600 Z" fill="#7B866D" opacity="0.25"/>
    <path d="M620 580 Q480 460 380 510 Q320 540 280 600 Z" fill="#7B866D" opacity="0.25"/>
    
    <!-- Gentle Hills Horizon -->
    <path d="M0 620 C180 580 380 640 600 610 L600 800 L0 800 Z" fill="#A8B5A0" opacity="0.4"/>
    <path d="M0 660 C220 630 420 670 600 640 L600 800 L0 800 Z" fill="#7B866D" opacity="0.5"/>

    <!-- Romantic Couple Silhouette (Groom & Bride facing each other) -->
    <g transform="translate(140, 310)" fill="#332A27">
      <!-- Groom silhouette -->
      <circle cx="100" cy="70" r="24"/>
      <!-- Groom collar & suit -->
      <path d="M72 100 C75 90 95 86 100 86 C105 86 125 90 128 100 L135 240 L65 240 Z"/>
      <!-- Groom arms leaning toward bride -->
      <path d="M125 108 C140 135 155 160 170 180 L158 185 C145 168 132 145 120 120 Z"/>

      <!-- Bride silhouette -->
      <circle cx="215" cy="85" r="21"/>
      <!-- Bride elegant traditional bun & veil drape -->
      <ellipse cx="232" cy="80" rx="9" ry="12"/>
      <path d="M232 85 C248 110 260 180 270 280 L230 280 C230 210 225 130 220 100 Z" fill="#D7AAA6" opacity="0.35"/>
      <!-- Bride saree/gown drape -->
      <path d="M195 110 C205 100 225 100 232 110 L250 280 L170 280 Z"/>
      <!-- Bride arm meeting groom -->
      <path d="M195 118 C180 145 170 165 165 180 L175 185 C180 170 190 150 202 128 Z"/>

      <!-- Joined hands with warm halo -->
      <circle cx="166" cy="182" r="10" fill="#DFC896" opacity="0.6"/>
    </g>

    <!-- Foreground Soft Florals -->
    <path d="M10 770 Q60 700 80 660 Q90 690 110 770 Z" fill="#7B866D" opacity="0.6"/>
    <path d="M590 770 Q540 700 520 660 Q510 690 490 770 Z" fill="#7B866D" opacity="0.6"/>
    <circle cx="85" cy="670" r="12" fill="#D7AAA6" opacity="0.8"/>
    <circle cx="515" cy="670" r="12" fill="#D7AAA6" opacity="0.8"/>
  </g>

  <!-- Fine Arch Border in Champagne Gold -->
  <path d="M30 300 C30 150 150 30 300 30 C450 30 570 150 570 300 L570 770 L30 770 Z" fill="none" stroke="#C5A66A" stroke-width="1.5" stroke-dasharray="4 2"/>
  <path d="M38 304 C38 158 154 38 300 38 C446 38 562 158 562 304 L562 762 L38 762 Z" fill="none" stroke="#C5A66A" stroke-width="0.5" opacity="0.6"/>

  <!-- Editorial typography watermark -->
  <text x="300" y="740" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="14" fill="#332A27" letter-spacing="4" opacity="0.85">KARTHIK &amp; DHEESHMA</text>
  <text x="300" y="756" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="10" fill="#7B866D" letter-spacing="3" opacity="0.7">PALAKKAD • NOVEMBER 2026</text>
</svg>`;

// 4. Gallery Sample Images SVG (varied artistic layouts)
function createGallerySvg(title, subtitle, aspectWidth, aspectHeight, frameType = 'arch') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${aspectWidth} ${aspectHeight}" width="100%" height="100%">
    <defs>
      <linearGradient id="warmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F7F1E8"/>
        <stop offset="50%" stop-color="#EDE5D8"/>
        <stop offset="100%" stop-color="#D4DDD0"/>
      </linearGradient>
    </defs>
    <rect width="${aspectWidth}" height="${aspectHeight}" fill="url(#warmGrad)"/>
    <rect x="12" y="12" width="${aspectWidth - 24}" height="${aspectHeight - 24}" fill="#FDFBF7" rx="${frameType === 'oval' ? aspectHeight/2 : 6}"/>
    <rect x="18" y="18" width="${aspectWidth - 36}" height="${aspectHeight - 36}" fill="none" stroke="#C5A66A" stroke-width="0.75" stroke-dasharray="3 3" rx="${frameType === 'oval' ? aspectHeight/2 : 4}" opacity="0.7"/>
    
    <!-- Couple Silhouette Illustration -->
    <g transform="translate(${aspectWidth/2 - 50}, ${aspectHeight/2 - 60}) scale(0.65)" fill="#5A4E4A" opacity="0.8">
      <circle cx="50" cy="40" r="18"/>
      <circle cx="95" cy="48" r="16"/>
      <path d="M30 65 C35 55 50 52 55 52 C60 52 75 55 80 65 L85 160 L25 160 Z"/>
      <path d="M82 68 C88 60 102 60 108 68 L120 160 L75 160 Z"/>
      <path d="M108 72 C118 90 128 130 135 160 L115 160 Z" fill="#D7AAA6" opacity="0.5"/>
    </g>

    <!-- Decorative floral corner -->
    <circle cx="${aspectWidth/2}" cy="${aspectHeight/2 + 55}" r="16" fill="#C5A66A" opacity="0.12"/>
    <text x="${aspectWidth/2}" y="${aspectHeight/2 + 59}" text-anchor="middle" font-size="11" fill="#C5A66A">✦</text>

    <!-- Caption & Subtitle -->
    <text x="${aspectWidth/2}" y="${aspectHeight - 40}" text-anchor="middle" font-family="Georgia, serif" font-size="13" font-style="italic" fill="#332A27" letter-spacing="1">${title}</text>
    <text x="${aspectWidth/2}" y="${aspectHeight - 24}" text-anchor="middle" font-family="sans-serif" font-size="8.5" fill="#7B866D" letter-spacing="2" opacity="0.85">${subtitle}</text>
  </svg>`;
}

// 5. Venue Architectural Sketch SVG (Swami Auditorium & Temple)
const venueAuditoriumSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <linearGradient id="venueSky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F7F1E8"/>
      <stop offset="100%" stop-color="#EDE5D8"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#venueSky)"/>
  
  <!-- Subtle Palm Trees on Left and Right -->
  <g stroke="#7B866D" stroke-width="1.5" fill="none" opacity="0.55">
    <!-- Left Palm -->
    <path d="M70 340 Q75 220 90 120"/>
    <path d="M90 120 Q50 90 20 110"/>
    <path d="M90 120 Q60 60 40 70"/>
    <path d="M90 120 Q100 50 110 65"/>
    <path d="M90 120 Q130 80 145 105"/>
    <!-- Right Palm -->
    <path d="M530 340 Q525 220 510 120"/>
    <path d="M510 120 Q550 90 580 110"/>
    <path d="M510 120 Q540 60 560 70"/>
    <path d="M510 120 Q500 50 490 65"/>
    <path d="M510 120 Q470 80 455 105"/>
  </g>

  <!-- Auditorium Building Facade in Hand-Drawn Architectural Style -->
  <g stroke="#332A27" stroke-width="1.2" fill="none" opacity="0.85">
    <!-- Main base -->
    <rect x="150" y="160" width="300" height="180" rx="3" fill="#FCFAF6"/>
    <!-- Grand Porch / Portico Roof -->
    <polygon points="140,160 300,95 460,160" fill="#F7F1E8" stroke="#332A27" stroke-width="1.5"/>
    <!-- Portico Pediment Ornament -->
    <circle cx="300" cy="135" r="14" stroke="#C5A66A" stroke-width="1"/>
    <text x="300" y="139" text-anchor="middle" font-family="serif" font-size="10" fill="#C5A66A">✦</text>

    <!-- Pillars / Columns -->
    <line x1="180" y1="160" x2="180" y2="340" stroke="#7B866D" stroke-width="2"/>
    <line x1="220" y1="160" x2="220" y2="340" stroke="#7B866D" stroke-width="2"/>
    <line x1="380" y1="160" x2="380" y2="340" stroke="#7B866D" stroke-width="2"/>
    <line x1="420" y1="160" x2="420" y2="340" stroke="#7B866D" stroke-width="2"/>

    <!-- Grand Entrance Arched Door -->
    <path d="M265 340 L265 240 C265 220 335 220 335 240 L335 340" fill="#EDE5D8" stroke="#332A27" stroke-width="1.2"/>
    <!-- Windows -->
    <rect x="190" y="190" width="22" height="35" rx="2" stroke="#7B866D" fill="#FFFDF9"/>
    <rect x="388" y="190" width="22" height="35" rx="2" stroke="#7B866D" fill="#FFFDF9"/>

    <!-- Steps -->
    <rect x="130" y="340" width="340" height="12" fill="#E8DEC8"/>
    <rect x="110" y="352" width="380" height="14" fill="#DDD1B6"/>
  </g>

  <!-- Festive Floral Garlands / Bunting -->
  <path d="M140 160 Q220 185 300 165 Q380 185 460 160" stroke="#C5A66A" stroke-width="1" stroke-dasharray="4 3" fill="none"/>
  <circle cx="220" cy="177" r="4" fill="#D7AAA6"/>
  <circle cx="300" cy="165" r="4.5" fill="#DFC896"/>
  <circle cx="380" cy="177" r="4" fill="#D7AAA6"/>

  <!-- Subtle Heading & Badge -->
  <rect x="180" y="30" width="240" height="26" rx="13" fill="#FFFDF9" stroke="#C5A66A" stroke-width="0.8"/>
  <text x="300" y="47" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="11" letter-spacing="3" fill="#332A27">SWAMI AUDITORIUM</text>
  <text x="300" y="385" text-anchor="middle" font-family="sans-serif" font-size="9" letter-spacing="2" fill="#7B866D">KULAVANMUKKU, PALAKKAD</text>
</svg>`;

// 6. Generate a genuine, valid PDF binary string (PDF 1.4 specification)
function generatePdfBuffer() {
  const contentStream = `BT
/F1 20 Tf
50 780 Td
(WEDDING INVITATION) Tj
0 -26 Td
/F2 26 Tf
(Karthik & Dheeshma) Tj
0 -24 Td
/F1 12 Tf
(WEDNESDAY, 25 NOVEMBER 2026) Tj
0 -20 Td
(----------------------------------------------------------------------) Tj
0 -28 Td
/F2 14 Tf
(RECEPTION DETAILS) Tj
0 -18 Td
/F1 11 Tf
(Date: Wednesday, 25 November 2026) Tj
0 -15 Td
(Time: 5:00 PM - 8:00 PM IST) Tj
0 -15 Td
(Venue: Swami Auditorium, Kulavanmukku, Palakkad) Tj
0 -28 Td
/F2 14 Tf
(CEREMONY (THALIKETTU)) Tj
0 -18 Td
/F1 11 Tf
(Venue: Sree Azhakotha Mahadeva Temple) Tj
0 -15 Td
(Muhurtam: 9:30 AM - 10:15 AM IST) Tj
0 -15 Td
(Date: To be confirmed) Tj
0 -28 Td
/F2 14 Tf
(WARMLY INVITED BY) Tj
0 -18 Td
/F1 11 Tf
(Mrs. Lakshmi Ramachandran (W/o Late Ramachandran)) Tj
0 -15 Td
(Naluketttu Veedu, Puthanthara, Kuzhalmannam, Palakkad) Tj
0 -15 Td
(Contact: 9645158159) Tj
0 -28 Td
/F2 14 Tf
(BRIDE'S FAMILY) Tj
0 -18 Td
/F1 11 Tf
(D/o Mr. Mani & Mrs. Baby) Tj
0 -15 Td
(Vadakkethara House, Kulavanmukku, Kuzhalmannam, Palakkad) Tj
0 -28 Td
/F1 10 Tf
("With best compliments from Kamalraj & Friends and Relatives") Tj
ET`;

  const streamLength = Buffer.byteLength(contentStream, 'utf8');

  const pdf = `%PDF-1.4
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj
2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
>>
endobj
3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 595 842]
  /Contents 4 0 R
  /Resources <<
    /Font <<
      /F1 5 0 R
      /F2 6 0 R
    >>
  >>
>>
endobj
4 0 obj
<<
  /Length ${streamLength}
>>
stream
${contentStream}
endstream
endobj
5 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica
>>
endobj
6 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Times-Bold
>>
endobj
xref
0 7
0000000000 65535 f 
0000000010 00000 n 
0000000060 00000 n 
0000000117 00000 n 
0000000282 00000 n 
000000${String(340 + streamLength).padStart(4, '0')} 00000 n 
000000${String(415 + streamLength).padStart(4, '0')} 00000 n 
trailer
<<
  /Size 7
  /Root 1 0 R
>>
startxref
${495 + streamLength}
%%EOF`;

  return Buffer.from(pdf, 'utf8');
}

// Write files to public directories
const baseDir = path.resolve(__dirname, '..', 'public');

// 1. Couple Hero & Gallery
fs.writeFileSync(path.join(baseDir, 'images', 'couple', 'couple-hero.svg'), coupleHeroSvg);
fs.writeFileSync(path.join(baseDir, 'images', 'couple', 'gallery-1.svg'), createGallerySvg('Golden Hour Promises', '25 · 11 · 2026', 400, 520, 'arch'));
fs.writeFileSync(path.join(baseDir, 'images', 'couple', 'gallery-2.svg'), createGallerySvg('Hand in Hand', 'Kuzhalmannam Trails', 480, 360, 'rect'));
fs.writeFileSync(path.join(baseDir, 'images', 'couple', 'gallery-3.svg'), createGallerySvg('Whispered Laughter', 'Under the Evening Sky', 400, 500, 'oval'));
fs.writeFileSync(path.join(baseDir, 'images', 'couple', 'gallery-4.svg'), createGallerySvg('Quiet Radiance', 'Palakkad Heritage', 380, 480, 'arch'));
fs.writeFileSync(path.join(baseDir, 'images', 'couple', 'gallery-5.svg'), createGallerySvg('Two Hearts Entwined', 'Forever & Always', 460, 340, 'rect'));
fs.writeFileSync(path.join(baseDir, 'images', 'couple', 'gallery-6.svg'), createGallerySvg('A New Beginning', 'Karthik & Dheeshma', 420, 540, 'arch'));

// 2. Venue Architectural Sketch
fs.writeFileSync(path.join(baseDir, 'images', 'venue', 'swami-auditorium.svg'), venueAuditoriumSvg);

// 3. Florals & Butterflies
fs.writeFileSync(path.join(baseDir, 'images', 'florals', 'botanical-wreath.svg'), botanicalWreathSvg);
fs.writeFileSync(path.join(baseDir, 'images', 'florals', 'butterfly-gold.svg'), butterflySvg('#C5A66A'));
fs.writeFileSync(path.join(baseDir, 'images', 'florals', 'butterfly-rose.svg'), butterflySvg('#D7AAA6'));
fs.writeFileSync(path.join(baseDir, 'images', 'florals', 'butterfly-sage.svg'), butterflySvg('#A8B5A0'));

// 4. Downloadable PDF
fs.writeFileSync(path.join(baseDir, 'downloads', 'Karthik-and-Dheeshma-Wedding-Invitation.pdf'), generatePdfBuffer());

console.log('Successfully generated all placeholder images and PDF invitation!');
