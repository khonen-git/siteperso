# ESLint & build — état au 2026-08-29

Synthèse courte. Détail procédural : `docs/tooling.md`, `docs/todo-later.md`.

---

## ESLint

| Métrique | Valeur |
|----------|--------|
| Total | **1148** (976 erreurs, 172 warnings) |
| Auto-fixables | **~962** erreurs (`npm run lint -- --fix`) |
| ESLint au build | **Désactivé** (`eslint.ignoreDuringBuilds: true` dans `next.config.js`) |

### Règles dominantes

| Règle | Nature |
|-------|--------|
| `prettier/prettier` | ~84 % des erreurs — CRLF Windows, indentation, retours ligne |
| `@typescript-eslint/explicit-function-return-type` | Majorité des warnings — types de retour manquants |
| `react/display-name` | Composants anonymes (tests, mocks) |
| `@typescript-eslint/no-explicit-any` | Surtout `test/setup.ts`, mocks |

### Zones les plus touchées

- `src/components/mdx/**` — visualiseurs, presets
- `src/components/features/knowledge/**`
- `test/**`, `coverage/**` (artefacts Jest — à exclure ou ignorer)
- Fichiers config racine (`jest.config.js`, `next.config.js`)

### Action recommandée

1. Normaliser les fins de ligne (LF) + `npm run lint -- --fix`
2. Réactiver ESLint au build une fois la dette Prettier soldée
3. Exclure `coverage/` de ESLint si pas déjà fait

---

## Build (`npm run build`)

| Élément | État |
|---------|------|
| TypeScript | **OK** (`ignoreBuildErrors: false`) |
| Compilation Next.js | OK en conditions normales |
| Dernière exécution (2026-08-29) | **Échec EPERM** sur `.next/trace` — fichier verrouillé (serveur dev ou autre processus Next actif) |

### Action recommandée

Arrêter `npm run dev`, supprimer `.next/`, relancer le build.

---

## Non bloquant pour la prod actuelle

- ESLint n’empêche pas le déploiement (ignoré au build).
- TypeScript strict reste la barrière principale.
- Dette principalement cosmétique (formatage) + conventions TS dans le code legacy.
