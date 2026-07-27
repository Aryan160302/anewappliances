/**
 * The product catalogue, transcribed from the source collateral in ../../data:
 *
 *   Induction cooktops  <- "Anew Appliances Catalogue.pdf", pages 2-7
 *   Electric kettles    <- "Water Kettle Catalogue.pptx", slides 2-8
 *
 * Every spec value here appears verbatim in one of those files. Nothing is
 * inferred — if a figure is absent from the source it is absent here too.
 * Images are produced by scripts/extract_assets.py from the same files.
 */

export type CategorySlug = "induction-cooktops" | "electric-kettles";

export type Spec = { label: string; value: string };

export type Product = {
  slug: string;
  model: string;
  name: string;
  category: CategorySlug;
  tagline: string;
  summary: string;
  highlights: string[];
  specs: Spec[];
  images: string[];
};

export type Category = {
  slug: CategorySlug;
  name: string;
  blurb: string;
  cover: string;
};

export const categories: Category[] = [
  {
    slug: "induction-cooktops",
    name: "Induction Cooktops",
    blurb:
      "Six models across ceramic and crystal glass plates, from push-button classics to 2,000 W touch-control tops.",
    cover: "/products/m3/hero.webp",
  },
  {
    slug: "electric-kettles",
    name: "Electric Kettles",
    blurb:
      "1.5 L to 2.0 L stainless steel kettles on 201 brushed bodies, with BIS and non-BIS power cords.",
    cover: "/products/ssj1507/hero.webp",
  },
];

/**
 * The tail of every cooktop spec table (PDF pages 2-7) — identical across all
 * six models, and printed in this order in the source.
 */
const cooktopCommonSpecs: Spec[] = [
  { label: "Display", value: "4 LED display" },
  { label: "Fan Model", value: "BI-01 · DC 18 V 0.18 A" },
  { label: "Fan Speed", value: "2300 ± 100 RPM" },
  { label: "Power Cord Length", value: "1.15 m" },
  { label: "Plug Type", value: "3-Pin" },
];

type CooktopSource = {
  slug: string;
  model: string;
  name: string;
  summary: string;
  plateType: string;
  plateSize: string;
  powerDisplay: string;
  powerTested: string;
  weight: string;
  colour: string;
  controlType: string;
  presets: string;
};

const cooktopSources: CooktopSource[] = [
  {
    slug: "a4",
    model: "A4",
    name: "Classic Ceramic Induction Cooktop",
    summary:
      "The entry point to the range: a 1,600 W ceramic plate with push-button control and seven preset menus, on a white control panel.",
    plateType: "Ceramic plate",
    plateSize: "250 × 250 × 5.5 mm",
    powerDisplay: "1,600 W",
    powerTested: "1,300 W",
    weight: "1,480 g ± 50 g",
    colour: "Black / White control panel",
    controlType: "Push button control",
    presets: "7 preset menus",
  },
  {
    slug: "a4-5kva",
    model: "A4 – 5KVA",
    name: "Crystal Glass Induction Cooktop",
    summary:
      "The A4 layout on a slimmer 3.5 mm unpolished crystal glass plate — the same seven presets and push-button control in a lower-profile body.",
    plateType: "Unpolished crystal glass",
    plateSize: "250 × 250 × 3.5 mm",
    powerDisplay: "1,600 W",
    powerTested: "1,300 W",
    weight: "1,480 g ± 50 g",
    colour: "Black / White control panel",
    controlType: "Push button control",
    presets: "7 preset menus",
  },
  {
    slug: "a8",
    model: "A8",
    name: "Premium Ceramic Induction Cooktop",
    summary:
      "A ceramic-plate cooktop with a golden control panel and an eighth preset menu over the A4.",
    plateType: "Ceramic plate",
    plateSize: "250 × 250 × 5.5 mm",
    powerDisplay: "1,600 W",
    powerTested: "1,300 W",
    weight: "1,600 g ± 50 g",
    colour: "Black / Golden control panel",
    controlType: "Push button control",
    presets: "8 preset menus",
  },
  {
    slug: "a8-5kva",
    model: "A8 – 5KVA",
    name: "Golden Crystal Induction Cooktop",
    summary:
      "The A8's golden panel over a 3.5 mm unpolished crystal glass plate, with eight preset menus.",
    plateType: "Unpolished crystal glass",
    plateSize: "250 × 250 × 3.5 mm",
    powerDisplay: "1,600 W",
    powerTested: "1,300 W",
    weight: "1,600 g ± 50 g",
    colour: "Black / Golden control panel",
    controlType: "Push button control",
    presets: "8 preset menus",
  },
  {
    slug: "m3",
    model: "M3",
    name: "Pro Touch Induction Cooktop",
    summary:
      "The largest plate in the range at 350 × 280 mm, rated 2,000 W, with a golden touch control panel in place of push buttons.",
    plateType: "Unpolished crystal glass",
    plateSize: "350 × 280 × 3.5 mm",
    powerDisplay: "2,000 W",
    powerTested: "1,600 W",
    weight: "1,850 g ± 50 g",
    colour: "Black / Golden touch panel",
    controlType: "Touch control",
    presets: "8 preset menus",
  },
  {
    slug: "m3-5kva",
    model: "M3 – 5KVA",
    name: "Pro Touch Polished Crystal Cooktop",
    summary:
      "The top of the range: the M3's 2,000 W touch-control platform finished with a polished crystal glass plate.",
    plateType: "Polished crystal glass",
    plateSize: "350 × 280 × 3.5 mm",
    powerDisplay: "2,000 W",
    powerTested: "1,600 W",
    weight: "1,850 g ± 50 g",
    colour: "Black / Golden touch panel",
    controlType: "Touch control",
    presets: "8 preset menus",
  },
];

