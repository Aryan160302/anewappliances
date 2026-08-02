export const company = {
  name: "Anew Appliances",
  tagline: "Kitchen appliances engineered in Karnataka",
  description:
    "Anew Appliances manufactures induction cooktops, infrared cookers and stainless steel electric kettles for the Indian home, built to BIS specifications at our unit in the Harohalli Industrial Area.",
  email: "info@anewappliances.com",
  website: "www.anewappliances.com",
  // wa.me expects the number in full international form, digits only.
  whatsapp: { number: "919886202037", display: "+91 98862 02037" },
  address: {
    lines: [
      "Plot No WP-98, Women Entrepreneurs Park",
      "Kanakapura Taluk, Harohalli Industrial Area",
      "Ramanagara, Karnataka – 562112",
    ],
    country: "India",
    postalCode: "562112",
    locality: "Harohalli, Kanakapura Taluk",
    region: "Karnataka",
  },
  catalogue: "/downloads/anew-appliances-induction-catalogue.pdf",
} as const;

/**
 * The address as a single line, for map queries and structured data. The
 * printed address separates the pincode with an en dash, which is typography
 * rather than data and only confuses a geocoder, so it comes out here.
 */
export const addressQuery = [...company.address.lines, company.address.country]
  .join(", ")
  .replace(" – ", " ");

/**
 * Google's keyless embed endpoint. `output=embed` renders an interactive map
 * without an API key, which suits a static export with no server to hold one.
 */
export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  addressQuery,
)}&output=embed`;

/** Opens the same place in the visitor's Maps app, ready for directions. */
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  addressQuery,
)}`;

export function enquiryLink(subject: string): string {
  return `mailto:${company.email}?subject=${encodeURIComponent(subject)}`;
}

export function whatsappLink(message: string): string {
  return `https://wa.me/${company.whatsapp.number}?text=${encodeURIComponent(message)}`;
}
