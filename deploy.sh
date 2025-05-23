#!/bin/bash

# Vérifier que git est initialisé
if [ ! -d .git ]; then
  echo "Initialisation du dépôt Git..."
  git init
  git add .
  git commit -m "Initial commit"
fi

# Vérifier que l'utilisateur est connecté à Vercel
echo "Vérification de la connexion à Vercel..."
if ! command -v vercel &> /dev/null
then
    echo "Vercel CLI n'est pas installé. Installation en cours..."
    npm install -g vercel
fi

# Déployer sur Vercel
echo "Déploiement sur Vercel..."
vercel --prod

echo "Déploiement terminé !" 