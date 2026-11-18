import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import LoanCalculator from "@/components/LoanCalculator";
import { PROJECTS, getProject, fmtRM, range } from "@/lib/format";
import { SITE, waLink } from "@/lib/site";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }) {
  const p = getProject(params.id);
  if (!p) return {};
  return {
    title: `${p.name}, ${p.area}`,
    description: `${p.name} in ${p.area}, ${p.state}: ${p.type.toLowerCase()}${p.priceFrom ? ` from ${fmtRM(p.priceFrom)}` : ""}, ${p.tenure.toLowerCase()}, completion ${p.completion}. Floor plans and price list from ${SITE.agentName}.`,
  };
}

export default function ProjectPage({ params }) {
  const p = getProject(params.id);
  if (!p) notFound();

  const facts = [
    ["SPA price from", p.priceFrom ? fmtRM(p.priceFrom) : "Ask for price"],
    ["Bedrooms", p.bedrooms ? range(p.bedrooms) : "Ask"],
    ["Built-up", p.sizeSqft ? range(p.sizeSqft, " sq ft") : p.sizeText || "Ask"],
    ["Tenure", p.tenure],
    ["Completion", p.completion],
    ["Type", p.type],
    ["Developer", p.developer || "Ask for details"],
  ];
  const psf = p.priceFrom && p.sizeSqft ? Math.round(p.priceFrom / p.sizeSqft[0]) : null;
  // The embedded map searches the project name + address. For an exact pin, add
  // "mapPin": "3.1010,101.6840" to the project in projects.json (right-click the building in Google Maps to copy it).
  const mapQuery = p.mapPin || `${p.name}, ${p.address}`;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=16&output=embed`;
  const gmaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${p.name}, ${p.address}`)}`;
  const waze = `https://waze.com/ul?q=${encodeURIComponent(`${p.name} ${p.area}`)}&navigate=yes`;

  return (
    <>
      <Link className="back" href="/properties">← All projects</Link>
      <Gallery p={p} />
      <div className="p-layout">
        <div>
          <div className="eyebrow">{p.type} · {p.state}</div>
          <h1 className="page-title" style={{ marginTop: 6 }}>{p.name}</h1>
          <p className="muted" style={{ margin: "4px 0 0" }}>{p.area}, {p.state}</p>

          <div className="facts">
            {facts.map(([k, v]) => (
              <div key={k}><span>{k}</span><b className={/RM|\d/.test(v) ? "num" : undefined}>{v}</b></div>
            ))}
          </div>
          {psf && (
            <p className="small" style={{ marginTop: 8 }}>
              About <span className="num">RM {psf.toLocaleString("en-MY")}</span> per sq ft on the smallest layout at the lowest SPA price.
            </p>
          )}

          {p.units?.length > 0 && (
            <div className="locsec">
              <h2>Unit types &amp; prices</h2>
              <div className="tablewrap">
                <table style={{ minWidth: 560 }}>
                  <thead><tr><th>Type</th><th>SPA price from</th><th>Built-up</th>{p.units.some((u) => u.rooms) && <th>Layout</th>}{p.units.some((u) => u.land) && <th>Land</th>}{p.units.some((u) => u.count) && <th>Units</th>}</tr></thead>
                  <tbody>
                    {p.units.map((u) => (
                      <tr key={u.label}>
                        <td style={{ fontWeight: 600 }}>{u.label}</td>
                        <td className="num" style={{ color: "var(--price)", fontWeight: 600 }}>From {fmtRM(u.price)}</td>
                        <td className="num">{u.builtUp}</td>
                        {p.units.some((x) => x.rooms) && <td>{u.rooms}</td>}
                        {p.units.some((x) => x.land) && <td className="num">{u.land}</td>}
                        {p.units.some((x) => x.count) && <td className="num">{u.count}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="prose">
            <h2 style={{ marginTop: 0 }}>About the project</h2>
            <p>{p.about}</p>
            <h2>Highlights</h2>
            <ul>{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          </div>

          {p.review && (
            <div className="review">
              <div className="eyebrow">My review · updated {p.review.updated}</div>
              <h2>{p.review.verdict}</h2>
              <div className="rv-cols">
                <div className="rv good">
                  <h3>What&apos;s good</h3>
                  <ul>{p.review.good.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
                <div className="rv watch">
                  <h3>Watch out for</h3>
                  <ul>{p.review.watch.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              </div>
              <div className="rv-fit">
                <div><span>Suits</span>{p.review.suits}</div>
                <div><span>Less suited to</span>{p.review.notFor}</div>
              </div>
              <p className="small" style={{ margin: 0 }}>
                My own view as a negotiator marketing this project, based on the developer&apos;s published details. Check the SPA and visit the site before you decide.
              </p>
            </div>
          )}

          <div className="prose">
            <h2 style={{ marginTop: 0 }}>Floor plans &amp; brochure</h2>
            <p>Floor plans and the full price list are sent on WhatsApp so you get the current version.</p>
          </div>

          <div className="locsec">
            <h2>Location</h2>
            <iframe className="gmap" src={mapSrc} title={`Map of ${p.name}`} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
            <div className="locinfo">
              <div>
                <span className="small">Address</span>
                <div style={{ fontWeight: 600 }}>{p.address}</div>
                {p.nearby?.length > 0 && (
                  <>
                    <span className="small" style={{ display: "block", marginTop: 10 }}>Nearby</span>
                    <ul>{p.nearby.map((n) => <li key={n}>{n}</li>)}</ul>
                  </>
                )}
              </div>
              <div className="locbtns">
                <a className="btn ghost" target="_blank" rel="noopener noreferrer" href={waze}>Navigate with Waze</a>
                <a className="btn ghost" target="_blank" rel="noopener noreferrer" href={gmaps}>Open in Google Maps</a>
              </div>
            </div>
          </div>
        </div>

        <aside className="side">
          <div className="box">
            <span className="small">SPA price from</span>
            <b className="num" style={{ fontSize: 26, color: "var(--price)" }}>{p.priceFrom ? fmtRM(p.priceFrom) : "Ask for price"}</b>
            <a className="btn wa" target="_blank" rel="noopener noreferrer"
               href={waLink(`Hi ${SITE.shortName}, I'm interested in ${p.name}. Could you send the floor plans and price list?`)}>
              Get floor plans &amp; price list
            </a>
            <span className="small">SPA price.</span>
          </div>
          {p.priceFrom && <LoanCalculator price={p.priceFrom} />}
        </aside>
      </div>
    </>
  );
}
