'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowUpRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

// Définition des thématiques et leurs couleurs associées
const themes = {
  Python: { color: 'bg-blue-500/10 text-blue-500 dark:bg-blue-400/10 dark:text-blue-400' },
  'Power BI': { color: 'bg-yellow-500/10 text-yellow-500 dark:bg-yellow-400/10 dark:text-yellow-400' },
  DAX: { color: 'bg-orange-500/10 text-orange-500 dark:bg-orange-400/10 dark:text-orange-400' },
  'scikit-learn': { color: 'bg-green-500/10 text-green-500 dark:bg-green-400/10 dark:text-green-400' },
  PostgreSQL: { color: 'bg-indigo-500/10 text-indigo-500 dark:bg-indigo-400/10 dark:text-indigo-400' },
  TypeScript: { color: 'bg-purple-500/10 text-purple-500 dark:bg-purple-400/10 dark:text-purple-400' },
  React: { color: 'bg-cyan-500/10 text-cyan-500 dark:bg-cyan-400/10 dark:text-cyan-400' },
};

// Définition des catégories
const categories = {
  'Data': 'Projets liés à l\'analyse et au traitement des données',
  'Mathématiques': 'Applications et études mathématiques',
  'Finance': 'Analyses financières et modélisation',
  'Développement Web': 'Applications et sites web',
  'Machine Learning': 'Projets d\'intelligence artificielle',
  'Automatisation': 'Scripts et outils d\'automatisation',
};

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  tags: string[];
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Analyse Prédictive des Ventes",
    description: "Utilisation de modèles ML pour prédire les ventes futures et optimiser les stocks en temps réel.",
    image: "https://placehold.co/600x400/png",
    date: "2024-02",
    category: "Machine Learning",
    tags: ["Python", "scikit-learn", "PostgreSQL"],
    link: "/projects/sales-prediction",
  },
  {
    id: 2,
    title: "Dashboard Power BI",
    description: "Tableau de bord interactif pour l'analyse des KPIs et la visualisation des données en temps réel.",
    image: "https://placehold.co/600x400/png",
    date: "2024-01",
    category: "Data",
    tags: ["Power BI", "DAX"],
    link: "/projects/powerbi-dashboard",
  },
  {
    id: 3,
    title: "ETL Pipeline",
    description: "Pipeline de données automatisé pour le traitement des données à grande échelle.",
    image: "https://placehold.co/600x400/png",
    date: "2023-12",
    category: "Automatisation",
    tags: ["Python", "PostgreSQL"],
    link: "/projects/etl-pipeline",
  },
];

export default function ProjectsPage(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [sortBy, setSortBy] = React.useState<'date' | 'title'>('date');

  // Récupérer tous les tags uniques
  const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));

  // Filtrer les projets
  const filteredProjects = projects
    .filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      
      const matchesTags = selectedTags.length === 0 || selectedTags[0] === 'all' || 
                         selectedTags.some(tag => project.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesTags;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return a.title.localeCompare(b.title);
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
            Mes Projets
          </h1>
          <p className="text-muted-foreground">
            Découvrez mes réalisations en data science, analyse de données et développement.
          </p>
        </motion.div>

        {/* Filtres */}
        <div className="mt-12 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Barre de recherche */}
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un projet..."
                className="pl-8"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Sélection de la catégorie */}
            <Select
              value={selectedCategory || 'all'}
              onValueChange={(value: string) => setSelectedCategory(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Catégories</SelectLabel>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {Object.entries(categories).map(([category, description]) => (
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
                <SelectValue placeholder="Technologies" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Technologies</SelectLabel>
                  <SelectItem value="all">Toutes les technologies</SelectItem>
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
              onValueChange={(value) => setSortBy(value as 'date' | 'title')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Trier par</SelectLabel>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="title">Titre</SelectItem>
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
                    themes[tag as keyof typeof themes]?.color,
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

        {/* Grille de projets */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href={project.link} className="group block">
                <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-xl">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/0" />
                  </div>
                  <CardHeader className="relative">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="rounded-full bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                      >
                        <ArrowUpRight size={20} />
                      </motion.div>
                    </div>
                    <CardDescription className="mt-2.5 line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2">
                      <Badge variant="outline" className="text-sm">
                        {project.category}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className={cn(
                            themes[tag as keyof typeof themes]?.color,
                            'transition-colors'
                          )}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
} 