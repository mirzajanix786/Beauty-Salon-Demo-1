"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EditorialFrame } from "@/components/ui/EditorialFrame";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.13,
      duration: 1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

// Subtle luxury gold ambient particles
const PARTICLES = [
  { top: "20%", left: "72%", size: 4, delay: 0 },
  { top: "38%", left: "88%", size: 3, delay: 0.9 },
  { top: "62%", left: "80%", size: 5, delay: 1.6 },
  { top: "78%", left: "93%", size: 3, delay: 2.3 },
  { top: "28%", left: "60%", size: 2, delay: 1.2 },
  { top: "82%", left: "65%", size: 3, delay: 0.5 },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(textRef.current, {
        yPercent: 18,
        opacity: 0.7,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "65% top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[88vh] w-full items-center overflow-hidden bg-[#0A0A0C]"
    >
      {/* Multi-layer atmospheric background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Warm golden spotlight behind image side */}
        <div className="absolute right-0 top-0 h-full w-[65%] bg-[radial-gradient(ellipse_at_75%_40%,rgba(200,167,106,0.14),transparent_60%)]" />
        {/* Secondary glow lower left */}
        <div className="absolute bottom-0 left-0 h-[50%] w-[40%] bg-[radial-gradient(ellipse_at_20%_80%,rgba(200,167,106,0.07),transparent_55%)]" />
        {/* Top vignette */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0A0A0C] to-transparent" />
        {/* Bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0A0A0C] to-transparent" />
      </div>

      {/* Floating gold light particles */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-gold shadow-[0_0_10px_2px_rgba(200,167,106,0.55)]"
            style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
            animate={{ y: [0, -16, 0], opacity: [0.18, 0.75, 0.18] }}
            transition={{
              duration: 5.5 + i * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Main grid layout */}
      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1400px] items-center gap-8 px-6 pt-20 pb-10 md:grid-cols-12 md:gap-0 md:px-12 md:pt-24">

        {/* ── LEFT — Text & CTAs (5 columns) */}
        <div
          ref={textRef}
          className="flex flex-col justify-center md:col-span-5 lg:col-span-5"
        >
          {/* Eyebrow label */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="section-num mb-7"
          >
            Est. Private Atelier
          </motion.div>

          {/* Main headline */}
          <h1 className="font-display font-light leading-[1.03] text-ivory">
            <motion.span
              custom={1}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="block text-[clamp(3rem,5.5vw,5.5rem)] tracking-tight"
            >
              Beauty,
            </motion.span>
            <motion.span
              custom={2}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="text-gold-gradient block text-[clamp(3rem,5.5vw,5.5rem)] italic tracking-tight"
            >
              Beyond Time.
            </motion.span>
          </h1>

          {/* Short description */}
          <motion.p
            custom={3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-7 max-w-[360px] font-body text-[15px] leading-[1.7] text-ivory/65"
          >
            Where elegance meets expertise. A private atelier for those who
            treat beauty as a discipline, not an errand.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            {/* Primary — gold fill */}
            <Link
              href="/booking"
              id="hero-book-cta"
              className="btn-gold-fill group relative inline-flex items-center justify-center rounded-full px-8 py-4 font-body text-[12px] font-semibold uppercase tracking-widest2 transition-all duration-400 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(200,167,106,0.45)]"
            >
              Reserve Your Ritual
            </Link>

            {/* Secondary — ghost glass */}
            <Link
              href="/services"
              id="hero-services-cta"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-gold/35 bg-white/[0.03] px-8 py-4 backdrop-blur-sm font-body text-[12px] font-medium uppercase tracking-widest2 text-ivory transition-all duration-300 hover:border-gold/70 hover:bg-gold/10 hover:text-gold-light"
            >
              Explore Services
            </Link>
          </motion.div>
        </div>

        {/* ── RIGHT — Large editorial image (7 columns) */}
        <div className="relative flex items-start justify-end pt-8 md:col-span-7">
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="relative w-full"
          >
            {/* Outer glow halo behind image */}
            <div className="absolute -inset-4 rounded-[28px] bg-[radial-gradient(ellipse_at_center,rgba(200,167,106,0.18),transparent_70%)] blur-2xl" />

            {/* Image container */}
            <div className="relative overflow-hidden rounded-3xl border border-gold/25 shadow-[0_30px_80px_rgba(0,0,0,0.75),0_0_0_1px_rgba(200,167,106,0.1)]">
              <EditorialFrame
                src="/images/hero-editorial.png"
                alt="Maison Lumière luxury salon editorial portrait"
                brief="Editorial Model · Luxury Atelier Interior · Warm Gold Lighting"
                priority
                ratio="auto"
                sizes="(max-width: 768px) 100vw, 55vw"
                className="max-h-[75vh] min-h-[400px] w-full object-cover object-center"
              />

              {/* Image gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/50 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C]/25 via-transparent to-transparent" />

              {/* Glass rating badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-5 left-5 z-10 flex items-center gap-3 rounded-2xl border border-gold/25 bg-black/45 px-5 py-3 backdrop-blur-xl"
              >
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="fill-gold text-gold" aria-hidden="true" />
                  ))}
                </div>
                <div className="h-4 w-px bg-gold/30" />
                <span className="font-mono text-[11px] tracking-wider text-ivory/90">
                  4.9 · Rated
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

