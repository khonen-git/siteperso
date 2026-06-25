'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fuzzySearch } from '@/lib/search';

// Définition des catégories
const categories = {
  'Développement': 'Outils et ressources de développement',
  'Data Science': 'Analyse de données et machine learning',
  'Mathématiques': 'Concepts et outils mathématiques',
  'Finance': 'Analyse financière et trading',
  'Documentation': 'Documentation technique et tutoriels',
  'Outils': 'Outils généraux et utilitaires',
};

interface Reference {
  id: number;
  name: string;
  description: string;
  link?: string;
  category: string;
  tags: string[];
}

// Exemple de données
const references: Reference[] = [
  {
    id: 1,
    name: 'asyncio',
    description: 'Bibliothèque pour gérer des opérations asynchrones en Python',
    link: 'https://docs.python.org/3/library/asyncio.html',
    category: 'Développement',
    tags: ['python', 'async', 'concurrence'],
  },
  {
    id: 2,
    name: 'pandas',
    description: 'Bibliothèque Python pour la manipulation et l\'analyse de données',
    link: 'https://pandas.pydata.org/docs/',
    category: 'Data Science',
    tags: ['python', 'data', 'analyse'],
  },
  {
    id: 3,
    name: 'scikit-learn',
    description: 'Bibliothèque de machine learning en Python',
    link: 'https://scikit-learn.org/stable/',
    category: 'Data Science',
    tags: ['python', 'ml', 'data'],
  },
  {
    id: 4,
    name: 'Tr8dr',
    description: 'Blog sur algorithmes, modèles et marchés — HFT, crypto, machine learning appliqué à la finance',
    link: 'https://tr8dr.github.io/',
    category: 'Finance',
    tags: ['quant', 'finance', 'trading', 'blog', 'ml'],
  },
  {
    id: 5,
    name: 'Reasonable Deviations',
    description: 'Site de Robert Andrew Martin, quant trader chez DE Shaw',
    link: 'https://reasonabledeviations.com/',
    category: 'Finance',
    tags: ['quant', 'finance', 'blog'],
  },
  {
    id: 6,
    name: 'Quant Guild',
    description: 'Site de Quant Guild, pour maitriser la finance quantitative',
    link: 'https://quantguild.com/',
    category: 'Finance',
    tags: ['quant', 'finance', 'trading'],
  },
  {
    id: 7,
    name: 'FrenchQuant',
    description: 'Site de FrenchQuant, il propose des outils de R&D en finance quantitative',
    link: 'https://frenchquant.com/',
    category: 'Finance',
    tags: ['quant', 'finance', 'trading', 'blog'],
  },
  {
    id: 8,
    name: 'QuantPad',
    description: 'SIte de DeltaTrend Trading, IDE IA pour le trading quantitatif — données de marché intégrées, backtests et agent de recherche',
    link: 'https://quantpad.ai/',
    category: 'Finance',
    tags: ['quant', 'finance', 'trading'],
  },
  {
    id: 9,
    name: 'getmonero.org',
    description: 'Site officiel du projet Monero',
    link: 'https://www.getmonero.org/',
    category: 'Finance',
    tags: ['crypto', 'finance'],
  },
  {
    id: 10,
    name: 'neurotrader (YouTube)',
    description: 'Chaîne sur le trading algorithmique data-driven — stratégies, indicateurs et code Python open source',
    link: 'https://www.youtube.com/@neurotrader888',
    category: 'Finance',
    tags: ['quant', 'finance', 'trading', 'youtube', 'python'],
  },
  {
    id: 11,
    name: 'Quant Guild (YouTube)',
    description: 'Cours open source en finance quantitative — maths, probabilités, pricing et coding (Roman Paolucci)',
    link: 'https://www.youtube.com/@QuantGuild',
    category: 'Finance',
    tags: ['quant', 'finance', 'youtube'],
  },
  {
    id: 12,
    name: 'DeltaTrend Trading (YouTube)',
    description: 'Créateur de quantpad.ai - Trading quantitatif, prop firms et simulations Monte Carlo',
    link: 'https://www.youtube.com/@deltatrendtrading',
    category: 'Finance',
    tags: ['quant', 'finance', 'trading', 'youtube'],
  },
  {
    id: 13,
    name: 'FrenchQuant (YouTube)',
    description: 'Finance quantitative en français — microstructure, surfaces de volatilité, order flow et backtesting',
    link: 'https://www.youtube.com/@FrenchQuant-jz5vf',
    category: 'Finance',
    tags: ['quant', 'finance', 'trading', 'youtube'],
  },
  {
    id: 14,
    name: 'The Tactical Brief (YouTube)',
    description: 'Finance quantitative - Excellente vidéo pour comprendre et interpréter l\'entropie',
    link: 'https://www.youtube.com/@thetacticalbrief9952',
    category: 'Finance',
    tags: ['finance', 'trading', 'youtube'],
  },
];

