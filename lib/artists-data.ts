export type Artist = {
  slug: string;
  name: string;
  role: string;
  years: string;
  handle: string;
  tone: "warm" | "dark" | "beige";
  bio: string;
  specialties: string[];
  serviceSlug: string;
};

/**
 * Single source of truth for the team. The homepage teaser
 * (components/sections/Artists.tsx), the /artists listing, every
 * /artists/[slug] detail page, and the Booking wizard's artist step all
 * read from this one array.
 */
export const ARTISTS: Artist[] = [
  {
    slug: "zara-khan",
    name: "Zara Khan",
    role: "Hair Specialist",
    years: "12 yrs",
    handle: "@zara.hair",
    tone: "warm",
    bio: "Zara trained in Paris and London before returning to lead our Hair Artistry studio. Her approach treats every cut as a sculptural decision — built around bone structure and how you actually live, not a trend pulled from a phone.",
    specialties: ["Precision cutting", "Balayage & colour theory", "Bridal hair"],
    serviceSlug: "hair-artistry",
  },
  {
    slug: "misha-ali",
    name: "Misha Ali",
    role: "Makeup Artist",
    years: "9 yrs",
    handle: "@misha.mua",
    tone: "dark",
    bio: "Misha's background is in editorial and runway makeup, which shows in how long-wear and camera-ready every application is. She's especially known for bridal work that photographs as beautifully as it feels.",
    specialties: ["Editorial makeup", "Bridal makeup", "Long-wear application"],
    serviceSlug: "makeup-studio",
  },
  {
    slug: "aiman-raza",
    name: "Aiman Raza",
    role: "Skin Expert",
    years: "14 yrs",
    handle: "@aiman.skin",
    tone: "warm",
    bio: "Aiman leads Skin Rituals with a diagnostic-first philosophy — no two facials she gives are the same, because no two people's skin is. Her clients often describe her as part esthetician, part detective.",
    specialties: ["Diagnostic facials", "Resurfacing protocols", "Anti-aging treatments"],
    serviceSlug: "skin-rituals",
  },
  {
    slug: "hira-noor",
    name: "Hira Noor",
    role: "Nail Artist",
    years: "7 yrs",
    handle: "@hira.nails",
    tone: "beige",
    bio: "Hira's nail art has a signature restraint to it — precise, considered, never overdone. She trained in Seoul's gel-extension studios and brought that level of technical precision back to the Nail Lounge.",
    specialties: ["Gel extensions", "Custom nail art", "Spa pedicures"],
    serviceSlug: "nail-lounge",
  },
];

export function getArtistBySlug(slug: string) {
  return ARTISTS.find((a) => a.slug === slug);
}
