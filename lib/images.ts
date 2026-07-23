/**
 * Central image registry for Maison Lumière.
 * All images use locally-generated files in /public/images/ where available,
 * falling back to curated Unsplash royalty-free luxury images.
 * 
 * Local files take priority — drop a correctly-named file into /public/images/
 * and it replaces the Unsplash URL automatically (update this file).
 */

// High-quality Unsplash luxury beauty salon images (free, no attribution required)
export const IMAGES = {
  // Hero
  heroEditorial: "/images/hero-editorial.png",
  heroAlt: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1400&q=85&fit=crop",

  // About / Philosophy
  aboutInterior: "/images/about-salon-interior.jpg",
  aboutInteriorAlt: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=900&q=85&fit=crop",
  aboutFounder: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=85&fit=crop",
  aboutTeam: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=900&q=85&fit=crop",

  // Services
  serviceHairArtistry: "/images/service-hair-artistry.jpg",
  serviceSkinRituals: "/images/service-skin-rituals.jpg",
  serviceSpaBody: "/images/service-spa-body.jpg",
  serviceMakeupStudio: "/images/service-makeup-studio.jpg",
  serviceNailLounge: "/images/service-nail-lounge.jpg",

  // Service detail alts (Unsplash)
  serviceHairAlt: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=85&fit=crop",
  serviceSkinAlt: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=85&fit=crop",
  serviceSpaAlt: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=85&fit=crop",
  serviceMakeupAlt: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&q=85&fit=crop",
  serviceNailAlt: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=900&q=85&fit=crop",

  // Artists
  artistZaraKhan: "/images/artist-zara-khan.jpg",
  artistMishaAli: "/images/artist-misha-ali.jpg",
  artistAimanRaza: "/images/artist-aiman-raza.jpg",
  artistHiraNoor: "/images/artist-hira-noor.jpg",

  // Artist alts (Unsplash)
  artistZaraAlt: "https://images.unsplash.com/photo-1562124638-724e13052daf?w=600&q=85&fit=crop",
  artistMishaAlt: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=85&fit=crop",
  artistAimanAlt: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600&q=85&fit=crop",
  artistHiraAlt: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=85&fit=crop",

  // Gallery / Atmosphere
  galleryStylingChairs: "https://images.unsplash.com/photo-1604604994333-f1b0e9471186?w=800&q=85&fit=crop",
  galleryReception: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=85&fit=crop",
  galleryProductWall: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=85&fit=crop",
  galleryWashLounge: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=85&fit=crop",
  galleryNeonSign: "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=800&q=85&fit=crop",
  galleryTreatmentRoom: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=85&fit=crop",

  // Before / After
  beforeHair: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=85&fit=crop",
  afterHair: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=900&q=85&fit=crop",

  // Products
  productGoldRadianceSerum: "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=600&q=85&fit=crop",
  productSilkRepairOil: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=85&fit=crop",
  productVelvetMattBalm: "https://images.unsplash.com/photo-1631730359585-b952d6c3d9fe?w=600&q=85&fit=crop",

  // Testimonials
  testimonialAyesha: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=85&fit=crop&crop=face",
  testimonialSana: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=85&fit=crop&crop=face",
  testimonialHira: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=85&fit=crop&crop=face",

  // Instagram / Reels
  instagramHairTransformation: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80&fit=crop",
  instagramMakeupMacro: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80&fit=crop",
  instagramNailArt: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80&fit=crop",
  instagramSpaRitual: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=80&fit=crop",
  instagramColourMixing: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&q=80&fit=crop",
  instagramClientReveal: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=400&q=80&fit=crop",

  // Booking CTA
  bookingCTA: "/images/booking-cta-bg.jpg",
  bookingCTAAlt: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1400&q=85&fit=crop",

  // Contact
  contactReception: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=900&q=85&fit=crop",
} as const;

/** Returns the local path if it exists (best quality), else falls back to the Unsplash URL */
export function img(local: string, fallback: string): string {
  return local ?? fallback;
}
