/**
 * The product catalogue, transcribed from the source collateral in ../../data:
 *
 *   Induction cooktops  <- "Anew Appliances Catalogue.pdf", pages 2-7
 *                          "new data/TDS Of ICT.xlsx", the component rows
 *                          "new data/ICT Premium Models.xlsx", sheet 1
 *   Infrared cookers    <- "new data/Technical specification for Infrared
 *                          Cooker 20260416 - Copy.xlsx"
 *   Electric kettles    <- "Water Kettle Catalogue.pptx", slides 2-8
 *
 * Every spec value here appears verbatim in one of those files. Nothing is
 * inferred — if a figure is absent from the source it is absent here too.
 * Images are produced by scripts/extract_assets.py from the same files.
 *
 * The costing sheets in "ICT Premium Models.xlsx" (import price, wastage,
 * labour, margin) are internal and are deliberately not represented here.
 */

export type CategorySlug =
  | "induction-cooktops"
  | "infrared-cookers"
  | "electric-kettles";

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
  /**
   * Component-level engineering data from the technical data sheets — the
   * fuse, IGBT, capacitors, coil and cord build. Trade buyers ask for it;
   * retail visitors don't, so the detail page keeps it behind a disclosure.
   */
  components?: Spec[];
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
      "Nine models across ceramic, crystal glass and microcrystalline plates — from push-button classics to a 26 mm ultra-thin top and a folding double hob.",
    cover: "/products/m3/hero.webp",
  },
  {
    slug: "infrared-cookers",
    name: "Infrared Cookers",
    blurb:
      "2,000 W radiant cookers reaching 650–700 °C on polished crystal glass, in a plastic or an aluminium body. Cookware of any material, not just steel.",
    // Like the other two ranges, the cover reuses a model's own photograph.
    cover: "/products/a22/hero.webp",
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

/**
 * The six catalogue cooktops are built on two boards. "TDS Of ICT.xlsx" rows
 * 16-35 are identical down each board's column; only the IGBT, the choke and
 * the MOV vary between the standard and the 5KVA variant of a model, so those
 * three sit on the model and everything else sits on the platform.
 */
type CooktopPlatform = {
  thermalFuse: string;
  hvCapacitor: string;
  safetyCapacitor: string;
  suppressionCapacitor: string;
  bridgeRectifier: string;
  chokeWire: string;
  ic: string;
  controlPanelIc: string;
  adaptor: string;
  coilWeight: string;
  coilRadius: string;
  coilCircles: string;
  coilStrands: string;
};

const cooktopPlatforms: Record<"1600w" | "2000w", CooktopPlatform> = {
  "1600w": {
    thermalFuse: "10 A / 250 V ceramic type · 3.6 × 10 mm",
    hvCapacitor:
      "0.27 µF MKPH 630 (1200 V) · 50 kHz · 40/105/21 · Maker BM · 29 × 22 × 13 mm",
    safetyCapacitor:
      "0.1 µF K X2 275 VAC · 40/100/21 · Maker BM or TC · 17.5 × 5.5 × 7.5 mm",
    suppressionCapacitor:
      "5 µF 275 VAC MKP-X2 · 40/105/21 · Maker BM · 30 × 22.5 × 16 mm",
    bridgeRectifier: "GBU1510 · Maker Ruisong · 15 A / 1000 V · 22 × 18 × 3.5 mm",
    chokeWire: "1.0 ± 0.1 mm",
    ic: "YuanMi 16P · 19 × 4 × 8 mm",
    controlPanelIc: "TM1628A or AIP1628",
    adaptor: "EE10 – 1.0 mH",
    coilWeight: "220 g ± 20 g",
    coilRadius: "82 mm CCA heating area",
    coilCircles: "27 circles",
    coilStrands: "16",
  },
  "2000w": {
    thermalFuse: "12.5 A / 250 V ceramic type · 10 × 20 mm",
    hvCapacitor:
      "0.3 µF 5630 V (1200 V) · 50 kHz · 40/105/21 · Maker BM · 35 × 14 × 25 mm",
    safetyCapacitor: "2 µF 5 MKP 275 VAC · 40/105/21 · Maker BM · 30 × 9 × 17 mm",
    suppressionCapacitor:
      "5 µF 400 V – 275 V MKP-X2 · Maker BM · 36 × 25 × 18 mm",
    bridgeRectifier: "GBU2010 · Maker Ruisong · 20 A / 1000 V · 22 × 18 × 3.5 mm",
    chokeWire: "1.25 ± 0.1 mm",
    ic: "YuanMi DP16",
    controlPanelIc: "MCU-CMS79FT613C",
    adaptor: "E113 – 2.0 mH",
    coilWeight: "236 g ± 20 g",
    coilRadius: "80 mm CCA heating area",
    coilCircles: "28 circles",
    coilStrands: "22",
  },
};

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
  platform: keyof typeof cooktopPlatforms;
  igbt: string;
  chokeOd: string;
  mov: string;
};

