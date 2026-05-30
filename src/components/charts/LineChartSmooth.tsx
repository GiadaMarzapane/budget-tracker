// src/components/charts/LineChartSmooth.tsx
// Smooth line chart with area fill, gridlines and dots.
// Uses Catmull-Rom-ish bezier control points to round the polyline.

import { useId, useMemo } from 'react';

export interface LinePoint {
  label: string;
  value: number;
}

interface LineChartSmoothProps {
  data: LinePoint[];
  width?: number;
  height?: number;
  color?: string;
  fillColor?: string;
  showAxis?: boolean;
  padding?: { t: number; r: number; b: number; l: number };
}

export function LineChartSmooth({
  data,
  width = 600,
  height = 220,
  color = '#b89be0',
  fillColor = '#e8d7ff',
  showAxis = true,
  padding = { t: 16, r: 16, b: 28, l: 36 },
}: LineChartSmoothProps) {
  const id = useId().replace(/:/g, '');
  const max = Math.max(...data.map((d) => d.value)) * 1.18;
  const min = 0;
  const chartW = width - padding.l - padding.r;
  const chartH = height - padding.t - padding.b;
  const step = chartW / Math.max(1, data.length - 1);

  const pts = data.map((d, i) => ({
    x: padding.l + i * step,
    y: padding.t + chartH - ((d.value - min) / (max - min)) * chartH,
    label: d.label,
    value: d.value,
  }));

  const path = useMemo(() => {
    if (pts.length < 2) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(pts)]);

  const areaPath =
    path +
    ` L ${pts[pts.length - 1].x} ${padding.t + chartH} L ${pts[0].x} ${padding.t + chartH} Z`;

  const yTicks = [0, 0.5, 1].map((t) => Math.round((min + (max - min) * t) / 100) * 100);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="block">
      <defs>
        <linearGradient id={`lc-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={fillColor} stopOpacity="0.7" />
          <stop offset="100%" stopColor={fillColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
        <line
          key={i}
          x1={padding.l}
          x2={width - padding.r}
          y1={padding.t + chartH * t}
          y2={padding.t + chartH * t}
          stroke="rgba(42,36,51,0.10)"
          strokeDasharray={i === 4 ? 'none' : '3 4'}
          strokeWidth={1}
        />
      ))}
      <path d={areaPath} fill={`url(#lc-${id})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#fff" stroke={color} strokeWidth="2" />
      ))}
      {showAxis &&
        pts.map((p, i) => (
          <text
            key={i}
            x={p.x}
            y={height - 8}
            textAnchor="middle"
            fontFamily="inherit"
            fontSize="11"
            fontWeight="500"
            fill="#7d7689"
          >
            {p.label}
          </text>
        ))}
      {showAxis &&
        yTicks.map((v, i) => (
          <text
            key={i}
            x={padding.l - 8}
            y={padding.t + chartH - (i * chartH) / 2 + 4}
            textAnchor="end"
            fontFamily="inherit"
            fontSize="10"
            fill="#a8a3b3"
          >
            {v}
          </text>
        ))}
    </svg>
  );
}
