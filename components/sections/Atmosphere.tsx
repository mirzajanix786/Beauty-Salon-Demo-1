"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { EditorialFrame } from "@/components/ui/EditorialFrame";
import { IMAGES } from "@/lib/images";

const GALLERY = [
  { img: IMAGES.galleryReception, title: "Grand Reception", category: "Interior", brief: "Reception, marble + brass", ratio: "4/5" },
  { img: IMAGES.galleryStylingChairs, title: "Styling Chairs Studio", category: "Hair Artistry", brief: "Styling chairs, wide shot", ratio: "1/1" },
  { img: IMAGES.galleryProductWall, title: "Apothecary Retail Wall", category: "Retail", brief: "Product wall, gold shelving", ratio: "3/4" },
  { img: IMAGES.galleryWashLounge, title: "Thermal Wash Lounge", category: "Spa & Wash", brief: "Wash lounge, low light", ratio: "1/1" },
  { img: IMAGES.galleryNeonSign, title: "Atelier Art Statement", category: "Atmosphere", brief: "Neon sign detail", ratio: "3/4" },
  { img: IMAGES.galleryTreatmentRoom, title: "Private VIP Suite", category: "Facial Suite", brief: "Treatment room, candlelight", ratio: "4/5" },
];

const CATEGORIES = ["All", "Interior", "Hair Artistry", "Facial Suite", "Atmosphere"];

export function Atmosphere() {
  const [open, setOpen] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");

  const items = filter === "All" ? GALLERY : GALLERY.filter(g => g.category === filter);

  return (
    <section className="relative bg-[#FAF7F2] py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">

        {/* Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 border-b border-[#0A0A0C]/10 pb-8 md:flex-row md:items-end">
          <div>
            <div className="section-num mb-3 text-gold-dark">Salon Atmosphere</div>
            <h2 className="font-display text-[clamp(2rem,3.8vw,3.2rem)] font-light leading-[1.08] text-[#0A0A0C]">
              Step inside<br />
              <em className="italic text-gold-dark">the private atelier.</em>
            </h2>
          </div>
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-4 py-1.5 font-body text-[12px] transition-all duration-300 ${
                  filter === cat
                    ? "bg-[#0A0A0C] text-ivory shadow-sm"
                    : "border border-[#0A0A0C]/15 text-[#0A0A0C]/60 hover:border-gold-dark hover:text-[#0A0A0C]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((g, i) => (
            <motion.button
              key={g.title}
              type="button"
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-2xl border border-[#0A0A0C]/08 bg-white text-left shadow-sm transition-all duration-500 hover:border-gold/50 hover:shadow-[0_12px_40px_rgba(200,167,106,0.18)]"
              aria-label={`View larger: ${g.title}`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <EditorialFrame
                  src={g.img}
                  alt={g.title}
                  brief={g.brief}
                  ratio="auto"
                  className="h-full w-full transition-transform duration-700 ease-luxury group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-[#0A0A0C]/0 transition-colors duration-500 group-hover:bg-[#0A0A0C]/25">
                  <ZoomIn
                    size={22}
                    className="scale-75 text-ivory opacity-0 transition-all duration-400 group-hover:scale-100 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base text-[#0A0A0C]">{g.title}</h3>
                  <span className="font-mono text-[10px] text-[#0A0A0C]/50 uppercase tracking-wider">{g.category}</span>
                </div>
                <span className="font-mono text-[10px] text-gold-dark uppercase tracking-widest">Enlarge</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open !== null && items[open] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0A0A0C]/92 p-6 backdrop-blur-md"
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image viewer"
          >
            <button
              onClick={() => setOpen(null)}
              aria-label="Close viewer"
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-ivory backdrop-blur transition-all hover:border-gold hover:text-gold"
            >
              <X size={18} aria-hidden="true" />
            </button>
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-3xl border border-gold/25 shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
            >
              <EditorialFrame
                src={items[open].img}
                alt={items[open].title}
                brief={items[open].brief}
                ratio="4/3"
                className="w-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
