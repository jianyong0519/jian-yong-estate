"use client";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { shortRM, shortPrice } from "@/lib/format";

// Interactive map of all listed projects (OpenStreetMap tiles, free, no API key).
export default function ProjectsMap({ projects }) {
  const el = useRef(null);
  const map = useRef(null);
  const layer = useRef(null);

  useEffect(() => {
    let cancelled = false;
    import("leaflet").then((L) => {
      if (cancelled || !el.current) return;
      if (!map.current) {
        map.current = L.map(el.current, { scrollWheelZoom: false }).setView([3.12, 101.68], 11);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 18,
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map.current);
        layer.current = L.layerGroup().addTo(map.current);
      }
      layer.current.clearLayers();
      const icon = L.divIcon({
        className: "",
        html: '<div style="width:18px;height:18px;border-radius:50%;background:#1557C0;border:3px solid #fff;box-shadow:0 1px 4px rgb(0 0 0 / .4)"></div>',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });
      const pts = [];
      projects.forEach((p) => {
        if (p.lat == null || p.lng == null) return;
        pts.push([p.lat, p.lng]);
        L.marker([p.lat, p.lng], { icon })
          .bindPopup(
            `<div class="pin-pop"><b>${p.name}</b>${p.area}<br><span>${shortPrice(p) ? "From " + shortPrice(p) : "Ask for price"}</span><br><a href="/properties/${p.id}">View project →</a></div>`
          )
          .addTo(layer.current);
      });
      if (pts.length) map.current.fitBounds(pts, { padding: [40, 40], maxZoom: 14 });
    });
    return () => { cancelled = true; };
  }, [projects]);

  useEffect(() => () => { map.current?.remove(); map.current = null; }, []);

  return <div ref={el} style={{ height: "100%" }} />;
}
