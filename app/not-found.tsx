import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center bg-ink px-6 text-center">
      <span className="font-mono text-[11px] uppercase tracking-widest2 text-gold">
        404
      </span>
      <h1 className="mt-6 font-display text-5xl font-light text-ivory md:text-7xl">
        This page has <span className="italic text-gold">stepped out.</span>
      </h1>
      <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-ivory/60">
        The page you&apos;re looking for doesn&apos;t exist, or has moved.
        Let&apos;s get you back to the atelier.
      </p>
      <Link
        href="/"
        className="btn-luxury group mt-10 flex items-center gap-3 rounded-full border border-gold/50 px-8 py-4 font-body text-[12px] uppercase tracking-widest2 text-ivory transition-colors duration-300"
      >
        <span className="relative z-10 transition-colors duration-300 group-hover:text-ink">
          Return Home
        </span>
      </Link>
    </div>
  );
}
