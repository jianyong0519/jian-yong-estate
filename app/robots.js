import { SITE } from "@/lib/site";

export default function robots() {
  if (!SITE.live) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE.url}/sitemap.xml` };
}
