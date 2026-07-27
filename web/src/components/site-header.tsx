import Link from "next/link";

import { Wordmark } from "@/components/wordmark";
import { categories } from "@/data/products";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-white-page/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:gap-6 sm:px-8">
        <Link href="/" aria-label="Anew Appliances home">
          {/* The full wordmark plus nav needs 409px, so the name drops below sm. */}
          <Wordmark markOnlyOnMobile />
        </Link>

        <nav className="flex items-center gap-4 text-[0.65rem] sm:gap-7 sm:text-sm">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products/?category=${category.slug}`}
              className="tracked-caps whitespace-nowrap text-ink-muted transition-colors hover:text-gold"
            >
              {/* "Induction Cooktops" is too wide for a phone header. */}
              <span className="sm:hidden">
                {category.name.split(" ").at(-1)}
              </span>
              <span className="hidden sm:inline">{category.name}</span>
            </Link>
          ))}
          <Link
            href="/about/"
            className="tracked-caps whitespace-nowrap text-ink-muted transition-colors hover:text-gold"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
