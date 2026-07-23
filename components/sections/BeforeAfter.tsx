"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal, Sparkles } from "lucide-react";
import { EditorialFrame } from "@/components/ui/EditorialFrame";
import { IMAGES } from "@/lib/images";

export function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <section className="relative bg-[#0A0A0C] py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(200,167,106,0.08),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="mb-10 text-center">
          <div className="section-num mb-3 justify-center">The Transformation</div>
          <h2 className="mx-auto max-w-2xl font-display text-[clamp(2rem,3.8vw,3.2rem)] font-light leading-[1.1] text-ivory">
            Real results,{" "}
            <em className="italic text-gold">real confidence.</em>
          </h2>
          <p className="mx-auto mt-2 max-w-md font-body text-[13.5px] leading-relaxed text-ivory/55">
            Slide horizontally to see the transformation after a single 90-minute Signature Hair & Skin Ritual.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div
            ref={containerRef}
            className="relative aspect-[16/9] max-h-[480px] w-full cursor-ew-resize select-none overflow-hidden rounded-3xl border border-gold/25 shadow-[0_20px_70px_rgba(0,0,0,0.7)]"
            onMouseDown={(e) => {
              dragging.current = true;
              updateFromClientX(e.clientX);
            }}
            onMouseMove={(e) => dragging.current && updateFromClientX(e.clientX)}
            onMouseUp={() => (dragging.current = false)}
            onMouseLeave={() => (dragging.current = false)}
            onTouchStart={(e) => updateFromClientX(e.touches[0].clientX)}
            onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
          >
            {/* After — base layer */}
            <div className="absolute inset-0">
              <EditorialFrame
                src={IMAGES.afterHair}
                alt="After transformation"
                brief="After · glossy finish · studio light"
                ratio="auto"
                className="h-full w-full"
              />
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest2 text-gold backdrop-blur">
                <Sparkles size={12} />
                After Ritual
              </div>
            </div>

            {/* Before — clipped */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${pos}%` }}
            >
              <div style={{ width: containerRef.current?.offsetWidth || "100vw" }} className="h-full">
                <EditorialFrame
                  src={IMAGES.beforeHair}
                  alt="Before transformation"
                  brief="Before · natural texture · unretouched"
                  ratio="auto"
                  className="h-full"
                  sizes="100vw"
                />
              </div>
              <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/60 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest2 text-ivory/80 backdrop-blur">
                Before
              </div>
            </div>

            {/* Gold divider handle */}
            <div
              className="absolute top-0 h-full w-[2px] bg-gold shadow-[0_0_24px_rgba(200,167,106,0.7)]"
              style={{ left: `${pos}%` }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                role="slider"
                tabIndex={0}
                aria-label="Before and after comparison position"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(pos)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
                  if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
                }}
                className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-gold bg-[#0A0A0C]/85 text-gold backdrop-blur shadow-[0_0_20px_rgba(200,167,106,0.4)]"
              >
                <MoveHorizontal size={16} aria-hidden="true" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
