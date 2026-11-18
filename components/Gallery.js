"use client";
import { useState } from "react";
import Cover from "./Cover";

// Shows the project's photos. The first image in "images" is the facade / cover.
// Without photos it falls back to the illustrated skyline.
export default function Gallery({ p }) {
  const imgs = p.images?.length ? p.images : p.image ? [p.image] : [];
  const [i, setI] = useState(0);

  if (!imgs.length) return <div className="p-hero"><Cover p={p} w={1260} h={480} /></div>;

  return (
    <div className="gallery">
      <div className="p-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgs[i]} alt={`${p.name}, image ${i + 1} of ${imgs.length}`} />
      </div>
      {imgs.length > 1 && (
        <div className="thumbs" role="list">
          {imgs.map((src, n) => (
            <button key={src} type="button" role="listitem" aria-label={`Show image ${n + 1}`} aria-pressed={n === i} onClick={() => setI(n)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
