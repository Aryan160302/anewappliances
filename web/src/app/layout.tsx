import type { Metadata } from "next";
import { Inter, Jost } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { company } from "@/data/company";
import { siteUrl } from "@/data/site";
import "./globals.css";

// Jost is the closest free geometric sans to the wordmark on the business card.
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
      className={`${jost.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
