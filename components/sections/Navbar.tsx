"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICE_CATEGORIES } from "@/lib/services-data";
import { ARTISTS } from "@/lib/artists-data";

// Submenu items mapping for dropdown menus
const DROPDOWNS: Record<string, { label: string; href: string; sub?: string }[]> = {
  "/services": [
    ...SERVICE_CATEGORIES.map((s) => ({
      label: s.title,
      href: `/services/${s.slug}`,
      sub: s.tagline,
    })),
    { label: "All Services & Pricing", href: "/services", sub: "View complete menu" },
  ],
  "/artists": [
    ...ARTISTS.map((a) => ({
      label: a.name,
      href: `/artists#${a.slug}`,
      sub: a.role,
    })),
    { label: "Meet All Artists", href: "/artists", sub: "View our master team" },
  ],
  "/gallery": [
    { label: "Grand Reception", href: "/gallery", sub: "Architectural Interior" },
    { label: "Styling Suite", href: "/gallery", sub: "Hair Artistry Studio" },
    { label: "VIP Treatment Rooms", href: "/gallery", sub: "Facial & Spa Rooms" },
    { label: "Full Photo Gallery", href: "/gallery", sub: "Look inside atelier" },
  ],
  "/membership": [
    { label: "Silver Tier ($49)", href: "/membership#silver", sub: "Monthly Hair or Skin Ritual" },
    { label: "Gold Tier ($89)", href: "/membership#gold", sub: "Priority VIP privileges" },
    { label: "Platinum Tier ($149)", href: "/membership#platinum", sub: "Unlimited private care" },
  ],
};

const NAV_LINKS = [
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Artists", href: "/artists", hasDropdown: true },
  { label: "Gallery", href: "/gallery", hasDropdown: true },
  { label: "Membership", href: "/membership", hasDropdown: true },
  { label: "About", href: "/about", hasDropdown: false },
  { label: "Contact", href: "/contact", hasDropdown: false },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <>
      {/* Header — sits directly below the 36px DemoBanner */}
      <header className="fixed inset-x-0 top-[36px] z-50 w-full transition-all duration-300">
        <motion.nav
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "mx-auto flex w-full items-center justify-between transition-all duration-300 ease-out px-6 md:px-12",
            scrolled
              ? "h-[64px] bg-[#0A0A0C] border-b border-gold/20 shadow-[0_4px_30px_rgba(0,0,0,0.9)] text-ivory"
              : "h-[76px] bg-[#0A0A0C]/85 backdrop-blur-md text-ivory border-b border-white/05"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 whitespace-nowrap font-display text-xl tracking-widest2 text-ivory transition-opacity duration-300 hover:opacity-85"
          >
            MAISON <span className="text-gold-gradient font-light italic">LUMIÈRE</span>
          </Link>

          {/* Center nav links with hover dropdowns */}
          <ul className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              const dropdownItems = DROPDOWNS[link.href];

              return (
                <li
                  key={link.href}
                  className="relative py-4"
                  onMouseEnter={() => setActiveDropdown(link.href)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group flex items-center gap-1.5 whitespace-nowrap font-body text-[11.5px] uppercase tracking-widest2 transition-colors duration-300",
                      active
                        ? "text-gold font-medium"
                        : "text-ivory hover:text-gold"
                    )}
                  >
                    {link.label}
                    {link.hasDropdown && (
                      <ChevronDown
                        size={12}
                        className={cn(
                          "transition-transform duration-300 text-gold",
                          activeDropdown === link.href ? "rotate-180" : ""
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        "absolute bottom-2 left-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-300 group-hover:w-full",
                        active ? "w-full" : "w-0"
                      )}
                    />
                  </Link>

                  {/* Dropdown Menu Popup - Solid dark opacity, sharp gold text, crisp subtext */}
                  <AnimatePresence>
                    {link.hasDropdown && activeDropdown === link.href && dropdownItems && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-1/2 top-full min-w-[260px] -translate-x-1/2 rounded-2xl border border-gold/30 bg-[#0D0D10] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.95)] z-[60]"
                      >
                        <div className="space-y-1">
                          {dropdownItems.map((item, idx) => (
                            <Link
                              key={idx}
                              href={item.href}
                              onClick={() => setActiveDropdown(null)}
                              className="group/item flex flex-col rounded-xl px-4 py-2.5 transition-colors duration-200 hover:bg-gold/20"
                            >
                              <span className="font-display text-[15px] font-medium text-white transition-colors group-hover/item:text-gold">
                                {item.label}
                              </span>
                              {item.sub && (
                                <span className="font-body text-[11px] text-ivory/80 line-clamp-1 mt-0.5">
                                  {item.sub}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {/* Book Now CTA */}
          <Link
            href="/booking"
            className="hidden rounded-full bg-gradient-to-r from-[#C8A76A] via-[#DEC38F] to-[#A8814A] px-5 py-2 font-body text-[11px] font-semibold uppercase tracking-widest2 text-[#0A0A0C] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(200,167,106,0.45)] lg:block"
          >
            Book Now
          </Link>

          {/* Mobile hamburger */}
          <button
            aria-label="Toggle menu"
            className="text-ivory transition-colors hover:text-gold lg:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu size={22} />
          </button>
        </motion.nav>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-x-0 top-[36px] bottom-0 z-[70] flex flex-col bg-[#0A0A0C] px-8 py-7"
          >
            {/* Ambient gold glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/8 blur-[140px]" />

            <div className="relative flex items-center justify-between">
              <span className="font-display text-xl tracking-widest2 text-ivory">
                MAISON <span className="text-gold-gradient font-light italic">LUMIÈRE</span>
              </span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="text-ivory transition-colors hover:text-gold"
              >
                <X size={24} />
              </button>
            </div>

            <ul className="relative mt-12 flex flex-1 flex-col justify-center gap-4 overflow-y-auto">
              {[{ label: "Home", href: "/" }, ...NAV_LINKS].map((link, i) => {
                const subItems = DROPDOWNS[link.href];
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.4 }}
                    className="space-y-1"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="font-display text-3xl font-light text-ivory transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>

                    {/* Submenu links on mobile */}
                    {subItems && (
                      <div className="flex flex-wrap gap-x-4 gap-y-1 pl-1 pt-1">
                        {subItems.slice(0, 3).map((sub, idx) => (
                          <Link
                            key={idx}
                            href={sub.href}
                            onClick={() => setOpen(false)}
                            className="font-body text-xs text-gold/80 hover:text-gold"
                          >
                            • {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.li>
                );
              })}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="pt-2"
              >
                <Link
                  href="/booking"
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl font-light text-gold"
                >
                  Book Now →
                </Link>
              </motion.li>
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative border-t border-gold/15 pt-5 font-mono text-[10px] uppercase tracking-widest2 text-ivory/40"
            >
              Est. Private Atelier — Paris
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
