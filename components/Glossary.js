"use client";
import { useState } from "react";

const CATS = ["All", "Buying", "Ownership", "Loans", "Costs & tax"];

export default function Glossary({ terms }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const s = q.trim().toLowerCase();
  const list = terms
    .filter((t) => (cat === "All" || t.category === cat) && (!s || `${t.term} ${t.aka} ${t.definition}`.toLowerCase().includes(s)))
    .sort((a, b) => a.term.localeCompare(b.term));

  return (
    <>
      <div className="gtools">
        <div className="search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <input className="field" type="search" placeholder="Search a term, e.g. MLTA, DSR, VP…" aria-label="Search the glossary" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="cats">
          {CATS.map((c) => (
            <button key={c} type="button" aria-pressed={c === cat} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
      </div>
      <div className="gloss">
        {list.length ? list.map((t) => (
          <article key={t.term} className="term">
            <h3>{t.term}<small>{t.category}</small></h3>
            {t.aka && <span className="aka">{t.aka}</span>}
            <p>{t.definition}</p>
          </article>
        )) : <div className="empty">No term matches “{q}”. Try another word or ask me on WhatsApp.</div>}
      </div>
    </>
  );
}
