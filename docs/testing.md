# Tests

Organisation et conventions de la suite de tests après la refonte alignée sur le rendu SSG / loaders.

## Pyramide

```text
        E2E smoke (Playwright — console)
               ▲
        intégration légère
     loaders → slugs → params
               ▲
   unitaires + composants interactifs
```

Priorité actuelle :

1. **Logique pure** — loaders Knowledge/Projects/Blog, finance, hooks, stores
2. **Composants interactifs** — filtres/cartes/navigation utiles
3. **E2E Playwright** — smoke console (`npm run test:e2e`)

## Commandes

```bash
npm test              # Jest + coverage
npm run test:watch
npm run test:coverage
npx jest --listTests  # doit lister uniquement *.test.* / *.spec.*
```

## Organisation

```text
test/
  setup.ts           # mocks globaux (next/image, framer-motion, matchMedia…)
  mocks/
    lucide-react.ts
    theme-toggle.tsx
  utils/
    render.tsx       # customRender RTL
    responsive.ts    # VIEWPORTS, BREAKPOINT_EDGE_WIDTHS, setViewportSize, mockMatchMedia

src/config/breakpoints.ts    # source de vérité width (alignée Tailwind)
src/config/breakpoints.test.ts
src/lib/projects/content.test.ts
src/lib/knowledge/content.test.ts
src/**/__tests__/*.test.tsx   # co-localisés quand pertinent
e2e/
  smoke-console.spec.ts
  responsive-smoke.spec.ts
  helpers/console-guard.ts
playwright.config.ts
```

### Responsive (Jest vs Playwright)

- **Source de vérité** : [`src/config/breakpoints.ts`](../src/config/breakpoints.ts) — mêmes largeurs que Tailwind (`sm`…`2xl`). Pas de classification par ratio height/width.
- **Helpers Jest** : [`test/utils/responsive.ts`](../test/utils/responsive.ts)
  - `VIEWPORTS` — quelques tailles représentatives
  - `BREAKPOINT_EDGE_WIDTHS` — juste avant / sur chaque breakpoint (639, 640, 767, 768…)
  - `setViewportSize` — `defineProperty` + event `resize`
  - `mockMatchMedia` — évalue `min-width` / `max-width` vs `innerWidth` ; fallback pour les autres queries
- **Limite jsdom** : les classes Tailwind (`hidden md:flex`) ne basculent pas le layout CSS. La validation multi-viewport est **Playwright** — [`e2e/responsive-smoke.spec.ts`](../e2e/responsive-smoke.spec.ts).

Config : [`jest.config.js`](../jest.config.js)

- `testMatch` : uniquement `*.test.*` / `*.spec.*`
- `testPathIgnorePatterns` : `node_modules`, `.next`, `e2e`
- setup : `test/setup.ts`

## Ce qui est couvert

| Zone                   | Fichiers                                                                                      |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| Loaders Projects       | `src/lib/projects/content.test.ts`                                                            |
| Loaders Knowledge      | `src/lib/knowledge/content.test.ts`                                                           |
| Validation frontmatter | inclus dans content.test projects                                                             |
| Finance                | `src/lib/finance/__tests__/blackScholes.test.ts`                                              |
| Loaders Blog           | `src/lib/blog/content.test.ts` (série recherche, protocoles, figures)                         |
| Layout UI              | Header, Footer, ThemeProvider                                                                 |
| MDX visualiseur        | `src/__tests__/components/mdx/MdxDistributionVisualizer.test.tsx`                             |
| Breakpoints            | `src/config/breakpoints.test.ts`                                                              |
| Knowledge UI           | TreeView, TableOfContents, CodeBlock                                                          |
| Projects UI            | ProjectCard, useProjectAnimation                                                              |
| Visualisation          | hooks cache/calculator, distributionStore, MdxDistributionVisualizer                          |
| **E2E smoke**          | [`e2e/smoke-console.spec.ts`](../e2e/smoke-console.spec.ts) — 12 routes, zéro `console.error` |
| **E2E responsive**     | [`e2e/responsive-smoke.spec.ts`](../e2e/responsive-smoke.spec.ts) — 5 routes × 3 viewports + drawer Knowledge |

## Playwright (smoke console)

```bash
npm run test:e2e          # build + start + 12 pages (production, ~2–3 min)
npm run test:e2e:dev      # réutilise `next dev` déjà lancé (~30 s)
npm run test:e2e:only     # Playwright seul (serveur déjà up sur :3000)
npx playwright test --ui  # mode interactif
```

Écoute `console.error` et `pageerror` (ignore favicon / React DevTools).

Routes couvertes : accueil FR/EN, about, projects (+ website-creation), blog (+ article recherche), knowledge (+ normal + statistical-tests), references, contact.

**Responsive** (`responsive-smoke.spec.ts`) : mobile (375px), tablette sous `lg` (1023px), desktop (1280px) sur home, knowledge, article, projects liste + détail ; test d’ouverture/fermeture du drawer Knowledge.

Scan MDX statique (sans navigateur) :

```bash
node scripts/scan-mdx-hazards.mjs
```

## Reporté

- Rewrite `integration/layout`
- Co-localisation complète de tous les tests hors `src/__tests__`
- Campagne Playwright aux bords de breakpoints (639/640, 767/768…) — helpers prêts dans `test/utils/responsive.ts`

## Rules

- Test titles (`describe` / `it`) are written in **English**.
- A test only has value if it protects the **current** architecture (App Router, next-intl, SSG loaders).
- Avoid shallow “Header shows its title” tests unless there is real behavior.
- Helpers / mocks must not match `testMatch`.
