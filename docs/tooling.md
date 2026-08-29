# Tooling (lint, format, quality)

## Current stack

| Tool                                                | Role            | Status                                                             |
| --------------------------------------------------- | --------------- | ------------------------------------------------------------------ |
| ESLint 8 + `eslint-config-next`                     | Lint TS/React   | OK for Next 15; ESLint 8 is maintenance-only                       |
| `@typescript-eslint` v6                             | TS rules        | Aligned with `eslint-config-next@15`; v8 needs ESLint 9            |
| `eslint-plugin-prettier` + `eslint-config-prettier` | Format as lint  | Configured via `plugin:prettier/recommended`                       |
| Prettier                                            | Format          | [`.prettierrc`](../.prettierrc) — `endOfLine: lf`                  |
| EditorConfig                                        | Editor defaults | [`.editorconfig`](../.editorconfig) — prefer LF                    |
| TypeScript                                          | Types           | Checked on `next build` (`ignoreBuildErrors: false`)               |
| ESLint on build                                     | Gate            | **Active** (`ignoreDuringBuilds: false`) — 0 errors, 0 warnings |
| Jest                                                | Unit/UI tests   | See [testing.md](./testing.md)                                     |

## Commands

```bash
npm run lint        # eslint directly (preferred)
npm run lint:next   # legacy next lint wrapper (deprecated upstream)
npm run format      # prettier --write .
npm run format:check
npm run typecheck   # tsc --noEmit
npm run validate    # lint + typecheck + test + build
npm test
```

## Known issues / debt

1. **`next lint` is deprecated** — Next.js 16 will remove it. Prefer `npm run lint` (`eslint .`).
2. **Major upgrades deferred** — idem [todo-later.md](./todo-later.md) (ESLint 9, React 19, Next 16).

## Unexpected runtime errors (content)

Invalid KaTeX in Knowledge MDX must **throw** (not render a silent red error box):

- [`MathBlock` / `MathInline`](../src/components/features/knowledge/math/MathBlock/index.tsx) use `renderError` that rethrows.
- Covered by `MathBlock.test.tsx`.
