import { SITE } from "@/lib/site";
import { PROJECTS } from "@/lib/format";

export default function sitemap() {
  const pages = ["", "/properties", "/mm2h", "/faq"].map((p) => ({ url: `${SITE.url}${p}`, lastModified: new Date() }));
  const projects = PROJECTS.map((p) => ({ url: `${SITE.url}/properties/${p.id}`, lastModified: new Date() }));
  return [...pages, ...projects];
}
