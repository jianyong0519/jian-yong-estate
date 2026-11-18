// MM2H figures as published for 2026. Check MOTAC's current guidelines each year and update here.
export const TIERS = [
  { name: "Silver", age: 25, deposit: "USD 150,000", minProperty: 600000, validity: "5 years, renewable", where: "Anywhere, subject to state rules" },
  { name: "Gold", age: 25, deposit: "USD 500,000", minProperty: 1000000, validity: "15 years", where: "Anywhere, subject to state rules" },
  { name: "Platinum", age: 25, deposit: "USD 1,000,000", minProperty: 2000000, validity: "20 years", where: "Anywhere, subject to state rules" },
  { name: "SEZ / SFZ", age: 21, deposit: "USD 65,000 (age 21–49) · USD 32,000 (age 50+)", minProperty: 500000, validity: "10 years", where: "Forest City, Johor only", forestCityOnly: true },
];

// Minimum price a foreigner may pay for residential property, by state.
// Selangor: RM 2M in Zones 1 & 2, RM 1M in Zone 3 (strata only). Zone 1/2 assumed here.
export const STATE_FOREIGN_MIN = {
  "Kuala Lumpur": 1000000,
  Selangor: 2000000,
};
