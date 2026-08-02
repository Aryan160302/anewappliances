import Link from "next/link";

import { Wordmark } from "@/components/wordmark";

// Three ranges no longer fit across a phone header, so the nav points at the
// catalogue as a whole and the range filter on /products/ takes over from here.
const links = [
  { href: "/products/", label: "Products" },
  { href: "/machineries/", label: "Machineries" },
  { href: "/about/", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-white-page/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:gap-6 sm:px-8">
        <Link href="/" aria-label="Anew Appliances home">
          {/* The full wordmark plus nav needs 409px, so the name drops below sm. */}
          <Wordmark markOnlyOnMobile />
        </Link>

        <nav className="flex items-center gap-4 text-[0.7rem] sm:gap-7 sm:text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="tracked-caps whitespace-nowrap text-ink-muted transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
