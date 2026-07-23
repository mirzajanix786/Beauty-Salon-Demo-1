"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const LENGTHS = ["Short", "Medium", "Long"] as const;
const TYPES = ["Straight", "Wavy", "Curly"] as const;
const GOALS = ["Smooth", "Volume", "Repair", "Colour"] as const;

type Length = (typeof LENGTHS)[number];
type HairType = (typeof TYPES)[number];
type Goal = (typeof GOALS)[number];

function computeRecommendation(length: Length, type: HairType, goal: Goal) {
  const base: Record<Goal, { name: string; hours: number; low: number; high: number }> = {
    Smooth: { name: "Smooth & Shine Transformation", hours: 2.5, low: 120, high: 160 },
    Volume: { name: "Volume Revival Ritual", hours: 3, low: 140, high: 190 },
    Repair: { name: "Deep Repair Restoration", hours: 3.5, low: 160, high: 220 },
    Colour: { name: "Signature Colour Journey", hours: 4, low: 200, high: 280 },
  };
  const r = { ...base[goal] };
  const lengthMultiplier = length === "Long" ? 1.3 : length === "Medium" ? 1.1 : 1;
  const typeMultiplier = type === "Curly" ? 1.2 : type === "Wavy" ? 1.1 : 1;
  const mult = lengthMultiplier * typeMultiplier;

  return {
    name: r.name,
    hoursLabel: `${(r.hours * (mult > 1.15 ? 1.15 : 1)).toFixed(1)} – ${(r.hours * mult).toFixed(1)} Hours`,
    priceLabel: `$${Math.round(r.low * mult)} – $${Math.round(r.high * mult)}`,
  };
}

function PillGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p className="mb-3 font-mono text-[10px] uppercase tracking-widest2 text-ivory/45">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={cn(
              "rounded-full border px-5 py-2 font-body text-[13px] transition-all duration-300",
              value === opt
                ? "border-gold bg-gold text-[#0A0A0C] shadow-[0_0_16px_rgba(200,167,106,0.35)]"
                : "border-white/12 text-ivory/60 hover:border-gold/45 hover:text-gold-light"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export function PackageFinder() {
  const [length, setLength] = useState<Length>("Medium");
  const [type, setType] = useState<HairType>("Wavy");
  const [goal, setGoal] = useState<Goal>("Smooth");

  const rec = useMemo(() => computeRecommendation(length, type, goal), [length, type, goal]);

  return (
    <section className="relative bg-[#131316] py-24 md:py-32">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,167,106,0.08),transparent_65%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1300px] px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="section-num mb-5 justify-center">Beauty Package Finder</div>
          <h2 className="mx-auto max-w-lg font-display text-[clamp(2rem,4.5vw,3.8rem)] font-light leading-[1.08] text-ivory">
            Find your{" "}
            <em className="italic text-gold/80">perfect ritual.</em>
          </h2>
        </div>

        <div className="glass-dark grid grid-cols-1 gap-10 rounded-3xl p-8 md:grid-cols-2 md:gap-16 md:p-14">
          <div className="flex flex-col gap-9">
            <PillGroup label="1 — Hair Length" options={LENGTHS} value={length} onChange={setLength} />
            <PillGroup label="2 — Hair Type" options={TYPES} value={type} onChange={setType} />
            <PillGroup label="3 — Your Goal" options={GOALS} value={goal} onChange={setGoal} />
          </div>

          <motion.div
            key={rec.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col justify-center rounded-2xl border border-gold/20 bg-[#0A0A0C]/60 p-8"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest2 text-gold">
              Recommended for you
            </p>
            <h3 className="mt-4 font-display text-[1.7rem] leading-snug text-ivory">
              {rec.name}
            </h3>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-ivory/65">
                <Clock size={15} className="shrink-0 text-gold" />
                <span className="font-body text-[14px]">Estimated time: {rec.hoursLabel}</span>
              </div>
              <div className="flex items-center gap-3 text-ivory/65">
                <DollarSign size={15} className="shrink-0 text-gold" />
                <span className="font-body text-[14px]">Estimated price: {rec.priceLabel}</span>
              </div>
            </div>

            <Link
              href="/booking"
              className="btn-gold-fill group mt-9 inline-flex w-fit items-center rounded-full px-7 py-3.5 font-body text-[12px] font-semibold uppercase tracking-widest2 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(200,167,106,0.4)]"
            >
              Book This Ritual
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
