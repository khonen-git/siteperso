# ESLint & build — état au 2026-08-30

Synthèse courte. Détail procédural : `docs/tooling.md`, `docs/todo-later.md`.

---

## ESLint

| Métrique        | Valeur                                  |
| --------------- | --------------------------------------- |
| Erreurs         | **0**                                   |
| Warnings        | **0**                                   |
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

| Commande | Rôle |
| -------- | ---- |
| `npm run build` | **Préféré** — `scripts/build-clean.mjs` : tue les builds zombies, nettoie `.next-build`, compile avec `distDir` isolé |
| `npm run build:next` | Rebuild sans clean (même `distDir: .next-build` via `NEXT_BUILD_DIST_DIR`) |
| `npm run clean` | Supprime `.next` + `node_modules/.cache` (dev) |

Le **dev** écrit dans `.next/` ; le **build prod** écrit dans `.next-build/` (`next.config.js` + `NEXT_BUILD_DIST_DIR`) pour éviter les conflits de verrous Windows sur `.next/trace`.

| Étape                                              | Durée typique (machine locale) |
| -------------------------------------------------- | ------------------------------ |
| Compilation webpack                                | ~27–46 s                       |
| ESLint + TypeScript (gate Next)                    | ~10 s                          |
| SSG **~179 pages** (Knowledge MDX, blog, projects…) | ~20–40 s                       |
| Traces standalone                                  | ~10–20 s                       |
| **Total**                                          | **~1–2 min**                   |

Dernière exécution réussie : **~114 s** (179 pages statiques).

### Règle agents — ne pas attendre indéfiniment

**Si après ~5 minutes le build n’a pas affiché « ✓ Compiled successfully » ou une erreur explicite, arrêter d’attendre** : tuer le processus, diagnostiquer (voir ci‑dessous), relancer **une seule** fois via `npm run build`.

Un build sain sur cette machine produit des logs en continu ; un silence total au‑delà de 5 min indique presque toujours un **verrou fichier** ou un **build zombie**, pas une compilation lente.

### Build lent ou « bloqué » — diagnostic Windows

| Symptôme | Cause probable | Action |
| -------- | -------------- | ------ |
| Aucune sortie après `Creating an optimized production build ...` (> 5 min) | Build zombie ou `EPERM` sur `.next/trace` | Voir [Procédure de déblocage](#procédure-de-déblocage-build-windows) |
| `EPERM: operation not permitted, open '.next\trace'` | Dev server, IDE (Cursor) ou ancien `next build` tient le fichier | `npm run build` (dist isolé) ou arrêter le dev + tuer les PIDs Node du projet |
| `ENOENT: ... pages-manifest.json` juste après compile | Build interrompu / `.next` corrompu / deux builds en parallèle | Une seule instance ; `npm run build` (clean `.next-build`) |
| `ENOENT: copyfile '.next\package.json' → '.next\standalone\...'` | `next build` lancé sans `NEXT_BUILD_DIST_DIR` alors que le standalone attend `.next-build` | Utiliser `npm run build` ou `npm run build:next`, **pas** `npx next build` seul |
| Logs figés entre `Generating static pages (0/N)` et la fin | Normal (phase SSG peu bavarde) | Attendre jusqu’à ~3 min **si** la compile a déjà réussi |
| Sortie PowerShell pipée (`\| Select-Object -Last N`) | Bufferisation | Relancer sans pipe |

### Erreurs fréquentes (extraits)

```
uncaughtException [Error: EPERM: operation not permitted, open '...\.next\trace']
```

→ Fichier `trace` verrouillé. Le dev et le build prod ne doivent pas partager le même dossier de sortie sur Windows.

```
[Error: ENOENT: no such file or directory, open '...\.next\server\pages-manifest.json']
```

→ Artefacts serveur incomplets : build tué en cours de route ou conflit parallèle.

```
ENOENT: copyfile '...\.next\package.json' → '...\.next\standalone\.next\package.json'
```

→ Build standalone avec le mauvais `distDir` ; passer par `npm run build`.

### Procédure de déblocage (build Windows)

1. **Ne pas** lancer plusieurs `npm run build` en parallèle (y compris en background).
2. Lister les Node du projet : `Get-CimInstance Win32_Process -Filter "name='node.exe'" | Select ProcessId, CommandLine`
3. Tuer **uniquement** les PIDs liés à `next build` / `build-clean` du repo (pas un `taskkill` global sur tous les `node.exe` sauf urgence build).
4. Relancer **`npm run build`** (une fois) — script `scripts/build-clean.mjs`.
5. Si `.next` reste verrouillé mais le build prod suffit : ignorer `.next` (le prod utilise `.next-build`).

### Pourquoi ça peut sembler « bloqué » (résumé)

1. **Verrou `.next/trace`** — dev + build sur le même dossier, ou IDE qui indexe le fichier.
2. **Builds zombies** — processus `next build` orphelins après un timeout agent ou un `taskkill` partiel.
3. **Phase SSG silencieuse** — peu de logs entre « Generating static pages (0/N) » et la fin (*attente OK si compile déjà ✓*).
4. **Sortie PowerShell pipée** — bufferise tout jusqu'à la fin.

### Optimisations appliquées

| Optimisation                                                          | Effet                                                    |
| --------------------------------------------------------------------- | -------------------------------------------------------- |
| `listPublishedKnowledgeSlugs` (stubs masqués)                         | ~218 → **112** routes Knowledge / locale                 |
| Cache `isKnowledgeDraft` + `getFilteredNavigationData`                | évite des milliers de `readFileSync` redondants par page |
| `experimental.optimizePackageImports` (lucide, recharts, radix icons) | bundles plus légers                                      |
| Fix MDX (`MdxCard` + listes imbriquées)                               | build ne plante plus au prerender                        |
| `scripts/build-clean.mjs` + `distDir: .next-build` en prod           | évite EPERM/ENOENT Windows sur `.next/trace`            |

### Pistes futures (non implémentées)

- ISR / `dynamic` pour pages Knowledge peu consultées
- `next build` avec cache CI (`.next/cache`)
- Audit MDX : éviter listes Markdown à l'intérieur de `<MdxCard>` (pattern fragile)

---

## Dette reportée

- Migrations ESLint 9 / React 19 / Next 16 — `docs/todo-later.md` §2
