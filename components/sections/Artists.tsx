"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EditorialFrame } from "@/components/ui/EditorialFrame";
import { ARTISTS, type Artist } from "@/lib/artists-data";
import { IMAGES } from "@/lib/images";

const ARTIST_IMAGES: Record<string, string> = {
  "zara-khan": IMAGES.artistZaraKhan,
  "misha-ali": IMAGES.artistMishaAli,
  "aiman-raza": IMAGES.artistAimanRaza,
  "hira-noor": IMAGES.artistHiraNoor,
};

const ARTIST_DESCRIPTIONS: Record<string, string> = {
  "zara-khan": "Luxury Hair Stylist with 12 years of experience.",
  "misha-ali": "Editorial Makeup Artist with 9 years of experience.",
  "aiman-raza": "Clinical Skin Expert with 14 years of experience.",
  "hira-noor": "Precision Nail Artist with 7 years of experience.",
};

function ArtistCard({ artist, i }: { artist: Artist; i: number }) {
  const imageSrc = ARTIST_IMAGES[artist.slug] || IMAGES.artistZaraAlt;
  const shortDesc = ARTIST_DESCRIPTIONS[artist.slug] || `${artist.role} with extensive experience.`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: i * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-[22px] border border-gold/15 bg-[#111111] shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-[6px] hover:border-gold/40 hover:shadow-[0_20px_40px_rgba(200,167,106,0.15)]"
    >
      {/* Image container (~70% height) */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#161616]">
        <EditorialFrame
          src={imageSrc}
          alt={artist.name}
          brief={`Portrait · ${artist.role}`}
          ratio="auto"
          className="h-full w-full transition-transform duration-700 ease-luxury group-hover:scale-[1.03]"
        />
        {/* Soft bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/20 to-transparent opacity-90" />
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-5 pt-1 text-left">
        <div>
          {/* Category / Role */}
          <span className="font-mono text-[10px] uppercase tracking-widest2 text-gold">
            {artist.role}
          </span>

          {/* Artist Name */}
          <h3 className="mt-1 font-display text-[26px] font-light leading-snug text-ivory">
            {artist.name}
          </h3>

          {/* 1 short elegant sentence */}
          <p className="mt-1.5 font-body text-[12.5px] leading-relaxed text-ivory/60 line-clamp-1">
            {shortDesc}
          </p>
        </div>

        {/* Small Gold Button */}
        <div className="mt-5 pt-2">
          <Link
            href="/booking"
            className="btn-gold-fill group/btn inline-flex w-full items-center justify-center rounded-full py-2.5 font-body text-[11px] font-semibold uppercase tracking-widest2 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(200,167,106,0.35)]"
          >
            Book Artist
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function Artists() {
  return (
    <section id="artists" className="relative bg-[#0A0A0C] py-16 md:py-24">
      {/* Ambient lighting */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[350px] w-[800px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(200,167,106,0.06),transparent_60%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1340px] px-6 md:px-10">
        {/* Minimal Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-white/08 pb-6 md:flex-row md:items-end">
          <div>
            <div className="section-num mb-2">Master Craftsmen</div>
            <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-light leading-[1.08] text-ivory">
              Meet the artists.
            </h2>
          </div>
          <p className="max-w-xs font-body text-[13.5px] leading-relaxed text-ivory/45">
            Every specialist at Maison Lumière leads a single dedicated discipline.
          </p>
        </div>

        {/* 4 Cards Grid with generous 28-36px spacing */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {ARTISTS.map((a, i) => (
            <ArtistCard key={a.slug} artist={a} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
