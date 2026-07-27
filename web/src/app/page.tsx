import Image from "next/image";
import Link from "next/link";

import { ProductCard } from "@/components/product-card";
import { company, enquiryLink } from "@/data/company";
import { categories, products } from "@/data/products";

// A flagship and a workhorse from each range.
const featuredSlugs = ["m3-5kva", "a8", "ssj1507", "kettle-colour"];
const featured = featuredSlugs.map(
  (slug) => products.find((product) => product.slug === slug)!,
);

export default function HomePage() {
  return (
    <>
      <section className="border-b border-hairline bg-surface">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center lg:py-28">
          <div>
            <p className="tracked-caps text-xs text-gold">
              Manufactured in Karnataka
            </p>
            <h1 className="mt-5 font-display text-4xl leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
              Induction cooktops and electric kettles,
              <span className="text-gold"> built to last.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted">
              {company.description}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/products/"
                className="tracked-caps bg-gold px-7 py-3.5 text-xs text-white transition-colors hover:bg-ink"
              >
                View the catalogue
              </Link>
              <a
                href={enquiryLink("Product enquiry")}
                className="tracked-caps border border-hairline px-7 py-3.5 text-xs text-ink transition-colors hover:border-gold hover:text-gold"
              >
                Make an enquiry
              </a>
            </div>
          </div>

          <div className="relative aspect-4/3 border border-hairline bg-white">
            <Image
              src="/products/m3/hero.webp"
              alt="Anew Appliances M3 induction cooktop"
              fill
              sizes="(min-width: 1024px) 560px, 92vw"
              className="object-contain p-10"
              priority
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <h2 className="tracked-caps text-xs text-ink-muted">Our ranges</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products/?category=${category.slug}`}
              className="group flex flex-col border border-hairline bg-surface transition-colors hover:border-gold"
            >
              <div className="relative aspect-16/10 bg-white">
                <Image
                  src={category.cover}
                  alt={category.name}
                  fill
                  sizes="(min-width: 768px) 45vw, 92vw"
                  className="object-contain p-10 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="border-t border-hairline p-7">
                <h3 className="font-display text-2xl text-ink">
                  {category.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {category.blurb}
                </p>
                <span className="tracked-caps mt-5 inline-block text-xs text-gold">
                  Browse range →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-hairline bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="tracked-caps text-xs text-ink-muted">
              Selected models
            </h2>
            <Link
              href="/products/"
              className="tracked-caps text-xs text-gold hover:text-ink"
            >
              All {products.length} products →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-display text-3xl text-ink">
              Made at Harohalli, sold across India
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted">
              Our unit at the Women Entrepreneurs Park in the Harohalli
              Industrial Area builds every cooktop and kettle in this catalogue.
              Kettles ship with an India plug and both BIS and non-BIS power
              cords; cooktops run on 230 V, 50 Hz with a 3-pin plug and a 1.15 m
              cord.
            </p>
            <Link
              href="/about/"
              className="tracked-caps mt-7 inline-block text-xs text-gold hover:text-ink"
            >
              About the company →
            </Link>
          </div>

          <div className="border border-hairline bg-surface p-8">
            <h2 className="tracked-caps text-xs text-ink-muted">
              Trade enquiries
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              For dealer pricing, bulk orders or specification sheets, write to
              us and we will come back with the details.
            </p>
            <a
              href={`mailto:${company.email}`}
              className="mt-5 block font-display text-lg text-gold hover:text-ink"
            >
              {company.email}
            </a>
            <address className="mt-6 border-t border-hairline pt-6 text-sm not-italic leading-relaxed text-ink-muted">
              {company.address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
        </div>
      </section>
    </>
  );
}
