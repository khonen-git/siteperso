# Carnet de Développement

## Statut Global du Projet
- Date de début : 18/02/2025
- Statut actuel : En cours
- Sprint actuel : Configuration Initiale

## Légende
- ✅ Terminé
- 🔄 En cours
- ⏳ En attente
- ❌ Bloqué

## Sprint 1 : Configuration Initiale du Projet ✅
### Configuration de l'Environnement
- [✅] Mise en place Next.js avec TypeScript
- [✅] Installation des dépendances principales
  - [✅] Tailwind CSS
  - [✅] Shadcn/UI
  - [✅] Framer Motion
- [✅] Configuration environnement de test
  - [✅] Jest
  - [✅] React Testing Library
- [✅] Mise en place Docker
- [✅] Configuration ESLint et Prettier

## Sprint 2 : Architecture Core ✅
### Tests à Implémenter
- [✅] Tests du layout principal
- [✅] Tests de navigation
- [✅] Tests du thème
- [✅] Tests de responsive design

### Développement
- [✅] Layout principal
- [✅] Composant Header
- [✅] Composant Footer
- [✅] Système de thème
- [✅] Tests d'intégration

## Sprint 2.5 : Migration du Contenu Frontend ✅
### Organisation
- [✅] Création de la structure de dossiers pour le contenu migré
  - [✅] `/content/pages/` pour les pages statiques
  - [✅] `/content/projects/` pour les projets
  - [✅] `/content/knowledge/` pour la base de connaissances
  - [✅] `/content/tutorials/` pour les tutoriels

### Migration des Pages Principales
- [✅] Page d'accueil
  - [✅] Conversion du contenu en MDX
  - [✅] Adaptation du style avec Tailwind
  - [✅] Migration des composants spécifiques
- [ ✅] Page "À propos"
  - [ ✅] Conversion du contenu en MDX
  - [ ✅] Migration du CV interactif
  - [ ✅] Adaptation des sections compétences
- [ ✅] Page Contact
  - [ ✅] Migration du formulaire
  - [ ✅] Adaptation du style
- [ ✅] Page Portfolio
  - [ ✅] Conversion des projets en MDX
  - [ ✅] Migration de la grille de projets
  - [ ✅] Adaptation des filtres

### Tests de Migration
- [✅] Tests de rendu MDX
- [✅] Tests des composants migrés
- [✅] Tests d'intégration avec le nouveau layout
- [✅] Vérification de la compatibilité mobile

## Sprint 3 : Pages Principales ✅
### Tests à Implémenter
- [✅] Tests des composants de chaque page
- [✅] Tests de rendu
- [✅] Tests d'interaction utilisateur

### Développement
- [✅] Page d'accueil
  - [✅] Section héro
  - [✅] Dernières mises à jour
  - [✅] Projets récents
- [✅] Page "À propos"
  - [✅] Parcours
  - [✅] Compétences
  - [✅] CV interactif
- [✅] Page Contact
  - [✅] Formulaire (version statique)
  - [✅] Informations de contact
- [✅] Page Portfolio
  - [✅] Grille de projets
  - [✅] Filtres statiques
  - [✅] Détail des projets

## Sprint 4 : Templates et Structure de Contenu 🔄
### Tests à Implémenter
- [ ] Tests des composants de template
- [ ] Tests de validation des métadonnées
- [ ] Tests de rendu MDX
- [ ] Tests d'intégration avec les pages existantes

### Développement
- [ ] Template de Projets
  - [ ] Structure MDX de base
  - [ ] Métadonnées (technologies, date, statut)
  - [ ] Composants de présentation
    - [ ] En-tête du projet
    - [ ] Galerie de captures d'écran
    - [ ] Section technologies
    - [ ] Section défis/solutions
  - [ ] Styles et animations
  - [ ] Documentation d'utilisation

- [ ] Template de Connaissances
  - [ ] Structure MDX de base
  - [ ] Métadonnées (catégorie, tags, niveau)
  - [ ] Composants spécialisés
    - [ ] Bloc de code interactif
    - [ ] Bloc de ressources
    - [ ] Navigation dans le toctree
  - [ ] Styles thématiques par catégorie
  - [ ] Documentation d'utilisation

- [ ] Template d'Activité
  - [ ] Structure de données
  - [ ] Métadonnées (type, date, importance)
  - [ ] Composants de présentation
    - [ ] Carte d'activité
    - [ ] Timeline
  - [ ] Système de filtrage
  - [ ] Documentation d'utilisation

### Avantages de cette Approche
- Standardisation du contenu
- Maintenance simplifiée
- Cohérence visuelle
- Facilité d'ajout de nouveau contenu
- Base solide pour les fonctionnalités futures

## Sprint 5 : Système de Connaissances ⏳
### Tests à Implémenter
- [ ] Tests du toctree
- [ ] Tests de navigation hiérarchique
- [ ] Tests de rendu du contenu
- [ ] Tests de filtrage

