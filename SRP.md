# Réorganisation des Composants selon le Principe de Responsabilité Unique

## État Actuel et Problèmes

### Structure Actuelle
```
components/
├── knowledge/     # Mélange de composants avec différentes responsabilités
├── ui/           # Composants UI sans organisation claire
├── project/      # Fichiers plats sans séparation des responsabilités
├── mdx/          # Composants MDX à intégrer ailleurs
├── layouts/      # Duplication avec layout/
├── sections/     # À évaluer pour réorganisation
├── theme/        # À évaluer pour intégration dans ui/
└── layout/       # À fusionner avec layouts/
```

### Problèmes Identifiés
1. Manque de séparation des responsabilités
2. Duplication de dossiers (layout/layouts)
3. Organisation plate des fichiers
4. Manque de typage strict
5. Tests difficiles à organiser
6. Documentation dispersée

## Plan de Réorganisation

### Phase 1 : Knowledge
- [x] Réorganiser visualization/
  - [x] DistributionVisualizer
  - [x] DistributionPlot
- [x] Réorganiser math/
  - [x] MathRenderer
    - [x] Composant avec Inline/Block
    - [x] Types
    - [x] Tests
  - [x] CodeBlock
    - [x] Composant
    - [x] Types
    - [x] Tests
- [x] Réorganiser navigation/
  - [x] Types communs
  - [x] TreeView
    - [x] Composant
    - [x] Tests
  - [x] Sidebar
    - [x] Composant
    - [x] Intégration avec TreeView
  - [x] TableOfContents
    - [x] Composant
    - [x] Tests
    - [x] Intersection Observer
  - [x] Section
    - [x] Composant
    - [x] Intégration des icônes

### Phase 2 : Projects
- [x] Créer structure de base
  - [x] Types communs
  - [x] Organisation des dossiers
- [x] Composants de filtrage
  - [x] ProjectFilter
  - [x] ProjectTags
- [x] Composants de présentation
  - [x] ProjectCard
  - [x] ProjectHero
  - [x] ProjectContent
- [x] Ajouter tests
  - [x] Tests de filtrage
    - [x] ProjectFilter
    - [x] ProjectTags
  - [x] Tests de rendu
    - [x] ProjectCard
    - [x] ProjectHero
    - [x] ProjectContent
  - [x] Tests d'interaction
    - [x] Clics sur les tags
    - [x] Filtres et recherche
    - [x] Navigation

### Phase 3 : UI
- [x] Structure de base
  - [x] Organisation des dossiers
  - [x] Types partagés
- [x] Composants inputs/
  - [x] Types
  - [x] Button
  - [x] Input
- [x] Composants data-display/
  - [x] Types
  - [x] Badge
  - [x] Card
- [x] Composants navigation/
  - [x] Types communs
  - [x] DropdownMenu
    - [x] Composant de base
    - [x] Sous-composants
    - [x] Animations
  - [x] ScrollArea
    - [x] Composant principal
    - [x] Barres de défilement
  - [x] NavigationMenu
    - [x] Structure de base
    - [x] Items et triggers
    - [x] Viewport et contenu
- [x] Composants feedback/
  - [x] Types communs
  - [x] Progress
    - [x] Composant de base
    - [x] Animation fluide
  - [x] Toast
    - [x] Provider
    - [x] Notifications
    - [x] Actions
  - [x] LoadingSpinner
    - [x] Animation
    - [x] Tailles variables
  - [x] Alert
    - [x] Variantes
    - [x] Icônes
    - [x] Accessibilité
  - [ ] navigation/
  - [ ] feedback/
- [x] Intégration du système de thème
  - [x] Types communs
  - [x] Provider
    - [x] Configuration par défaut
    - [x] Support système
  - [x] Toggle
    - [x] Animation
    - [x] Accessibilité
  - [x] Hooks personnalisés
    - [x] Détection du thème système
    - [x] Gestion des préférences

