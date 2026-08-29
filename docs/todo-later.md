# À faire plus tard (qualité / tooling)

Backlog volontairement reporté. Ne bloque pas le build TypeScript (`ignoreBuildErrors: false`).

## 1. ESLint au build — **Fait (2026-08-29)**

- `eslint.ignoreDuringBuilds: false` dans [`next.config.js`](../next.config.js)
- `npm run lint` → **0 erreur**, **0 warning**
- Passe Prettier/LF, `.eslintignore`, scripts `format` / `typecheck` / `validate`
- Build OK (~100 s, 172 pages SSG) — détail dans [`LINT-BUILD.md`](../LINT-BUILD.md)

## 2. Migrations majeures (séparées)

À traiter chacune dans une PR dédiée, pas en même temps que le formatage :

| Sujet                  | Pourquoi attendre                                     |
| ---------------------- | ----------------------------------------------------- |
| ESLint 9 + flat config | Breaking ; `eslint-config-next` / plugins à aligner   |
| typescript-eslint 8    | Dépend d'ESLint 9                                     |
| React 19               | Breaking peer deps, tests, libs UI                    |
| Next.js 16             | Deprecate `next lint` ; migration App Router / config |

Quand ESLint 9 sera en place, retirer progressivement la dépendance à `npm run lint:next` (wrapper déprécié).

## 3. Suite de tests visualiseurs

Toujours reporté : rewrite des tests MDX / visualiseurs (ignorés dans [`jest.config.js`](../jest.config.js), dossier `src/components/mdx/__tests__/`). Voir [testing.md](./testing.md).

## 4. Playwright multi-viewport — **Fait (2026-08-29)**

- Smoke console : [`e2e/smoke-console.spec.ts`](../e2e/smoke-console.spec.ts) — 12 routes
- Responsive : [`e2e/responsive-smoke.spec.ts`](../e2e/responsive-smoke.spec.ts) — mobile / tablette (< lg) / desktop sur 5 routes clés + test drawer Knowledge
- Viewports : [`test/utils/responsive.ts`](../test/utils/responsive.ts)

## 5. Navigation mobile (UI) — **Fait (2026-08-29)**

- ~~menu / sheet pour la nav Header sous `md`~~ (`MobileNav`)
- ~~accès à la sidebar Knowledge sous `lg`~~ (`KnowledgeSidebarDrawer`)

## Références

- [tooling.md](./tooling.md) — stack et commandes actuelles
- [testing.md](./testing.md) — organisation Jest + Playwright
- [`src/config/breakpoints.ts`](../src/config/breakpoints.ts) — seuils width-first
