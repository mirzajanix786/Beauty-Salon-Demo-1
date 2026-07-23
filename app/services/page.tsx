import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EditorialFrame } from "@/components/ui/EditorialFrame";
import { SERVICE_CATEGORIES } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "Every service at Maison Lumière — Hair Artistry, Skin Rituals, Spa & Body, Makeup Studio, and Nail Lounge — with full treatment menus and pricing.",
  alternates: { canonical: "/services" },
};

function startingPrice(prices: string[]) {
  const nums = prices
    .map((p) => parseInt(p.replace(/[^0-9]/g, ""), 10))
    .filter((n) => !Number.isNaN(n));
  return nums.length ? Math.min(...nums) : null;
}

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Five Disciplines"
        title="Services & pricing."
        description="Every category, every treatment, one standard of craft. Select a discipline to see the full menu."
        crumb="Services"
      />

      <section className="bg-[#0A0A0C] py-10 md:py-14">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(200,167,106,0.07),transparent_60%)] blur-3xl" />

        <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-5 px-6 sm:grid-cols-2 md:px-12 lg:grid-cols-3">
          {SERVICE_CATEGORIES.map((s, i) => {
            const from = startingPrice(s.treatments.map((t) => t.price));
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/08 bg-[#111113] shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_25px_60px_rgba(200,167,106,0.15)]"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <EditorialFrame
                    src={`/images/service-${s.slug}.jpg`}
                    alt={s.title}
                    brief={s.brief}
                    ratio="4/3"
                    className="transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111113]/60 via-transparent to-transparent" />
                  {/* Number badge */}
                  <div className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 bg-black/50 backdrop-blur">
                    <span className="font-mono text-[10px] text-gold">{s.n}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-[1.5rem] text-ivory transition-colors duration-400 group-hover:text-gold-light">
                    {s.title}
                  </h2>
                  <p className="mt-2 flex-1 font-body text-[13.5px] leading-relaxed text-ivory/50">
                    {s.tagline}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-white/08 pt-4">
                    <span className="font-mono text-[13px] text-gold">
                      {from ? `From $${from}` : "Enquire"}
                    </span>
                    <span className="flex items-center gap-1 font-body text-[11px] uppercase tracking-widest2 text-ivory/35 transition-colors group-hover:text-gold">
                      View menu
                      <ArrowUpRight
                        size={13}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
