import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div>
          <b style={{ color: "var(--ink)", fontFamily: "var(--display)" }}>{SITE.name}</b>
          <br />
          New launch condos and landed homes in Kuala Lumpur and Selangor. Prices shown are developer list
          prices before rebates; ask for the net price.
          <br /><br />
          <span className="small">© {new Date().getFullYear()} {SITE.name}</span>
        </div>
        <div className="compliance">
          <b>{SITE.agency}</b><br />
          Firm reg. no. {SITE.agencyRegNo} · Office tel. {SITE.agencyTel}<br />
          {SITE.agentName} · {SITE.ren} · <span className="num">{SITE.whatsappDisplay}</span>
        </div>
      </div>
    </footer>
  );
}
