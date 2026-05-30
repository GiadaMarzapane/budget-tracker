// src/components/charts/BarChartDual.tsx
// Grouped bar chart: income (left bar) vs expenses (right bar) per month.

export interface BarDualPoint {
  month: string;
  in: number;
  out: number;
}

interface BarChartDualProps {
  data: BarDualPoint[];
  width?: number;
  height?: number;
  colors?: [string, string];
}

export function BarChartDual({
  data,
  width = 600,
  height = 220,
  colors = ['#9dd190', '#e89e9a'],
}: BarChartDualProps) {
  const pad = { t: 16, r: 16, b: 28, l: 36 };
  const chartW = width - pad.l - pad.r;
  const chartH = height - pad.t - pad.b;
  const max = Math.max(...data.flatMap((d) => [d.in, d.out])) * 1.15;
  const groupW = chartW / Math.max(1, data.length);
  const barW = (groupW - 12) / 2;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="block">
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
        <line
          key={i}
          x1={pad.l}
          x2={width - pad.r}
          y1={pad.t + chartH * t}
          y2={pad.t + chartH * t}
          stroke="rgba(42,36,51,0.10)"
          strokeDasharray={i === 4 ? 'none' : '3 4'}
        />
      ))}
      {data.map((d, i) => {
        const xBase = pad.l + i * groupW + 6;
        const ih = (d.in / max) * chartH;
        const oh = (d.out / max) * chartH;
        return (
          <g key={i}>
            <rect x={xBase} y={pad.t + chartH - ih} width={barW} height={ih} rx="6" fill={colors[0]} />
            <rect x={xBase + barW + 2} y={pad.t + chartH - oh} width={barW} height={oh} rx="6" fill={colors[1]} />
            <text
              x={xBase + barW + 1}
              y={height - 8}
              textAnchor="middle"
              fontFamily="inherit"
              fontSize="11"
              fontWeight="500"
              fill="#7d7689"
            >
              {d.month}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
