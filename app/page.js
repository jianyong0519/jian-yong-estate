import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import QuickSearch from "@/components/QuickSearch";
import { PROJECTS, shortRM } from "@/lib/format";
import { SITE, waLink } from "@/lib/site";

export default function Home() {
  const priced = PROJECTS.filter((p) => p.priceFrom);
  const states = [...new Set(PROJECTS.map((p) => p.state))].sort();
  const featured = PROJECTS.filter((p) => p.featured).slice(0, 6);
  const lowest = priced.length ? Math.min(...priced.map((p) => p.priceFrom)) : null;

  return (
    <>
      <section className="hero">
        <div>
          <div className="eyebrow">New launch condos &amp; landed homes</div>
          <h1>Find a new home in KL and Selangor, priced and compared</h1>
          <p>
            Floor plans, SPA prices and completion dates for the projects I cover. Tell me your budget and
            I&apos;ll send the units that fit.
          </p>
          <div className="stats">
            <div><b>{PROJECTS.length}</b><span>projects listed</span></div>
            {lowest && <div><b>{shortRM(lowest)}</b><span>lowest SPA price</span></div>}
            <div><b>{states.length}</b><span>states covered</span></div>
          </div>
        </div>
        <QuickSearch states={states} />
      </section>

      <section>
        <div className="sec-head">
          <div><h2>Featured new launches</h2><p>All prices shown are SPA prices.</p></div>
          <Link href="/properties">View all →</Link>
        </div>
        <div className="grid">{featured.map((p) => <ProjectCard key={p.id} p={p} />)}</div>
      </section>

      <section className="split panel">
        <div>
          <div className="eyebrow">For foreign buyers</div>
          <h2 style={{ fontSize: 26, margin: "6px 0 8px" }}>Applying for MM2H?</h2>
          <p className="muted" style={{ margin: 0 }}>
            Pick your tier and see which projects clear both the MM2H minimum and the state&apos;s minimum price for foreigners.
          </p>
        </div>
        <div><Link className="btn primary" href="/mm2h">Check projects by MM2H tier</Link></div>
      </section>

      <section className="split">
        <div>
          <div className="eyebrow">Your consultant · IQI Realty</div>
          <h2 style={{ fontSize: 26, margin: "6px 0 8px" }}>Hi, I&apos;m {SITE.shortName}</h2>
          <p className="muted" style={{ maxWidth: "60ch", margin: 0 }}>
            I work in finance by day, so I read the numbers closely: price per square foot, the loan you&apos;d
            actually need, and the full cost of buying. I help you shortlist projects, book show-unit viewings
            and go through the SPA.
          </p>
        </div>
        <div className="box">
          <span className="small">Message me for floor plans, price lists and viewing slots</span>
          <a className="btn wa" target="_blank" rel="noopener noreferrer"
             href={waLink(`Hi ${SITE.shortName}, I'd like floor plans and price lists for a few projects.`)}>Chat on WhatsApp</a>
          <span className="small">WhatsApp <span className="num">{SITE.whatsappDisplay}</span></span>
        </div>
      </section>
    </>
  );
}
