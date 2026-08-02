"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { products } from "@/data/products";

/** How long each product holds on screen before the crossfade starts. */
const HOLD_MS = 3800;

// The static hero this replaced showed the M3, so the cycle opens on it and
// then runs the catalogue in order rather than starting on the entry model.
const START = Math.max(
  products.findIndex((product) => product.slug === "m3"),
  0,
);
const slides = [...products.slice(START), ...products.slice(0, START)];

export function HeroCarousel() {
  // A tick that only ever counts up. Both the visible slide and the set of
  // slides worth mounting fall out of it, so neither needs its own state.
  const [tick, setTick] = useState(0);

  useEffect(() => {
    // A cross-fading hero is decorative motion, so anyone who has asked for
    // reduced motion just gets the first product, held.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const timer = window.setInterval(() => setTick((n) => n + 1), HOLD_MS);
    return () => window.clearInterval(timer);
  }, []);

  const index = tick % slides.length;
  const current = slides[index];

  // Mount what has been shown plus the one coming next, so its file is in
  // cache before it has to fade in. Rendering all of them on first paint would
  // pull every hero image at once — `next.config.ts` turns image optimisation
  // off, so these are the full-size files. After one full pass, all are up.
  const mountedThrough = tick + 1;

  return (
    <div className="relative aspect-4/3 overflow-hidden border border-hairline bg-white">
      {slides.map((product, position) =>
        position <= mountedThrough ? (
          <Image
            key={product.slug}
            src={product.images[0]}
            // Only the visible slide is described; the rest are decoration.
            alt={
              position === index ? `${product.model} — ${product.name}` : ""
            }
            aria-hidden={position !== index}
            fill
            sizes="(min-width: 1024px) 560px, 92vw"
            className={`object-contain p-10 pb-16 transition-opacity duration-1000 ease-in-out ${
              position === index ? "opacity-100" : "opacity-0"
            }`}
            priority={position === 0}
          />
        ) : null,
      )}

      <Link
        href={`/products/${current.slug}/`}
        className="group absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-4 border-t border-hairline bg-white-page/85 px-5 py-3 backdrop-blur"
      >
        <span className="tracked-caps shrink-0 text-[0.7rem] text-gold">
          {current.model}
        </span>
        <span className="truncate text-xs text-ink-muted transition-colors group-hover:text-ink">
          {current.name}
        </span>
      </Link>
    </div>
  );
}
