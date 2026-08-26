# Tests

Organisation et conventions de la suite de tests après la refonte alignée sur le rendu SSG / loaders.

## Pyramide

```text
        E2E (reporté — Playwright)
               ▲
        intégration légère
     loaders → slugs → params
               ▲
   unitaires + composants interactifs
```

Priorité actuelle :
1. **Logique pure** — loaders Knowledge/Projects, finance, hooks, stores
2. **Composants interactifs** — filtres/cartes/navigation utiles
3. **E2E Playwright** — phase suivante (non configuré)

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
    responsive.ts    # viewport helpers

src/lib/projects/content.test.ts
src/lib/knowledge/content.test.ts
src/**/__tests__/*.test.tsx   # co-localisés quand pertinent
```

Config : [`jest.config.js`](../jest.config.js)

- `testMatch` : uniquement `*.test.*` / `*.spec.*`
- `testPathIgnorePatterns` : `node_modules`, `.next`
- setup : `test/setup.ts`

## Ce qui est couvert

| Zone | Fichiers |
|------|----------|
| Loaders Projects | `src/lib/projects/content.test.ts` |
| Loaders Knowledge | `src/lib/knowledge/content.test.ts` |
| Validation frontmatter | inclus dans content.test projects |
| Finance | `src/lib/finance/__tests__/blackScholes.test.ts` |
| Layout UI | Header, Footer, ThemeProvider |
| Knowledge UI | TreeView, TableOfContents, CodeBlock |
| Projects UI | ProjectCard, useProjectAnimation |
| Visualisation | hooks cache/calculator, distributionStore |

## Reporté

- Playwright (`e2e/`)
- Rewrite `DistributionVisualizer` / intégration MDX `@mdx-js/react` (ignorés dans `jest.config.js` pour l’instant)
- Rewrite `integration/layout`
- Co-localisation complète de tous les tests hors `src/__tests__`

## Rules

- Test titles (`describe` / `it`) are written in **English**.
- A test only has value if it protects the **current** architecture (App Router, next-intl, SSG loaders).
- Avoid shallow “Header shows its title” tests unless there is real behavior.
- Helpers / mocks must not match `testMatch`.
