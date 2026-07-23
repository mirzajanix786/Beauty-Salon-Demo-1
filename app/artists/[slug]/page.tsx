import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Instagram } from "lucide-react";
import { EditorialFrame } from "@/components/ui/EditorialFrame";
import { ARTISTS, getArtistBySlug } from "@/lib/artists-data";
import { getServiceBySlug } from "@/lib/services-data";

export function generateStaticParams() {
  return ARTISTS.map((a) => ({ slug: a.slug }));
}

// The team is a fixed, known set — any slug outside generateStaticParams
// above should reliably 404 rather than attempt an on-demand render.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) return {};
  return {
    title: artist.name,
    description: `${artist.name}, ${artist.role} at Maison Lumière — ${artist.years} of experience.`,
    alternates: { canonical: `/artists/${artist.slug}` },
  };
}

export default async function ArtistDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) notFound();

  const service = getServiceBySlug(artist.serviceSlug);
  const otherArtists = ARTISTS.filter((a) => a.slug !== artist.slug);

  return (
    <>
      <header className="relative flex min-h-[max(70svh,420px)] w-full items-end overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <EditorialFrame
            src={`/images/artist-${artist.slug}.jpg`}
            alt={artist.name}
            brief={`Portrait · ${artist.role} · editorial lighting`}
            ratio="auto"
            priority
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        </div>

        <div className="relative z-10 w-full px-6 pb-16 md:px-12">
          <div className="mx-auto max-w-[1400px]">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-ivory/50"
            >
              <Link href="/" className="transition-colors hover:text-gold">
                Home
              </Link>
              <span>/</span>
              <Link href="/artists" className="transition-colors hover:text-gold">
                Artists
              </Link>
              <span>/</span>
              <span className="text-gold">{artist.name}</span>
            </nav>
            <span className="font-mono text-[11px] uppercase tracking-widest2 text-gold">
              {artist.role} · {artist.years} experience
            </span>
            <h1 className="mt-4 max-w-2xl font-display text-5xl font-light leading-[1.05] text-ivory md:text-7xl">
              {artist.name}
            </h1>
          </div>
        </div>
      </header>

      <section className="bg-ivory py-20 text-ink md:py-28">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-12">
          <div className="md:col-span-7">
            <span className="font-mono text-[11px] uppercase tracking-widest2 text-gold-dark">
              About {artist.name.split(" ")[0]}
            </span>
            <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-ink/70">
              {artist.bio}
            </p>

            <div className="mt-8">
              <span className="font-mono text-[11px] uppercase tracking-widest2 text-gold-dark">
                Specialties
              </span>
              <ul className="mt-3 flex flex-wrap gap-2">
                {artist.specialties.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-ink/15 px-4 py-1.5 font-body text-sm text-ink/70"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={`/booking?artist=${encodeURIComponent(artist.name)}${
                  service ? `&service=${encodeURIComponent(service.title)}` : ""
                }`}
                className="btn-luxury group flex items-center gap-3 rounded-full border border-gold-dark/50 px-8 py-4 font-body text-[12px] uppercase tracking-widest2 text-ink transition-colors duration-300"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-ink">
                  Book with {artist.name.split(" ")[0]}
                </span>
              </Link>
              <a
                href={`https://instagram.com/${artist.handle.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-[12px] uppercase tracking-widest2 text-ink/50 transition-colors hover:text-gold-dark"
              >
                <Instagram size={14} aria-hidden="true" />
                {artist.handle}
              </a>
            </div>
          </div>

          {service && (
            <div className="md:col-span-5">
              <span className="font-mono text-[11px] uppercase tracking-widest2 text-gold-dark">
                Discipline
              </span>
              <Link
                href={`/services/${service.slug}`}
                className="group mt-4 flex items-center justify-between gap-4 rounded-sm border border-ink/10 p-6 transition-colors duration-300 hover:border-gold/40"
              >
                <div>
                  <p className="font-display text-2xl">{service.title}</p>
                  <p className="mt-1 font-body text-sm text-ink/60">
                    {service.tagline}
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="shrink-0 text-ink/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold-dark"
                />
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-white/10 bg-ink py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <span className="font-mono text-[11px] uppercase tracking-widest2 text-gold">
            Meet the rest of the team
          </span>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
            {otherArtists.map((a) => (
              <Link
                key={a.slug}
                href={`/artists/${a.slug}`}
                className="group flex items-center justify-between gap-3 rounded-sm border border-white/10 px-5 py-4 transition-colors duration-300 hover:border-gold/40"
              >
                <span>
                  <span className="block font-display text-lg text-ivory group-hover:text-gold">
                    {a.name}
                  </span>
                  <span className="block font-body text-xs text-ivory/40">
                    {a.role}
                  </span>
                </span>
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="shrink-0 text-ivory/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
