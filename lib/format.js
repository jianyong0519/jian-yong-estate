import projects from "@/data/projects.json";

export const PROJECTS = projects;
export const getProject = (id) => projects.find((p) => p.id === id);

export const fmtRM = (n) => "RM " + n.toLocaleString("en-MY");
export const shortRM = (n) =>
  n >= 1e6
    ? "RM " + (n / 1e6).toFixed(2).replace(/\.?0+$/, "") + "M"
    : "RM " + Math.round(n / 1000) + "k";
export const range = (a, unit = "") =>
  !a ? "—" : (a[0] === a[1] ? a[0].toLocaleString("en-MY") : a[0].toLocaleString("en-MY") + "–" + a[1].toLocaleString("en-MY")) + unit;

export const isAsk = (s) => !s || s.startsWith("Ask");
export const tenureShort = (t) => (t.includes("Freehold") ? "FH" : isAsk(t) ? "—" : "LH");
export const tenureTag = (t) => (t.includes("Freehold") ? "Freehold" : isAsk(t) ? "New launch" : "Leasehold");

export function monthlyInstalment(price, downPct, rate, years) {
  const loan = price * (1 - downPct / 100);
  const i = rate / 1200;
  const n = years * 12;
  if (!loan || !n) return 0;
  if (!i) return loan / n;
  return (loan * i) / (1 - Math.pow(1 + i, -n));
}
