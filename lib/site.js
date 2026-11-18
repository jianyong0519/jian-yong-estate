// ─────────────────────────────────────────────────────────────
// Site settings. Edit these, commit, and Vercel redeploys.
// ─────────────────────────────────────────────────────────────
export const SITE = {
  name: "Jian Yong Estate",
  agentName: "Yap Jian Yong",
  shortName: "Jian Yong",
  url: "https://jian-yong-estate.vercel.app", // change to your own domain later

  // WhatsApp number in international format, no "+" or spaces
  whatsapp: "60164426513",
  whatsappDisplay: "016-442 6513",

  // Agency details. BOVAEA requires these on every advertisement.
  agency: "IQI Realty Sdn Bhd",
  agencyRegNo: "E (1) XXXX", // TODO: fill in IQI's firm registration number
  agencyTel: "XXXX",         // TODO: fill in the IQI office telephone
  ren: "REN XXXXX",          // TODO: fill in your REN number once registered

  // Keep false until your REN and IQI details are filled in.
  // false = Google is told not to index the site.
  live: false,

  defaultInterestRate: 3.65,
};

export const waLink = (msg) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
