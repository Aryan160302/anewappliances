import Link from "next/link";

import { Wordmark } from "@/components/wordmark";
import { company, whatsappLink } from "@/data/company";
import { categories } from "@/data/products";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-hairline bg-ivory">
      <span className="gold-leaf absolute inset-x-0 top-0 h-px" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <Wordmark />
          <address className="mt-5 text-sm not-italic leading-relaxed text-ink-muted">
            {company.address.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <Link
            href="/about/#location"
            className="mt-3 inline-block text-sm text-gold transition-colors hover:text-ink"
          >
            View on map →
          </Link>
        </div>

        <div>
          <h2 className="tracked-caps text-xs text-gold">Catalogue</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/products/?category=${category.slug}`}
                  className="text-ink transition-colors hover:text-gold"
                >
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/products/"
                className="text-ink transition-colors hover:text-gold"
              >
                All products
              </Link>
            </li>
            <li>
              <a
                href={company.catalogue}
                className="text-ink transition-colors hover:text-gold"
              >
                Download PDF catalogue
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="tracked-caps text-xs text-gold">Enquiries</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={`mailto:${company.email}`}
                className="text-ink transition-colors hover:text-gold"
              >
                {company.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink(
                  "Hello Anew Appliances, I'd like to enquire about your products.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink transition-colors hover:text-gold"
              >
                WhatsApp {company.whatsapp.display}
              </a>
            </li>
            <li>
              <Link
                href="/machineries/"
                className="text-ink transition-colors hover:text-gold"
              >
                Our machineries
              </Link>
            </li>
            <li>
              <Link
                href="/about/"
                className="text-ink transition-colors hover:text-gold"
              >
                About the company
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-hairline">
        {/* Right padding keeps the copyright clear of the floating WhatsApp button. */}
        <p className="mx-auto max-w-6xl px-5 py-6 pr-24 text-xs text-ink-muted sm:px-8 sm:pr-32">
          © {new Date().getFullYear()} {company.name}. Technical specifications
          are subject to change.
        </p>
      </div>
    </footer>
  );
}
