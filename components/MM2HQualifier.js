"use client";
import { useState } from "react";
import Link from "next/link";
import { shortRM } from "@/lib/format";
import { TIERS, STATE_FOREIGN_MIN } from "@/data/mm2h";

const ORDER = { yes: 0, some: 1, no: 2 };

export default function MM2HQualifier({ projects }) {
  const [tier, setTier] = useState("Silver");
  const t = TIERS.find((x) => x.name === tier);

  let content;
  if (!t.minProperty || t.forestCityOnly) {
    content = <div className="empty">No projects on this site are in Forest City. Message me if you&apos;re weighing SEZ against Silver.</div>;
  } else {
    const rows = projects
      .map((p) => {
        const need = Math.max(t.minProperty, STATE_FOREIGN_MIN[p.state] ?? 1000000);
        let st, label;
        if (!p.priceFrom) { st = "no"; label = "Ask for details"; }
        else if (p.priceFrom >= need) { st = "yes"; label = "Qualifies"; }
        else if (p.priceTo && p.priceTo >= need) { st = "some"; label = "Larger units only"; }
        else { st = "no"; label = "Below minimum"; }
        return { p, need, st, label };
      })
      .sort((a, b) => ORDER[a.st] - ORDER[b.st]);
    content = rows.map(({ p, need, st, label }) => (
      <Link key={p.id} className="qitem" href={`/properties/${p.id}`}>
        <div>
          <b>{p.name}</b>
          <div className="small">
            {p.area} · needs <span className="num">{shortRM(need)}</span> ·{" "}
            {p.priceFrom ? (
              <>SPA price from <span className="num">{shortRM(p.priceFrom)}</span></>
            ) : "price on request"}
          </div>
        </div>
        <span className={`pill ${st}`}>{label}</span>
      </Link>
    ));
  }

  return (
    <div className="qualifier">
      <div className="box">
        <h3>Your tier</h3>
        <div className="seg">
          {TIERS.map((x) => (
            <button key={x.name} type="button" aria-pressed={x.name === tier} onClick={() => setTier(x.name)}>
              <b>{x.name}</b>
              <span>{x.forestCityOnly ? "Forest City only" : `Home from ${shortRM(x.minProperty)}`}</span>
            </button>
          ))}
        </div>
        <p className="small" style={{ margin: 0 }}>
          {t.forestCityOnly
            ? "SEZ / SFZ applicants must buy in Forest City, Johor."
            : "Selangor projects are checked against the RM 2M Zone 1 & 2 minimum. Confirm each project's zone with the land office."}
        </p>
      </div>
      <div className="qlist">{content}</div>
    </div>
  );
}