const cooktops: Product[] = cooktopSources.map((source) => ({
  slug: source.slug,
  model: source.model,
  name: source.name,
  category: "induction-cooktops",
  tagline: source.name,
  summary: source.summary,
  highlights: [
    `${source.powerDisplay} rated power`,
    source.plateType,
    source.controlType,
    source.presets,
  ],
  specs: [
    { label: "Supply Voltage / Frequency", value: "230 V, 50 Hz" },
    { label: "Power Output (Display)", value: source.powerDisplay },
    { label: "Power Output (Tested)", value: source.powerTested },
    { label: "Product Weight", value: source.weight },
    { label: "Colour", value: source.colour },
    { label: "Plate Type", value: source.plateType },
    { label: "Plate Size", value: source.plateSize },
    { label: "Control Type", value: source.controlType },
    { label: "Preset Menus", value: source.presets },
    ...cooktopCommonSpecs,
  ],
  images: [`/products/${source.slug}/hero.webp`],
}));

/**
 * Builds a kettle's spec table. Every SS kettle in the deck (slides 3, 5-8)
 * repeats the same power, inner lid, controller and power cord lines, so those
 * are filled in here and the per-model differences are passed through.
 */
function kettleSpecs(model: {
  capacity: string;
  bodyThickness: string;
  extras?: Spec[];
}): Spec[] {
  return [
    { label: "Capacity", value: model.capacity },
    { label: "Power / Supply", value: "1350 W, 220–240 V, 50–60 Hz" },
    {
      label: "Body",
      value: `201 brushed stainless steel, ${model.bodyThickness} thick`,
    },
    { label: "Inner Lid", value: "201 stainless steel" },
    { label: "Controller", value: "FADA single chip controller" },
    { label: "Power Cords", value: "India plug · BIS & non-BIS power cords" },
    ...(model.extras ?? []),
    { label: "Other", value: "Indicator light" },
  ];
}

