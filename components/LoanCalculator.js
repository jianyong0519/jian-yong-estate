"use client";
import { useState } from "react";
import { monthlyInstalment, withCommas, digitsOnly } from "@/lib/format";
import { SITE } from "@/lib/site";

export default function LoanCalculator({ price }) {
  const [p, setP] = useState(price ? withCommas(price) : "");
  const [down, setDown] = useState("10");
  const [rate, setRate] = useState(String(SITE.defaultInterestRate));
  const [yrs, setYrs] = useState("35");
  const m = monthlyInstalment(parseInt(digitsOnly(p), 10) || 0, +down || 0, +rate || 0, +yrs || 30);

  return (
    <div className="box calc">
      <h3>Monthly instalment</h3>
      <label htmlFor="cPrice">Price (RM)<input className="field num" id="cPrice" inputMode="numeric" placeholder="Enter unit price" value={p} onChange={(e) => setP(withCommas(e.target.value))} /></label>
      <label htmlFor="cDown">Down payment (%)<input className="field num" id="cDown" type="number" min="0" max="90" value={down} onChange={(e) => setDown(e.target.value)} /></label>
      <label htmlFor="cRate">Interest rate (% a year)<input className="field num" id="cRate" type="number" step="0.05" value={rate} onChange={(e) => setRate(e.target.value)} /></label>
      <label htmlFor="cYrs">Tenure (years)<input className="field num" id="cYrs" type="number" min="5" max="35" value={yrs} onChange={(e) => setYrs(e.target.value)} /></label>
      <output>{m > 0 ? `RM ${Math.round(m).toLocaleString("en-MY")} / month` : "RM — / month"}</output>
      <span className="small">Estimate only. Your bank&apos;s rate and margin decide the real figure.</span>
    </div>
  );
}
