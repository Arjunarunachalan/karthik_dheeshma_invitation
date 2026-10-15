import { Cormorant_Garamond, Geist, Playfair_Display, Pinyon_Script } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const pinyonScript = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://karthik-dheeshma-wedding.vercel.app"
  ),
  title: "Karthik & Dheeshma — Wedding Invitation",
  description:
    "Cordially invite your esteemed presence with family to the wedding celebration of Karthik & Dheeshma on Wednesday, 25 November 2026 at Swamy Auditorium, Kulavanmukku, Palakkad.",
  openGraph: {
    title: "Karthik & Dheeshma — Wedding Invitation",
    description:
      "Wednesday, 25 November 2026 • Swamy Auditorium, Kulavanmukku, Palakkad. Tap to view the digital invitation card and ceremony details.",
    url: "/",
    siteName: "Karthik & Dheeshma Wedding Invitation",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wedding Invitation of Karthik and Dheeshma",
      },
      {
        url: "/invitation/karthik-dheeshma-wedding-card.jpg",
        width: 1496,
        height: 1732,
        alt: "Official Traditional Wedding Invitation Card",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karthik & Dheeshma — Wedding Invitation",
    description:
      "Wednesday, 25 November 2026 • Swamy Auditorium, Kulavanmukku, Palakkad",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${cormorant.variable} ${playfair.variable} ${pinyonScript.variable} antialiased font-serif`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
