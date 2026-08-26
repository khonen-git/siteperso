# Rendu du contenu éditorial (SSG / Server Components)

Documente le pipeline Knowledge + Projects tel qu’implémenté pour exposer le contenu dans le **HTML initial** (crawlers, SEO, IA), sans dépendre de l’exécution JavaScript côté client.

## Objectif

| Avant | Après |
|-------|--------|
| Placeholder « Chargement… » dans le HTML | Corps d’article / cartes projets dans le HTML |
| Fetch client (`useEffect` → `/api/...`) | Lecture MDX au build / côté serveur |
| Knowledge forcé en dynamique | Pages Knowledge + Projects en **SSG** |

Règle : le JavaScript enrichit (filtres, tooltips, visualisations) ; il n’est **pas** requis pour lire le contenu principal.

## Architecture cible

```text
src/content/{fr|en}/knowledge/**/*.mdx
src/content/{fr|en}/projects/*.mdx
        │
        ▼
  lib (fs + gray-matter)
        │
        ▼
  Server Page + generateStaticParams
        │
        ├── MDXRemote (next-mdx-remote/rsc)  → HTML article
        └── Client Components               → filtres, layout, charts
```

Flux page Knowledge :

```text
/[locale]/knowledge/[...slug]
  → KnowledgeArticle (server)
      → lit le MDX (resolveKnowledgeFilePath)
      → KnowledgeLayout (client, shell UI)
          → KnowledgeMdxRenderer (client, notice AI + providers)
              → children = <MDXRemote /> (RSC, rendu serveur)
```

Les children RSC passés à un Client Component restent rendus côté serveur : le HTML de l’article est donc présent dès la réponse.

## Contenu sur disque

```text
src/content/
├── fr/
│   ├── knowledge/     # arborescence de piliers (voir KNOWLEDGE-STRUCTURE.md)
│   └── projects/      # un fichier = un projet (slug.mdx)
└── en/
    ├── knowledge/
    └── projects/
```

Frontmatter typique projets : `id`, `title`, `description`, `image`, `date`, `category`, `tags`, `visible?`.

Repli de locale : si un fichier manque en `en`, lecture possible depuis la locale par défaut (`fr`) via les helpers `resolve*FilePath`.

## Knowledge

### Fichiers clés

| Fichier | Rôle |
|---------|------|
| [`src/app/[locale]/knowledge/[...slug]/page.tsx`](../src/app/[locale]/knowledge/[...slug]/page.tsx) | Page serveur + `generateStaticParams` |
| [`src/lib/knowledge/content.ts`](../src/lib/knowledge/content.ts) | `resolveKnowledgeFilePath`, `listKnowledgeSlugs` |
| [`src/components/features/knowledge/KnowledgeArticle.tsx`](../src/components/features/knowledge/KnowledgeArticle.tsx) | Lecture MDX + `MDXRemote` RSC |
| [`src/components/features/knowledge/KnowledgeMdxRenderer.tsx`](../src/components/features/knowledge/KnowledgeMdxRenderer.tsx) | Shell client (NotaBene AI, context, tooltips) |
| [`src/components/mdx/MDXComponents.tsx`](../src/components/mdx/MDXComponents.tsx) | Map de composants MDX (module **sans** `'use client'`) |

### `listKnowledgeSlugs`

Walk récursif de `src/content/{locale}/knowledge` :

| Fichier | Slug |
|---------|------|
| `foo.mdx` | `['foo']` |
| `foo/index.mdx` | `['foo']` |
| `a/b/c.mdx` | `['a','b','c']` |

Utilisé par `generateStaticParams` pour pré-générer toutes les routes `fr` / `en`.

### Pourquoi `next-mdx-remote/rsc`

Le rendu client `MDXRemote` + `serialize` provoquait des erreurs au prerender SSG (`useState` null / conflit React). Le chemin RSC :

