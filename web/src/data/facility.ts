/**
 * Stills from the walkthrough of the Harohalli unit, produced by
 * scripts/extract_facility_frames.py from "data/new data/factory video.mp4".
 *
 * Every caption describes only what is visible in its own frame. The video is
 * a handheld walkthrough shot in one pass, so the groups below follow the
 * route it takes: in at the gate, down the shop floor, through packing and
 * the warehouse, then up to the offices and the display room.
 */

export type FacilityShot = {
  /** Basename in public/facility — `<slug>.webp` and `<slug>-card.webp`. */
  slug: string;
  /** Short label under the photograph. */
  title: string;
  /** Alt text: what a sighted visitor sees in the frame. */
  alt: string;
  caption: string;
};

export type FacilityGroup = {
  id: string;
  name: string;
  blurb: string;
  shots: FacilityShot[];
};

export const facilityGroups: FacilityGroup[] = [
  {
    id: "the-unit",
    name: "The unit",
    blurb:
      "A clear-span steel shed at Plot WP-98, on 3rd Phase of the Harohalli Industrial Area at Bannikuppe village.",
    shots: [
      {
        slug: "entrance",
        title: "The gate",
        alt: "The factory gate with the Anew Appliances board mounted on the compound wall",
        caption:
          "The company board at the gate, in Kannada and English, carries the plot address and GST registration.",
      },
    ],
  },
  {
    id: "shop-floor",
    name: "The shop floor",
    blurb:
      "One open bay under continuous roof lighting, floored in blue epoxy so spills and dropped hardware stay visible.",
    shots: [
      {
        slug: "shop-floor",
        title: "Main bay",
        alt: "A long factory bay with a blue epoxy floor, roof lights overhead and benches down one side",
        caption:
          "The full length of the shed, with the benches down one side and stock down the other.",
      },
      {
        slug: "assembly-overview",
        title: "Assembly area",
        alt: "Assembly benches beside stacks of flat-packed cartons on the factory floor",
        caption:
          "Assembly benches sit alongside staged cartons, so a finished unit is boxed a few steps from where it is built.",
      },
      {
        slug: "assembly-bay",
        title: "A bench bay",
        alt: "A workbench bay with overhead racking, task chairs and a pedestal fan",
        caption:
          "Each bay pairs a bench with overhead racking for parts and a pedestal fan for the operator.",
      },
      {
        slug: "assembly-line",
        title: "At the bench",
        alt: "An operator working at a long assembly bench with components laid out in front of them",
        caption:
          "Components are laid out along the bench in build order, with the packing material staged behind.",
      },
      {
        slug: "mezzanine",
        title: "Mezzanine stair",
        alt: "A steel staircase rising from the blue factory floor to a mezzanine level",
        caption:
          "A steel stair to the mezzanine, which puts storage above the floor rather than on it.",
      },
    ],
  },
  {
    id: "packing-dispatch",
    name: "Packing and dispatch",
    blurb:
      "Finished units are bagged, boxed into printed cartons and stacked into master cartons for dispatch.",
    shots: [
      {
        slug: "packing",
        title: "Packing racks",
        alt: "Racks of individually bagged kettles beside stacked cartons",
        caption:
          "Each unit is poly-bagged and racked before it is boxed, keeping the finish clean through packing.",
      },
      {
        slug: "warehouse",
        title: "Finished stock",
        alt: "Master cartons stacked several rows deep in the warehouse bay",
        caption:
          "Master cartons stacked for dispatch — six units to a master, on a 4-ply board.",
      },
    ],
  },
  {
    id: "offices",
    name: "Offices and display",
    blurb:
      "The office side of the unit, where trade buyers are received and the current range is kept on display.",
    shots: [
      {
        slug: "office",
        title: "Office",
        alt: "An office with a desk, task chairs, a window and a wall-mounted air conditioner",
        caption: "The office sits alongside the floor rather than off site.",
      },
      {
        slug: "meeting-room",
        title: "Meeting room",
        alt: "A meeting room with a long table and eight chairs",
        caption: "Where dealer and export enquiries are taken.",
      },
      {
        slug: "showroom",
        title: "Display room",
        alt: "A display cabinet holding a row of electric kettles",
        caption: "The current range kept together, one of each finish.",
      },
      {
        slug: "kettle-display",
        title: "Kettle shelf",
        alt: "Glass kettles on an upper shelf above brushed stainless steel kettles",
        caption:
          "Glass-bodied kettles above, brushed stainless below — the 1.5 L and 2.0 L bodies side by side.",
      },
      {
        slug: "cooktop-display",
        title: "Cooktop shelf",
        alt: "Coloured kettles on a shelf above a black induction cooktop",
        caption:
          "Colour-finish kettles over an induction cooktop, showing both ranges together.",
      },
    ],
  },
];

/** The shot used as the lead image on the Machineries page. */
export const facilityLead: FacilityShot = {
  slug: "shop-floor",
  title: "The shop floor",
  alt: "A long factory bay with a blue epoxy floor, roof lights overhead and benches down one side",
  caption: "The main bay at the Harohalli unit.",
};

/**
 * The building itself, shown on the About page. It is kept out of the gallery
 * above because it and `entrance` are two framings of the same gate, seconds
 * apart in the walkthrough, and sit poorly next to each other in a grid.
 */
export const facilityExterior: FacilityShot = {
  slug: "exterior",
  title: "The unit",
  alt: "A steel-clad factory shed with orange roof trim behind a grey compound wall",
  caption:
    "Plot WP-98 — a single clear-span shed, so the floor inside carries no internal columns.",
};

export const facilityShotCount = facilityGroups.reduce(
  (total, group) => total + group.shots.length,
  0,
);
