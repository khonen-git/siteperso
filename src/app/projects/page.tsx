'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
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
import { cn } from '@/lib/utils';
import ProjectCard from '@/components/project/ProjectCard';
import ProjectTag from '@/components/project/ProjectTag';
import fallbackProjects, { fetchProjects } from '@/data/projectsList';
import categories from '@/config/categories';
import themes from '@/config/themes';
import { Project } from '@/types/project';

export default function ProjectsPage(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [sortBy, setSortBy] = React.useState<'date' | 'title'>('date');
  const [projects, setProjects] = React.useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = React.useState(true);

  // Charger les projets depuis l'API au chargement
  React.useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
        // Fallback sur les projets statiques déjà chargés
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Récupérer tous les tags uniques
  const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));

  // Filtrer les projets
  const filteredProjects = projects
    .filter(project => {
      if (!project || !project.title || !project.tags) {
        return false;
      }
      
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (project.description?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
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

        {/* Indicateur de chargement */}
        {loading && (
          <div className="mt-16 text-center">
            <div className="animate-pulse text-lg">Chargement des projets...</div>
          </div>
        )}

        {/* Grille de projets */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          
          {/* Message si aucun projet ne correspond aux filtres */}
          {filteredProjects.length === 0 && !loading && (
            <div className="col-span-full text-center text-muted-foreground">
              Aucun projet ne correspond à vos critères de recherche.
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
} 