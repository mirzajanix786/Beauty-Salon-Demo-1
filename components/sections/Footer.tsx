"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Facebook, Youtube, ArrowRight, Check } from "lucide-react";
import { SALON_INFO, NAV_LINKS } from "@/lib/salon-info";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer className="relative overflow-hidden bg-[#0A0A0C] pt-24 text-ivory">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(200,167,106,0.06),transparent_65%)] blur-3xl" />

      {/* Oversized background word */}
      <div className="pointer-events-none absolute -bottom-6 left-0 right-0 select-none overflow-hidden text-center">
        <span
          aria-hidden="true"
          className="block whitespace-nowrap font-display text-[clamp(3rem,14vw,8rem)] font-light leading-none text-white/[0.03]"
        >
          Lumière
        </span>
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12">
        {/* Newsletter */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/08 pb-16 md:flex-row md:items-end">
          <div>
            <p className="section-num mb-4">Join the atelier list</p>
            <h3 className="max-w-md font-display text-[clamp(1.6rem,3.5vw,2.8rem)] font-light leading-tight text-ivory">
              First access to seasonal rituals<br />and private events.
            </h3>
          </div>

          <div className="w-full max-w-md md:w-auto">
            <form
              className="flex items-center border-b border-gold/35 pb-3"
              onSubmit={handleSubmit}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "submitting" || status === "done"}
                placeholder={
                  status === "done" ? "You're on the list." : "Your email address"
                }
                className="w-full bg-transparent font-body text-[14px] text-ivory placeholder:text-ivory/35 focus:outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === "submitting" || status === "done"}
                aria-label="Subscribe"
                className="ml-4 text-gold transition-transform hover:translate-x-1 disabled:hover:translate-x-0"
              >
                {status === "done" ? <Check size={18} /> : <ArrowRight size={18} />}
              </button>
            </form>
            {status === "error" && (
              <p role="alert" className="mt-2 font-body text-[13px] text-red-400">
                Something went wrong — please try again.
              </p>
            )}
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-4">
          <div>
            <Link href="/" className="block">
              <span className="font-display text-xl tracking-widest2 text-ivory">
                MAISON <span className="text-gold-gradient font-light italic">LUMIÈRE</span>
              </span>
            </Link>
            <p className="mt-4 max-w-[220px] font-body text-[13px] leading-relaxed text-ivory/40">
              A private beauty atelier for those who treat their rituals with
              intention.
            </p>
          </div>

          <div>
            <h5 className="mb-5 font-mono text-[10px] uppercase tracking-widest2 text-gold/70">
              Quick Links
            </h5>
            <ul className="space-y-3">
              {[...NAV_LINKS, { label: "Booking", href: "/booking" }].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-body text-[13px] text-ivory/50 transition-colors hover:text-gold-light"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mb-5 font-mono text-[10px] uppercase tracking-widest2 text-gold/70">
              Opening Hours
            </h5>
            <ul className="space-y-3">
              {SALON_INFO.hours.map((h) => (
                <li
                  key={h.label}
                  className="flex justify-between gap-4 font-body text-[13px] text-ivory/50"
                >
                  <span>{h.label}</span>
                  <span className="text-ivory/30">{h.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mb-5 font-mono text-[10px] uppercase tracking-widest2 text-gold/70">
              Visit
            </h5>
            <Link
              href="/contact"
              className="font-body text-[13px] leading-relaxed text-ivory/50 transition-colors hover:text-gold-light"
            >
              {SALON_INFO.addressLine1}
              <br />
              {SALON_INFO.addressLine2}
            </Link>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-ivory/45 transition-all duration-300 hover:border-gold/50 hover:text-gold"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="hairline" />
        <div className="flex flex-col items-center justify-between gap-4 py-8 font-mono text-[10px] uppercase tracking-widest2 text-ivory/25 md:flex-row">
          <span>© {new Date().getFullYear()} Maison Lumière. All rights reserved.</span>

          {/* Cimple Tech badge */}
          <a
            href="https://cimpletech.com.au/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Developed for Cimple Tech — opens in new tab"
            className="group inline-flex items-center gap-2 rounded-full border border-gold/20 bg-white/[0.04] px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest2 text-ivory/35 transition-all duration-300 hover:border-gold/50 hover:bg-white/[0.08] hover:text-gold/70"
          >
            {/* Small diamond/dot accent */}
            <span
              aria-hidden="true"
              className="block h-1 w-1 rounded-full bg-gold/50 transition-colors duration-300 group-hover:bg-gold"
            />
            Developed for{" "}
            <span className="text-gold/55 transition-colors duration-300 group-hover:text-gold">
              Cimple Tech
            </span>
          </a>
        </div>
      </div>

      {/* Cimple Tech demo notice */}
      <div
        id="cimple-tech-notice"
        role="contentinfo"
        aria-label="Cimple Tech demo notice"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          backgroundColor: "rgba(255,255,255,0.025)",
          padding: "12px 24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily:
              "'Space Grotesk', 'Manrope', system-ui, -apple-system, sans-serif",
            fontSize: "10px",
            fontWeight: 400,
            letterSpacing: "0.05em",
            color: "rgba(255,255,255,0.22)",
            lineHeight: 1.6,
          }}
        >
          This website is a demonstration project created for{" "}
          <span style={{ color: "rgba(200,167,106,0.55)", fontWeight: 500 }}>
            Cimple Tech
          </span>
          . It is intended solely for client presentations, development, and
          evaluation purposes.
        </p>
      </div>
    </footer>
  );
}
