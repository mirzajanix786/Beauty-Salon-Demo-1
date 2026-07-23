"use client";

import { motion } from "framer-motion";
import { Instagram, Play } from "lucide-react";
import { EditorialFrame } from "@/components/ui/EditorialFrame";
import { IMAGES } from "@/lib/images";

const REELS = [
  { slug: "hair-transformation", img: IMAGES.instagramHairTransformation, brief: "Hair transformation reel" },
  { slug: "makeup-macro", img: IMAGES.instagramMakeupMacro, brief: "Makeup application, macro" },
  { slug: "nail-art", img: IMAGES.instagramNailArt, brief: "Nail art detail" },
  { slug: "spa-ritual", img: IMAGES.instagramSpaRitual, brief: "Spa ritual, slow motion" },
  { slug: "colour-mixing", img: IMAGES.instagramColourMixing, brief: "Colour mixing process" },
  { slug: "client-reveal", img: IMAGES.instagramClientReveal, brief: "Client reveal moment" },
];

const LOOP = [...REELS, ...REELS];

export function InstagramWall() {
  return (
    <section className="relative overflow-hidden bg-[#131316] py-16 md:py-24">
      <div className="mx-auto mb-10 flex max-w-[1280px] flex-col items-center gap-2 px-6 text-center md:px-12">
        <div className="section-num justify-center">Instagram Experience</div>
        <h2 className="max-w-lg font-display text-[clamp(2rem,3.8vw,3.2rem)] font-light leading-[1.1] text-ivory">
          Follow the atelier.
        </h2>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#131316] to-transparent md:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#131316] to-transparent md:w-48" />

        <motion.div
          className="flex w-max gap-4 px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        >
          {LOOP.map((r, i) => (
            <div
              key={i}
              className="group relative h-64 w-44 shrink-0 overflow-hidden rounded-2xl border border-white/08 md:h-80 md:w-56"
            >
              <EditorialFrame
                src={r.img}
                alt="Instagram reel"
                brief={r.brief}
                ratio="auto"
                className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-[#0A0A0C]/0 transition-colors duration-400 group-hover:bg-[#0A0A0C]/35">
                <Play
                  size={24}
                  fill="currentColor"
                  aria-hidden="true"
                  className="text-ivory opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href="#"
          className="btn-luxury group flex items-center gap-3 rounded-full border border-gold/40 px-7 py-3 font-body text-[11.5px] uppercase tracking-widest2 text-ivory transition-all duration-300 hover:border-gold"
        >
          <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-[#0A0A0C]">
            <Instagram size={14} aria-hidden="true" />
            @maisonlumiere
          </span>
        </a>
      </div>
    </section>
  );
}