/** TDS rows 16-35, in the order the sheet prints them. */
function cooktopComponents(source: CooktopSource): Spec[] {
  const platform = cooktopPlatforms[source.platform];
  return [
    { label: "Thermal Fuse", value: platform.thermalFuse },
    { label: "IGBT", value: source.igbt },
    { label: "H.V. Capacitor", value: platform.hvCapacitor },
    { label: "Safety Regulation Capacitor", value: platform.safetyCapacitor },
    {
      label: "Interference Suppression Capacitor",
      value: platform.suppressionCapacitor,
    },
    { label: "Bridge Rectifier", value: platform.bridgeRectifier },
    {
      label: "Low Pass Filter (Choke)",
      value: `OD ${source.chokeOd} · CCA wire ${platform.chokeWire}`,
    },
    { label: "MOV", value: source.mov },
    { label: "IC", value: platform.ic },
    { label: "Power IC", value: "DZ-12A / PN3912 / FSD12A · 9.5 × 8.5 × 4.5 mm" },
    { label: "Control Panel IC", value: platform.controlPanelIc },
    { label: "LED Board", value: "94HB" },
    { label: "Adaptor", value: platform.adaptor },
    { label: "Heating Coil — Connection", value: "Screw fixing to PCB" },
    { label: "Heating Coil — Weight", value: platform.coilWeight },
    { label: "Heating Coil — Radius", value: platform.coilRadius },
    { label: "Heating Coil — Circles", value: platform.coilCircles },
    { label: "Heating Coil — Strands", value: platform.coilStrands },
    { label: "Heating Coil — Wire Diameter", value: "0.35 mm" },
    {
      label: "Power Cord — Conductor",
      value: "24 strands × 0.193 mm · 0.75 mm² cross-section",
    },
    { label: "Power Cord — Colour", value: "Black" },
  ];
}

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
    platform: "1600w",
    igbt: "G15T120BNR3S · Maker Huajing · 15 A / 1200 DC · 20 × 16 × 5 mm",
    chokeOd: "27 ± 1 mm",
    mov: "Not fitted",
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
    platform: "1600w",
    igbt: "G20T135BK3S · Maker Huajing · 20 A / 1350 V · 21 × 16 × 5 mm",
    chokeOd: "24 ± 1 mm",
    mov: "BY 14D471K · Maker Baiyou",
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
    platform: "1600w",
    igbt: "G15T120BNR3S · Maker Huajing · 15 A / 1200 DC · 20 × 16 × 5 mm",
    chokeOd: "27 ± 1 mm",
    mov: "Not fitted",
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
    platform: "1600w",
    igbt: "G20T135BK3S · Maker Huajing · 20 A / 1350 V · 21 × 16 × 5 mm",
    chokeOd: "24 ± 1 mm",
    mov: "BY 14D471K · Maker Baiyou",
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
    platform: "2000w",
    igbt: "G20T135BK3S · Maker Huajing · 20 A / 1350 V · 21 × 16 × 5 mm",
    chokeOd: "31 ± 1 mm",
    mov: "Not fitted",
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
    platform: "2000w",
    igbt: "G20T135BK3S · Maker Huajing · 20 A / 1350 V · 21 × 16 × 5 mm",
    chokeOd: "31 ± 1 mm",
    mov: "HEL 14D471K · Maker Hongzhi or Maker Baiyou",
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
  components: cooktopComponents(source),
  images: [`/products/${source.slug}/hero.webp`],
}));

/**
 * The premium induction models, from "ICT Premium Models.xlsx", sheet
 * "Induction Cooker Special Models". These are described in prose rather than
 * in the TDS grid, so they carry no `components` block.
 */
