import type { Metadata } from "next";
import { Suspense } from "react";

import { ProductBrowser } from "@/components/product-browser";
import { categories, products, productsByCategory } from "@/data/products";

// "nine induction cooktops, two infrared cookers and six electric kettles" —
// built from the data so it can never drift from what the catalogue holds.
const rangeSummary = categories
  .map(
    (category) =>
      `${productsByCategory(category.slug).length} ${category.name.toLowerCase()}`,
  )
  .join(", ")
  .replace(/, ([^,]*)$/, " and $1");

export const metadata: Metadata = {
  title: "Products",
  description: `The full Anew Appliances catalogue — ${rangeSummary}, with complete technical specifications.`,
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <p className="tracked-caps text-xs text-gold">Catalogue</p>
      <hr className="rule-royal mt-4 w-16" />
      <h1 className="mt-6 font-display text-5xl font-light text-ink sm:text-6xl">
        All products
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted">
        {`${products.length} models — ${rangeSummary}.`} Every specification
        below is taken from the current factory specification sheets.
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
