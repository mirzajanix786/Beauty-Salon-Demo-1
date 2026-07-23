"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { EditorialFrame } from "@/components/ui/EditorialFrame";
import { IMAGES } from "@/lib/images";

const STORIES = [
  { slug: "ayesha-malik", name: "Ayesha Malik", role: "Vogue Editor", img: IMAGES.testimonialAyesha, quote: "The best beauty atelier experience I've ever had. Every detail felt considered, from the diagnostic consultation to the final reveal." },
  { slug: "sana-butt", name: "Sana Butt", role: "Architect", img: IMAGES.testimonialSana, quote: "Professional, peaceful, and exceptional results. I've never felt more restored after a hair and skin ritual." },
  { slug: "hira-tariq", name: "Hira Tariq", role: "Creative Director", img: IMAGES.testimonialHira, quote: "They truly understand sub subtle luxury. Their team treats beauty as a discipline rather than a rushed assembly line." },
];

const AUTO_ADVANCE_MS = 6000;

export function ClientStories() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % STORIES.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + STORIES.length) % STORIES.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;
    const t = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(t);
  }, [paused, next]);

  const story = STORIES[index];

  return (
    <section className="relative overflow-hidden bg-[#0A0A0C] py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(200,167,106,0.07),transparent_60%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 text-center md:px-12">
        <div className="section-num mb-4 justify-center">Client Testimonials</div>
        <h2 className="font-display text-[clamp(2rem,3.8vw,3.2rem)] font-light leading-[1.1] text-ivory">
          In their own words.
        </h2>

        <div
          className="relative mx-auto mt-12 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={story.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <div className="relative h-20 w-20">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-gold via-gold-light to-gold-dark opacity-40 blur-sm" />
                <div className="relative overflow-hidden rounded-full border-2 border-gold/50">
                  <EditorialFrame
                    src={story.img}
                    alt={story.name}
                    brief={`Client portrait · ${story.name}`}
                    ratio="1/1"
                    className="h-20 w-20"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-gold text-gold" aria-hidden="true" />
                ))}
              </div>

              <blockquote className="mt-6 max-w-2xl font-display text-[clamp(1.25rem,2.5vw,1.8rem)] font-light italic leading-[1.5] text-ivory">
                &ldquo;{story.quote}&rdquo;
              </blockquote>

              <p className="mt-6 font-mono text-[11px] uppercase tracking-widest2 text-gold-light">
                — {story.name} <span className="text-ivory/40">({story.role})</span>
              </p>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            aria-label="Previous story"
            className="absolute left-0 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/12 p-3 text-ivory/50 transition-all duration-300 hover:border-gold/50 hover:text-gold md:block"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            onClick={next}
            aria-label="Next story"
            className="absolute right-0 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/12 p-3 text-ivory/50 transition-all duration-300 hover:border-gold/50 hover:text-gold md:block"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>

          <div className="mt-8 flex justify-center gap-2">
            {STORIES.map((s, i) => (
              <button
                key={s.slug}
                onClick={() => setIndex(i)}
                aria-label={`Show story from ${s.name}`}
                aria-current={i === index}
                className={`h-1 rounded-full transition-all duration-400 ${
                  i === index ? "w-8 bg-gold" : "w-2 bg-gold/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