const premiumCooktops: Product[] = [
  {
    slug: "cooktop-plus",
    model: "Cooktop Plus",
    name: "Ultra-Thin Induction Cooktop",
    category: "induction-cooktops",
    tagline: "26 mm ultra-thin",
    summary:
      "A 2,000 W single-burner top just 26 mm deep, with an NTC sensor holding the plate to within ±3 °C and both the set and the actual temperature on the display.",
    highlights: [
      "2,000 W, single burner",
      "NTC temperature control to ±3 °C",
      "26 mm ultra-thin body",
      "Preset and real temperature display",
    ],
    specs: [
      { label: "Supply Voltage / Frequency", value: "AC 220–240 V" },
      { label: "Power Output", value: "2,000 W" },
      { label: "Burners", value: "1" },
      { label: "Control Type", value: "Touch control" },
      {
        label: "Temperature Control",
        value: "NTC sensor, precise to ± 3 °C",
      },
      {
        label: "Display",
        value: "Preset and real temperature, both adjustable",
      },
      {
        label: "Modes",
        value: "Fry · Deep fry · Boil · Soup & stew · Boost · Milk",
      },
      { label: "Timer", value: "2 hour and 3 hour presets" },
      { label: "Features", value: "Child lock · Timer · Heating · Modes" },
      { label: "Material", value: "PP · Microcrystalline glass" },
      { label: "Product Size (L × W × H)", value: "360 × 280 × 26 mm" },
      { label: "Other", value: "Heats evenly and constantly" },
    ],
    images: [
      "/products/cooktop-plus/hero.webp",
      "/products/cooktop-plus/gallery-1.webp",
    ],
  },
  {
    slug: "double-hob-foldable",
    model: "Double Hob",
    name: "Foldable Double Hob Induction Cooktop",
    category: "induction-cooktops",
    tagline: "Patented folding design",
    summary:
      "Two independent hobs — 2,000 W and 1,500 W — on a patented hinge that folds the cooktop in half for storage. The larger hob takes a cooking temperature directly through an NTC sensor.",
    highlights: [
      "2,000 W + 1,500 W independent hobs",
      "Patented foldable design",
      "NTC temperature setting on the 2,000 W hob",
      "8 functions on each hob",
    ],
    specs: [
      { label: "Supply Voltage / Frequency", value: "AC 230 V, 50 Hz" },
      { label: "Hob 1 Power", value: "2,000 W (+5 %, −10 %)" },
      { label: "Hob 2 Power", value: "1,500 W (+5 %, −10 %)" },
      {
        label: "Functions (each hob)",
        value:
          "Keep warm · Simmer · Boost · Milk · Water · Deep fry · Soup · Stew",
      },
      {
        label: "Hob 1 Control",
        value: "NTC sensor — set the cooking temperature directly",
      },
      {
        label: "Hob 2 Control",
        value: "Power adjustment for each function",
      },
      { label: "Heating Method", value: "Electromagnetic heating" },
      { label: "Heat Dissipation", value: "Fan cooling" },
      {
        label: "Material",
        value:
          "Microcrystalline panel · Black matte silicone cover · Anodised aluminium alloy · PP",
      },
      { label: "Net Weight", value: "4.8 kg" },
      { label: "Thickness", value: "25 mm" },
      {
        label: "Product Size",
        value: "580 × 380 × 26 mm (excluding the rubber feet)",
      },
    ],
    images: [
      "/products/double-hob-foldable/hero.webp",
      "/products/double-hob-foldable/gallery-1.webp",
    ],
  },
  {
    slug: "slim-stove",
    model: "Slim Stove",
    name: "Slim Stainless Steel Induction Stove",
    category: "induction-cooktops",
    tagline: "Brushed stainless body",
    summary:
      "A slim induction stove on a brushed stainless steel body, with six numbered cooking programmes and a backlit ring around the plate. The full specification sheet is available on request.",
    highlights: [
      "Brushed stainless steel body",
      "6 cooking programmes, F01–F06",
      "Illuminated cooking ring",
      "Slim profile",
    ],
    specs: [
      { label: "Body", value: "Brushed stainless steel" },
      { label: "Control Type", value: "Touch control" },
      {
        label: "Programmes",
        value: "F01 Stir-fry · F02 Deep-fry · F03 Fry · F04 Simmer · F05 Boil · F06 Keep warm",
      },
      { label: "Display", value: "Temperature and timer" },
    ],
    images: ["/products/slim-stove/hero.webp"],
  },
];

/**
 * Infrared cookers, from "Technical specification for Infrared Cooker
 * 20260416". Radiant rather than induction, so any cookware works.
 */
type InfraredSource = {
  slug: string;
  model: string;
  name: string;
  description: string;
  summary: string;
  highlights: string[];
  powerDisplay: string;
  weight: string;
  colour: string;
  plateSize: string;
  feature: string;
  fan: string;
  fanRpm: string;
  pcbSize: string;
  body: string;
};