const kettles: Product[] = [
  {
    slug: "kettle-base",
    model: "Base Model",
    name: "1.5 L Stainless Steel Kettle",
    category: "electric-kettles",
    tagline: "Base model",
    summary:
      "The base kettle in the range — a 1.5 L stainless steel body offered in a glossy or matt finish, on a Zhontong controller.",
    highlights: ["1.5 L capacity", "1350 W", "Glossy or matt SS body"],
    specs: [
      { label: "Capacity", value: "1.5 L" },
      { label: "Power", value: "1350 W" },
      { label: "Body", value: "Stainless steel — glossy / matt" },
      { label: "Controller", value: "Zhontong" },
    ],
    images: ["/products/kettle-base/hero.webp"],
  },
  {
    slug: "kettle-colour",
    model: "Colour Model",
    name: "1.5 L Double-Layered Colour Kettle",
    category: "electric-kettles",
    tagline: "Colour range",
    summary:
      "A double-layered 1.5 L kettle with a PP plastic outer layer over the steel body, available in black and white.",
    highlights: [
      "1.5 L, double layered",
      "PP plastic outer layer",
      "Black and white finishes",
      "Wide mouth for easy cleaning",
    ],
    specs: kettleSpecs({
      capacity: "1.5 L (double layered)",
      bodyThickness: "0.28 mm",
      extras: [
        { label: "Outer Layer", value: "PP plastic" },
        { label: "Mouth", value: "Wide mouth for easy cleaning" },
        { label: "Finishes", value: "Black · White" },
      ],
    }),
    images: [
      "/products/kettle-colour/hero.webp",
      "/products/kettle-colour/gallery-1.webp",
      "/products/kettle-colour/gallery-2.webp",
    ],
  },
  {
    slug: "ssj1501",
    model: "SSJ1501",
    name: "2.0 L Stainless Steel Kettle",
    category: "electric-kettles",
    tagline: "Model SSJ1501",
    summary:
      "The heaviest-gauge kettle in the range at 0.32 mm, with a 2.0 L capacity and a wide mouth for multipurpose cooking.",
    highlights: [
      "2.0 L capacity",
      "0.32 mm brushed steel body",
      "Wide mouth for multipurpose cooking",
    ],
    specs: kettleSpecs({
      capacity: "2.0 L",
      bodyThickness: "0.32 mm",
      extras: [
        {
          label: "Mouth",
          value: "Wide mouth for easy cleaning & multipurpose cooking",
        },
      ],
    }),
    images: [
      "/products/ssj1501/hero.webp",
      "/products/ssj1501/gallery-1.webp",
      "/products/ssj1501/gallery-2.webp",
    ],
  },
  {
    slug: "ssj1507",
    model: "SSJ1507",
    name: "2.0 L Kettle with One-Click Lid",
    category: "electric-kettles",
    tagline: "Model SSJ1507",
    summary:
      "A 2.0 L brushed steel kettle whose lid springs open at one click — the easiest of the range to fill and clean.",
    highlights: [
      "2.0 L capacity",
      "One-click automatic lid opening",
      "0.28 mm brushed steel body",
    ],
    specs: kettleSpecs({
      capacity: "2.0 L",
      bodyThickness: "0.28 mm",
      extras: [
        { label: "Lid", value: "One-click automatic lid opening" },
        {
          label: "Mouth",
          value: "Wide mouth for easy cleaning & multipurpose cooking",
        },
      ],
    }),
    images: [
      "/products/ssj1507/hero.webp",
      "/products/ssj1507/gallery-1.webp",
      "/products/ssj1507/gallery-2.webp",
      "/products/ssj1507/gallery-3.webp",
    ],
  },
  {
    slug: "ssj1508",
    model: "SSJ1508",
    name: "1.8 L Stainless Steel Kettle",
    category: "electric-kettles",
    tagline: "Model SSJ1508",
    summary:
      "A 1.8 L brushed steel kettle sized between the 1.5 L and 2.0 L models, with the same wide mouth and indicator light.",
    highlights: [
      "1.8 L capacity",
      "0.28 mm brushed steel body",
      "Wide mouth for multipurpose cooking",
    ],
    specs: kettleSpecs({
      capacity: "1.8 L",
      bodyThickness: "0.28 mm",
      extras: [
        {
          label: "Mouth",
          value: "Wide mouth for easy cleaning & multipurpose cooking",
        },
      ],
    }),
    images: [
      "/products/ssj1508/hero.webp",
      "/products/ssj1508/gallery-1.webp",
      "/products/ssj1508/gallery-2.webp",
    ],
  },
  {
    slug: "ssj1517",
    model: "SSJ1517",
    name: "1.5 L Double-Layered Kettle",
    category: "electric-kettles",
    tagline: "Model SSJ1517",
    summary:
      "A double-layered 1.5 L kettle: a 201 brushed steel interior inside a PP plastic outer layer that stays cool to the touch.",
    highlights: [
      "1.5 L, double layered",
      "PP plastic outer layer",
      "0.28 mm brushed steel body",
    ],
    specs: kettleSpecs({
      capacity: "1.5 L (double layered)",
      bodyThickness: "0.28 mm",
      extras: [
        { label: "Outer Layer", value: "PP plastic" },
        {
          label: "Mouth",
          value: "Wide mouth for easy cleaning & multipurpose cooking",
        },
      ],
    }),
    images: ["/products/ssj1517/hero.webp"],
  },
];

export const products: Product[] = [...cooktops, ...kettles];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function productsByCategory(category: CategorySlug): Product[] {
  return products.filter((product) => product.category === category);
}

export function getCategory(slug: CategorySlug): Category {
  return categories.find((category) => category.slug === slug)!;
}

/** Other models in the same category, for the related row on a detail page. */
export function relatedProducts(product: Product, limit = 3): Product[] {
  return productsByCategory(product.category)
    .filter((candidate) => candidate.slug !== product.slug)
    .slice(0, limit);
}
