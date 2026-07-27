import type { Metadata } from "next";
import Link from "next/link";

import { Wordmark } from "@/components/wordmark";
import { company, enquiryLink, whatsappLink } from "@/data/company";
import { categories, productsByCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "About",
  description: `${company.name} manufactures induction cooktops and stainless steel electric kettles at the Harohalli Industrial Area, Ramanagara, Karnataka.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <p className="tracked-caps text-xs text-gold">About</p>
      <hr className="rule-royal mt-4 w-16" />
      <h1 className="mt-6 max-w-3xl font-display text-5xl leading-tight font-light text-ink sm:text-6xl">
        Kitchen appliances built at the Women Entrepreneurs Park
      </h1>

      <div className="mt-14 grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <div className="space-y-6 text-base leading-relaxed text-ink-muted">
          <p>
            {company.name} manufactures induction cooktops and stainless steel
            electric kettles from its unit at Plot No WP-98, Women Entrepreneurs
            Park, in the Harohalli Industrial Area of Ramanagara district,
            Karnataka.
          </p>
          <p>
            The cooktop range spans six models. All of them run on 230 V, 50 Hz
            with a 4 LED display, a BI-01 fan and a 1.15 m cord on a 3-pin plug.
            They differ in plate — ceramic, unpolished crystal glass or polished
            crystal glass — in control type, and in rated power, from the 1,600 W
            A4 up to the 2,000 W M3.
          </p>
          <p>
            The kettle range covers 1.5 L to 2.0 L on 201 brushed stainless steel
            bodies at 0.28 mm or 0.32 mm, with a 201 stainless inner lid and a
            FADA single-chip controller. Every kettle is supplied with an India
            plug and both BIS and non-BIS power cords. Double-layered models add
            a PP plastic outer layer.
          </p>

          <div className="grid gap-6 border-t border-hairline pt-8 sm:grid-cols-2">
            {categories.map((category) => (
              <div key={category.slug}>
                <p className="gold-leaf-text font-display text-5xl font-light">
                  {productsByCategory(category.slug).length}
                </p>
                <p className="tracked-caps mt-2 text-xs text-ink-muted">
                  {category.name}
                </p>
                <Link
                  href={`/products/?category=${category.slug}`}
                  className="mt-3 inline-block text-sm text-ink hover:text-gold"
                >
                  Browse the range →
                </Link>
              </div>
            ))}
          </div>
        </div>

        <aside className="relative h-fit border border-hairline bg-ivory p-6 sm:p-8">
          <span className="gold-leaf absolute inset-x-0 top-0 h-px" />
          <Wordmark size="large" />

          <h2 className="tracked-caps mt-8 text-xs text-ink-muted">
            Registered address
          </h2>
          <address className="mt-3 text-sm not-italic leading-relaxed text-ink">
            {company.address.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="block">{company.address.country}</span>
          </address>

          <h2 className="tracked-caps mt-8 text-xs text-ink-muted">Contact</h2>
          <a
            href={`mailto:${company.email}`}
            className="mt-3 block text-sm text-gold hover:text-ink"
          >
            {company.email}
          </a>
          <p className="mt-1 text-sm text-ink-muted">{company.website}</p>
          <a
            href={whatsappLink(
              "Hello Anew Appliances, I'd like to make an enquiry.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block text-sm text-ink-muted transition-colors hover:text-gold"
          >
            WhatsApp {company.whatsapp.display}
          </a>

          <a
            href={enquiryLink("Trade enquiry")}
            className="gold-fill tracked-caps mt-8 block px-6 py-4 text-center text-xs transition-opacity hover:opacity-90"
          >
            Send an enquiry
          </a>
          <a
            href={company.catalogue}
            className="tracked-caps mt-3 block border border-hairline px-6 py-3.5 text-center text-xs text-ink transition-colors hover:border-gold hover:text-gold"
          >
            Download PDF catalogue
          </a>
        </aside>
      </div>
    </div>
  );
}
