"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE, waLink } from "@/lib/site";

const NAV = [
  ["/", "Home"],
  ["/properties", "Properties"],
  ["/mm2h", "MM2H"],
  ["/faq", "FAQ"],
];

export default function Header() {
  const path = usePathname();
  const active = (href) => (href === "/" ? path === "/" : path.startsWith(href));
  return (
    <header className="top">
      <div className="wrap">
        <Link className="brand" href="/">
          <span className="mark">JY</span>
          <span><b>{SITE.name}</b><small>New launches · KL &amp; Selangor</small></span>
        </Link>
        <nav className="main" aria-label="Main">
          {NAV.map(([href, label]) => (
            <Link key={href} href={href} aria-current={active(href) ? "page" : undefined}>{label}</Link>
          ))}
        </nav>
        <a className="btn wa" target="_blank" rel="noopener noreferrer"
           href={waLink(`Hi ${SITE.shortName}, I'm looking at new launch properties on your website.`)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.3.4c-.1.2-.2.3 0 .6.2.3.8 1.3 1.7 2 1.1 1 2 1.3 2.3 1.4.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.4.2.5.3.1.2.1.7-.1 1.2z"/></svg>
          <span>WhatsApp</span>
        </a>
      </div>
    </header>
  );
}
