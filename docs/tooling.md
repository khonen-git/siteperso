# Tooling (lint, format, quality)

## Current stack

| Tool | Role | Status |
|------|------|--------|
| ESLint 8 + `eslint-config-next` | Lint TS/React | OK for Next 15; ESLint 8 is maintenance-only |
| `@typescript-eslint` v6 | TS rules | Aligned with `eslint-config-next@15`; v8 needs ESLint 9 |
| `eslint-plugin-prettier` + `eslint-config-prettier` | Format as lint | Configured via `plugin:prettier/recommended` |
| Prettier | Format | [`.prettierrc`](../.prettierrc) — `endOfLine: auto` (Windows-friendly) |
| EditorConfig | Editor defaults | [`.editorconfig`](../.editorconfig) — prefer LF |
| TypeScript | Types | Checked on `next build` (`ignoreBuildErrors: false`) |
| ESLint on build | Gate | Still ignored (`ignoreDuringBuilds: true`) — Prettier/CRLF noise |
| Jest | Unit/UI tests | See [testing.md](./testing.md) |

## Commands

```bash
npm run lint        # eslint directly (preferred)
npm run lint:next   # legacy next lint wrapper (deprecated upstream)
npx tsc --noEmit    # typecheck without build
npm test
```

## Known issues / debt

1. **`next lint` is deprecated** — Next.js 16 will remove it. Prefer `npm run lint` (`eslint .`).
2. **Prettier noise on Windows** — many historical files mix CRLF/LF; `endOfLine: auto` reduces false positives. Prefer saving as LF (EditorConfig). A full `eslint --fix` / format pass is needed before turning `eslint.ignoreDuringBuilds` off.
3. **Major upgrades deferred** — ESLint 9 flat config, typescript-eslint 8, React 19, Next 16: do as a dedicated migration, not piecemeal.

## Unexpected runtime errors (content)

Invalid KaTeX in Knowledge MDX must **throw** (not render a silent red error box):

- [`MathBlock` / `MathInline`](../src/components/features/knowledge/math/MathBlock/index.tsx) use `renderError` that rethrows.
- Covered by `MathBlock.test.tsx`.
