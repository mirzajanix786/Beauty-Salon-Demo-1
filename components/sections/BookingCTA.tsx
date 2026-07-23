"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EditorialFrame } from "@/components/ui/EditorialFrame";
import { IMAGES } from "@/lib/images";

export function BookingCTA() {
  return (
    <section className="relative flex min-h-[420px] w-full items-center overflow-hidden py-20">
      <div className="absolute inset-0">
        <EditorialFrame
          src={IMAGES.bookingCTA}
          alt="Maison Lumière salon, warm evening light"
          brief="Full-width salon interior · warm evening light"
          ratio="auto"
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-[#0A0A0C]/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/60 via-transparent to-[#0A0A0C]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(200,167,106,0.08),transparent_65%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto w-full max-w-[1280px] px-6 text-center"
      >
        <div className="section-num mb-4 justify-center">Your Ritual Awaits</div>

        <h2 className="font-display text-[clamp(2rem,4vw,3.8rem)] font-light leading-[1.08] text-ivory">
          Step into a more
          <br />
          <em className="italic text-gold">beautiful you.</em>
        </h2>

        <p className="mx-auto mt-4 max-w-md font-body text-[14px] leading-relaxed text-ivory/70">
          Reserve your visit today and experience beauty care the way it
          should feel — considered, unhurried, and entirely yours.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/booking"
            className="btn-gold-fill group inline-flex items-center rounded-full px-8 py-3.5 font-body text-[11.5px] font-semibold uppercase tracking-widest2 shadow-[0_0_25px_rgba(200,167,106,0.35)] transition-all duration-300 hover:scale-[1.02]"
          >
            Book Your Appointment
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full border border-ivory/25 bg-white/5 px-8 py-3.5 backdrop-blur font-body text-[11.5px] uppercase tracking-widest2 text-ivory transition-all duration-300 hover:border-ivory/50 hover:bg-white/10"
          >
            Get in Touch
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
