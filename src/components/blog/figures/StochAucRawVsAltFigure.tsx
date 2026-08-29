import * as React from 'react';
import { BlogFigure } from '@/components/blog/BlogFigure';

export function StochAucRawVsAltFigure(): React.JSX.Element {
  return (
    <BlogFigure caption="AUC valid par tâche — raw vs alt (stoch_32_10_90)">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 320" role="img" aria-hidden>
        <text
          x="320"
          y="24"
          fill="#222"
          fontFamily="system-ui,sans-serif"
          fontSize="14"
          fontWeight="600"
          textAnchor="middle"
        >
          Valid AUC par tâche — stoch_32_10_90 (EURUSD, 2023)
        </text>

        <line x1="70" y1="250" x2="600" y2="250" stroke="#666" strokeWidth="1" />
        <line x1="70" y1="50" x2="70" y2="250" stroke="#666" strokeWidth="1" />
        <line x1="70" y1="170" x2="600" y2="170" stroke="#ddd" strokeWidth="1" strokeDasharray="4 4" />
        <text x="62" y="174" fill="#888" fontSize="10" textAnchor="end" dominantBaseline="middle">
          0,50
        </text>

        <text x="180" y="272" fill="#222" fontSize="12" textAnchor="middle">
          C_event
        </text>
        <text x="320" y="272" fill="#222" fontSize="12" textAnchor="middle">
          A_leg
        </text>
        <text x="460" y="272" fill="#222" fontSize="12" textAnchor="middle">
          A_fwd
        </text>

        <rect x="118" y="110" width="28" height="140" fill="#c44e52" />
        <text x="132" y="102" fill="#111" fontSize="10" fontWeight="600" textAnchor="middle">
          0,70
        </text>
        <rect x="258" y="62" width="28" height="188" fill="#c44e52" />
        <text x="272" y="54" fill="#111" fontSize="10" fontWeight="600" textAnchor="middle">
          0,85
        </text>
        <rect x="398" y="86" width="28" height="164" fill="#c44e52" />
        <text x="412" y="78" fill="#111" fontSize="10" fontWeight="600" textAnchor="middle">
          0,79
        </text>

        <rect x="150" y="134" width="28" height="116" fill="#dd8452" />
        <text x="164" y="126" fill="#111" fontSize="10" fontWeight="600" textAnchor="middle">
          0,63
        </text>
        <rect x="290" y="182" width="28" height="68" fill="#dd8452" />
        <text x="304" y="174" fill="#111" fontSize="10" fontWeight="600" textAnchor="middle">
          0,59
        </text>
        <rect x="430" y="194" width="28" height="56" fill="#dd8452" />
        <text x="444" y="186" fill="#111" fontSize="10" fontWeight="600" textAnchor="middle">
          0,54
        </text>

        <rect x="182" y="138" width="28" height="112" fill="#2c6e9b" />
        <text x="196" y="130" fill="#111" fontSize="10" fontWeight="600" textAnchor="middle">
          0,62
        </text>
        <rect x="322" y="174" width="28" height="76" fill="#2c6e9b" />
        <text x="336" y="166" fill="#111" fontSize="10" fontWeight="600" textAnchor="middle">
          0,63
        </text>
        <rect x="462" y="170" width="28" height="80" fill="#2c6e9b" />
        <text x="476" y="162" fill="#111" fontSize="10" fontWeight="600" textAnchor="middle">
          0,60
        </text>

        <rect x="420" y="36" width="14" height="14" fill="#c44e52" />
        <text x="440" y="47" fill="#222" fontSize="11" dominantBaseline="middle">
          raw
        </text>
        <rect x="480" y="36" width="14" height="14" fill="#dd8452" />
        <text x="500" y="47" fill="#222" fontSize="11" dominantBaseline="middle">
          alt_overlap
        </text>
        <rect x="560" y="36" width="14" height="14" fill="#2c6e9b" />
        <text x="580" y="47" fill="#222" fontSize="11" dominantBaseline="middle">
          alt_no_overlap
        </text>
      </svg>
    </BlogFigure>
  );
}
