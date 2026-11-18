import { Suspense } from "react";
import PropertiesBrowser from "@/components/PropertiesBrowser";
import { PROJECTS } from "@/lib/format";

export const metadata = {
  title: "New Property Launches",
  description: "Search new launch condos and landed homes in Kuala Lumpur and Selangor by area, type, price and bedrooms.",
};

export default function PropertiesPage() {
  return (
    <>
      <h1 className="page-title">New Property Launches</h1>
      <p className="muted" style={{ margin: "4px 0 24px" }}>{PROJECTS.length} properties across Malaysia</p>
      <Suspense fallback={null}>
        <PropertiesBrowser projects={PROJECTS} />
      </Suspense>
    </>
  );
}
