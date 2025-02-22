# Journal des Bugs

## Actifs

### THEME-001: Transition non fluide du thème sur le fond décoratif de la Hero Section
- **Statut**: 🟡 À corriger
- **Date de découverte**: 19/02/2024
- **Composant**: `src/components/sections/HeroSection.tsx`
- **Type**: UX/Visuel
- **Priorité**: Moyenne
- **Impact**: Expérience utilisateur lors du changement de thème

#### Description
La transition du thème (clair/sombre) n'est pas fluide sur le fond décoratif de la Hero Section, contrairement aux autres sections qui présentent une transition harmonieuse.

#### Reproduction
1. Accéder à la page d'accueil
2. Activer/désactiver le thème sombre
3. Observer la transition non fluide du fond décoratif dans la Hero Section

#### Comportement attendu
- Transition fluide et uniforme de tous les éléments du fond, similaire aux autres sections
- Durée de transition de 2000ms

#### Comportement actuel
- Transition brusque ou saccadée des éléments du fond
- Certaines couches ne transitionnent pas correctement

#### Causes potentielles
- Structure complexe des dégradés et des couches superposées
- Interaction entre les variables CSS et les transitions
- Comportement des transitions sur les dégradés multiples
- Ordre et superposition des couches (`z-index`)

#### Solutions possibles
1. Simplifier la structure des couches tout en préservant l'effet visuel
2. Revoir la gestion des transitions CSS
3. Utiliser Framer Motion pour les transitions
4. Expérimenter avec différentes approches de définition des couleurs et dégradés

#### Notes techniques
```tsx
// Structure actuelle
<section className="...transition-all duration-[2000ms]">
  <div className="absolute inset-0 -z-10">
    <div className="bg-grid-gray-900/5" />
    <div className="bg-gradient-to-b from-background/80..." />
    <motion.div className="bg-primary/20 blur-3xl" />
  </div>
</section>
```

#### Références
- [Documentation Next-themes](https://github.com/pacocoursey/next-themes)
- [Tailwind CSS Transitions](https://tailwindcss.com/docs/transition-property)
- [Framer Motion](https://www.framer.com/motion/)

---

## Résolus

_(Liste des bugs résolus à ajouter ici)_

---

## Notes sur le processus de suivi des bugs

### Convention de nommage
- `THEME-XXX`: Problèmes liés au système de thème
- `UI-XXX`: Problèmes d'interface utilisateur généraux
- `PERF-XXX`: Problèmes de performance
- `SEC-XXX`: Problèmes de sécurité

### Priorités
- 🔴 Haute: Impact critique sur l'utilisation
- 🟡 Moyenne: Impact modéré, nécessite attention
- 🟢 Basse: Impact mineur, peut être traité plus tard

### Statuts
- 🔴 Critique
- 🟡 À corriger
- 🟢 Résolu
- ⚪ En attente
- 🔵 En cours 