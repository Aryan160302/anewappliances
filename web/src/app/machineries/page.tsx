import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { FacilityGallery } from "@/components/facility-gallery";
import { SpecTable } from "@/components/spec-table";
import { company, enquiryLink } from "@/data/company";
import { facilityLead, facilityShotCount } from "@/data/facility";
import type { Spec } from "@/data/products";

/**
 * How the appliances are built, drawn entirely from the technical data sheets
 * in ../../../../data/new data — "TDS Of ICT.xlsx" for the induction boards and
 * "Technical specification for Infrared Cooker 20260416" for the radiant ones.
 * Nothing here is claimed beyond what those sheets record.
 */

export const metadata: Metadata = {
  title: "Our Machineries",
  description: `Inside the ${company.name} unit at Harohalli — the shop floor, assembly benches, packing and warehouse, with the coil winding, cord construction, surge testing and component sourcing behind every model.`,
};

type Section = {
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
  specs?: Spec[];
};

const sections: Section[] = [
  {
    id: "coils",
    eyebrow: "Heating coils",
    heading: "The coil sets the character of the cooktop",
    body: "Every induction model is built around a copper-clad aluminium coil wound to a fixed circle count and strand count, then screw-fixed to the board rather than soldered, so a coil can be replaced in service. The 2,000 W board carries a heavier coil on a tighter radius and six more strands than the 1,600 W board. The infrared cookers use a radiant element instead, wound in ten circles.",
    specs: [
      { label: "1,600 W board — coil weight", value: "220 g ± 20 g" },
      { label: "1,600 W board — heating area", value: "82 mm radius, CCA" },
      { label: "1,600 W board — winding", value: "27 circles · 16 strands" },
      { label: "2,000 W board — coil weight", value: "236 g ± 20 g" },
      { label: "2,000 W board — heating area", value: "80 mm radius, CCA" },
      { label: "2,000 W board — winding", value: "28 circles · 22 strands" },
      { label: "Coil wire diameter", value: "0.35 mm" },
      { label: "Coil to PCB connection", value: "Screw fixing" },
      { label: "Infrared element", value: "391.5 g · 230 V, 2,000 W · 10 circles" },
      {
        label: "Infrared element geometry",
        value: "Outer 20 mm · Inner 17.5 mm · Height 31 mm",
      },
    ],
  },
  {
    id: "cords",
    eyebrow: "Power cords",
    heading: "Cords built to a stranding specification, not to a length",
    body: "Cord is specified by conductor construction rather than by gauge alone — the strand count, the strand thickness and the resulting cross-section are all fixed. Induction cooktops ship on a 0.75 mm² cord; the infrared cookers, which draw 2,000 W continuously, move up to 1 mm² and a three-core plug. Kettles are supplied with an India plug and both BIS and non-BIS cords so the same unit can be sold into either channel.",
    specs: [
      {
        label: "Induction — conductor",
        value: "24 strands × 0.193 mm · 0.75 mm²",
      },
      { label: "Induction — length", value: "1.15 m, black" },
      { label: "Induction — plug", value: "3-Pin" },
      { label: "Infrared — conductor", value: "16 strands × 0.193 mm · 1 mm²" },
      {
        label: "Infrared — length",
        value: "1.25 m total · 1.1 m effective, black",
      },
      { label: "Infrared — plug", value: "3-Pin 3-Core" },
      {
        label: "Kettles — cords",
        value: "India plug · BIS and non-BIS power cords",
      },
    ],
  },
  {
    id: "testing",
    eyebrow: "Testing & protection",
    heading: "Surge headroom is a variant, not an afterthought",
    body: "Indian mains carries surges that ordinary cooktop boards do not survive. Each catalogue model is therefore offered in a 5KVA variant which adds a metal-oxide varistor across the supply, steps the IGBT up from 15 A to 20 A and narrows the low-pass choke. Ceramic thermal fuses are rated to the board: 10 A on the 1,600 W platform, 12.5 A on the 2,000 W platform, 15 A on the infrared cookers. Both infrared models are recorded as having passed 4 KVA testing.",
    specs: [
      { label: "5KVA variant — MOV", value: "BY 14D471K · Maker Baiyou" },
      {
        label: "5KVA variant (M3) — MOV",
        value: "HEL 14D471K · Maker Hongzhi or Baiyou",
      },
      {
        label: "Standard IGBT",
        value: "G15T120BNR3S · Huajing · 15 A / 1200 DC",
      },
      {
        label: "5KVA IGBT",
        value: "G20T135BK3S · Huajing · 20 A / 1350 V",
      },
      {
        label: "Thermal fuse — 1,600 W",
        value: "10 A / 250 V ceramic · 3.6 × 10 mm",
      },
      {
        label: "Thermal fuse — 2,000 W",
        value: "12.5 A / 250 V ceramic · 10 × 20 mm",
      },
      {
        label: "Thermal fuse — infrared",
        value: "15 A / 250 V ceramic · 5 × 20 mm",
      },
      { label: "Infrared 4 KVA testing", value: "Passed" },
    ],
  },
  {
    id: "components",
    eyebrow: "Component sourcing",
    heading: "Named makers on every critical part",
    body: "The data sheets name a maker for each part that carries current or controls it, so a board can be traced and a replacement matched exactly. Where two makers are approved for a part, both are listed rather than substituted silently.",
    specs: [
      { label: "IGBTs", value: "Huajing" },
      { label: "Bridge rectifiers", value: "Ruisong — GBU1510 / GBU2010" },
      { label: "Capacitors", value: "BM · TC" },
      { label: "Varistors", value: "Baiyou · Hongzhi" },
      { label: "Microcontrollers", value: "YuanMi · CMS79FT613C" },
      { label: "Display driver ICs", value: "TM1628A or AIP1628" },
      { label: "Power ICs", value: "DZ-12A / PN3912 / FSD12A" },
      { label: "Cooling fans", value: "BI-01 · BI-09 · BI-12" },
      { label: "Kettle controllers", value: "FADA single chip · Zhontong" },
      { label: "LED boards", value: "94HB (induction) · 94V0 (infrared)" },
    ],
  },
  {
    id: "packing",
    eyebrow: "Packing",
    heading: "Cartons rated for the journey, not just the shelf",
    body: "Each unit ships in a printed 3-ply carton on a foam bed, inside a 4-ply master carton that takes six units. Every unit carries a rating sticker, a manual and a warranty card, and the fasteners and screw set needed for installation.",
    specs: [
      {
        label: "Unit carton",
        value: "3-ply printed · 250 gsm outer, 150 gsm inner",
      },
      {
        label: "Master carton",
        value: "4-ply · 150 gsm outer, 120 gsm remainder",
      },
      { label: "Units per master carton", value: "6" },
      { label: "Protection", value: "Moulded foam · poly bag" },
      {
        label: "In the box",
        value: "Manual & warranty card · rating sticker · fasteners · screw set",
      },
    ],
  },
];

