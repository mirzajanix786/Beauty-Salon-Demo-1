"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CalendarCheck,
  MessageCircle,
  Sparkles,
  Waves,
  Wand2,
  HeartHandshake,
} from "lucide-react";

const STEPS = [
  { icon: CalendarCheck, title: "Booking", desc: "Reserve your ritual in under two minutes." },
  { icon: MessageCircle, title: "Consultation", desc: "A private conversation with your specialist." },
  { icon: Sparkles, title: "Treatment", desc: "Precision work, tailored to you alone." },
  { icon: Waves, title: "Relax", desc: "Unwind in our private lounge between steps." },
  { icon: Wand2, title: "Transformation", desc: "The reveal — always worth the wait." },
  { icon: HeartHandshake, title: "After Care", desc: "Guidance to make the result last." },
];

export function Journey() {
  const railRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: railRef.current,
            start: "top 75%",
            end: "bottom 65%",
            scrub: true,
          },
        }
      );
    }, railRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" className="relative overflow-hidden bg-[#FAF7F2] py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">

        {/* Header */}
        <div className="mb-20 flex flex-col items-start justify-between gap-6 border-b border-[#0A0A0C]/10 pb-10 md:flex-row md:items-end">
          <div>
            <div className="section-num mb-5 text-gold-dark">The Beauty Journey</div>
            <h2 className="max-w-lg font-display text-[clamp(2rem,4.5vw,3.8rem)] font-light leading-[1.08] text-[#0A0A0C]">
              Six steps,{" "}
              <em className="italic">one seamless ritual.</em>
            </h2>
          </div>
          <p className="max-w-xs font-body text-[14px] leading-relaxed text-[#0A0A0C]/50">
            Every visit follows the same considered sequence — because the
            experience matters as much as the result.
          </p>
        </div>

        {/* Steps rail */}
        <div ref={railRef} className="relative">
          {/* Connecting track line */}
          <div className="absolute left-0 right-0 top-[38px] hidden h-px bg-[#0A0A0C]/10 md:block" />
          <div
            ref={lineRef}
            className="absolute left-0 right-0 top-[38px] hidden h-px origin-left scale-x-0 bg-gradient-to-r from-gold via-gold-light to-gold md:block"
          />

          <div className="flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-6 md:gap-4 md:overflow-visible md:pb-0">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.09 }}
                  className="group relative flex min-w-[200px] flex-col items-start md:min-w-0"
                >
                  {/* Icon circle */}
                  <div className="relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#0A0A0C]/15 bg-[#FAF7F2] text-[#0A0A0C]/50 shadow-sm transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-[#0A0A0C] group-hover:shadow-[0_0_20px_rgba(200,167,106,0.4)]">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>

                  {/* Step number */}
                  <span className="mt-5 font-mono text-[10px] text-gold-dark">
                    0{i + 1}
                  </span>

                  {/* Title */}
                  <h3 className="mt-1 font-display text-[1.4rem] text-[#0A0A0C]">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 max-w-[170px] font-body text-[13px] leading-relaxed text-[#0A0A0C]/50">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
