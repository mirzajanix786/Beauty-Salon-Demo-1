import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock } from "lucide-react";
import { EditorialFrame } from "@/components/ui/EditorialFrame";
import { SERVICE_CATEGORIES, getServiceBySlug } from "@/lib/services-data";

export function generateStaticParams() {
  return SERVICE_CATEGORIES.map((s) => ({ slug: s.slug }));
}

// Our service categories are a fixed, known set (not user-generated), so
// any slug outside generateStaticParams() above should reliably 404
// rather than attempt an on-demand render.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.desc,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const otherServices = SERVICE_CATEGORIES.filter((s) => s.slug !== service.slug);

  return (
    <>
      {/* Compact Header */}
      <header className="relative flex min-h-[220px] w-full items-end overflow-hidden bg-ink pb-8 pt-24">
        <div className="absolute inset-0">
          <EditorialFrame
            src={`/images/service-${service.slug}.jpg`}
            alt={service.title}
            brief={service.brief}
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
              <Link href="/services" className="transition-colors hover:text-gold">
                Services
              </Link>
              <span>/</span>
              <span className="text-gold">{service.title}</span>
            </nav>
            <span className="font-mono text-[11px] uppercase tracking-widest2 text-gold">
              {service.n} — Signature Service
            </span>
            <h1 className="mt-4 max-w-2xl font-display text-5xl font-light leading-[1.05] text-ivory md:text-7xl">
              {service.title}
            </h1>
            <p className="mt-4 max-w-lg font-body text-sm leading-relaxed text-ivory/70">
              {service.tagline}
            </p>
          </div>
        </div>
      </header>

      {/* Description + treatments */}
      <section className="bg-ivory py-20 text-ink md:py-28">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-12">
          <div className="md:col-span-5">
            <span className="font-mono text-[11px] uppercase tracking-widest2 text-gold-dark">
              About this ritual
            </span>
            <p className="mt-4 font-body text-base leading-relaxed text-ink/70">
              {service.longDesc}
            </p>

            {service.artistNames.length > 0 && (
              <div className="mt-8">
                <span className="font-mono text-[11px] uppercase tracking-widest2 text-gold-dark">
                  Led by
                </span>
                <p className="mt-2 font-display text-xl">
                  {service.artistNames.join(", ")}
                </p>
                <Link
                  href="/artists"
                  className="mt-2 inline-flex items-center gap-1 font-body text-[12px] uppercase tracking-widest2 text-ink/50 transition-colors hover:text-gold-dark"
                >
                  Meet the team
                  <ArrowUpRight size={13} aria-hidden="true" />
                </Link>
              </div>
            )}

            <Link
              href="/booking"
              className="btn-luxury group mt-10 flex w-fit items-center gap-3 rounded-full border border-gold-dark/50 px-8 py-4 font-body text-[12px] uppercase tracking-widest2 text-ink transition-colors duration-300"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-ink">
                Book This Ritual
              </span>
            </Link>
          </div>

          <div className="md:col-span-7">
            <span className="font-mono text-[11px] uppercase tracking-widest2 text-gold-dark">
              Treatment menu
            </span>
            <div className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
              {service.treatments.map((t) => (
                <div
                  key={t.name}
                  className="flex items-center justify-between gap-4 py-5"
                >
                  <div>
                    <p className="font-display text-lg">{t.name}</p>
                    <p className="mt-1 flex items-center gap-1.5 font-body text-xs text-ink/50">
                      <Clock size={12} aria-hidden="true" />
                      {t.duration}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-base text-gold-dark">
                    {t.price}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 font-body text-xs text-ink/40">
              Pricing is a guide — your specialist will confirm exact cost at
              consultation based on length, condition, and complexity.
            </p>
          </div>
        </div>

        {/* Gallery strip */}
        <div className="mx-auto mt-20 grid max-w-[1400px] grid-cols-1 gap-4 px-6 sm:grid-cols-3 md:px-12">
          {service.galleryBriefs.map((brief, i) => (
            <EditorialFrame
              key={i}
              src={`/images/service-${service.slug}-detail-${i + 1}.jpg`}
              alt={`${service.title} detail`}
              brief={brief}
              ratio="3/4"
              className="rounded-2xl"
            />
          ))}
        </div>
      </section>

      {/* Other services */}
      <section className="border-t border-white/10 bg-ink py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <span className="font-mono text-[11px] uppercase tracking-widest2 text-gold">
            Explore more
          </span>
          <h2 className="mt-3 font-display text-3xl font-light text-ivory md:text-4xl">
            Other disciplines.
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex items-center justify-between gap-3 rounded-sm border border-white/10 px-5 py-4 transition-colors duration-300 hover:border-gold/40"
              >
                <span className="font-display text-lg text-ivory group-hover:text-gold">
                  {s.title}
                </span>
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="text-ivory/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
