import type { MetadataRoute } from "next";

import { siteUrl } from "@/data/site";

// A static export has no server to regenerate robots.txt on request.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
