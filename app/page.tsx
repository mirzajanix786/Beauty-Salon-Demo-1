import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { Services } from "@/components/sections/Services";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { SectionSkeleton } from "@/components/ui/SectionSkeleton";

/**
 * Below-the-fold sections are code-split via next/dynamic. They still
 * render on the server (ssr defaults to true) so crawlers and first paint
 * get full content — this only defers *hydration JS* into separate chunks
 * fetched as the user scrolls near them, keeping the initial bundle for
 * the hero/philosophy/services/before-after view small.
 */
const Artists = dynamic(() =>
  import("@/components/sections/Artists").then((m) => m.Artists)
);
const Journey = dynamic(() =>
  import("@/components/sections/Journey").then((m) => m.Journey)
);
const ProductShowcase = dynamic(() =>
  import("@/components/sections/ProductShowcase").then((m) => m.ProductShowcase)
);
const Atmosphere = dynamic(() =>
  import("@/components/sections/Atmosphere").then((m) => m.Atmosphere),
  { loading: () => <SectionSkeleton tone="light" /> }
);
const ClientStories = dynamic(() =>
  import("@/components/sections/ClientStories").then((m) => m.ClientStories)
);
const PackageFinder = dynamic(() =>
  import("@/components/sections/PackageFinder").then((m) => m.PackageFinder)
);
const Membership = dynamic(() =>
  import("@/components/sections/Membership").then((m) => m.Membership),
  { loading: () => <SectionSkeleton tone="light" /> }
);
const InstagramWall = dynamic(() =>
  import("@/components/sections/InstagramWall").then((m) => m.InstagramWall)
);
const BookingCTA = dynamic(() =>
  import("@/components/sections/BookingCTA").then((m) => m.BookingCTA)
);
const Footer = dynamic(() =>
  import("@/components/sections/Footer").then((m) => m.Footer)
);

export default function Home() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Services />
      <BeforeAfter />
      <Artists />
      <Journey />
      <ProductShowcase />
      <Atmosphere />
      <ClientStories />
      <PackageFinder />
      <Membership />
      <InstagramWall />
      <BookingCTA />
      <Footer />
    </>
  );
}
