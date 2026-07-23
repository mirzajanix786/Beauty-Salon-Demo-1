import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Membership } from "@/components/sections/Membership";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { BookingCTA } from "@/components/sections/BookingCTA";

export const metadata: Metadata = {
  title: "Atelier Membership",
  description:
    "Silver, Gold, and Platinum membership at Maison Lumière — monthly rituals, priority booking, and welcome product gifts.",
  alternates: { canonical: "/membership" },
};

export default function MembershipPage() {
  return (
    <>
      <PageHeader
        eyebrow="Exclusive Membership"
        title="Beauty care, on retainer."
        description="Three tiers, one promise: consistent monthly care from the same master artists, priority booking, and member gifts."
        crumb="Membership"
      />
      <Membership />
      <ProductShowcase />
      <BookingCTA />
    </>
  );
}
