import type { CSSProperties } from 'react';
import { vs, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

/** Styles Prism proches de VS Code (clair / Dark+). */
export function getPrismSyntaxStyle(theme: 'light' | 'dark' | undefined) {
  return theme === 'dark' ? vscDarkPlus : vs;
}

/** Mise en page commune des blocs de code (police, taille, fond géré par le thème Prism). */
export const codeBlockCustomStyle: CSSProperties = {
  margin: 0,
  padding: '1rem',
  borderRadius: '0.375rem',
  fontSize: '0.875rem',
  lineHeight: 1.6,
  fontFamily: 'var(--font-mono, ui-monospace), SFMono-Regular, Menlo, Consolas, monospace',
};
