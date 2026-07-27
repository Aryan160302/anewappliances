import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Jost } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { company } from "@/data/company";
import { siteUrl } from "@/data/site";
import "./globals.css";

// A high-contrast serif for headings carries the "royal" register; Jost stays
// for the wordmark and tracked caps because it matches the printed logotype.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});
const jost = Jost({ variable: "--font-jost", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  // Resolves relative Open Graph image paths against the deployed origin.
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} — Induction Cooktops & Electric Kettles`,
    template: `%s — ${company.name}`,
  },
  description: company.description,
  keywords: [
    "induction cooktop",
    "electric kettle",
    "stainless steel kettle",
    "Anew Appliances",
    "Karnataka",
  ],
};

// The catalogue is white and gold in every context; it does not follow the
// device's dark preference.
export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // globals.css opts into smooth scrolling; this tells Next to suppress it
      // during route transitions so navigations still land at the top.
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${jost.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <WhatsAppButton />
      </body>
    </html>
  );
}
