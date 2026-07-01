export const knowledgeGlossaryEn = {
  bagging:
    'Bootstrap aggregating: train multiple models on bootstrap subsamples, then aggregate predictions to reduce variance.',
  bootstrap:
    'Sampling with replacement: each subsample has the same size as the original data, with possible duplicates.',
  'concept-drift':
    'The target–feature relationship changes over time; a trained model degrades because the data distribution shifts.',
  'non-iid':
    'Non-independent, non-identically distributed data; typical of time series or correlated observations.',
  oob: 'Out-of-bag: observations not in a tree’s bootstrap sample, used as implicit validation to estimate performance.',
  'random-subspace':
    'At each tree split, only a random subset of features is considered; decorrelates trees from one another.',
  overfitting:
    'The model memorizes training noise and generalizes poorly to new data.',
} as const;

export type KnowledgeGlossaryKeyEn = keyof typeof knowledgeGlossaryEn;
