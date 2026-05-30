// src/components/charts/DonutChart.tsx — and Sparkline

import type { ReactNode } from 'react';

export interface DonutSlice {
  value: number;
  color: string;
  label?: string;
}

interface DonutChartProps {
  data: DonutSlice[];
  size?: number;
  thickness?: number;
  children?: ReactNode; // center label slot
}

export function DonutChart({ data, size = 180, thickness = 26, children }: DonutChartProps) {
  const r = (size - thickness) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const total = data.reduce((a, b) => a + b.value, 0) || 1;
  let acc = 0;
  const arcs = data.map((d, i) => {
    const a0 = (acc / total) * Math.PI * 2 - Math.PI / 2;
    acc += d.value;
    const a1 = (acc / total) * Math.PI * 2 - Math.PI / 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const gap = 0.01;
    const aa0 = a0 + gap;
    const aa1 = a1 - gap;
    if (aa1 <= aa0) return null;
    const x0 = cx + r * Math.cos(aa0);
    const y0 = cy + r * Math.sin(aa0);
    const x1 = cx + r * Math.cos(aa1);
    const y1 = cy + r * Math.sin(aa1);
    const ir = r - thickness;
    const ix0 = cx + ir * Math.cos(aa1);
    const iy0 = cy + ir * Math.sin(aa1);
    const ix1 = cx + ir * Math.cos(aa0);
    const iy1 = cy + ir * Math.sin(aa0);
    const dpath = `M${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1} L${ix0},${iy0} A${ir},${ir} 0 ${large} 0 ${ix1},${iy1} Z`;
    return <path key={i} d={dpath} fill={d.color} />;
  });
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        {arcs}
      </svg>
      {children ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {children}
        </div>
      ) : null}
    </div>
  );
}

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
}

export function Sparkline({ data, width = 100, height = 26, color = '#2a2433' }: SparklineProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const step = width / Math.max(1, data.length - 1);
  const range = max - min || 1;
  const pts = data.map((v, i) => [i * step, height - ((v - min) / range) * (height - 4) - 2] as const);
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ');
  return (
    <svg width={width} height={height} className="block">
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