### Développement
- [ ] Composant TocTree
- [ ] Navigation hiérarchique
- [ ] Template de connaissances
- [ ] Système de filtrage/recherche

## Sprint 6 : Fonctionnalités Avancées ⏳
### Tests à Implémenter
- [ ] Tests des animations
- [ ] Tests Pyodide
- [ ] Tests KaTeX
- [ ] Tests des thèmes dynamiques

### Développement
- [ ] Intégration Pyodide
- [ ] Intégration KaTeX
- [ ] Animations Framer Motion
- [ ] Thèmes dynamiques

## Sprint 7 : Pages Secondaires ⏳
### Tests à Implémenter
- [ ] Tests des composants spécifiques
- [ ] Tests de filtrage
- [ ] Tests d'affichage

### Développement
- [ ] Page Références
- [ ] Page Tutoriels
- [ ] Système de tags

## Sprint 8 : UI/UX Avancé ⏳
### Tests à Implémenter
- [ ] Tests des effets visuels
- [ ] Tests de performance
- [ ] Tests d'accessibilité

### Développement
- [ ] Effets visuels
- [ ] Optimisation animations
- [ ] Amélioration accessibilité
- [ ] Optimisation performances

## Sprint 9 : Déploiement et Optimisation ⏳
### Tests à Implémenter
- [ ] Tests de déploiement
- [ ] Tests de performance production
- [ ] Tests de sécurité

### Développement
- [ ] Configuration Vercel
- [ ] Configuration Digital Ocean
- [ ] Optimisation SEO
- [ ] Tests de charge

## Notes et Observations
- Maintenir une couverture de tests > 80%
- Documenter chaque fonctionnalité
- Faire des reviews de code régulières
- Mettre à jour ce document après chaque tâche complétée

### Gestion du Contenu Existant
- Créer un dossier `_references` pour stocker le contenu de l'ancien site
- Structure du dossier :
  ```
  _references/
    ├── content/          # Contenu réutilisable
    ├── assets/           # Médias réutilisables
    ├── structure.md      # Documentation de l'ancien site
    └── learnings.md      # Leçons apprises
  ```
- Règles d'utilisation :
  - Ne pas copier/coller de code de l'ancien site
  - Utiliser uniquement comme référence pour le contenu
  - Migrer progressivement le contenu pendant le développement
  - Documenter les améliorations par rapport à l'ancienne version

### Problèmes de Tests Identifiés
#### Tests du RootLayout
- [❌] Erreur de montage HTML dans les tests du RootLayout (conflit entre `<html>` et `<div>`)
- [❌] Problèmes de sélection d'éléments dans les tests
- [❌] Erreurs lors du nettoyage des tests
- [⚠️] Avertissement sur l'utilisation d'une ancienne transformation JSX

Ces problèmes affectent principalement les tests du composant racine (`RootLayout`) mais n'empêchent pas :
- Le développement des autres composants
- Les tests des composants individuels
- Le fonctionnement de l'application en production

Impact sur la couverture de tests : Moyen
Priorité de résolution : Moyenne (à traiter dans les prochains sprints)

## Métriques
- Couverture de tests : 0%
- Nombre de sprints terminés : 0/9
- Nombre de tâches terminées : 0/[total]

## Journal des Modifications
- [18/02/2025] : Création du document
- [18/02/2025] : Installation de Next.js avec TypeScript et Tailwind CSS complétée
- [18/02/2025] : Configuration de l'environnement de test (Jest + RTL) complétée
- [18/02/2025] : Installation de Framer Motion complétée
- [18/02/2025] : Configuration de Git et déploiement sur GitHub (https://github.com/khonen-git/reworksiteperso)
- [19/02/2025] : Installation de Shadcn/UI complétée
- [19/02/2025] : Configuration ESLint et Prettier terminée avec support TypeScript et règles d'accessibilité
- [19/02/2025] : Configuration Docker terminée avec environnements de développement et production
- [19/02/2025] : Sprint 1 terminé, début du Sprint 2
- [19/02/2025] : Mise en place du layout principal avec Header et Footer
- [19/02/2025] : Implémentation du système de thème avec next-themes
- [19/02/2025] : Ajout des tests pour les composants principaux
- [19/02/2025] : Identification des problèmes de tests du RootLayout
- [19/02/2025] : Révision de l'architecture backend vers une approche plus légère
- [19/02/2025] : Début de la migration du contenu frontend
- [19/02/2025] : Création de la structure de dossiers pour le contenu
- [19/02/2025] : Migration de la page d'accueil vers MDX
- [19/02/2025] : Création des composants de section (HeroSection, LatestUpdates, RecentProjects)
- [19/02/2025] : Ajout des composants UI (Card, Badge)
- [19/02/2025] : Installation et configuration de Framer Motion 