// Thèmes pour les tags
const themes = {
  python: 'bg-blue-500/10 text-blue-500 dark:bg-blue-400/10 dark:text-blue-400',
  data: 'bg-green-500/10 text-green-500 dark:bg-green-400/10 dark:text-green-400',
  ml: 'bg-purple-500/10 text-purple-500 dark:bg-purple-400/10 dark:text-purple-400',
  async: 'bg-yellow-500/10 text-yellow-500 dark:bg-yellow-400/10 dark:text-yellow-400',
  concurrence: 'bg-orange-500/10 text-orange-500 dark:bg-orange-400/10 dark:text-orange-400',
  analyse: 'bg-cyan-500/10 text-cyan-500 dark:bg-cyan-400/10 dark:text-cyan-400',
  quant: 'bg-indigo-500/10 text-indigo-500 dark:bg-indigo-400/10 dark:text-indigo-400',
  finance: 'bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/10 dark:text-emerald-400',
  trading: 'bg-rose-500/10 text-rose-500 dark:bg-rose-400/10 dark:text-rose-400',
  blog: 'bg-amber-500/10 text-amber-500 dark:bg-amber-400/10 dark:text-amber-400',
  youtube: 'bg-red-500/10 text-red-500 dark:bg-red-400/10 dark:text-red-400',
  crypto: 'bg-slate-500/10 text-slate-500 dark:bg-slate-400/10 dark:text-slate-400',
};

export default function ReferencesPage(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [sortBy, setSortBy] = React.useState<'name' | 'category'>('name');

  // Récupérer tous les tags uniques
  const allTags = Array.from(new Set(references.flatMap(ref => ref.tags)));

  // Filtrer et trier les références
  const filteredReferences = references
    .filter(ref => {
      const matchesCategory = selectedCategory === 'all' || ref.category === selectedCategory;
      const matchesTags = selectedTags.length === 0 || selectedTags[0] === 'all' || 
                         selectedTags.some(tag => ref.tags.includes(tag));

      return matchesCategory && matchesTags;
    })
    .map(ref => {
      // Si pas de recherche, retourner la référence telle quelle
      if (!searchQuery.trim()) {
        return { ...ref, similarityScore: 1 };
      }

      // Calculer le score de similarité
      const searchResults = fuzzySearch(
        [ref],
        searchQuery,
        {
          threshold: 0.3,
          keys: ['name', 'description', 'tags']
        }
      );

      // Si aucun résultat ne dépasse le seuil, on exclut la référence
      if (searchResults.length === 0) {
        return { ...ref, similarityScore: 0 };
      }

      // Sinon on garde le meilleur score
      return { ...ref, similarityScore: searchResults[0].similarity };
    })
    .filter(ref => !searchQuery.trim() || ref.similarityScore > 0)
    .sort((a, b) => {
      // Si une recherche est en cours, on trie d'abord par score de similarité
      if (searchQuery.trim()) {
        return b.similarityScore - a.similarityScore;
      }
      // Sinon, on utilise le tri standard
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return a.category.localeCompare(b.category);
    });

  return (
    <div className="min-h-screen bg-background">
      <section className="container py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Références
          </h1>
          <p className="text-muted-foreground">
            Une collection de ressources, outils et documentations utiles.
          </p>
        </motion.div>

        {/* Filtres */}
        <div className="mt-12 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Barre de recherche */}
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une référence..."
                className="pl-8"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Sélection de la catégorie */}
            <Select
              value={selectedCategory}
              onValueChange={(value: string) => setSelectedCategory(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Catégories</SelectLabel>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {Object.entries(categories).map(([category]) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Sélection des tags */}
            <Select
              value={selectedTags[0] || 'all'}
              onValueChange={(value: string) => setSelectedTags(value === 'all' ? [] : [value])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tags" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tags</SelectLabel>
                  <SelectItem value="all">Tous les tags</SelectItem>
                  {allTags.map(tag => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Tri */}
            <Select
              value={sortBy}
              onValueChange={(value: 'name' | 'category') => setSortBy(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Trier par</SelectLabel>
                  <SelectItem value="name">Nom</SelectItem>
                  <SelectItem value="category">Catégorie</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Tags sélectionnés */}
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedTags.map(tag => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className={cn(
                    themes[tag as keyof typeof themes],
                    'cursor-pointer'
                  )}
                  onClick={() => setSelectedTags(prev => prev.filter(t => t !== tag))}
                >
                  {tag} ×
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Tableau des références */}
        <div className="mt-8 rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Lien</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Tags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReferences.map((ref) => (
                <TableRow key={ref.id}>
                  <TableCell className="font-medium">{ref.name}</TableCell>
                  <TableCell>{ref.description}</TableCell>
                  <TableCell>
                    {ref.link && (
                      <Link 
                        href={ref.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary hover:underline"
                      >
                        <ExternalLink size={14} />
                        <span>Voir</span>
                      </Link>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {ref.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {ref.tags.map(tag => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className={cn(
                            themes[tag as keyof typeof themes],
                            'text-xs'
                          )}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
} 