export default function MachineriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <p className="tracked-caps text-xs text-gold">Our machineries</p>
      <hr className="rule-royal mt-4 w-16" />
      <h1 className="mt-6 max-w-3xl font-display text-5xl leading-tight font-light text-ink sm:text-6xl">
        How the appliances are built and tested
      </h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-16">
        <p className="text-base leading-relaxed text-ink-muted">
          Assembly, coil fitting, cord termination and final testing all happen
          at the unit in the Harohalli Industrial Area. Everything on this page
          is taken from the current factory technical data sheets — the same
          figures that appear on the specification tab of each product. Where a
          sheet lists two approved makers for a part, both are named rather than
          substituted silently.
        </p>
        <figure className="relative">
          <div className="relative aspect-3/4 overflow-hidden border border-hairline bg-ivory">
            <span className="gold-leaf absolute inset-x-0 top-0 z-10 h-px" />
            <Image
              src={`/facility/${facilityLead.slug}.webp`}
              alt={facilityLead.alt}
              fill
              sizes="(min-width: 1024px) 400px, 92vw"
              className="object-cover"
              priority
            />
          </div>
          <figcaption className="mt-3 text-xs text-ink-muted">
            {facilityLead.caption}
          </figcaption>
        </figure>
      </div>

      <nav className="mt-14 flex flex-wrap gap-2">
        <a
          href="#facility"
          className="tracked-caps border border-hairline px-5 py-2.5 text-[0.7rem] text-ink-muted transition-colors hover:border-gold hover:text-gold"
        >
          Inside the unit
        </a>
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="tracked-caps border border-hairline px-5 py-2.5 text-[0.7rem] text-ink-muted transition-colors hover:border-gold hover:text-gold"
          >
            {section.eyebrow}
          </a>
        ))}
      </nav>

      <section
        id="facility"
        className="scroll-mt-24 border-t border-hairline pt-14 mt-14"
      >
        <p className="tracked-caps text-xs text-gold">Inside the unit</p>
        <h2 className="mt-5 max-w-3xl font-display text-4xl leading-tight font-light text-ink">
          A walk through the Harohalli plant
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-muted">
          {facilityShotCount} views taken on a single walk through the unit — in
          at the gate, down the shop floor, past packing and the warehouse, and
          up to the offices and the display room.
        </p>

        <div className="mt-12">
          <FacilityGallery />
        </div>
      </section>

      <div className="mt-4">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-24 border-t border-hairline pt-14 mt-14"
          >
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
              <div className="lg:sticky lg:top-24 lg:h-fit">
                <p className="tracked-caps text-xs text-gold">
                  {section.eyebrow}
                </p>
                <h2 className="mt-5 font-display text-4xl leading-tight font-light text-ink">
                  {section.heading}
                </h2>
                <p className="mt-6 text-base leading-relaxed text-ink-muted">
                  {section.body}
                </p>
              </div>
              {section.specs && <SpecTable specs={section.specs} />}
            </div>
          </section>
        ))}
      </div>

      <section className="relative mt-20 border border-hairline bg-ivory p-8 sm:p-12">
        <span className="gold-leaf absolute inset-x-0 top-0 h-px" />
        <h2 className="font-display text-3xl leading-tight font-light text-ink">
          Need a full technical data sheet?
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted">
          Component-level sheets, test reports and packing dimensions are
          available to trade buyers on request. Every product page also carries
          its own component specification.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={enquiryLink("Request — technical data sheet")}
            className="gold-fill tracked-caps px-8 py-4 text-xs transition-opacity hover:opacity-90"
          >
            Request a data sheet
          </a>
          <Link
            href="/products/"
            className="tracked-caps border border-gold px-8 py-4 text-xs text-gold transition-colors hover:bg-gold hover:text-on-gold"
          >
            Browse the catalogue
          </Link>
        </div>
      </section>
    </div>
  );
}
