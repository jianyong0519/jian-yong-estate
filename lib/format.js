import projects from "@/data/projects.json";

export const PROJECTS = projects;
export const getProject = (id) => projects.find((p) => p.id === id);

export const fmtRM = (n) => "RM " + n.toLocaleString("en-MY");
// Some developers only allow a per-sq-ft starting price in ads ("pricePsf" in projects.json).
// Those projects never show a ringgit total; priceFrom is then kept only for the filters.
export const priceText = (p) => p.pricePsf ? `RM ${p.pricePsf.toLocaleString("en-MY")} psf` : p.priceFrom ? fmtRM(p.priceFrom) : null;
export const shortPrice = (p) => p.pricePsf ? `RM ${p.pricePsf.toLocaleString("en-MY")} psf` : p.priceFrom ? shortRM(p.priceFrom) : null;
export const shortRM = (n) =>
  n >= 1e6
    ? "RM " + (n / 1e6).toFixed(2).replace(/\.?0+$/, "") + "M"
    : "RM " + Math.round(n / 1000) + "k";
export const range = (a, unit = "") =>
  !a ? "—" : (a[0] === a[1] ? a[0].toLocaleString("en-MY") : a[0].toLocaleString("en-MY") + "–" + a[1].toLocaleString("en-MY")) + unit;

export const isAsk = (s) => !s || s.startsWith("Ask");
export const tenureShort = (t) => (t.includes("Freehold") ? "Freehold" : isAsk(t) ? "—" : "Leasehold");
export const tenureTag = (t) => (t.includes("Freehold") ? "Freehold" : isAsk(t) ? "New launch" : "Leasehold");

export function monthlyInstalment(price, downPct, rate, years) {
  const loan = price * (1 - downPct / 100);
  const i = rate / 1200;
  const n = years * 12;
  if (!loan || !n) return 0;
  if (!i) return loan / n;
  return (loan * i) / (1 - Math.pow(1 + i, -n));
}

// For money inputs: keep digits only, show them with thousands commas (566000 -> "566,000").
export const digitsOnly = (v) => String(v ?? "").replace(/[^\d]/g, "");
export const withCommas = (v) => {
  const d = digitsOnly(v).replace(/^0+(?=\d)/, "");
  return d ? Number(d).toLocaleString("en-MY") : "";
};
