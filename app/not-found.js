import Link from "next/link";

export default function NotFound() {
  return (
    <div className="empty" style={{ marginTop: 40 }}>
      <h1 className="page-title" style={{ color: "var(--ink)" }}>Page not found</h1>
      <p>This project may have been removed or renamed.</p>
      <Link className="btn primary" href="/properties">Browse all projects</Link>
    </div>
  );
}