const infraredSources: InfraredSource[] = [
  {
    slug: "p41",
    model: "P41",
    name: "Infrared Cooker, Plastic Body",
    description: "Plastic infrared cooker",
    summary:
      "A 2,000 W radiant cooker reaching 650 °C on a polished crystal glass plate, with a golden touch panel and six preset menus. Radiant heat works with any cookware, not only steel.",
    highlights: [
      "2,000 W / 650 °C",
      "Polished crystal glass plate",
      "6 preset menus, touch control",
      "4 KVA testing passed",
    ],
    powerDisplay: "2,000 W / 650 °C",
    weight: "2,240 g",
    colour: "Black / Golden touch panel",
    plateSize: "290 × 370 × 3.6 mm",
    feature: "Touch control · 6 preset menus · 7 spring · 8 lights · 4 LED display",
    fan: "BI-12 · DC 18 V 0.20 A",
    fanRpm: "3,200 RPM",
    pcbSize: "Main PCB 99 × 73 × 1.5 mm · Display PCB 240 × 60 × 1.5 mm",
    body: "Plastic body",
  },
  {
    slug: "a22",
    model: "A22",
    name: "Infrared Cooker, Aluminium Body",
    description: "Aluminum infrared cooker",
    summary:
      "The hotter of the pair at 700 °C, in an aluminium body with aluminium handles and a control knob alongside the touch panel.",
    highlights: [
      "2,000 W / 700 °C",
      "Aluminium body, handles and knob",
      "6 preset menus plus a control knob",
      "4 KVA testing passed",
    ],
    powerDisplay: "2,000 W / 700 °C",
    weight: "2,340 g",
    colour: "Black / White touch panel",
    plateSize: "280 × 360 × 3.6 mm",
    feature:
      "Touch control · 6 preset menus · 6 spring · 6 lights · 1 control knob · 4 LED display",
    fan: "BI-09 · DC 18 V 0.22 A",
    fanRpm: "2,200 RPM",
    pcbSize: "Main PCB 99 × 73 × 1.5 mm · Display PCB 142 × 56 × 1.5 mm",
    body: "Aluminium body, aluminium handle and aluminium knob",
  },
];

/** Component rows identical down both infrared columns of the spec sheet. */
const infraredCommonComponents: Spec[] = [
  { label: "Thermal Fuse", value: "15 A / 250 V ceramic type · 5 × 20 mm" },
  { label: "SCR", value: "BTB16 · Huangshan · 16 A / 800 V · 15 × 10 × 4.5 mm" },
  {
    label: "Safety Regulation Capacitor",
    value: "0.1 µF X2 275 VAC · 40/100/21 · Maker BM or TC · 17.5 × 5.5 × 7 mm",
  },
  { label: "MOV", value: "14D471" },
  { label: "IC", value: "DTLSP16" },
  { label: "Power IC", value: "DZ-12A / PN3912 / FSD12A · 9.5 × 8.5 × 4.5 mm" },
  { label: "Control Panel IC", value: "YuanMi XSSP20" },
  { label: "LED Board", value: "94V0" },
  { label: "Adaptor", value: "EE13 – 2.0 mH" },
  { label: "Heating Coil — Connection", value: "Screw fixing to PCB" },
  { label: "Heating Coil — Weight", value: "391.5 g" },
  { label: "Heating Coil — Power", value: "230 V, 2,000 W" },
  { label: "Heating Coil — Circles", value: "10 circles" },
  {
    label: "Heating Coil — Strand Diameter",
    value: "Outer 20 mm · Inner 17.5 mm · Height 31 mm",
  },
  { label: "Heating Coil — Line Length", value: "16 mm" },
  {
    label: "Power Cord — Conductor",
    value: "16 strands × 0.193 mm · 1 mm² cross-section",
  },
  { label: "Power Cord — Colour", value: "Black" },
];

const infraredCookers: Product[] = infraredSources.map((source) => ({
  slug: source.slug,
  model: source.model,
  name: source.name,
  category: "infrared-cookers",
  tagline: source.description,
  summary: source.summary,
  highlights: source.highlights,
  specs: [
    { label: "Product Description", value: source.description },
    { label: "Supply Voltage / Frequency", value: "230 V, 50 Hz" },
    { label: "Power Output (Display)", value: source.powerDisplay },
    { label: "Power Output (Tested)", value: "2,000 W (+5 %, −10 %)" },
    { label: "Product Weight", value: source.weight },
    { label: "Colour", value: source.colour },
    { label: "Plate Type", value: "Polished crystal glass" },
    { label: "Plate Size", value: source.plateSize },
    { label: "Feature", value: source.feature },
    { label: "Body Material", value: source.body },
    { label: "Fan Model", value: source.fan },
    { label: "Fan Speed", value: source.fanRpm },
    { label: "4 KVA Testing", value: "Passed" },
    { label: "Power Cord Length", value: "1.25 m total · 1.1 m effective" },
    { label: "Plug Type", value: "3-Pin 3-Core" },
  ],
  components: [
    { label: "PCB Size", value: source.pcbSize },
    {
      label: "Connection Method (Power Cord & Heating Coil)",
      value: "Screw fixing",
    },
    ...infraredCommonComponents,
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

export const products: Product[] = [
  ...cooktops,
  ...premiumCooktops,
  ...infraredCookers,
  ...kettles,
];

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
