import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Artists } from "@/components/sections/Artists";
import { InstagramWall } from "@/components/sections/InstagramWall";
import { BookingCTA } from "@/components/sections/BookingCTA";

export const metadata: Metadata = {
  title: "Our Master Artists",
  description:
    "Meet the internationally certified specialists behind Maison Lumière — hair, dermal, makeup, and nail artists.",
  alternates: { canonical: "/artists" },
};

export default function ArtistsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Master Craftsmen"
        title="Every discipline, one specialist."
        description="We don't believe in generalists. Every specialist here has devoted an entire career to a single discipline."
        crumb="Artists"
      />
      <Artists />
      <InstagramWall />
      <BookingCTA />
    </>
  );
}