- compile le MDX au build ;
- place le HTML dans la page statique ;
- accepte des composants client dans la map (visualiseurs, tooltips, etc.).

Pattern imposé : **ne pas** mettre `'use client'` sur le fichier qui exporte l’objet `MDXComponents` entier — sinon Next ne expose pas les clés du map au compilateur MDX RSC (« Expected component X to be defined »). Chaque composant interactif garde son propre `'use client'`.

### Config Next associée

Dans [`next.config.js`](../next.config.js) :

```js
transpilePackages: ['next-mdx-remote'],
```

Nécessaire sous Next 15 pour éviter l’erreur *« A React Element from an older version of React was rendered »* avec `next-mdx-remote/rsc`.

## Projects

### Fichiers clés

| Fichier | Rôle |
|---------|------|
| [`src/lib/projects/content.ts`](../src/lib/projects/content.ts) | `getProjects`, `getProject`, `listProjectFileNames`, `serializeProjectSource` |
| [`src/app/[locale]/projects/page.tsx`](../src/app/[locale]/projects/page.tsx) | Server page → props vers client |
| [`src/components/features/projects/ProjectsPageClient.tsx`](../src/components/features/projects/ProjectsPageClient.tsx) | Filtres / recherche / grille |
| [`src/app/[locale]/projects/[slug]/page.tsx`](../src/app/[locale]/projects/[slug]/page.tsx) | Détail SSG + MDX RSC |
| [`src/app/[locale]/page.tsx`](../src/app/[locale]/page.tsx) | Accueil : `getProjects(locale).slice(0, 3)` |
| [`src/components/sections/RecentProjects.tsx`](../src/components/sections/RecentProjects.tsx) | UI client, données en props |

### Helpers `lib/projects`

- `getProjects(locale)` — liste visible, triée par date, avec `link: /projects/{slug}`
- `getProject(locale, slug)` — `{ project, source }` où `source` est le corps MDX brut
- `serializeProjectSource` — uniquement pour l’API JSON legacy

Les pages n’appellent **plus** `fetch('/api/projects')`. Les routes API existent encore et délèguent à `lib` :

- [`src/app/api/projects/route.ts`](../src/app/api/projects/route.ts)
- [`src/app/api/projects/[slug]/route.ts`](../src/app/api/projects/[slug]/route.ts)

### Séparation server / client

```text
ProjectsPage (server)
  └─ ProjectsPageClient (client)     ← filtres, search
       └─ ProjectsGrid               ← pas de loading initial

ProjectPage (server)
  ├─ ProjectHero (client)
  └─ ProjectContent (client shell)
       └─ MDXRemote RSC (children)   ← HTML du corps
```

Hooks client-fetch **supprimés** : `useProjectsData`, `useProjectDetail`, `useRecentProjects`.

## Vérification manuelle

Après `npm run build` :

1. Les routes Knowledge / Projects apparaissent en **● (SSG)** dans le récap Next.
2. Dans le HTML généré (ou view-source en prod) :
   - `/fr/knowledge/...` contient le corps d’article, **pas** « Chargement du contenu… »
   - `/fr/projects` contient les titres / slugs des projets
   - `/fr` contient les projets récents sans spinner de chargement

Note : la chaîne `Chargement des projets récents...` peut encore apparaître dans le bundle de messages i18n embarqué ; ce n’est pas le UI de premier paint.

## Ce qui est hors scope (volontaire)

- Rewrite Accueil / À propos (positionnement)
- Section Research
- `sitemap.ts` / `generateMetadata` par article
- CMS / base de données

## Évolutions possibles

1. **Metadata** : `generateMetadata` sur Knowledge et Projects (title, description, Open Graph).
2. **Sitemap** : `app/sitemap.ts` à partir de `listKnowledgeSlugs` + `listProjectFileNames`.
3. **Research** : reprendre le même pipeline (MDX dans `src/content` + page serveur + RSC).
4. **API projects** : supprimer si aucun consommateur externe ne reste.
