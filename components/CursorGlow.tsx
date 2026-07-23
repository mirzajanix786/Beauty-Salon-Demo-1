"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    let x = 0,
      y = 0,
      tx = 0,
      ty = 0;
    let frame: number;

    function onMove(e: MouseEvent) {
      tx = e.clientX;
      ty = e.clientY;
    }

    function animate() {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x - 200}px, ${y - 200}px, 0)`;
      }
      frame = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", onMove);
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-[400px] w-[400px] rounded-full opacity-[0.15] mix-blend-screen md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(200,164,106,0.9) 0%, rgba(200,164,106,0) 70%)",
        willChange: "transform",
      }}
    />
  );
}