- [x] Migration des composants existants
  - [x] Identification des composants
    - [x] Analyse de la structure actuelle
    - [x] Plan de migration détaillé
  - [x] Migration initiale
    - [x] Icons → ui/icons
    - [x] Sections → features/sections
  - [x] Migration des layouts
    - [x] Types communs
    - [x] RootLayout
    - [x] Header et Footer
    - [x] KnowledgeLayout
  - [x] Migration Knowledge
    - [x] Types communs
      - [x] Types de visualisation
      - [x] Types de navigation
      - [x] Types mathématiques
    - [x] Visualisation
      - [x] DistributionVisualizer
      - [x] DistributionPlot
      - [x] CurveCalculator
    - [x] Composants Math
      - [x] MathBlock/Inline
      - [x] CodeBlock
    - [x] Navigation
      - [x] TableOfContents
      - [x] KnowledgeSidebar
  - [x] Migration Project
    - [x] Types communs
      - [x] Types de carte
      - [x] Types de détail
      - [x] Types de filtrage
    - [x] Composants de carte
      - [x] ProjectCard
    - [x] Composants de détail
      - [x] ProjectHero
      - [x] ProjectContent
    - [x] Composants de feedback
      - [x] NotFoundProject
  - [x] Migration MDX
    - [x] Types communs
      - [x] Types de base
      - [x] Types de composants
    - [x] Composants de base
      - [x] MdxCard
      - [x] MdxHeading
      - [x] MdxCode
    - [x] Composants enrichis
      - [x] Éléments de texte
      - [x] Listes et tableaux
      - [x] Liens et images
    - [x] Intégration
      - [x] Composants mathématiques
      - [x] Visualisations
  - [x] Tests et validation
    - [x] Configuration des tests
      - [x] Utilitaires de test
      - [x] Mocks communs
    - [x] Tests unitaires
      - [x] Composants UI
      - [x] Composants Knowledge
      - [x] Composants Project
      - [x] Composants MDX
    - [x] Tests d'intégration
      - [x] Navigation
      - [x] Rendu MDX
      - [x] Visualisations
    - [x] Validation visuelle
      - [x] Styles et thèmes
      - [x] Responsive design
      - [x] Accessibilité

### Phase 4 : Layout
- [ ] Fusionner layout/ et layouts/
- [ ] Créer structure root/header/footer
- [ ] Migrer les composants

## Nouvelle Structure Cible

```
components/
├── features/           # Fonctionnalités spécifiques
│   ├── knowledge/
│   └── projects/
├── ui/                # Composants UI réutilisables
│   ├── inputs/
│   ├── data-display/
│   ├── navigation/
│   └── feedback/
├── layout/            # Composants de mise en page
│   ├── root/
│   ├── header/
│   └── footer/
└── common/           # Composants partagés
    ├── markdown/
    └── sections/
```

## Standards de Composants

Chaque composant doit suivre cette structure :
```
ComponentName/
├── index.tsx         # Point d'entrée
├── types.ts          # Types et interfaces
├── styles.ts         # Styles (si nécessaire)
├── utils.ts          # Utilitaires (si nécessaire)
└── __tests__/        # Tests
```

## Étapes Suivantes

1. Continuer la réorganisation de Knowledge
   - Créer MathRenderer/
   - Migrer CodeBlock
   - Réorganiser la navigation

2. Commencer Projects
   - Définir les types de base
   - Créer la structure de dossiers
   - Migrer les composants existants

3. Réorganiser UI
   - Catégoriser les composants
   - Créer la nouvelle structure
   - Migrer progressivement

4. Finaliser Layout
   - Fusionner les dossiers
   - Réorganiser selon la nouvelle structure

## Notes
- Chaque étape doit être testée avant de passer à la suivante
- Maintenir la rétrocompatibilité pendant la migration
- Mettre à jour la documentation au fur et à mesure