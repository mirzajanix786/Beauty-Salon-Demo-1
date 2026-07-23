export type Tone = "warm" | "dark" | "beige";

export type Treatment = {
  name: string;
  duration: string;
  price: string;
};

export type ServiceCategory = {
  slug: string;
  n: string;
  title: string;
  tagline: string;
  desc: string;
  longDesc: string;
  brief: string;
  galleryBriefs: string[];
  tone: Tone;
  treatments: Treatment[];
  artistNames: string[];
};

/**
 * Single source of truth for every "category" (service) on the site.
 * The homepage teaser (components/sections/Services.tsx), the full
 * listing (/services), and every detail page (/services/[slug]) all read
 * from this one array — so title/description/pricing only ever needs to
 * be edited in one place.
 */
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: "hair-artistry",
    n: "01",
    title: "Hair Artistry",
    tagline: "Precision, colour, and texture — treated as sculpture.",
    desc: "Precision cutting, colour theory, and texture work treated as sculpture.",
    longDesc:
      "Every cut begins with a conversation about how you actually live, not a photo pulled from a phone. Our stylists trained across Paris and Tokyo bring a sculptural, face-first approach to cutting, and a colour philosophy built on dimension rather than flat, single-tone coverage.",
    brief: "Model, hair in motion · studio strobe",
    galleryBriefs: [
      "Precision cut in progress, close crop",
      "Colour application, foil detail",
      "Finished blowout, editorial light",
    ],
    tone: "warm",
    treatments: [
      { name: "Signature Cut & Style", duration: "60 min", price: "$85" },
      { name: "Colour & Balayage", duration: "150 min", price: "$220" },
      { name: "Keratin Smoothing Treatment", duration: "120 min", price: "$260" },
      { name: "Bridal Hair Trial + Day-Of", duration: "180 min", price: "$380" },
    ],
    artistNames: ["Zara Khan"],
  },
  {
    slug: "skin-rituals",
    n: "02",
    title: "Skin Rituals",
    tagline: "Diagnostic facials for a considered, lasting glow.",
    desc: "Diagnostic facials and resurfacing protocols for a considered glow.",
    longDesc:
      "We start every skin ritual with a real diagnostic — barrier health, hydration, sensitivity — before touching a single product. From there, protocols are built and adjusted visit to visit, the way a considered skincare routine should be, not a fixed menu applied to everyone the same way.",
    brief: "Macro skin detail · dewy finish",
    galleryBriefs: [
      "Diagnostic consultation, close crop",
      "Facial treatment in progress",
      "Finished glow, natural light",
    ],
    tone: "beige",
    treatments: [
      { name: "Signature Diagnostic Facial", duration: "75 min", price: "$140" },
      { name: "Deep Cleanse & Extraction", duration: "60 min", price: "$110" },
      { name: "Anti-Aging Renewal Ritual", duration: "90 min", price: "$195" },
      { name: "Bridal Skin Prep (3-session course)", duration: "3 x 75 min", price: "$420" },
    ],
    artistNames: ["Aiman Raza"],
  },
  {
    slug: "spa-body",
    n: "03",
    title: "Spa & Body",
    tagline: "Slow, therapeutic bodywork from Mediterranean and Japanese ritual.",
    desc: "Slow, therapeutic bodywork drawn from Mediterranean and Japanese ritual.",
    longDesc:
      "This is the one part of your visit with nowhere to be. Our body treatments draw on Mediterranean thermal ritual and Japanese pressure-point technique, performed slowly, in a private room, with no clock in sight.",
    brief: "Spa interior · candlelight · stone",
    galleryBriefs: [
      "Hot stone detail, warm light",
      "Private treatment room",
      "Aromatherapy oils, macro",
    ],
    tone: "dark",
    treatments: [
      { name: "Full Body Massage", duration: "60 min", price: "$120" },
      { name: "Hot Stone Therapy", duration: "90 min", price: "$175" },
      { name: "Aromatherapy Ritual", duration: "75 min", price: "$150" },
      { name: "Couples Retreat", duration: "90 min", price: "$320 / pair" },
    ],
    artistNames: [],
  },
  {
    slug: "makeup-studio",
    n: "04",
    title: "Makeup Studio",
    tagline: "Editorial and bridal makeup, built to photograph as well as it feels.",
    desc: "Editorial and bridal makeup built to photograph as well as it feels.",
    longDesc:
      "Makeup here is built for how modern life is actually documented — under flash, on camera, at close range — without sacrificing how it feels to wear. Every application is skin-first, long-wear, and tailored to your features rather than a single house look.",
    brief: "Beauty macro · gold pigment",
    galleryBriefs: [
      "Eye makeup detail, gold pigment",
      "Application in progress",
      "Finished bridal look",
    ],
    tone: "warm",
    treatments: [
      { name: "Editorial Makeup", duration: "60 min", price: "$95" },
      { name: "Bridal Makeup (trial + day-of)", duration: "150 min", price: "$340" },
      { name: "Party Glam", duration: "45 min", price: "$75" },
      { name: "Private Makeup Lesson", duration: "90 min", price: "$160" },
    ],
    artistNames: ["Misha Ali"],
  },
  {
    slug: "nail-lounge",
    n: "05",
    title: "Nail Lounge",
    tagline: "Hand and foot artistry, finished with archival-grade lacquers.",
    desc: "Hand and foot artistry finished with archival-grade lacquers.",
    longDesc:
      "Nail work here is treated with the same precision as the rest of the atelier — proper cuticle care, archival-grade lacquer that won't yellow or chip early, and nail art built to last, not just photograph well on day one.",
    brief: "Hand detail · gold rings",
    galleryBriefs: [
      "Manicure in progress, macro",
      "Nail art detail, gold accents",
      "Finished set, editorial light",
    ],
    tone: "beige",
    treatments: [
      { name: "Classic Manicure", duration: "45 min", price: "$45" },
      { name: "Gel Extension Set", duration: "90 min", price: "$95" },
      { name: "Custom Nail Art (per hand)", duration: "30 min", price: "$25+" },
      { name: "Spa Pedicure", duration: "60 min", price: "$65" },
    ],
    artistNames: ["Hira Noor"],
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICE_CATEGORIES.find((s) => s.slug === slug);
}
