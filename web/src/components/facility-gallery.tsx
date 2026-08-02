import Image from "next/image";

import { facilityGroups } from "@/data/facility";

/**
 * The walkthrough of the Harohalli unit, grouped in the order the video takes:
 * gate, shop floor, packing, offices.
 *
 * The stills are 576x768 portrait frames lifted from handheld video, so they
 * are shown at a fixed 3:4 ratio with `object-cover` — letterboxing them would
 * only draw attention to the source. They stay unoptimised like the rest of
 * the catalogue imagery; `next.config.ts` turns the image server off.
 */
export function FacilityGallery() {
  return (
    <div className="space-y-16">
      {facilityGroups.map((group) => (
        <section key={group.id} id={group.id} className="scroll-mt-24">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <h3 className="font-display text-3xl leading-tight font-light text-ink">
              {group.name}
            </h3>
            <p className="tracked-caps text-[0.7rem] text-gold">
              {group.shots.length}{" "}
              {group.shots.length === 1 ? "view" : "views"}
            </p>
          </div>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
            {group.blurb}
          </p>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {group.shots.map((shot) => (
              <li
                key={shot.slug}
                className="group relative flex flex-col border border-hairline bg-surface"
              >
                <span className="gold-leaf absolute inset-x-0 top-0 z-10 h-px scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                <div className="relative aspect-3/4 overflow-hidden bg-ivory">
                  <Image
                    src={`/facility/${shot.slug}.webp`}
                    alt={shot.alt}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="border-t border-hairline p-6">
                  <p className="tracked-caps text-[0.7rem] text-gold">
                    {shot.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {shot.caption}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
