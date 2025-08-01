/**
 * Calcule la distance de Levenshtein entre deux chaînes
 * @param a Première chaîne
 * @param b Deuxième chaîne
 * @returns Distance de Levenshtein
 */
export function levenshteinDistance(a: string, b: string): number {
  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));

  // Initialisation de la première ligne et colonne
  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

  // Remplissage de la matrice
  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + substitutionCost // substitution
      );
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Calcule la similarité entre deux chaînes (0 à 1)
 * @param a Première chaîne
 * @param b Deuxième chaîne
 * @returns Score de similarité (0 = différent, 1 = identique)
 */
export function stringSimilarity(a: string, b: string): number {
  if (a.length === 0 && b.length === 0) return 1;
  if (a.length === 0 || b.length === 0) return 0;
  
  const distance = levenshteinDistance(a.toLowerCase(), b.toLowerCase());
  const maxLength = Math.max(a.length, b.length);
  return 1 - distance / maxLength;
}

/**
 * Configuration pour la recherche floue
 */
export interface FuzzySearchOptions {
  threshold?: number; // Seuil de similarité (0 à 1)
  keys?: string[]; // Clés à rechercher dans les objets
}

/**
 * Effectue une recherche floue dans un tableau d'objets
 * @param items Tableau d'objets à rechercher
 * @param searchQuery Terme de recherche
 * @param options Options de recherche
 * @returns Objets triés par pertinence
 */
interface SearchResult<T> {
  item: T;
  similarity: number;
}

export function fuzzySearch<T extends Record<string, any>>(
  items: T[],
  searchQuery: string,
  options: FuzzySearchOptions = {}
): SearchResult<T>[] {
  const {
    threshold = 0.4, // Seuil par défaut
    keys = Object.keys(items[0] || {}) // Toutes les clés par défaut
  } = options;

  if (!searchQuery.trim()) return items;

  const results = items.map(item => {
    let maxSimilarity = 0;

    // Pour chaque clé spécifiée, on cherche la meilleure correspondance
    keys.forEach(key => {
      const value = item[key];
      if (typeof value === 'string') {
        // Diviser la valeur en mots pour une recherche plus précise
        const words = value.split(/\s+/);
        words.forEach(word => {
          const similarity = stringSimilarity(searchQuery, word);
          maxSimilarity = Math.max(maxSimilarity, similarity);
        });
      }
    });

    return {
      item,
      similarity: maxSimilarity
    };
  });

  // Filtrer et trier les résultats
  return results
    .filter(result => result.similarity >= threshold)
    .sort((a, b) => b.similarity - a.similarity);
}