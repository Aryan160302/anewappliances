import type { Metadata } from "next";
import { Suspense } from "react";

import { ProductBrowser } from "@/components/product-browser";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The full Anew Appliances catalogue — six induction cooktops and six stainless steel electric kettles, with complete technical specifications.",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <p className="tracked-caps text-xs text-gold">Catalogue</p>
      <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
        All products
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
        {products.length} models across induction cooktops and electric kettles.
        Every specification below is taken from the current factory
        specification sheets.
      </p>

      <div className="mt-12">
        {/* useSearchParams needs a Suspense boundary in a static export. */}
        <Suspense fallback={<div className="h-24" />}>
          <ProductBrowser />
        </Suspense>
      </div>
    </div>
  );
}
