"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * EditorialFrame
 * Routes every image slot through a single component.
 * - If `src` starts with http/https it renders as an external image directly.
 * - If `src` points to /images/... it renders from /public/images/.
 * - If the image fails to load it shows a tasteful branded gradient fallback
 *   rather than a broken container.
 */
export function EditorialFrame({
  src,
  alt,
  brief,
  ratio = "4/5",
  priority = false,
  sizes = "100vw",
  objectPosition = "center",
  className,
}: {
  src: string;
  alt: string;
  brief: string;
  ratio?: string;
  priority?: boolean;
  sizes?: string;
  objectPosition?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  const isExternal =
    src.startsWith("http://") || src.startsWith("https://");

  return (
    <div
      className={cn("relative overflow-hidden bg-[#1A1812]", className)}
      style={{ aspectRatio: ratio !== "auto" ? ratio : undefined }}
    >
      {!failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          style={{ objectPosition }}
          className="object-cover"
          onError={() => setFailed(true)}
          unoptimized={isExternal}
        />
      ) : (
        /* Graceful branded fallback — warm gradient, no broken box */
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1A1812] via-[#231F17] to-[#2A2318]">
          <div className="text-center opacity-30">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto text-[#C8A76A]" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-[#C8A76A]">
              {brief}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
