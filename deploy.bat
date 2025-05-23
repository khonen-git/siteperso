@echo off
echo Déploiement du site web sur Vercel...

REM Vérifier que git est initialisé
if not exist .git (
  echo Initialisation du dépôt Git...
  git init
  git add .
  git commit -m "Initial commit"
)

REM Déployer sur Vercel
echo Déploiement sur Vercel...
vercel --prod

echo Déploiement terminé ! 