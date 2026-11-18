import MM2HQualifier from "@/components/MM2HQualifier";
import { PROJECTS } from "@/lib/format";
import { TIERS } from "@/data/mm2h";
import { SITE, waLink } from "@/lib/site";

export const metadata = {
  title: "MM2H Property Guide",
  description: "Malaysia My Second Home (MM2H) tiers, deposits and minimum property prices, and which new launches in KL and Selangor qualify.",
};

const fmt = (n) => "RM " + n.toLocaleString("en-MY");

const QA = [
  ["Does my MM2H tier lower the state's minimum price?", "No. The tier minimum is a programme requirement. You still have to meet the state's minimum price for foreign buyers, so in Kuala Lumpur even a Silver applicant needs a home of at least RM 1,000,000."],
  ["Can I use a bank loan?", "Several banks lend to MM2H participants. Each bank sets its own margin of finance, so compare packages before you book a unit."],
  ["Do I need state consent?", "Yes. Every purchase by a foreigner needs approval from the state authority. Your lawyer applies for it after you sign the SPA."],
  ["Can I sell the home later?", "MM2H rules restrict selling the qualifying home for a set period except to upgrade. Check the current terms with your licensed agent."],
];

export default function MM2HPage() {
  return (
    <>
      <section className="split">
        <div>
          <div className="eyebrow">Malaysia My Second Home</div>
          <h1 className="page-title" style={{ marginTop: 6 }}>Live in Malaysia long term, in a home that qualifies</h1>
          <p className="muted" style={{ maxWidth: "56ch" }}>
            MM2H is a long-stay pass for foreigners, run by the Ministry of Tourism (MOTAC). Every mainland tier
            requires you to buy a home above a set minimum price, and the state&apos;s own minimum for foreign buyers
            applies on top. I help you find projects that clear both.
          </p>
          <a className="btn wa" target="_blank" rel="noopener noreferrer"
             href={waLink(`Hi ${SITE.shortName}, I'm applying for MM2H and looking for a qualifying property.`)}>Talk to me about MM2H</a>
        </div>
        <div className="box">
          <h3>What this page covers</h3>
          <span className="small">The four tiers and their deposits · the property each tier needs · the steps to apply · which projects on this site qualify</span>
          <span className="small">Applications go through a MOTAC-licensed MM2H agent. I introduce you to one and handle the property side.</span>
        </div>
      </section>

      <section>
        <div className="sec-head"><div><h2>The four tiers</h2><p>Figures as published for 2026. Confirm with MOTAC or a licensed agent before you commit.</p></div></div>
        <div className="tablewrap">
          <table>
            <thead><tr><th>Tier</th><th>Min. age</th><th>Fixed deposit</th><th>Minimum property price</th><th>Pass validity</th><th>Where you can buy</th></tr></thead>
            <tbody>
              {[...TIERS].sort((a, b) => b.minProperty - a.minProperty).map((t) => (
                <tr key={t.name}>
                  <td className="tier">{t.name}</td><td>{t.age}</td><td className="num">{t.deposit}</td>
                  <td className="num">{fmt(t.minProperty)}</td><td>{t.validity}</td><td>{t.where}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="small" style={{ marginTop: 10 }}>
          Minimum price for foreigners, set by each state: Kuala Lumpur RM 1,000,000. Selangor RM 2,000,000 in Zones 1 &amp; 2
          and RM 1,000,000 in Zone 3, strata property only. Foreign buyers pay a flat 8% stamp duty on the transfer from 1 January 2026.
        </p>
      </section>

      <section>
        <div className="sec-head"><div><h2>Which projects qualify for your tier?</h2><p>A home has to clear the higher of the two limits: your tier&apos;s minimum and the state&apos;s minimum for foreigners.</p></div></div>
        <MM2HQualifier projects={PROJECTS} />
      </section>

      <section>
        <div className="sec-head"><div><h2>How the application runs</h2></div></div>
        <ol className="steps">
          <li><b>Check your tier</b>Match your deposit, age and plans to a tier before you spend anything.</li>
          <li><b>Gather documents</b>Passport, bank statements, proof of income and a medical report.</li>
          <li><b>Apply through a licensed agent</b>MOTAC accepts applications only through licensed MM2H agents.</li>
          <li><b>Conditional approval</b>Place the fixed deposit and buy a qualifying home.</li>
          <li><b>Pass endorsed</b>The pass goes in your passport and you can settle in.</li>
        </ol>
      </section>

      <section>
        <div className="sec-head"><div><h2>Common questions</h2></div></div>
        {QA.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
      </section>
    </>
  );
}
