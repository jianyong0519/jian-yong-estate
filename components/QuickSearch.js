"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function QuickSearch({ states }) {
  const router = useRouter();
  const [state, setState] = useState("");
  const [budget, setBudget] = useState("");
  const [beds, setBeds] = useState("");

  function submit(e) {
    e.preventDefault();
    const q = new URLSearchParams();
    if (state) q.set("state", state);
    if (budget) {
      const [min, max] = budget.split("-");
      if (min) q.set("min", min);
      if (max) q.set("max", max);
    }
    if (beds) q.set("beds", beds);
    router.push(`/properties${q.toString() ? "?" + q : ""}`);
  }

  return (
    <form className="quick" onSubmit={submit}>
      <h3 style={{ fontSize: 18 }}>Quick search</h3>
      <label htmlFor="qState">State
        <select className="field" id="qState" value={state} onChange={(e) => setState(e.target.value)}>
          <option value="">All states</option>
          {states.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>
      <label htmlFor="qBudget">Budget
        <select className="field" id="qBudget" value={budget} onChange={(e) => setBudget(e.target.value)}>
          <option value="">Any budget</option>
          <option value="0-500000">Under RM 500k</option>
          <option value="500000-800000">RM 500k – 800k</option>
          <option value="800000-1000000">RM 800k – 1M</option>
          <option value="1000000-">Above RM 1M</option>
        </select>
      </label>
      <label htmlFor="qBeds">Bedrooms
        <select className="field" id="qBeds" value={beds} onChange={(e) => setBeds(e.target.value)}>
          <option value="">Any</option>
          {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+</option>)}
        </select>
      </label>
      <button className="btn primary" type="submit">Show matching projects</button>
    </form>
  );
}
