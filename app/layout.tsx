import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/sections/Navbar";
import { LoadingScreen } from "@/components/LoadingScreen";
import { CursorGlow } from "@/components/CursorGlow";
import { DemoBanner } from "@/components/DemoBanner";

/**
 * Fonts are loaded via a standard <link> (see head below) rather than
 * next/font. next/font is the preferred approach in a normal dev
 * environment (it self-hosts + inlines the font at build time with zero
 * layout shift) — swap back to it if your build machine has open network
 * access to fonts.googleapis.com. This link-based approach is a safe
 * fallback that works anywhere.
 */

export const metadata: Metadata = {
  metadataBase: new URL("https://maison-lumiere.example.com"),
  title: {
    default: "Maison Lumière — Beauty Beyond Time",
    template: "%s | Maison Lumière",
  },
  description:
    "A private beauty atelier for hair, skin, spa, makeup and nails — where every appointment is a considered ritual, not a transaction.",
  keywords: [
    "luxury salon",
    "beauty atelier",
    "hair artistry",
    "skin care",
    "spa",
    "makeup studio",
    "nail lounge",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Maison Lumière — Beauty Beyond Time",
    description:
      "A private beauty atelier for hair, skin, spa, makeup and nails.",
    type: "website",
    url: "/",
    siteName: "Maison Lumière",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maison Lumière — Beauty Beyond Time",
    description:
      "A private beauty atelier for hair, skin, spa, makeup and nails.",
  },
};

export const viewport: Viewport = {
  themeColor: "#2B241E",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "Maison Lumière",
  description:
    "A private beauty atelier offering hair artistry, skin rituals, spa & body, makeup and nail lounge services.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "24 Rue des Orfèvres",
    addressLocality: "Paris",
    postalCode: "75001",
    addressCountry: "FR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "19:00",
    },
  ],
  priceRange: "$$$",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- this rule targets the Pages Router; App Router's root layout is the correct place for a shared font <link>. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Manrope:wght@300;400;500;600&family=Space+Grotesk:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink text-ivory antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[200] focus:rounded-full focus:bg-gold focus:px-6 focus:py-3 focus:font-body focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>
        <DemoBanner />
        <LoadingScreen />
        <CursorGlow />
        <Navbar />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
