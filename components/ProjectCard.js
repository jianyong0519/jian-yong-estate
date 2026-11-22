import Link from "next/link";
import Cover from "./Cover";
import { fmtRM, range, isAsk, tenureShort, tenureTag, priceText } from "@/lib/format";

export default function ProjectCard({ p }) {
  return (
    <Link className="card" href={`/properties/${p.id}`}>
      <div className="cover">
        <Cover p={p} />
        {(p.images?.length > 0 || p.image) && <span className="ai-tag">Artist impression only</span>}
      </div>
      <div className="body">
        <div className="tags">
          <span className="tag">{p.type}</span>
          <span className="tag">{tenureTag(p.tenure)}</span>
        </div>
        <div className="dev">{p.developer || "New launch"}</div>
        <h3>{p.name}</h3>
        <div className="loc">{p.area}, {p.state}</div>
        <div className="specs">
          <div><span>Rooms</span><b>{p.bedrooms ? range(p.bedrooms) : "Ask"}</b></div>
          <div><span>Size</span><b className="num">{p.sizeSqft ? range(p.sizeSqft) : "Ask"}</b></div>
          <div><span>Tenure</span><b>{tenureShort(p.tenure)}</b></div>
          <div><span>Done</span><b>{isAsk(p.completion) ? "—" : p.completion}</b></div>
        </div>
        <div className="price">
          <span>SPA price from</span>
          <b className="num">{priceText(p) || "Ask for price"}</b>
        </div>
      </div>
    </Link>
  );
}
