"use client";
import { useEffect, useRef, useState } from "react";
import Cover, { Photo } from "./Cover";

// Shows the project's photos. The first image in "images" is the facade / cover.
// Left/right buttons, keyboard arrows and swiping move between photos.
// Without photos it falls back to the illustrated skyline.
export default function Gallery({ p }) {
  const imgs = p.images?.length ? p.images : p.image ? [p.image] : [];
  const [i, setI] = useState(0);
  const thumbs = useRef(null);
  const touchX = useRef(null);
  const n = imgs.length;
  const go = (d) => setI((v) => (v + d + n) % n);

  useEffect(() => {
    // Keep the active thumbnail visible by scrolling the thumbnail strip only, never the page.
    const box = thumbs.current, t = box?.children[i];
    if (!box || !t) return;
    const left = t.offsetLeft - box.offsetLeft, right = left + t.offsetWidth;
    if (left < box.scrollLeft) box.scrollTo({ left, behavior: "smooth" });
    else if (right > box.scrollLeft + box.clientWidth) box.scrollTo({ left: right - box.clientWidth, behavior: "smooth" });
  }, [i]);

  if (!n) return <div className="p-hero"><Cover p={p} w={1260} h={480} /></div>;

  return (
    <div className="gallery">
      <div
        className="p-hero"
        tabIndex={n > 1 ? 0 : undefined}
        aria-label={n > 1 ? `${p.name} photos, use left and right arrow keys` : undefined}
        onKeyDown={(e) => { if (e.key === "ArrowLeft") go(-1); if (e.key === "ArrowRight") go(1); }}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <Photo src={imgs[i]} alt={`${p.name}, image ${i + 1} of ${n}`} />
        {n > 1 && (
          <>
            <button type="button" className="g-nav prev" aria-label="Previous photo" onClick={() => go(-1)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button type="button" className="g-nav next" aria-label="Next photo" onClick={() => go(1)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
            </button>
            <span className="g-count num">{i + 1} / {n}</span>
          </>
        )}
        <span className="ai-tag">Artist impression only</span>
      </div>
      {n > 1 && (
        <div className="thumbs" role="list" ref={thumbs}>
          {imgs.map((src, k) => (
            <button key={src} type="button" role="listitem" aria-label={`Show image ${k + 1}`} aria-pressed={k === i} onClick={() => setI(k)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
