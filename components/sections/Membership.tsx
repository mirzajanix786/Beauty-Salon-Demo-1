"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Crown, Gift, Calendar, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    name: "Silver",
    price: "$49",
    desc: "The perfect entry into regular private atelier care.",
    features: [
      "1 Signature Hair or Skin Service / mo",
      "10% off all retail products",
      "Complimentary champagne on arrival",
      "12-hour cancellation grace window",
    ],
    gift: "Welcome Gift: Deluxe Travel Repair Serum",
    featured: false,
  },
  {
    name: "Gold",
    price: "$89",
    desc: "Our signature membership — complete monthly ritual care.",
    features: [
      "2 Hair or Skin Rituals / mo",
      "15% off all retail products & extras",
      "Priority VIP weekend booking access",
      "Complimentary custom scalp or eye treatment",
      "Bring a guest with 10% discount",
    ],
    gift: "Welcome Gift: Full-size Gold Radiance Serum ($96 value)",
    featured: true,
  },
  {
    name: "Platinum",
    price: "$149",
    desc: "Unlimited bespoke care and private atelier privileges.",
    features: [
      "Unlimited monthly ritual services",
      "20% off all retail products",
      "Private room guarantee for every visit",
      "Dedicated master artist reserved for you",
      "Complimentary seasonal gift boxes",
      "24/7 Concierge booking assistant",
    ],
    gift: "Welcome Gift: Custom Atelier Ritual Box ($220 value)",
    featured: false,
  },
];

const COMPARISON = [
  { feature: "Monthly Included Treatments", silver: "1 Service", gold: "2 Services", platinum: "Unlimited" },
  { feature: "Product Retail Discount", silver: "10%", gold: "15%", platinum: "20%" },
  { feature: "VIP Priority Booking", silver: "Standard", gold: "48-hr Priority", platinum: "24/7 Concierge" },
  { feature: "Private Room Guarantee", silver: "—", gold: "Subject to Availability", platinum: "Guaranteed" },
  { feature: "Seasonal Gift Box", silver: "—", gold: "Annual", platinum: "Quarterly" },
];

export function Membership() {
  return (
    <section id="membership" className="relative overflow-hidden bg-[#0A0A0C] py-16 md:py-24">
      {/* Ambient gold glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(200,167,106,0.08),transparent_60%)] blur-[100px]" />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-12">
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={cn(
                "group relative flex flex-col rounded-3xl border p-7 transition-all duration-500",
                t.featured
                  ? "border-gold/50 bg-[#171510] shadow-[0_0_50px_rgba(200,167,106,0.18)]"
                  : "border-white/10 bg-[#111113] hover:border-gold/30 hover:shadow-[0_15px_45px_rgba(0,0,0,0.4)]"
              )}
            >
              {t.featured && (
                <div className="absolute -top-3.5 left-7 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#C8A76A] to-[#A8814A] px-4 py-1 font-mono text-[10px] uppercase tracking-widest2 text-[#0A0A0C] shadow-[0_4px_16px_rgba(200,167,106,0.35)]">
                  <Crown size={11} aria-hidden="true" />
                  Most Loved
                </div>
              )}

              <p className="font-mono text-[10px] uppercase tracking-widest2 text-gold">
                {t.name} Tier
              </p>

              <p className="mt-2 font-display text-[3rem] font-light leading-none text-ivory">
                {t.price}
                <span className="font-body text-[13px] text-ivory/40"> / month</span>
              </p>

              <p className="mt-2 font-body text-[13px] leading-relaxed text-ivory/50">
                {t.desc}
              </p>

              {/* Gift Badge */}
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-gold/20 bg-gold/5 px-3.5 py-2 text-gold">
                <Gift size={14} className="shrink-0" />
                <span className="font-body text-[11.5px] leading-tight text-gold-light">{t.gift}</span>
              </div>

              <div className={cn("my-6 h-px", t.featured ? "bg-gold/25" : "bg-white/10")} />

              <ul className="flex-1 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 font-body text-[13px]">
                    <Check size={14} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                    <span className="text-ivory/70">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/booking"
                className={cn(
                  "mt-7 rounded-full py-3.5 text-center font-body text-[11.5px] font-medium uppercase tracking-widest2 transition-all duration-300",
                  t.featured
                    ? "bg-gradient-to-r from-[#C8A76A] to-[#A8814A] text-[#0A0A0C] shadow-[0_4px_20px_rgba(200,167,106,0.3)] hover:scale-[1.02]"
                    : "border border-white/20 text-ivory/70 hover:border-gold/50 hover:text-gold-light"
                )}
              >
                Join {t.name} Club
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Membership Comparison Table */}
        <div className="mt-20">
          <div className="mb-8 text-center">
            <h3 className="font-display text-2xl text-ivory font-light">Compare Tier Benefits</h3>
            <p className="mt-1 font-body text-sm text-ivory/40">Select the tier that best matches your monthly care routine</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#111113] p-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 font-mono text-[11px] uppercase tracking-widest2 text-gold">
                  <th className="pb-4 font-normal">Feature</th>
                  <th className="pb-4 font-normal">Silver</th>
                  <th className="pb-4 font-normal text-gold-light">Gold</th>
                  <th className="pb-4 font-normal">Platinum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/05 font-body text-[13.5px]">
                {COMPARISON.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02]">
                    <td className="py-4 text-ivory/80">{row.feature}</td>
                    <td className="py-4 text-ivory/50">{row.silver}</td>
                    <td className="py-4 text-gold font-medium">{row.gold}</td>
                    <td className="py-4 text-ivory/50">{row.platinum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
