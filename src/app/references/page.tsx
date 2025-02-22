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
];

// Thèmes pour les tags
const themes = {
  python: 'bg-blue-500/10 text-blue-500 dark:bg-blue-400/10 dark:text-blue-400',
  data: 'bg-green-500/10 text-green-500 dark:bg-green-400/10 dark:text-green-400',
  ml: 'bg-purple-500/10 text-purple-500 dark:bg-purple-400/10 dark:text-purple-400',
  async: 'bg-yellow-500/10 text-yellow-500 dark:bg-yellow-400/10 dark:text-yellow-400',
  concurrence: 'bg-orange-500/10 text-orange-500 dark:bg-orange-400/10 dark:text-orange-400',
  analyse: 'bg-cyan-500/10 text-cyan-500 dark:bg-cyan-400/10 dark:text-cyan-400',
};

export default function ReferencesPage(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [sortBy, setSortBy] = React.useState<'name' | 'category'>('name');

  // Récupérer tous les tags uniques
  const allTags = Array.from(new Set(references.flatMap(ref => ref.tags)));

  // Filtrer les références
  const filteredReferences = references
    .filter(ref => {
      const matchesSearch = 
        ref.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ref.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ref.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || ref.category === selectedCategory;
      
      const matchesTags = selectedTags.length === 0 || selectedTags[0] === 'all' || 
                         selectedTags.some(tag => ref.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesTags;
    })
    .sort((a, b) => {
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