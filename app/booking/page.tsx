import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Booking } from "@/components/sections/Booking";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Reserve your ritual at Maison Lumière — choose your service, artist, date and time in a five-step private booking flow.",
  alternates: { canonical: "/booking" },
};

export default function BookingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reserve Your Visit"
        title="Book your ritual."
        description="Choose your service, your artist, and a time that works for you — confirmed instantly."
        crumb="Booking"
      />
      <Suspense fallback={null}>
        <Booking />
      </Suspense>
    </>
  );
}
