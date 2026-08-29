import * as React from 'react';
import { BlogFigure } from '@/components/blog/BlogFigure';

export function MultiScaleGatesFigure(): React.JSX.Element {
  const gates = [
    { id: 'G0', label: 'Identifiabilité', verdict: 'PASS', color: '#3a7d44' },
    { id: 'G1', label: 'Existence', verdict: 'PASS', color: '#3a7d44' },
    { id: 'G2', label: 'Detectability', verdict: 'PASS', color: '#3a7d44' },
    { id: 'G3', label: 'Predictability', verdict: 'PASS', color: '#3a7d44' },
    { id: 'G4', label: 'Tradability', verdict: 'WEAK', color: '#dd8452' },
  ];

  return (
    <BlogFigure caption="Framework gates 0→4 — pullback multi-échelle (EURUSD, 2023)">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 120" role="img" aria-hidden>
        {gates.map((g, i) => (
          <React.Fragment key={g.id}>
            <rect
              x={20 + i * 138}
              y={30}
              width={118}
              height={56}
              rx={6}
              fill={g.color}
              stroke="#1a1a1a"
              strokeWidth={1.2}
            />
            <text
              x={79 + i * 138}
              y={52}
              fill="#fff"
              fontSize="12"
              fontWeight="600"
              textAnchor="middle"
            >
              {g.id}
            </text>
            <text
              x={79 + i * 138}
              y={70}
              fill="#fff"
              fontSize="10"
              textAnchor="middle"
            >
              {g.verdict}
            </text>
            {i < gates.length - 1 ? (
              <line
                x1={138 + i * 138}
                y1={58}
                x2={158 + i * 138}
                y2={58}
                stroke="#333"
                strokeWidth={1.5}
                markerEnd="url(#ms-arrow)"
              />
            ) : null}
          </React.Fragment>
        ))}
        <defs>
          <marker id="ms-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#333" />
          </marker>
        </defs>
        <text x="360" y="18" fill="#111" fontSize="13" fontWeight="600" textAnchor="middle">
          R|R∪F ≈ 79% stable · ΔLL OOS +137 · EV net dev −0,22 pip
        </text>
      </svg>
    </BlogFigure>
  );
}

export function MultiScaleEvNetFigure(): React.JSX.Element {
  return (
    <BlogFigure caption="Gate 4 — EV net (pips) disc vs dev, même cellule gelée (q=0.8, d=4, cap=32)">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 260" role="img" aria-hidden>
        <text x="240" y="22" fill="#222" fontSize="13" fontWeight="600" textAnchor="middle">
          EV net après spread 0,2 pip
        </text>
        <line x1="60" y1="200" x2="420" y2="200" stroke="#666" strokeWidth="1" />
        <line x1="60" y1="40" x2="60" y2="200" stroke="#666" strokeWidth="1" />
        <line x1="60" y1="120" x2="420" y2="120" stroke="#ddd" strokeWidth="1" strokeDasharray="4 4" />
        <text x="52" y="124" fill="#888" fontSize="10" textAnchor="end">
          0
        </text>
        <rect x="130" y="108" width="60" height="92" fill="#3a7d44" />
        <text x="160" y="100" fill="#111" fontSize="11" fontWeight="600" textAnchor="middle">
          +0,14
        </text>
        <text x="160" y="218" fill="#222" fontSize="12" textAnchor="middle">
          disc (H1)
        </text>
        <rect x="290" y="132" width="60" height="68" fill="#c44e52" />
        <text x="320" y="124" fill="#111" fontSize="11" fontWeight="600" textAnchor="middle">
          −0,22
        </text>
        <text x="320" y="218" fill="#222" fontSize="12" textAnchor="middle">
          dev (H2 OOS)
        </text>
        <text x="240" y="248" fill="#666" fontSize="11" textAnchor="middle">
          MFE moy +2,1 · MAE moy −2,9 pips (disc)
        </text>
      </svg>
    </BlogFigure>
  );
}
