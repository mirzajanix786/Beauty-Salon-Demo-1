"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EditorialFrame } from "@/components/ui/EditorialFrame";
import { SALON_INFO } from "@/lib/salon-info";

export function ContactPageContent() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong.");
      setStatus("done");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        title="Come visit, or write first."
        description="Questions about a treatment, a group booking, or press — we read every message."
        crumb="Contact"
      />

      <section className="bg-[#131316] py-24 md:py-32">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-12">

          {/* Info column */}
          <div className="md:col-span-5">
            {/* Salon image */}
            <div className="relative overflow-hidden rounded-3xl border border-gold/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              <EditorialFrame
                src="/images/contact-reception.jpg"
                alt="Maison Lumière reception"
                brief="Reception, marble + brass, welcoming light"
                ratio="4/5"
                className="max-h-[500px]"
              />
            </div>

            {/* Contact details */}
            <div className="mt-10 space-y-6">
              {[
                {
                  icon: MapPin,
                  content: (
                    <span className="font-body text-[14px] leading-relaxed text-ivory/60">
                      {SALON_INFO.addressLine1}
                      <br />
                      {SALON_INFO.addressLine2}
                    </span>
                  ),
                },
                {
                  icon: Phone,
                  content: (
                    <a
                      href={`tel:${SALON_INFO.phone.replace(/\s/g, "")}`}
                      className="font-body text-[14px] text-ivory/60 transition-colors hover:text-gold"
                    >
                      {SALON_INFO.phone}
                    </a>
                  ),
                },
                {
                  icon: Mail,
                  content: (
                    <a
                      href={`mailto:${SALON_INFO.email}`}
                      className="font-body text-[14px] text-ivory/60 transition-colors hover:text-gold"
                    >
                      {SALON_INFO.email}
                    </a>
                  ),
                },
              ].map(({ icon: Icon, content }, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-gold/8">
                    <Icon size={15} className="text-gold" aria-hidden="true" />
                  </div>
                  {content}
                </div>
              ))}

              <div className="border-t border-white/08 pt-6">
                <p className="section-num mb-3">Opening Hours</p>
                <ul className="space-y-2">
                  {SALON_INFO.hours.map((h) => (
                    <li
                      key={h.label}
                      className="flex justify-between font-body text-[13px] text-ivory/55"
                    >
                      <span>{h.label}</span>
                      <span className="text-ivory/35">{h.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Form column */}
          <div className="md:col-span-7">
            <div className="section-num mb-8">Send a Message</div>

            {status === "done" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-gold/25 bg-gold/5 p-10"
              >
                <h2 className="font-display text-[2rem] text-ivory">Message sent.</h2>
                <p className="mt-3 font-body text-[14px] text-ivory/55">
                  Thank you for reaching out — our team replies within one
                  business day.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {[
                  { id: "name", label: "Name", type: "text", placeholder: "Your full name", value: form.name, onChange: (v: string) => setForm({ ...form, name: v }) },
                  { id: "email", label: "Email", type: "email", placeholder: "you@example.com", value: form.email, onChange: (v: string) => setForm({ ...form, email: v }) },
                ].map((field) => (
                  <div key={field.id} className="group">
                    <label
                      htmlFor={field.id}
                      className="mb-2.5 block font-mono text-[10px] uppercase tracking-widest2 text-ivory/40"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      required
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      disabled={status === "submitting"}
                      className="w-full border-b border-white/15 bg-transparent py-3 font-body text-[14px] text-ivory placeholder:text-ivory/25 focus:border-gold focus:outline-none disabled:opacity-60 transition-colors duration-300"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2.5 block font-mono text-[10px] uppercase tracking-widest2 text-ivory/40"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    disabled={status === "submitting"}
                    className="w-full border-b border-white/15 bg-transparent py-3 font-body text-[14px] text-ivory placeholder:text-ivory/25 focus:border-gold focus:outline-none disabled:opacity-60 transition-colors duration-300"
                    placeholder="How can we help?"
                  />
                </div>

                {status === "error" && (
                  <p role="alert" className="font-body text-[13px] text-red-400">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-gold-fill group inline-flex items-center gap-3 rounded-full px-9 py-4 font-body text-[12px] font-semibold uppercase tracking-widest2 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(200,167,106,0.4)] disabled:opacity-50"
                >
                  {status === "submitting" ? "Sending…" : (
                    <>
                      Send Message
                      <Send size={13} aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
