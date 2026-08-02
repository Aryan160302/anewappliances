import Image from "next/image";
import Link from "next/link";

import { HeroCarousel } from "@/components/hero-carousel";
import { ProductCard } from "@/components/product-card";
import { company, enquiryLink, whatsappLink } from "@/data/company";
import { categories, products } from "@/data/products";

// A flagship from each range, plus the two newest premium models.
const featuredSlugs = ["cooktop-plus", "double-hob-foldable", "p41", "ssj1507"];
const featured = featuredSlugs.map(
  (slug) => products.find((product) => product.slug === slug)!,
);

export default function HomePage() {
  return (
    <>
      <section className="border-b border-hairline bg-white-page">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center lg:py-28">
          <div>
            <p className="tracked-caps text-xs text-gold">
              Manufactured in Karnataka
            </p>
            <hr className="rule-royal mt-5 w-24" />
            <h1 className="mt-7 font-display text-5xl leading-[1.05] font-light text-ink sm:text-6xl lg:text-7xl">
              Induction cooktops, infrared cookers and kettles,
              <span className="gold-leaf-text italic"> built to last.</span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-ink-muted">
              {company.description}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/products/"
                className="gold-fill tracked-caps px-8 py-4 text-xs transition-opacity hover:opacity-90"
              >
                View the catalogue
              </Link>
              <a
                href={enquiryLink("Product enquiry")}
                className="tracked-caps border border-gold px-8 py-4 text-xs text-gold transition-colors hover:bg-gold hover:text-on-gold"
              >
                Make an enquiry
              </a>
            </div>
          </div>

          <HeroCarousel />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <h2 className="tracked-caps text-xs text-gold">Our ranges</h2>
        <hr className="rule-royal mt-4 w-16" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products/?category=${category.slug}`}
              className="group relative flex flex-col border border-hairline bg-surface transition-colors hover:border-gold"
            >
              <span className="gold-leaf absolute inset-x-0 top-0 h-px scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
              <div className="relative aspect-16/10 bg-white">
                <Image
                  src={category.cover}
                  alt={category.name}
                  fill
                  sizes="(min-width: 768px) 45vw, 92vw"
                  className="object-contain p-10 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="border-t border-hairline p-8">
                <h3 className="font-display text-3xl font-light text-ink">
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

      <section className="border-y border-hairline bg-ivory">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="tracked-caps text-xs text-gold">Selected models</h2>
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

      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-display text-4xl leading-tight font-light text-ink">
              Made at Harohalli, sold across India
            </h2>
            <hr className="rule-royal mt-6 w-16" />
            <p className="mt-6 text-base leading-relaxed text-ink-muted">
              Our unit at the Women Entrepreneurs Park in the Harohalli
              Industrial Area builds every appliance in this catalogue. Kettles
              ship with an India plug and both BIS and non-BIS power cords;
              cooktops run on 230 V, 50 Hz with a 3-pin plug and a 1.15 m cord,
              and every model is offered in a 5KVA variant with added surge
              protection.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
              <Link
                href="/machineries/"
                className="tracked-caps inline-block text-xs text-gold hover:text-ink"
              >
                How we build them →
              </Link>
              <Link
                href="/about/"
                className="tracked-caps inline-block text-xs text-gold hover:text-ink"
              >
                About the company →
              </Link>
            </div>
          </div>

          <div className="relative border border-hairline bg-ivory p-8">
            <span className="gold-leaf absolute inset-x-0 top-0 h-px" />
            <h2 className="tracked-caps text-xs text-gold">Trade enquiries</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              For dealer pricing, bulk orders or specification sheets, write to
              us and we will come back with the details.
            </p>
            <a
              href={`mailto:${company.email}`}
              className="mt-5 block font-display text-xl text-gold hover:text-ink"
            >
              {company.email}
            </a>
            <a
              href={whatsappLink(
                "Hello Anew Appliances, I'd like to make a trade enquiry.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-sm text-ink-muted transition-colors hover:text-gold"
            >
              WhatsApp {company.whatsapp.display}
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
