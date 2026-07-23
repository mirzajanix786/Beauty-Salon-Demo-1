import type { Metadata } from "next";
import { ContactPageContent } from "@/components/sections/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Maison Lumière — address, phone, opening hours, and a direct message form.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
