# À faire plus tard (qualité / tooling)

Backlog volontairement reporté. Ne bloque pas le build TypeScript (`ignoreBuildErrors: false`).

## 1. ESLint au build — **Fait (2026-08-29)**

- `eslint.ignoreDuringBuilds: false` dans [`next.config.js`](../next.config.js)
- `npm run lint` → **0 erreur** (~171 warnings tolérés)
- Passe Prettier/LF, `.eslintignore`, scripts `format` / `typecheck` / `validate`
- Build OK (~78 s, 174 pages SSG) — détail dans [`LINT-BUILD.md`](../LINT-BUILD.md)

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

## 4. Playwright multi-viewport

Une fois Playwright en place, couvrir les layouts avec :

- viewports représentatifs (`VIEWPORTS` dans [`test/utils/responsive.ts`](../test/utils/responsive.ts))
- largeurs aux bords de breakpoints (`BREAKPOINT_EDGE_WIDTHS` : 639/640, 767/768, 1023/1024…)
- pages : home, knowledge (article + home), projects (liste + détail), header/footer

Ne pas tenter de simuler tout ça en Jest/jsdom.

## 5. Navigation mobile (UI)

- ~~menu / sheet pour la nav Header sous `md`~~ (fait : `MobileNav`)
- accès à la sidebar Knowledge sous `lg` (drawer ou équivalent) — reste à faire

## Références

- [tooling.md](./tooling.md) — stack et commandes actuelles
- [testing.md](./testing.md) — organisation Jest
- [`src/config/breakpoints.ts`](../src/config/breakpoints.ts) — seuils width-first
