import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { SpecTable } from "@/components/spec-table";
import { company, enquiryLink } from "@/data/company";
import {
  getCategory,
  getProduct,
  products,
  relatedProducts,
} from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(
  props: PageProps<"/products/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) return {};

  return {
    title: `${product.model} — ${product.name}`,
    description: product.summary,
    openGraph: {
      title: `${product.model} — ${product.name}`,
      description: product.summary,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = relatedProducts(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${company.name} ${product.model} — ${product.name}`,
    sku: product.model,
    description: product.summary,
    image: product.images,
    brand: { "@type": "Brand", name: company.name },
    category: category.name,
    additionalProperty: product.specs.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
        <Link href="/products/" className="hover:text-gold">
          Catalogue
        </Link>
        <span aria-hidden>/</span>
        <Link
          href={`/products/?category=${category.slug}`}
          className="hover:text-gold"
        >
          {category.name}
        </Link>
        <span aria-hidden>/</span>
        <span className="text-ink">{product.model}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
        {/* The spec table is long, so the gallery follows it down the page. */}
        <div className="lg:sticky lg:top-24">
          <ProductGallery images={product.images} alt={product.name} />
        </div>

        <div>
          <p className="tracked-caps text-xs text-gold">{product.model}</p>
          <h1 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            {product.summary}
          </p>

          <ul className="mt-8 grid gap-2 sm:grid-cols-2">
            {product.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-baseline gap-2.5 text-sm text-ink"
              >
                <span aria-hidden className="text-gold">
                  —
                </span>
                {highlight}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={enquiryLink(
                `Enquiry — ${product.model} (${product.name})`,
              )}
              className="tracked-caps bg-gold px-7 py-3.5 text-xs text-white transition-colors hover:bg-ink"
            >
              Enquire about this model
            </a>
            <a
              href={company.catalogue}
              className="tracked-caps border border-hairline px-7 py-3.5 text-xs text-ink transition-colors hover:border-gold hover:text-gold"
            >
              Download PDF
            </a>
          </div>

          <section className="mt-14">
            <h2 className="tracked-caps text-xs text-ink-muted">
              Specifications
            </h2>
            <div className="mt-5">
              <SpecTable specs={product.specs} />
            </div>
            <p className="mt-4 text-xs text-ink-muted">
              Technical specifications are subject to change.
            </p>
          </section>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="tracked-caps text-xs text-ink-muted">
              Also in {category.name}
            </h2>
            <Link
              href={`/products/?category=${category.slug}`}
              className="tracked-caps text-xs text-gold hover:text-ink"
            >
              View range →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
