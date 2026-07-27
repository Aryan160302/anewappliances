import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ships a pure HTML/CSS/JS bundle to `out/` so the catalogue can be hosted
  // anywhere — GitHub Pages, Netlify, or a plain static server.
  output: "export",
  // A static export has no image optimisation server; the assets in
  // public/products are already sized and compressed by scripts/extract_assets.py.
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
