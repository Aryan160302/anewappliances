import type { Metadata } from "next";
import Link from "next/link";

import { LocationMap } from "@/components/location-map";
import { Wordmark } from "@/components/wordmark";
import {
  addressQuery,
  company,
  enquiryLink,
  whatsappLink,
} from "@/data/company";
import { categories, products, productsByCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "About",
  description: `${company.name} manufactures induction cooktops, infrared cookers and stainless steel electric kettles at the Harohalli Industrial Area, Ramanagara, Karnataka.`,
};

const organisationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  description: company.description,
  email: company.email,
  telephone: `+${company.whatsapp.number}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.lines[0],
    addressLocality: company.address.locality,
    addressRegion: company.address.region,
    postalCode: company.address.postalCode,
    addressCountry: company.address.country,
  },
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    addressQuery,
  )}`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organisationJsonLd),
        }}
      />
      <p className="tracked-caps text-xs text-gold">About</p>
      <hr className="rule-royal mt-4 w-16" />
      <h1 className="mt-6 max-w-3xl font-display text-5xl leading-tight font-light text-ink sm:text-6xl">
        Kitchen appliances built at the Women Entrepreneurs Park
      </h1>

      <div className="mt-14 grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <div className="space-y-6 text-base leading-relaxed text-ink-muted">
          <p>
            {company.name} manufactures induction cooktops, infrared cookers and
            stainless steel electric kettles from its unit at Plot No WP-98,
            Women Entrepreneurs Park, in the Harohalli Industrial Area of
            Ramanagara district, Karnataka — {products.length} models across the
            three ranges.
          </p>
          <p>
            The induction range spans nine models. Six are built on two boards
            that share a 4 LED display, a BI-01 fan and a 1.15 m cord on a 3-pin
            plug, differing in plate — ceramic, unpolished crystal glass or
            polished crystal glass — in control type, and in rated power from
            the 1,600 W A4 up to the 2,000 W M3. Three premium models sit above
            them: an ultra-thin 26 mm cooktop holding temperature to ±3 °C
            through an NTC sensor, a folding double hob pairing a 2,000 W and a
            1,500 W burner, and a slim stove on a brushed stainless body.
          </p>
          <p>
            The infrared range adds two 2,000 W radiant cookers on polished
            crystal glass, reaching 650 °C in the plastic-bodied P41 and 700 °C
            in the aluminium A22. Because the heat is radiant rather than
            induced, they work with cookware of any material. Both have passed
            4 KVA testing.
          </p>
          <p>
            The kettle range covers 1.5 L to 2.0 L on 201 brushed stainless steel
            bodies at 0.28 mm or 0.32 mm, with a 201 stainless inner lid and a
            FADA single-chip controller. Every kettle is supplied with an India
            plug and both BIS and non-BIS power cords. Double-layered models add
            a PP plastic outer layer.
          </p>
          <p className="flex flex-wrap gap-x-8 gap-y-2">
            <Link
              href="/machineries/#facility"
              className="text-gold transition-colors hover:text-ink"
            >
              See inside the unit →
            </Link>
            <Link
              href="/machineries/"
              className="text-gold transition-colors hover:text-ink"
            >
              How we build and test them →
            </Link>
          </p>

          <div className="grid gap-6 border-t border-hairline pt-8 sm:grid-cols-3">
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

      <div className="mt-20 border-t border-hairline pt-16">
        <LocationMap />
      </div>
    </div>
  );
}
