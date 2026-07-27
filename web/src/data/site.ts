/**
 * The canonical origin used for metadata, the sitemap and robots.txt.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL      — set this once the real domain is attached
 *   2. VERCEL_PROJECT_PRODUCTION_URL — supplied automatically by Vercel
 *   3. the current deployment's own hostname, for local builds
 *
 * Read at build time; a static export has no request to inspect.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelHost) return `https://${vercelHost}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();
