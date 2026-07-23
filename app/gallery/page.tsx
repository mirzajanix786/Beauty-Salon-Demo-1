import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Atmosphere } from "@/components/sections/Atmosphere";
import { InstagramWall } from "@/components/sections/InstagramWall";
import { BookingCTA } from "@/components/sections/BookingCTA";

export const metadata: Metadata = {
  title: "Atelier Gallery",
  description:
    "Explore the architectural interiors, private treatment suites, and signature artistic work of Maison Lumière.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Architectural & Work Gallery"
        title="The atelier in detail."
        description="Our sanctuary, treatment suites, and signature artistic transformations — a closer look inside."
        crumb="Gallery"
      />
      <Atmosphere />
      <InstagramWall />
      <BookingCTA />
    </>
  );
}
