"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICE_CATEGORIES } from "@/lib/services-data";
import { ARTISTS } from "@/lib/artists-data";

const STEPS = ["Service", "Artist", "Date", "Time", "Confirm"];
const SERVICES = SERVICE_CATEGORIES.map((s) => s.title);
const ARTIST_NAMES = ARTISTS.map((a) => a.name);
const TIMES = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM", "07:00 PM"];

function generateDates() {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

export function Booking() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [service, setService] = useState<string | null>(null);
  const [artist, setArtist] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dates = generateDates();

  // Pre-fill from a "Book This Ritual" / "Book with [Artist]" link elsewhere
  // on the site (e.g. /services/hair-artistry?service=Hair+Artistry or
  // /artists/zara-khan?artist=Zara+Khan&service=Hair+Artistry), and skip
  // ahead past whichever steps are already answered.
  useEffect(() => {
    const qService = searchParams.get("service");
    const qArtist = searchParams.get("artist");

    const matchedService = qService && SERVICES.includes(qService) ? qService : null;
    const matchedArtist = qArtist && ARTIST_NAMES.includes(qArtist) ? qArtist : null;

    if (matchedService) setService(matchedService);
    if (matchedArtist) setArtist(matchedArtist);

    if (matchedService && matchedArtist) setStep(2);
    else if (matchedService) setStep(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canAdvance = [!!service, !!artist, !!date, !!time, true][step];

  async function next() {
    if (!canAdvance) return;

    // The step right before confirmation actually submits the booking.
    if (step === STEPS.length - 2) {
      setSubmitting(true);
      setError(null);
      try {
        const res = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ service, artist, date: date?.toISOString(), time }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.error ?? "Something went wrong. Please try again.");
        }
        setStep(step + 1);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setSubmitting(false);
      }
      return;
    }

    if (step < STEPS.length - 1) setStep(step + 1);
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  return (
    <section id="booking" className="relative bg-ink py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <div className="mb-14 text-center">
          <span className="font-mono text-[11px] uppercase tracking-widest2 text-gold">
            13 — Premium Booking
          </span>
          <h2 className="mx-auto mt-4 max-w-xl font-display text-4xl font-light leading-[1.1] text-ivory md:text-6xl">
            Reserve your ritual.
          </h2>
        </div>

        {/* Progress line */}
        <div
          className="mb-14 flex items-center justify-between"
          role="list"
          aria-label="Booking steps"
        >
          {STEPS.map((s, i) => (
            <div
              key={s}
              role="listitem"
              aria-current={i === step ? "step" : undefined}
              className="flex flex-1 items-center last:flex-none"
            >
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border font-mono text-xs transition-colors duration-500",
                    i < step
                      ? "border-gold bg-gold text-ink"
                      : i === step
                      ? "border-gold text-gold"
                      : "border-white/15 text-ivory/40"
                  )}
                >
                  {i < step ? <Check size={14} aria-hidden="true" /> : i + 1}
                </div>
                <span className="hidden font-mono text-[10px] uppercase tracking-widest2 text-ivory/40 md:block">
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="relative mx-2 h-px flex-1 bg-white/10">
                  <motion.div
                    className="absolute inset-0 origin-left bg-gold"
                    initial={false}
                    animate={{ scaleX: i < step ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="glass min-h-[320px] rounded-sm p-8 md:p-12">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="service"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                {SERVICES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setService(s)}
                    className={cn(
                      "rounded-sm border px-5 py-4 text-left font-body text-sm transition-colors duration-300",
                      service === s
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-white/15 text-ivory/75 hover:border-gold/40"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="artist"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-2 gap-3 md:grid-cols-4"
              >
                {ARTIST_NAMES.map((a) => (
                  <button
                    key={a}
                    onClick={() => setArtist(a)}
                    className={cn(
                      "rounded-sm border px-4 py-6 text-center font-display text-lg transition-colors duration-300",
                      artist === a
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-white/15 text-ivory/75 hover:border-gold/40"
                    )}
                  >
                    {a}
                  </button>
                ))}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="date"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-4 gap-3 sm:grid-cols-7"
              >
                {dates.map((d) => {
                  const isSelected = date?.toDateString() === d.toDateString();
                  return (
                    <button
                      key={d.toISOString()}
                      onClick={() => setDate(d)}
                      className={cn(
                        "flex flex-col items-center gap-1 rounded-sm border py-3 font-body text-sm transition-colors duration-300",
                        isSelected
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-white/15 text-ivory/70 hover:border-gold/40"
                      )}
                    >
                      <span className="font-mono text-[10px] uppercase text-ivory/40">
                        {d.toLocaleDateString(undefined, { weekday: "short" })}
                      </span>
                      <span className="font-display text-lg">{d.getDate()}</span>
                    </button>
                  );
                })}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="time"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-2 gap-3 sm:grid-cols-3"
              >
                {TIMES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTime(t)}
                    className={cn(
                      "rounded-sm border px-5 py-4 font-mono text-sm transition-colors duration-300",
                      time === t
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-white/15 text-ivory/75 hover:border-gold/40"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-gold/10 text-gold"
                >
                  <Check size={26} />
                </motion.div>
                <h3 className="mt-6 font-display text-3xl text-ivory">
                  Your appointment is confirmed
                </h3>
                <p className="mt-3 max-w-sm font-body text-sm text-ivory/60">
                  {service} with {artist} on{" "}
                  {date?.toLocaleDateString(undefined, { month: "long", day: "numeric" })}{" "}
                  at {time}. We look forward to making you beautiful.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav buttons */}
        {step < STEPS.length - 1 ? (
          <div className="mt-8">
            {error && (
              <p
                role="alert"
                className="mb-4 text-center font-body text-sm text-red-300"
              >
                {error}
              </p>
            )}
            <div className="flex items-center justify-between">
            <button
              onClick={back}
              disabled={step === 0}
              aria-hidden={step === 0}
              tabIndex={step === 0 ? -1 : 0}
              className={cn(
                "flex items-center gap-2 font-body text-[12px] uppercase tracking-widest2 text-ivory/50 transition-colors hover:text-gold",
                step === 0 && "invisible"
              )}
            >
              <ChevronLeft size={16} aria-hidden="true" /> Back
            </button>
            <button
              onClick={next}
              disabled={!canAdvance || submitting}
              className="btn-luxury group flex items-center gap-2 rounded-full border border-gold/50 px-7 py-3 font-body text-[12px] uppercase tracking-widest2 text-ivory transition-colors duration-300 disabled:opacity-30"
            >
              <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-ink">
                {submitting ? "Confirming…" : "Continue"}
                {!submitting && <ChevronRight size={16} />}
              </span>
            </button>
            </div>
          </div>
        ) : (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => {
                setStep(0);
                setService(null);
                setArtist(null);
                setDate(null);
                setTime(null);
                setError(null);
              }}
              className="font-body text-[12px] uppercase tracking-widest2 text-ivory/50 transition-colors hover:text-gold"
            >
              Book another ritual
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
