import Glossary from "@/components/Glossary";
import faq from "@/data/faq.json";
import glossary from "@/data/glossary.json";
import { SITE, waLink } from "@/lib/site";

export const metadata = {
  title: "FAQ",
  description: "Answers to common questions about buying a new launch property in Malaysia, plus a glossary of terms such as SPA, VP, MRTA, MLTA, DSR and RPGT.",
};

export default function FAQPage() {
  return (
    <>
      <div className="eyebrow">Buyer&apos;s guide</div>
      <h1 className="page-title" style={{ marginTop: 6 }}>FAQ</h1>
      <p className="muted" style={{ maxWidth: "62ch", margin: "6px 0 32px" }}>
        The questions buyers ask me most, from booking a unit to collecting the keys, followed by a glossary of the
        terms you&apos;ll meet. Rules and rates change, so check the current figures with your lawyer and bank before you sign.
      </p>

      <section>
        <div className="sec-head"><div><h2>Frequently asked questions</h2><p>Grouped by where you are in the purchase.</p></div></div>
        {faq.map((g) => (
          <div key={g.group} className="faqgroup">
            <h3>{g.group}</h3>
            {g.items.map((it) => <details key={it.q}><summary>{it.q}</summary><p>{it.a}</p></details>)}
          </div>
        ))}
      </section>

      <section>
        <div className="sec-head"><div><h2>Glossary</h2><p>{glossary.length} terms. Search or filter by topic.</p></div></div>
        <Glossary terms={glossary} />
        <div className="box" style={{ marginTop: 24, maxWidth: 520 }}>
          <h3>Question not here?</h3>
          <span className="small">Send it on WhatsApp and I&apos;ll reply with the figures for the project you&apos;re looking at.</span>
          <a className="btn wa" target="_blank" rel="noopener noreferrer"
             href={waLink(`Hi ${SITE.shortName}, I have a question about buying a property.`)}>Ask on WhatsApp</a>
        </div>
      </section>
    </>
  );
}
