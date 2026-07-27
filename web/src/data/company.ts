export const company = {
  name: "Anew Appliances",
  tagline: "Kitchen appliances engineered in Karnataka",
  description:
    "Anew Appliances manufactures induction cooktops and stainless steel electric kettles for the Indian home, built to BIS specifications at our unit in the Harohalli Industrial Area.",
  email: "info@anewappliances.com",
  website: "www.anewappliances.com",
  address: {
    lines: [
      "Plot No WP-98, Women Entrepreneurs Park",
      "Kanakapura Taluk, Harohalli Industrial Area",
      "Ramanagara, Karnataka – 562112",
    ],
    country: "India",
  },
  catalogue: "/downloads/anew-appliances-induction-catalogue.pdf",
} as const;

export function enquiryLink(subject: string): string {
  return `mailto:${company.email}?subject=${encodeURIComponent(subject)}`;
}
