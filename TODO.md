# Page principale 

# Projets

## Content

- OC2
- OC3
- OC4
- OC5
- OC6
- OC7
- OC8
- OC9
- OC10
- Mettre des images thématiques pour les projets OC

## Features

- Ajout d'étoiles pour l'inmportance des projet : or, argent, bronze ou nombres d'étoiles (3 à 5 rang + un rang nulle)
- Ajout d'un composant pour les références

## Rework

- Composant technologies
- Composant images
- Mettre un <ul>/<li> pour lister les objectifs dans les mdx ou autre ?
- TechnologiesSection inutile ? préf suppr et voir plus tard

## Vérification

- title et h1 markdown : mettre deux différents ? ask GPT ou cursor
- utilité de description dans les mdx ?

# Activity 

La partie activity servira d'historique de patch ou maj pour les changements de site. Chaque note doit être synthétique (énumération des modifications) et regrouper un maximum d'éléments.

## Content

- Mettre le lancement du site : déploiement
- Mettre l'activité de la publication des principaux projets OC

## Features

- Pouvoir accéder aux détails d'un élément activity similaire à projects
- Pouvoir filtrer et trier les éléments de activity
- Déterminer les catégories d'activité si nécessaire ou tags
- Animation onHover

# References

## Content

- Rajouter une liste importante de références

# Code du site

Ne pas hésiter à utiliser l'IA pour faire toutes les vérifications sur utilité de chaque élément de code voire de faire un refactoring complet du code (qu'on pourra ajouter dans activités). Ne pas hésiter aussi à enlever des features peu utiles ou ambigu quitte à les remettre plus tard. En gros faire un gros nettoyage du code et garder l'essentiel.

## Vérification

- utilité de store, distributionStore.ts ?
- utilité de data/projectsList.ts ?
- vérifier les hooks
- vérifier les types
- vérifier les composants non utilisés dans components
- vérifier les fichiers dans config
- vérifier les fichiers dans app
- vérifier si les tests sont au bon endroit, utiles, bien structurés