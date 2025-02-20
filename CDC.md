# Cahier des charges

## Contexte

Je suis un data analyst qui souhaite développer une site web professionnel personnel pour présenter mes compétences et mes projets.
J'ai déjà commencé à créer un site web mais j'aimerais revoir la structure et le design que ce soit du coté développement code que du côté du design du site affiché.
Ce site servira à la fois de vitrine pour mes compétences et de plateforme pour mes projets mais aussi de me permettre de garder un ensemble de mon savoir acquis et de pouvoir le consulter à la demande.

## Objectifs

- Créer une plateforme professionnelle qui me permet de présenter mes compétences et mes projets.
- Différencier les différentes sections de mon site web.
- Permettre à un utilisateur de me contacter facilement.
- Avoir un design orienté tech et data qui pourra impressionner les recruteurs qui ne sont pas forcément des experts techniques.
- Pouvoir accéder à mes savoirs acquis et les consulter à la demande.
- Avoir un développement code et une organisation du projet fullstack dans une optique de scalabilité et de maintenance.

## Fonctionnalités

- Avoir une page d'accueil qui présente les dernières informations de mon site.
- Avoir une page "A propos" qui présente mon parcours, mes compétences, mon cv et mes ambitions.
- Avoir une page "Contact" qui me permet de contacter un recruteur.
- Avoir une page "Connaissances" qui me permet de présenter mes savoirs acquis sous la forme d'un toctree (table of content tree) qui me permettra de naviguer facilement dans divers thèmes de mes connaissances.
- Avoir une page "Portfolio" qui me permet de présenter mes projets.
- Avoir une page "Références" qui me permet de présenter mes références (liens web, etc)
- Avoir une page "Tutoriels" qui me permet de présenter mes tutoriels.
- Pouvoir switch du mode clair au mode sombre et inversement.
- Ajouter des features originales comme des animations, des effets de texte, etc.
- Ajouter des fonds thématiques quand je navigue dans les différents thèmes de mes connaissances. (math, python, data, etc).
- Ajouter des design UX/UI originales.
- Pouvoir exécuter des examples de code pouvoir voir le résultat en temps réel.

## Structure du site

### Core

- Avoir un header menu qui me permet de naviguer entre les différentes pages de mon site avec un design orienté tech et data original.
- Avoir un footer qui donne accès à mes réseaux (linkedin, github, etc) et me permet de me contacter, ainsi que les mentions légales, conditions d'utilisation générale (CGU), etc.

### Accueil

- Présenter les dernières informations et mise à jour de mon site.
- Présenter mes derniers projets.

### A propos

- Avoir une page "A propos" qui présente mon parcours, mes compétences, mon cv et mes ambitions.

### Contact

- Avoir une page "Contact" qui me permet de me contacter.

### Connaissances

- Avoir une page "Connaissances" qui me permet de présenter mes savoirs acquis
- Avoir un toctree (table of content tree) sur le côté gauche de la page qui me permettra de naviguer facilement dans divers thèmes de mes connaissances.
- Avoir une template de connaissances qui me permettra de présenter mes connaissances sous forme de synthèse concise, donner accès à des ressources complémentaires, mettre en lien avec mes projets, etc.

### Portfolio

- Avoir une page "Portfolio" qui me permet de présenter mes projets.

### Références

- Avoir une page "Références" qui me permet d'énumérer mes références (liens web, etc)
- Ajouter des filtres sur les références (thèmes, types, formats, etc) pour faciliter la navigation

### Tutoriels

- Avoir une page "Tutoriels" qui me permet de présenter mes tutoriels.

## Technologies

- Utiliser Next.js pour le développement du site
- Utiliser Tailwind CSS pour le design du site
- Utiliser TypeScript pour le développement du site
- Utiliser Shadcn/UI pour les composants du site
- Utiliser React pour le développement du site
- Utiliser Katex pour les formules mathématiques
- Utiliser Framer Motion pour les animations
- Utiliser MDX pour le contenu statique (blog, documentation, tutoriels)
- Utiliser Pyodide pour exécuter du code Python en JavaScript
- Utiliser Docker pour le développement local
- Utiliser Vercel pour le déploiement et l'hébergement
- Utiliser Cloudflare pour le CDN et la sécurité
- Utiliser les API Routes de Next.js pour les fonctionnalités dynamiques légères
- Utiliser Algolia pour la recherche avancée
- Utiliser GitHub pour le stockage et la gestion du contenu

## Infrastructure

### Statique
- Pages principales (Accueil, À propos, Portfolio)
- Documentation et tutoriels en MDX
- Blog en MDX
- Système de connaissances basé sur MDX

### Dynamique (API Routes Next.js)
- Formulaire de contact
- Analytics simples
- Recherche basique
- Gestion des métadonnées

### Services Externes
- Algolia : Recherche avancée
- Cloudflare : CDN et protection
- GitHub : Stockage du contenu
- Vercel : Hébergement et déploiement

## UI/UX

- Ajouter des thèmes de couleur dynamiques en fonction des pages (ex. mode Data Science, mode Machine Learning, etc).
- Ajouter un effet "glassmorphism" ou "neumorphism" pour un design plus moderne.
- Intègrer des animations subtiles (scroll reveal, transitions fluides) avec Framer Motion.
- Ajouter des effets de texte et d'image pour les sections importantes.