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
    responsive.ts    # VIEWPORTS, BREAKPOINT_EDGE_WIDTHS, setViewportSize, mockMatchMedia

src/config/breakpoints.ts    # source de vérité width (alignée Tailwind)
src/config/breakpoints.test.ts
src/lib/projects/content.test.ts
src/lib/knowledge/content.test.ts
src/**/__tests__/*.test.tsx   # co-localisés quand pertinent
```

### Responsive (Jest vs Playwright)

- **Source de vérité** : [`src/config/breakpoints.ts`](../src/config/breakpoints.ts) — mêmes largeurs que Tailwind (`sm`…`2xl`). Pas de classification par ratio height/width.
- **Helpers Jest** : [`test/utils/responsive.ts`](../test/utils/responsive.ts)
  - `VIEWPORTS` — quelques tailles représentatives
  - `BREAKPOINT_EDGE_WIDTHS` — juste avant / sur chaque breakpoint (639, 640, 767, 768…)
  - `setViewportSize` — `defineProperty` + event `resize`
  - `mockMatchMedia` — évalue `min-width` / `max-width` vs `innerWidth` ; fallback pour les autres queries
- **Limite jsdom** : les classes Tailwind (`hidden md:flex`) ne basculent pas le layout CSS. Les tests unitaires vérifient surtout la logique / la présence de classes. La validation visuelle multi-viewport est **Playwright** (reporté).

Config : [`jest.config.js`](../jest.config.js)

- `testMatch` : uniquement `*.test.*` / `*.spec.*`
- `testPathIgnorePatterns` : `node_modules`, `.next`
- setup : `test/setup.ts`

## Ce qui est couvert

| Zone                   | Fichiers                                         |
| ---------------------- | ------------------------------------------------ |
| Loaders Projects       | `src/lib/projects/content.test.ts`               |
| Loaders Knowledge      | `src/lib/knowledge/content.test.ts`              |
| Validation frontmatter | inclus dans content.test projects                |
| Finance                | `src/lib/finance/__tests__/blackScholes.test.ts` |
| Layout UI              | Header, Footer, ThemeProvider                    |
| Breakpoints            | `src/config/breakpoints.test.ts`                 |
| Knowledge UI           | TreeView, TableOfContents, CodeBlock             |
| Projects UI            | ProjectCard, useProjectAnimation                 |
| Visualisation          | hooks cache/calculator, distributionStore        |

## Reporté

- Playwright (`e2e/`) — campagne multi-viewport (voir [todo-later.md](./todo-later.md))
- Rewrite `DistributionVisualizer` / intégration MDX `@mdx-js/react` (ignorés dans `jest.config.js` pour l’instant)
- Rewrite `integration/layout`
- Co-localisation complète de tous les tests hors `src/__tests__`
- Menu mobile Header + drawer sidebar Knowledge (navigation sous `md` / `lg`)
  - Header : `MobileNav` (sheet) — fait
  - Knowledge sidebar drawer sous `lg` — reste à faire

## Rules

- Test titles (`describe` / `it`) are written in **English**.
- A test only has value if it protects the **current** architecture (App Router, next-intl, SSG loaders).
- Avoid shallow “Header shows its title” tests unless there is real behavior.
- Helpers / mocks must not match `testMatch`.
