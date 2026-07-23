import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Award, ShieldCheck, HeartHandshake, Sparkles, Clock, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EditorialFrame } from "@/components/ui/EditorialFrame";
import { Philosophy } from "@/components/sections/Philosophy";
import { Journey } from "@/components/sections/Journey";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Our story, brand philosophy, founder vision, and the salon experience at Maison Lumière.",
  alternates: { canonical: "/about" },
};

const TIMELINE = [
  { year: "2011", title: "Founded in Paris", desc: "Maison Lumière opened its doors as a boutique 3-chair atelier focused purely on bespoke hair sculpture." },
  { year: "2015", title: "Expansion to Skin Rituals", desc: "Introduced diagnostic dermal therapies in collaboration with leading estheticians from Tokyo." },
  { year: "2019", title: "Flagship Atelier Launch", desc: "Moved into our current architectural sanctuary featuring marble, brass, and private treatment suites." },
  { year: "2024", title: "Retail Botanical Edit", desc: "Launched our in-house formulation line of organic hair oils and gold radiance serums." },
];

const AWARDS = [
  { title: "Best Luxury Atelier 2024", issuer: "Elle Beauty Awards" },
  { title: "Excellence in Dermal Rituals", issuer: "Harper's Bazaar Spa Edit" },
  { title: "Architectural Interior of the Year", issuer: "Design Digest" },
  { title: "Master Colorist Distinction", issuer: "International Hair Guild" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Story & Vision"
        title="Why Maison Lumière exists."
        description="A private atelier built on the belief that beauty care is a considered discipline, not a rushed errand."
        crumb="About"
      />

      {/* Founder Section */}
      <section className="bg-[#0A0A0C] py-16 md:py-24 text-ivory">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-12 items-center md:grid-cols-12">
            
            <div className="relative md:col-span-5">
              <div className="overflow-hidden rounded-3xl border border-gold/25 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <EditorialFrame
                  src={IMAGES.aboutFounder}
                  alt="Founder of Maison Lumière"
                  brief="Founder portrait · warm studio light"
                  ratio="4/5"
                  className="w-full"
                />
              </div>
              <div className="absolute -bottom-4 -right-2 rounded-2xl border border-gold/30 bg-[#171510] px-5 py-3 shadow-xl">
                <p className="font-display text-base text-gold">Elena Lumière</p>
                <p className="font-mono text-[10px] text-ivory/50 uppercase tracking-wider">Founder & Master Stylist</p>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="section-num mb-4">Founder&apos;s Note</div>
              <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-light leading-[1.12]">
                &ldquo;We created a space where time slows down and your individuality is respected.&rdquo;
              </h2>
              <p className="mt-5 font-body text-[14.5px] leading-relaxed text-ivory/60">
                After spending over a decade working behind the scenes at international fashion weeks and high-volume salons, I realized something vital was missing from modern beauty care: stillness, individual diagnosis, and true craftsmanship.
              </p>
              <p className="mt-4 font-body text-[14.5px] leading-relaxed text-ivory/60">
                Maison Lumière was built to return intention to the ritual. We don&apos;t apply template formulas or rush clients through chairs. Every specialist here spends dedicated, unhurried time with one guest at a time.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 font-body text-sm">
                <div className="flex items-center gap-2 text-gold">
                  <ShieldCheck size={16} />
                  <span className="text-ivory/80">Diagnostic Consultations</span>
                </div>
                <div className="flex items-center gap-2 text-gold">
                  <HeartHandshake size={16} />
                  <span className="text-ivory/80">Private Single Suites</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Philosophy />

      {/* Brand Timeline */}
      <section className="bg-[#131316] py-16 md:py-24 text-ivory">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="mb-12 text-center">
            <div className="section-num mb-3 justify-center">Our Heritage</div>
            <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-light text-ivory">The Journey of Maison Lumière</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((t, idx) => (
              <div key={idx} className="rounded-2xl border border-white/08 bg-[#111113] p-6">
                <span className="font-mono text-xl text-gold font-light">{t.year}</span>
                <h3 className="mt-2 font-display text-lg text-ivory">{t.title}</h3>
                <p className="mt-2 font-body text-[13px] leading-relaxed text-ivory/50">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Journey />

      {/* Awards Section */}
      <section className="bg-[#0A0A0C] py-16 md:py-24 text-ivory border-t border-white/08">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="mb-12 text-center">
            <div className="section-num mb-3 justify-center">Recognition & Distinction</div>
            <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-light text-ivory">Honored by Industry Leaders</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AWARDS.map((a, idx) => (
              <div key={idx} className="flex items-center gap-4 rounded-2xl border border-gold/20 bg-gold/5 p-5">
                <Award size={24} className="shrink-0 text-gold" />
                <div>
                  <h4 className="font-display text-base text-ivory">{a.title}</h4>
                  <p className="font-mono text-[10.5px] uppercase text-gold/70 mt-0.5">{a.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
