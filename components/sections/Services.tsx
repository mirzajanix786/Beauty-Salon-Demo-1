"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { EditorialFrame } from "@/components/ui/EditorialFrame";
import { SERVICE_CATEGORIES } from "@/lib/services-data";
import { IMAGES } from "@/lib/images";

const CATEGORY_IMAGES: Record<string, string> = {
  "hair-artistry": IMAGES.serviceHairArtistry,
  "skin-rituals": IMAGES.serviceSkinRituals,
  "spa-body": IMAGES.serviceSpaBody,
  "makeup-studio": IMAGES.serviceMakeupStudio,
  "nail-lounge": IMAGES.serviceNailLounge,
};

export function Services() {
  return (
    <section id="services" className="relative bg-[#FAF7F2] py-16 md:py-24 text-[#0A0A0C]">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">

        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-[#0A0A0C]/10 pb-8 md:flex-row md:items-end">
          <div>
            <div className="section-num mb-3 text-gold-dark">Signature Services</div>
            <h2 className="max-w-lg font-display text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.08] text-[#0A0A0C]">
              Five disciplines,<br />
              <em className="italic text-gold-dark">one standard of craft.</em>
            </h2>
          </div>
          <p className="max-w-xs font-body text-[13.5px] leading-relaxed text-[#0A0A0C]/60">
            Every treatment is performed by a dedicated specialist devoted exclusively to their single craft.
          </p>
        </div>

        {/* Service cards grid - balanced max-width */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CATEGORIES.map((s, i) => {
            const imgSrc = CATEGORY_IMAGES[s.slug] || IMAGES.serviceHairAlt;
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              >
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#0A0A0C]/10 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_16px_45px_rgba(200,167,106,0.2)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <EditorialFrame
                      src={imgSrc}
                      alt={s.title}
                      brief={s.brief}
                      ratio="auto"
                      className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    <div className="absolute left-4 top-4 flex h-7 w-7 items-center justify-center rounded-full border border-white/30 bg-black/40 backdrop-blur">
                      <span className="font-mono text-[10px] text-white">0{i + 1}</span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-[1.35rem] text-[#0A0A0C] transition-colors duration-400 group-hover:text-gold-dark">
                      {s.title}
                    </h3>
                    <p className="mt-2 flex-1 font-body text-[13px] leading-relaxed text-[#0A0A0C]/60">
                      {s.desc}
                    </p>

                    <div className="mt-4 space-y-1.5 border-t border-[#0A0A0C]/08 pt-3">
                      {s.treatments.slice(0, 2).map((t) => (
                        <div key={t.name} className="flex justify-between items-center font-body text-[12px] text-[#0A0A0C]/70">
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 size={11} className="text-gold-dark" />
                            {t.name}
                          </span>
                          <span className="font-mono text-[11px] text-gold-dark">{t.price}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[#0A0A0C]/08 pt-3">
                      <span className="font-mono text-[10px] uppercase tracking-widest2 text-[#0A0A0C]/50 transition-colors group-hover:text-gold-dark">
                        View Full Menu ({s.treatments.length})
                      </span>
                      <ArrowUpRight
                        size={15}
                        className="text-[#0A0A0C]/40 transition-all duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold-dark"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-end">
          <Link
            href="/services"
            className="group flex items-center gap-2 font-body text-[12px] uppercase tracking-widest2 text-[#0A0A0C]/60 transition-colors hover:text-gold-dark font-medium"
          >
            Explore all disciplines & treatment menus
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
