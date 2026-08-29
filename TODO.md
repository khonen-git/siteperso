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
- Composant technologies — remplacé par liste stack CV dans `website-creation.mdx`

## Vérification

- title et h1 markdown : mettre deux différents ? ask GPT ou cursor
- utilité de description dans les mdx ?

# References

## Content

- Liste dans `src/content/{fr,en}/references.json` (34 entrées)
- Enrichir / retirer au besoin

## Features

- i18n UI via `messages/*/references.json`
- Filtrage, recherche floue, tri — OK

# Contact

- Mailto + GitHub + LinkedIn — pas de formulaire.

# Code du site

Ne pas hésiter à utiliser l'IA pour faire toutes les vérifications sur utilité de chaque élément de code voire de faire un refactoring complet du code. Ne pas hésiter aussi à enlever des features peu utiles ou ambiguës quitte à les remettre plus tard. En gros faire un gros nettoyage du code et garder l'essentiel.

## Vérification

- utilité de store, distributionStore.ts ?
- utilité de data/projectsList.ts ?
- vérifier les hooks
- vérifier les types
- vérifier les composants non utilisés dans components
- vérifier les fichiers dans config
- vérifier les fichiers dans app
- vérifier si les tests sont au bon endroit, utiles, bien structurés
