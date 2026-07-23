"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Clock, Sparkles } from "lucide-react";
import { EditorialFrame } from "@/components/ui/EditorialFrame";
import { IMAGES } from "@/lib/images";

const STATS = [
  { value: "13+", label: "Years of Craft" },
  { value: "4,200+", label: "Satisfied Clients" },
  { value: "5", label: "Signature Disciplines" },
];

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative overflow-hidden bg-[#131316] py-16 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,167,106,0.08),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-12 items-center md:grid-cols-12 md:gap-12">

          {/* Left Column - Image (balanced composition) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative md:col-span-6"
          >
            <div className="absolute -inset-3 rounded-3xl bg-[radial-gradient(circle,rgba(200,167,106,0.1),transparent_70%)] blur-xl" />

            <div className="relative overflow-hidden rounded-3xl border border-gold/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              <EditorialFrame
                src={IMAGES.aboutInterior}
                alt="Maison Lumière salon interior"
                brief="Salon interior · marble + brass · warm ambient light"
                ratio="4/5"
                className="max-h-[500px] w-full"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-4 -right-2 flex items-center gap-3 rounded-2xl border border-gold/25 bg-[#1A1A1E] px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              <Award size={18} className="text-gold" aria-hidden="true" />
              <div>
                <p className="font-mono text-[9.5px] uppercase tracking-widest2 text-gold">
                  Est. 2011
                </p>
                <p className="font-display text-sm text-ivory">A private craft</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex flex-col justify-center md:col-span-6"
          >
            <div className="section-num mb-4">Our Philosophy</div>

            <h2 className="font-display text-[clamp(2rem,3.5vw,3.2rem)] font-light leading-[1.12] text-ivory">
              Beauty is not a look.
              <br />
              It&apos;s a way of being{" "}
              <em className="italic text-gold">seen</em>.
            </h2>

            <p className="mt-5 max-w-[460px] font-body text-[14.5px] leading-[1.7] text-ivory/65">
              We believe beauty is not just about appearance — it&apos;s about
              confidence, self-love, and feeling extraordinary in your own
              skin, every single day. Every service here begins as a
              conversation, not a checklist.
            </p>

            <p className="mt-5 font-display text-lg italic text-gold/80">
              &ldquo;Be you. Be beautiful.&rdquo;
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gold/15 pt-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-[2.2rem] font-light leading-none text-gold">
                    {s.value}
                  </p>
                  <p className="mt-1.5 font-body text-[11.5px] leading-snug text-ivory/50">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="btn-luxury group mt-8 flex w-fit items-center gap-2 rounded-full border border-gold/30 px-6 py-3 font-body text-[11.5px] uppercase tracking-widest2 text-ivory transition-all duration-300 hover:border-gold hover:text-[#0A0A0C]"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-[#0A0A0C]">
                Our Full Story
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
