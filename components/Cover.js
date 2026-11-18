// Illustrated skyline used until real project photos are added.
// To use a photo instead, put it in /public/projects/<id>.jpg and add "image": "/projects/<id>.jpg" to the project in projects.json.
export default function Cover({ p, w = 640, h = 360 }) {
  const src = p.images?.[0] || p.image;
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={`${p.name} facade`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    );
  }
  let s = [...p.id].reduce((a, c) => a * 31 + c.charCodeAt(0), 7) >>> 0;
  const r = () => ((s = (s * 1103515245 + 12345) >>> 0), (s >>> 8) / 16777216);
  const gid = `g-${p.id}-${w}`;
  const shapes = [];
  if (p.type === "Landed") {
    for (let i = 0; i < 7; i++) {
      const x = (i * w) / 7 + 10, bw = w / 7 - 20, bh = h * 0.22 + r() * 20, y = h * 0.78 - bh;
      shapes.push(<rect key={`b${i}`} x={x} y={y} width={bw} height={bh} fill={`hsl(${p.hue} 25% ${30 + (i % 2) * 6}%)`} />);
      shapes.push(<polygon key={`r${i}`} points={`${x - 6},${y} ${x + bw / 2},${y - bh * 0.55} ${x + bw + 6},${y}`} fill={`hsl(${p.hue} 30% 22%)`} />);
    }
  } else {
    let x = w * 0.08;
    const n = 3 + Math.floor(r() * 3);
    for (let i = 0; i < n; i++) {
      const bw = w * (0.09 + r() * 0.07), bh = h * (0.45 + r() * 0.35), y = h * 0.82 - bh, l = 24 + r() * 16;
      shapes.push(<rect key={`t${i}`} x={x} y={y} width={bw} height={bh} rx="3" fill={`hsl(${p.hue} 22% ${l}%)`} />);
      let k = 0;
      for (let fy = y + 10; fy < h * 0.8; fy += 12) {
        shapes.push(<rect key={`f${i}-${k++}`} x={x + 6} y={fy} width={bw - 12} height="3" fill={`hsl(${p.hue} 40% 70% / .35)`} />);
      }
      x += bw + w * (0.04 + r() * 0.06);
    }
  }
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={`hsl(${p.hue} 45% 78%)`} />
          <stop offset="1" stopColor={`hsl(${p.hue} 35% 92%)`} />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill={`url(#${gid})`} />
      <circle cx={w * 0.82} cy={h * 0.24} r={h * 0.08} fill="hsl(40 90% 85%)" />
      {shapes}
      <rect y={h * 0.8} width={w} height={h * 0.2} fill={`hsl(${p.hue} 30% 32%)`} />
    </svg>
  );
}
