# À faire plus tard (qualité / tooling)

Backlog volontairement reporté. Ne bloque pas le build TypeScript (`ignoreBuildErrors: false`).

## 1. ESLint au build

**État actuel :** `eslint.ignoreDuringBuilds: true` dans [`next.config.js`](../next.config.js).

**Problème :** `npm run lint` remonte ~900+ erreurs (surtout `prettier/prettier` / fins de ligne CRLF vs LF), plus des warnings (`explicit-function-return-type`, `no-explicit-any`, `react/display-name` dans les mocks de test).

**Objectif :** pouvoir passer à `ignoreDuringBuilds: false` sans casser CI / Vercel.

### Étapes suggérées

1. Sauvegarder / committer l’état actuel.
2. Passer une fois le formatage massif (idéalement LF via EditorConfig) :
   ```bash
   npx prettier --write .
   # ou
   npm run lint -- --fix
   ```
3. Corriger à la main ce que `--fix` ne règle pas (display names, `any`, etc. dans `test/`).
4. Vérifier : `npm run lint` → 0 erreur.
5. Dans `next.config.js` : `eslint.ignoreDuringBuilds: false`.
6. Smoke : `npm run build`.

### Notes

- Préférer LF (voir [`.editorconfig`](../.editorconfig) et `endOfLine: auto` dans [`.prettierrc`](../.prettierrc)).
- Éviter de mélanger cette passe avec une montée de version ESLint / Next.

## 2. Migrations majeures (séparées)

À traiter chacune dans une PR dédiée, pas en même temps que le formatage :

| Sujet | Pourquoi attendre |
|-------|-------------------|
| ESLint 9 + flat config | Breaking ; `eslint-config-next` / plugins à aligner |
| typescript-eslint 8 | Dépend d’ESLint 9 |
| React 19 | Breaking peer deps, tests, libs UI |
| Next.js 16 | Deprecate `next lint` ; migration App Router / config |

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