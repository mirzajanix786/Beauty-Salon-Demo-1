import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHeader({
  eyebrow,
  title,
  description,
  crumb,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  crumb: string;
}) {
  return (
    <header className="relative flex items-center overflow-hidden bg-[#0A0A0C] pb-8 pt-24 md:pb-10 md:pt-28 border-b border-white/05">
      {/* Ambient subtle glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_30%,rgba(200,167,106,0.08),transparent_65%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1280px] px-6 md:px-12">
        {/* Compact Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest2 text-ivory/40"
        >
          <Link href="/" className="transition-colors hover:text-gold">
            Home
          </Link>
          <ChevronRight size={10} aria-hidden="true" />
          <span className="text-gold">{crumb}</span>
        </nav>

        {/* Compact Eyebrow */}
        <div className="section-num mb-2 text-[10px]">{eyebrow}</div>

        {/* Compact Title & Description in flex/grid on desktop to save vertical space */}
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-8">
          <h1 className="font-display text-[clamp(1.8rem,3.2vw,3rem)] font-light leading-tight text-ivory">
            {title}
          </h1>

          {description && (
            <p className="max-w-md font-body text-[13.5px] leading-relaxed text-ivory/60">
              {description}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
