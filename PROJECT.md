## Plan de simplification — features/projects

Ce document décrit les simplifications à appliquer pour réduire l’overengineering, centraliser la logique et faciliter la maintenance autour des projets.

### Principes directeurs
- **Une source de vérité**: types et composants partagés centralisés (éviter les doublons `detail`/`details`/`project`).
- **Sous-composants uniquement si valeur ajoutée**: réutilisation cross-features, complexité, ou tests dédiés. Éviter les wrappers qui ne font que relayer des `className`.
- **Styles prévisibles**: privilégier Tailwind inline ou des variants `cva` co-localisés; éviter les hooks qui ne retournent que des classes.

### Changements déjà appliqués
- **`ProjectCard` consolidé**: 
  - Intégration inline de l’image (`next/image`), de l’entête (titre + icône), et du rendu des `tags` (via `ProjectTag`).
  - Suppression des sous-composants: `ImageContainer`, `TagList`, `CardHeader` et du fichier `styles.ts`.
  - Suppression des tests associés à ces sous-composants.
  - Titre passé en `h2` pour cohérence sémantique.

- **Hooks/Tests**:
  - `useProjectCardAnimation` supprimé.
  - Tests associés mis à jour (suppression de la suite dédiée à `useProjectCardAnimation`).

- **Dédoublonnage `details/*`**:
  - Composants doublons `details/ProjectContent` et `details/ProjectHero` supprimés (et leurs tests).

### Changements recommandés

#### 1) Dédoublonnage des détails
- Conserver les composants globaux dans `src/components/project/*` (ex: `ProjectHero`, `ProjectContent`).
- Supprimer les doublons dans `src/components/features/projects/details/*` si non utilisés.
- Vérifier qu’aucun import actif ne dépend de `details/*` avant suppression.

#### 2) Hooks et états
- Supprimer `src/components/features/projects/hooks/useProjectCardAnimation.ts` et son test (le hook ne fournit que des `className` désormais inline).
- Factoriser les états génériques:
  - Centraliser dans `components/ui/feedback/{LoadingState,EmptyState}` et réutiliser partout.

#### 3) Types
- Standardiser sur `src/types/project.ts` pour `Project` et `ProjectDetail`.
- Nettoyer `src/components/features/projects/types.ts`:
  - Supprimer les interfaces non utilisées ou redondantes: **`ProjectTag`**, **`ProjectImage`**, **`ProjectImageContainerProps`**, **`ProjectTagProps`**.
  - Pour `ProjectCard`, utiliser directement `Project` ou `Pick<Project, 'title' | 'description' | 'category' | 'tags' | 'image' | 'link'>`.

#### 4) Données et API
- Construire `link` côté API (`/api/projects`) et renvoyer des objets prêts à l’emploi. (fait)
- Typage explicite du retour (`Project[]`) et validation de schéma côté API (ex: zod) pour fiabiliser.

#### 5) Filtres
- Conserver les atomes UI (sélecteurs) mais éviter les wrappers ultra-fins.
- Centraliser la logique dans `useProjectsFilter` et un composant container `ProjectFilter` qui compose les atomes.

#### 6) Grille
- `ProjectsGrid` → `ProjectCard` : aligner explicitement le type attendu par la carte (utiliser `Project` ou un `Pick` cohérent) pour éviter les frictions.

#### 7) Styles
- Poursuivre l’approche Tailwind inline pour les cartes et éviter les `styles.ts` dédiés quand non nécessaires.
- Si besoin de variantes, utiliser `cva` co-localisé dans le composant, pas via un hook de classes.

### Plan de migration (en 3 étapes)
1) Nettoyage et déduplication
   - Supprimer `details/*` s’ils ne sont pas importés.
   - Supprimer `useProjectCardAnimation` + tests.
   - Nettoyer `features/projects/types.ts` (interfaces non utilisées).

2) Factorisation des états et harmonisation styles
   - Déplacer/centraliser `EmptyState`, `LoadingState`, `ErrorState` vers `ui/feedback`.
   - Harmoniser les paddings et classes des headers via Tailwind (cohérence avec `components/ui/card`).

3) Données et filtres
   - Choisir Option A (API) ou B (util partagé) pour `link`.
   - Simplifier/clarifier `useProjectsFilter` et limiter les wrappers UI.

### Impact sur les tests
- Mettre à jour/supprimer les tests pointant vers des composants supprimés (`details/*`, `useProjectCardAnimation`, sous-composants de `ProjectCard`).
- Préférer des sélecteurs robustes (role/text) plutôt que de dépendre de la structure DOM fine.

### Checklist par module
- `features/projects/cards/ProjectCard`
  - [x] Consolidation effectuée, sous-composants supprimés
  - [ ] Vérifier que les tests d’intégration de grid passent

- `features/projects/details/*`
  - [x] Supprimer si non utilisé, conserver `components/project/*`

- `features/projects/hooks`
  - [x] Supprimer `useProjectCardAnimation` + tests
  - [x] Conserver `useProjectAnimation` (Framer Motion)

- `features/projects/types.ts`
  - [x] Supprimer `ProjectTag`, `ProjectImage`, `ProjectImageContainerProps`, `ProjectTagProps`
  - [x] Utiliser `Project` (ou un `Pick`) pour la carte

- États (`grid`, `detail/states`)
  - [x] Centraliser dans `components/ui/feedback` et réutiliser
  - [x] Suppression des anciens doublons (`grid/*`, `detail/states/*`)

- Données
  - [x] Construction de `link` déplacée côté API

### Definition of Done
- Duplications supprimées, imports cohérents.
- Types alignés sur `src/types/project.ts`.
- États et styles harmonisés et centralisés.
- Tests verts après mise à jour des chemins et sélecteurs.


