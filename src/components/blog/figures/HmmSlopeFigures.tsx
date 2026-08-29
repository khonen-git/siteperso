import * as React from 'react';
import { BlogFigure } from '@/components/blog/BlogFigure';

export function HmmCifFigure(): React.JSX.Element {
  const rows = [
    { label: 'IS', r: 0.28, e: 0.687, b: 0.034 },
    { label: 'OOS', r: 0.281, e: 0.681, b: 0.038 },
  ];
  const colors = ['#2c6e9b', '#dd8452', '#888888'];

  return (
    <BlogFigure caption="CIF issues soft-fade — Resolve / Escalate / Break (IS vs OOS 2024)">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 240" role="img" aria-hidden>
        <text x="260" y="20" fill="#222" fontSize="13" fontWeight="600" textAnchor="middle">
          CIF à K_max — structure stable IS ≈ OOS
        </text>
        {rows.map((row, ri) => {
          const y = 50 + ri * 80;
          let x = 100;
          const vals = [row.r, row.e, row.b];
          const labels = ['R', 'E', 'B'];
          return (
            <React.Fragment key={row.label}>
              <text x="40" y={y + 22} fill="#222" fontSize="12" fontWeight="600" textAnchor="middle">
                {row.label}
              </text>
              {vals.map((v, i) => {
                const w = v * 320;
                const rect = (
                  <rect key={i} x={x} y={y} width={w} height={36} fill={colors[i]} stroke="#fff" strokeWidth={1} />
                );
                x += w;
                return rect;
              })}
              <text x="450" y={y + 22} fill="#444" fontSize="10" textAnchor="start">
                {labels.map((l, i) => `${l} ${(vals[i] * 100).toFixed(1)}%`).join(' · ')}
              </text>
            </React.Fragment>
          );
        })}
        <text x="260" y="228" fill="#666" fontSize="11" textAnchor="middle">
          ~68% escalate · hazard E précoce, R tardif
        </text>
      </svg>
    </BlogFigure>
  );
}

export function HmmAucOnsetMidFigure(): React.JSX.Element {
  return (
    <BlogFigure caption="Gate 2 vs 3 — AUC Escalate (OOS) : onset ≈ hasard, mid-épisode ≈ 0,82">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 260" role="img" aria-hidden>
        <text x="240" y="22" fill="#222" fontSize="13" fontWeight="600" textAnchor="middle">
          AUC E-vs-rest (OOS 2024)
        </text>
        <line x1="60" y1="200" x2="420" y2="200" stroke="#666" strokeWidth="1" />
        <line x1="60" y1="40" x2="60" y2="200" stroke="#666" strokeWidth="1" />
        <line x1="60" y1="120" x2="420" y2="120" stroke="#888" strokeWidth="1" strokeDasharray="4 4" />
        <text x="52" y="124" fill="#888" fontSize="10" textAnchor="end">
          0,50
        </text>
        <rect x="100" y="118" width="80" height="82" fill="#c44e52" />
        <text x="140" y="110" fill="#111" fontSize="11" fontWeight="600" textAnchor="middle">
          0,522
        </text>
        <text x="140" y="218" fill="#222" fontSize="11" textAnchor="middle">
          Onset (P3a-1)
        </text>
        <text x="140" y="232" fill="#666" fontSize="10" textAnchor="middle">
          FAIL gate
        </text>
        <rect x="280" y="54" width="80" height="146" fill="#3a7d44" />
        <text x="320" y="46" fill="#111" fontSize="11" fontWeight="600" textAnchor="middle">
          0,816
        </text>
        <text x="320" y="218" fill="#222" fontSize="11" textAnchor="middle">
          Mid-épisode (P3a-2)
        </text>
        <text x="320" y="232" fill="#666" fontSize="10" textAnchor="middle">
          PARTIAL — risque dynamique
        </text>
      </svg>
    </BlogFigure>
  );
}
