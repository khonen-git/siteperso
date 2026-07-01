export const knowledgeGlossaryFr = {
  bagging:
    "Bootstrap aggregating : entraîner plusieurs modèles sur des sous-échantillons tirés avec remise, puis agréger leurs prédictions pour réduire la variance.",
  bootstrap:
    "Échantillonnage avec remise : chaque sous-échantillon a la même taille que les données d'origine, avec des doublons possibles.",
  'concept-drift':
    "Évolution de la relation entre variables et cible dans le temps ; un modèle entraîné devient moins performant car la distribution des données change.",
  'non-iid':
    "Données non indépendantes et non identiquement distribuées ; typique des séries temporelles ou des observations corrélées.",
  oob: "Out-of-bag : observations absentes du bootstrap d'un arbre, utilisées comme validation implicite pour estimer la performance.",
  'random-subspace':
    "À chaque division d'arbre, seul un sous-ensemble aléatoire de variables est candidat au split ; décorrèle les arbres entre eux.",
  overfitting:
    "Sur-apprentissage : le modèle mémorise le bruit d'entraînement et généralise mal sur de nouvelles données.",
} as const;

export type KnowledgeGlossaryKeyFr = keyof typeof knowledgeGlossaryFr;
