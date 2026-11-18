"use client";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import ProjectCard from "./ProjectCard";

const ProjectsMap = dynamic(() => import("./ProjectsMap"), { ssr: false });

const toNum = (v) => {
  const n = parseInt(String(v || "").replace(/[^\d]/g, ""), 10);
  return isNaN(n) ? null : n;
};
const year = (p) => {
  const m = String(p.completion).match(/\d{4}/);
  return m ? +m[0] : 9999;
};

export default function PropertiesBrowser({ projects }) {
  const sp = useSearchParams();
  const [text, setText] = useState("");
  const [sort, setSort] = useState("az");
  const [state, setState] = useState(sp.get("state") || "");
  const [type, setType] = useState("");
  const [min, setMin] = useState(sp.get("min") || "");
  const [max, setMax] = useState(sp.get("max") || "");
  const [beds, setBeds] = useState(sp.get("beds") || "");
  const [showMap, setShowMap] = useState(false);

  const states = useMemo(() => [...new Set(projects.map((p) => p.state))].sort(), [projects]);
  const types = useMemo(() => [...new Set(projects.map((p) => p.type))].sort(), [projects]);

  const list = useMemo(() => {
    const q = text.trim().toLowerCase();
    const mn = toNum(min), mx = toNum(max), bd = +beds || 0;
    const out = projects.filter((p) => {
      if (q && !`${p.name} ${p.area} ${p.state} ${p.address || ""} ${p.developer || ""}`.toLowerCase().includes(q)) return false;
      if (state && p.state !== state) return false;
      if (type && p.type !== type) return false;
      if ((mn || mx) && !p.priceFrom) return false;
      if (mn && (p.priceTo || p.priceFrom) < mn) return false;
      if (mx && p.priceFrom > mx) return false;
      if (bd && (!p.bedrooms || p.bedrooms[1] < bd)) return false;
      return true;
    });
    const big = 9e12;
    out.sort((a, b) =>
      sort === "za" ? b.name.localeCompare(a.name)
      : sort === "pl" ? (a.priceFrom || big) - (b.priceFrom || big)
      : sort === "ph" ? (b.priceFrom || 0) - (a.priceFrom || 0)
      : sort === "cy" ? year(a) - year(b)
      : a.name.localeCompare(b.name)
    );
    return out;
  }, [projects, text, sort, state, type, min, max, beds]);

  const clear = () => { setText(""); setState(""); setType(""); setMin(""); setMax(""); setBeds(""); };

  return (
    <>
      <div className="filters" role="search">
        <div className="row1">
          <div className="search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input className="field" type="search" placeholder="Search by title, area or address…" aria-label="Search by title, area or address" value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <select className="field" aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="az">Name: A – Z</option>
            <option value="za">Name: Z – A</option>
            <option value="pl">Price: low to high</option>
            <option value="ph">Price: high to low</option>
            <option value="cy">Completion: soonest</option>
          </select>
        </div>
        <div className="row2">
          <select className="field" aria-label="State" value={state} onChange={(e) => setState(e.target.value)}>
            <option value="">All States</option>
            {states.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="field" aria-label="Property type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All Types</option>
            {types.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <input className="field num" inputMode="numeric" placeholder="Min Price (RM)" aria-label="Minimum price in RM" value={min} onChange={(e) => setMin(e.target.value)} />
          <input className="field num" inputMode="numeric" placeholder="Max Price (RM)" aria-label="Maximum price in RM" value={max} onChange={(e) => setMax(e.target.value)} />
          <select className="field" aria-label="Bedrooms" value={beds} onChange={(e) => setBeds(e.target.value)}>
            <option value="">Bedrooms</option>
            {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+</option>)}
          </select>
        </div>
      </div>

      <div className="map-bar">
        <h3>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" aria-hidden="true"><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" /><path d="M9 4v14M15 6v14" /></svg>
          Map Search
        </h3>
        <button className="linkbtn" aria-expanded={showMap} onClick={() => setShowMap((v) => !v)}>
          {showMap ? "Hide map" : "Show map"}
        </button>
      </div>
      {showMap && <div className="mapbox"><ProjectsMap projects={list} /></div>}

      <div className="result-meta">Showing {list.length} of {projects.length}</div>
      <div className="grid">
        {list.length ? list.map((p) => <ProjectCard key={p.id} p={p} />) : (
          <div className="empty">
            No projects match these filters. Widen the price range or{" "}
            <button className="linkbtn" onClick={clear}>clear all filters</button>.
          </div>
        )}
      </div>
    </>
  );
}
