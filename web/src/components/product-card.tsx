import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/data/products";

/** Card images are the 600px variant emitted by scripts/extract_assets.py. */
function cardImage(hero: string): string {
  return hero.replace(/\.webp$/, "-card.webp");
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}/`}
      className="group relative flex flex-col border border-hairline bg-surface transition-colors hover:border-gold"
    >
      {/* Gilt edge that lights up on hover. */}
      <span className="gold-leaf absolute inset-x-0 top-0 h-px scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />

      <div className="relative aspect-4/3 overflow-hidden bg-white">
        <Image
          src={cardImage(product.images[0])}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 border-t border-hairline p-5">
        <span className="tracked-caps text-[0.7rem] text-gold">
          {product.model}
        </span>
        <h3 className="font-display text-xl leading-snug font-medium text-ink">
          {product.name}
        </h3>
        <p className="mt-auto pt-3 text-sm text-ink-muted">
          {product.highlights.slice(0, 2).join(" · ")}
        </p>
      </div>
    </Link>
  );
}
