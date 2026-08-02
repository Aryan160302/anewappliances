import Image from "next/image";

import {
  addressQuery,
  company,
  directionsUrl,
  mapEmbedUrl,
} from "@/data/company";
import { facilityExterior } from "@/data/facility";

/**
 * The factory location, as an interactive map beside the postal address.
 *
 * Google's `output=embed` endpoint needs no API key, which matters here: the
 * site is a static export, so there is no server to keep a key on. The iframe
 * is lazy so it costs nothing until a visitor scrolls the section into view.
 */
export function LocationMap() {
  return (
    <section id="location" className="scroll-mt-24">
      <h2 className="tracked-caps text-xs text-gold">Find us</h2>
      <hr className="rule-royal mt-4 w-16" />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
        <div className="space-y-6">
          <div className="relative border border-hairline bg-ivory">
            <span className="gold-leaf absolute inset-x-0 top-0 z-10 h-px" />
            <iframe
              title={`Map showing ${company.name} at ${addressQuery}`}
              src={mapEmbedUrl}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-4/3 w-full border-0 sm:aspect-video"
            />
          </div>

          <figure>
            <div className="relative aspect-video overflow-hidden border border-hairline bg-ivory">
              <Image
                src={`/facility/${facilityExterior.slug}.webp`}
                alt={facilityExterior.alt}
                fill
                sizes="(min-width: 1024px) 640px, 92vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-xs text-ink-muted">
              {facilityExterior.caption}
            </figcaption>
          </figure>
        </div>

        <div className="flex h-fit flex-col justify-center">
          <h3 className="font-display text-3xl leading-tight font-light text-ink">
            Women Entrepreneurs Park, Harohalli
          </h3>
          <address className="mt-5 text-sm not-italic leading-relaxed text-ink-muted">
            {company.address.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="block">{company.address.country}</span>
          </address>
          <p className="mt-5 text-sm leading-relaxed text-ink-muted">
            The unit sits in the Harohalli Industrial Area of Ramanagara
            district, about an hour south-west of Bengaluru on the Kanakapura
            road.
          </p>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tracked-caps mt-7 inline-block self-start border border-gold px-8 py-4 text-xs text-gold transition-colors hover:bg-gold hover:text-on-gold"
          >
            Get directions
          </a>
        </div>
      </div>
    </section>
  );
}
