"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { ProductCard } from "@/components/product-card";
import { categories, products, type CategorySlug } from "@/data/products";

const ALL = "all" as const;
type Filter = CategorySlug | typeof ALL;

function isCategory(value: string | null): value is CategorySlug {
  return categories.some((category) => category.slug === value);
}

function matches(haystack: string[], query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return haystack.some((text) => text.toLowerCase().includes(needle));
}

export function ProductBrowser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  const requested = searchParams.get("category");
  const filter: Filter = isCategory(requested) ? requested : ALL;

  function selectFilter(next: Filter) {
    // Keep the filter in the URL so a range can be linked to directly.
    router.replace(next === ALL ? "/products/" : `/products/?category=${next}`, {
      scroll: false,
    });
  }

  const visible = useMemo(
    () =>
      products.filter(
        (product) =>
          (filter === ALL || product.category === filter) &&
          matches(
            [product.model, product.name, product.summary, ...product.highlights],
            query,
          ),
      ),
    [filter, query],
  );

  const filters: { value: Filter; label: string }[] = [
    { value: ALL, label: "All products" },
    ...categories.map((category) => ({
      value: category.slug as Filter,
      label: category.name,
    })),
  ];

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-5 border-y border-hairline py-5">
        <div className="flex flex-wrap gap-2">
          {filters.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => selectFilter(option.value)}
              aria-pressed={filter === option.value}
              className={`tracked-caps border px-5 py-2.5 text-[0.7rem] transition-colors ${
                filter === option.value
                  ? "gold-fill border-gold"
                  : "border-hairline text-ink-muted hover:border-gold hover:text-gold"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-3">
          <span className="sr-only">Search products</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search model or feature"
            className="w-56 border border-hairline bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted"
          />
        </label>
      </div>

      {visible.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-sm text-ink-muted">
          No products match “{query}”.
        </p>
      )}
    </>
  );
}
