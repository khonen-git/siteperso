import * as React from 'react';
import { BlogFigure } from '@/components/blog/BlogFigure';

export function CompressionV1V1bFigure(): React.JSX.Element {
  const metrics = [
    { label: 'n events', v1: '3 068', v1b: '1 697' },
    { label: 'D5−', v1: '2,24', v1b: '1,50' },
    { label: 'gap <40', v1: '57%', v1b: '5%' },
    { label: 'med. gap', v1: '26', v1b: '152' },
  ];

  return (
    <BlogFigure caption="V1 vs V1b — correction du detection lag et du clustering">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 200" role="img" aria-hidden>
        <text x="260" y="18" fill="#222" fontSize="13" fontWeight="600" textAnchor="middle">
          Détecteur std_logp — reformulation early+causal
        </text>
        <text x="180" y="44" fill="#c44e52" fontSize="12" fontWeight="600" textAnchor="middle">
          V1 naive
        </text>
        <text x="360" y="44" fill="#3a7d44" fontSize="12" fontWeight="600" textAnchor="middle">
          V1b causal
        </text>
        {metrics.map((m, i) => {
          const y = 58 + i * 32;
          return (
            <React.Fragment key={m.label}>
              <text x="20" y={y + 12} fill="#444" fontSize="11">
                {m.label}
              </text>
              <text x="180" y={y + 12} fill="#222" fontSize="11" fontWeight="600" textAnchor="middle">
                {m.v1}
              </text>
              <text x="360" y={y + 12} fill="#222" fontSize="11" fontWeight="600" textAnchor="middle">
                {m.v1b}
              </text>
              <line x1="20" y1={y + 20} x2="500" y2={y + 20} stroke="#eee" strokeWidth="1" />
            </React.Fragment>
          );
        })}
        <text x="260" y="188" fill="#666" fontSize="10" textAnchor="middle">
          AUCΔ pré-onset ≈ 39 vs post ≈ 6 (V1 laggé)
        </text>
      </svg>
    </BlogFigure>
  );
}

export function CompressionAblationFigure(): React.JSX.Element {
  const metrics = [
    { label: 'Δ log-loss', val: '−0,001' },
    { label: 'Δ Brier', val: '≈ 0' },
    { label: 'Δ R²', val: '≈ 0' },
  ];

  return (
    <BlogFigure caption="Ablation incrémentale — surplus vol vs base (slope + ER) ≈ 0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 220" role="img" aria-hidden>
        <text x="240" y="20" fill="#222" fontSize="13" fontWeight="600" textAnchor="middle">
          Ajout features vol au-delà de compression + slope + ER
        </text>
        <line x1="80" y1="160" x2="400" y2="160" stroke="#666" strokeWidth="1" />
        <line x1="80" y1="40" x2="80" y2="160" stroke="#666" strokeWidth="1" />
        <line x1="80" y1="100" x2="400" y2="100" stroke="#888" strokeWidth="1" strokeDasharray="4 4" />
        {metrics.map((m, i) => {
          const x = 120 + i * 110;
          return (
            <React.Fragment key={m.label}>
              <rect x={x - 28} y={95} width={56} height={10} fill="#888888" />
              <text x={x} y={88} fill="#111" fontSize="10" fontWeight="600" textAnchor="middle">
                {m.val}
              </text>
              <text x={x} y={178} fill="#222" fontSize="10" textAnchor="middle">
                {m.label}
              </text>
            </React.Fragment>
          );
        })}
        <text x="240" y="205" fill="#666" fontSize="10" textAnchor="middle">
          std_logp = contexte / maturité, pas trigger autonome
        </text>
      </svg>
    </BlogFigure>
  );
}
