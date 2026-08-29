import * as React from 'react';
import { BlogFigure } from '@/components/blog/BlogFigure';

export function Tr8drDeltaHitFigure(): React.JSX.Element {
  const points = [
    [8, 0.42],
    [16, 0.51],
    [32, 0.549],
    [64, 0.38],
    [128, 0.12],
  ];
  const xs = points.map(([h]) => 80 + (h / 128) * 320);
  const ys = points.map(([, d]) => 180 - d * 280);
  const path = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${80 + (p[0] / 128) * 320} ${180 - p[1] * 280}`)
    .join(' ');

  return (
    <BlogFigure caption="Validité économique D(h) — peak +0,549 à H=32 bars (EURUSD TIMB, 2023)">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 240" role="img" aria-hidden>
        <text x="240" y="20" fill="#222" fontSize="13" fontWeight="600" textAnchor="middle">
          Δ_hit(h) = P(up) − P(down) à horizon h
        </text>
        <line x1="60" y1="180" x2="420" y2="180" stroke="#666" strokeWidth="1" />
        <line x1="60" y1="30" x2="60" y2="180" stroke="#666" strokeWidth="1" />
        <path d={path} fill="none" stroke="#2c6e9b" strokeWidth="2.5" />
        {points.map(([h, d], i) => (
          <circle key={i} cx={xs[i]} cy={ys[i]} r={5} fill="#2c6e9b" />
        ))}
        <text
          x={80 + (32 / 128) * 320}
          y={180 - 0.549 * 280 - 10}
          fill="#111"
          fontSize="10"
          fontWeight="600"
          textAnchor="middle"
        >
          +0,549
        </text>
        <text x="240" y="210" fill="#444" fontSize="11" textAnchor="middle">
          Horizon h (bars)
        </text>
        <text x="240" y="228" fill="#666" fontSize="10" textAnchor="middle">
          Occupancy signed 48,6% · ~5,2 segments/jour
        </text>
      </svg>
    </BlogFigure>
  );
}

export function Tr8drValidOosFigure(): React.JSX.Element {
  return (
    <BlogFigure caption="Permission live C4 — R valid 0,56 → OOS 2024 : 0,34 (dégradé mais positif)">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 260" role="img" aria-hidden>
        <text x="240" y="22" fill="#222" fontSize="13" fontWeight="600" textAnchor="middle">
          Score permission R (stack C_bps_slim, q=0.5)
        </text>
        <line x1="60" y1="200" x2="420" y2="200" stroke="#666" strokeWidth="1" />
        <line x1="60" y1="40" x2="60" y2="200" stroke="#666" strokeWidth="1" />
        <rect x="110" y="72" width="70" height="128" fill="#2c6e9b" />
        <text x="145" y="64" fill="#111" fontSize="11" fontWeight="600" textAnchor="middle">
          0,558
        </text>
        <text x="145" y="218" fill="#222" fontSize="11" textAnchor="middle">
          Valid H2-2023
        </text>
        <rect x="280" y="118" width="70" height="82" fill="#dd8452" />
        <text x="315" y="110" fill="#111" fontSize="11" fontWeight="600" textAnchor="middle">
          0,344
        </text>
        <text x="315" y="218" fill="#222" fontSize="11" textAnchor="middle">
          OOS 2024
        </text>
        <text x="240" y="248" fill="#666" fontSize="10" textAnchor="middle">
          AUC live 0,606 → 0,587 · gate de régime, pas alpha
        </text>
      </svg>
    </BlogFigure>
  );
}
