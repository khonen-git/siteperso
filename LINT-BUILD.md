# ESLint & build — état au 2026-08-29

Synthèse courte. Détail procédural : `docs/tooling.md`, `docs/todo-later.md`.

---

## ESLint

| Métrique | Valeur |
|----------|--------|
| Erreurs | **0** |
| Warnings | **0** |
| ESLint au build | **Actif** (`ignoreDuringBuilds: false`) |

### Commandes

```bash
npm run lint          # 0 erreur attendu
npm run lint -- --fix
npm run format        # prettier --write .
npm run format:check
npm run typecheck     # tsc --noEmit
npm run validate      # lint + typecheck + test + build
```

### Hygiène

- [`.eslintignore`](.eslintignore) — `coverage/`, configs, tests (`**/*.test.*`, `**/__tests__/**`)
- [`.prettierignore`](.prettierignore), [`.gitattributes`](.gitattributes) (`eol=lf`)
- `endOfLine: "lf"` dans `.prettierrc` et `.eslintrc.json`

---

## Build (`npm run build`)

| Étape | Durée typique (machine locale) |
|-------|------------------------------|
| Compilation webpack | ~27–46 s |
| ESLint + TypeScript (gate Next) | ~10 s |
| SSG **174 pages** (Knowledge MDX, blog, projects…) | ~20–30 s |
| **Total** | **~1–1,5 min** |

Dernière exécution réussie : **~78 s** (174 pages statiques).

### Pourquoi ça peut sembler « bloqué »

1. **Processus Node concurrents** (`npm run dev` + build) → EPERM sur `.next/trace`. Arrêter le dev server avant le build.
2. **Sortie PowerShell pipée** (`| Select-Object -Last N`) — bufferise tout jusqu'à la fin.
3. **Phase SSG silencieuse** — peu de logs entre « Generating static pages (0/N) » et la fin.

### Optimisations appliquées

| Optimisation | Effet |
|--------------|-------|
| `listPublishedKnowledgeSlugs` (stubs masqués) | ~218 → **112** routes Knowledge / locale |
| Cache `isKnowledgeDraft` + `getFilteredNavigationData` | évite des milliers de `readFileSync` redondants par page |
| `experimental.optimizePackageImports` (lucide, recharts, radix icons) | bundles plus légers |
| Fix MDX (`MdxCard` + listes imbriquées) | build ne plante plus au prerender |

### Pistes futures (non implémentées)

- ISR / `dynamic` pour pages Knowledge peu consultées
- `next build` avec cache CI (`.next/cache`)
- Audit MDX : éviter listes Markdown à l'intérieur de `<MdxCard>` (pattern fragile)

---

## Dette reportée

- Migrations ESLint 9 / React 19 / Next 16 — `docs/todo-later.md` §2
