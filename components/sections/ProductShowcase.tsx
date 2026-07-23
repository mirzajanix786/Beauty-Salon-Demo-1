"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { EditorialFrame } from "@/components/ui/EditorialFrame";
import { IMAGES } from "@/lib/images";

const PRODUCTS = [
  { slug: "gold-radiance-serum", name: "Gold Radiance Serum", price: "$96", category: "Skincare Ritual", img: IMAGES.productGoldRadianceSerum, brief: "Amber glass bottle · gold cap" },
  { slug: "silk-repair-oil", name: "Silk Repair Hair Oil", price: "$68", category: "Hair Artistry", img: IMAGES.productSilkRepairOil, brief: "Frosted glass · dropper" },
  { slug: "velvet-matte-balm", name: "Velvet Botanical Balm", price: "$42", category: "Lip & Skin Care", img: IMAGES.productVelvetMattBalm, brief: "Matte cylinder · gold band" },
];

export function ProductShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#131316] py-16 md:py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,167,106,0.1),transparent_65%)] blur-[90px]" />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-12">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-white/08 pb-8 md:flex-row md:items-end">
          <div>
            <div className="section-num mb-3">Atelier Retail Collections</div>
            <h2 className="max-w-lg font-display text-[clamp(2rem,3.8vw,3.2rem)] font-light leading-[1.08] text-ivory">
              Formulated for home,<br />
              <em className="italic text-gold/80">tested in atelier.</em>
            </h2>
          </div>
          <p className="max-w-xs font-body text-[13.5px] leading-relaxed text-ivory/50">
            Every formula is tested and used during our professional rituals before joining our home care edit.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-[#111113] p-5 transition-all duration-500 hover:border-gold/40 hover:shadow-[0_15px_45px_rgba(200,167,106,0.15)]"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#171511]">
                <EditorialFrame
                  src={p.img}
                  alt={p.name}
                  brief={p.brief}
                  ratio="auto"
                  className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-full border border-gold/30 bg-black/60 px-3 py-1 font-mono text-[9.5px] uppercase tracking-widest text-gold backdrop-blur">
                  {p.category}
                </span>
              </div>

              <div className="mt-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-display text-[1.3rem] text-ivory">{p.name}</h3>
                  <p className="mt-1 font-mono text-sm text-gold font-medium">{p.price}</p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/08 pt-3">
                  <span className="font-body text-[11px] uppercase tracking-widest2 text-ivory/40 group-hover:text-gold transition-colors">
                    Professional Grade
                  </span>
                  <a
                    href="/booking"
                    className="flex items-center gap-1.5 rounded-full border border-gold/30 px-3.5 py-1.5 font-body text-[11px] uppercase tracking-widest2 text-ivory transition-all duration-300 hover:bg-gold hover:text-[#0A0A0C]"
                  >
                    <ShoppingBag size={12} />
                    Reserve
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
