'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
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
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fuzzySearch } from '@/lib/search';

// Types d'activités et leurs couleurs
const activityTypes = {
  'Nouveau Projet': { color: 'bg-blue-500/10 text-blue-500 dark:bg-blue-400/10 dark:text-blue-400', icon: '🚀' },
  'Mise à Jour': { color: 'bg-green-500/10 text-green-500 dark:bg-green-400/10 dark:text-green-400', icon: '🔄' },
  'Article': { color: 'bg-purple-500/10 text-purple-500 dark:bg-purple-400/10 dark:text-purple-400', icon: '📝' },
  'Documentation': { color: 'bg-yellow-500/10 text-yellow-500 dark:bg-yellow-400/10 dark:text-yellow-400', icon: '📚' },
  'Correction': { color: 'bg-red-500/10 text-red-500 dark:bg-red-400/10 dark:text-red-400', icon: '🔧' },
};

interface Activity {
  id: number;
  title: string;
  description: string;
  date: string;
  type: keyof typeof activityTypes;
  section: string;
  details?: string;
}

const activities: Activity[] = [
  {
    id: 1,
    title: "Ajout de la Page Références",
    description: "Nouvelle page avec un tableau interactif des références et ressources",
    date: "2024-02-20",
    type: "Nouveau Projet",
    section: "Pages",
    details: "Implémentation d'un système de filtrage et de tri des références",
  },
  {
    id: 2,
    title: "Mise à Jour du Design",
    description: "Amélioration des transitions et des animations",
    date: "2024-02-19",
    type: "Mise à Jour",
    section: "Design",
    details: "Optimisation des animations Framer Motion et des transitions de thème",
  },
  {
    id: 3,
    title: "Article sur le Machine Learning",
    description: "Introduction aux concepts fondamentaux du ML",
    date: "2024-02-18",
    type: "Article",
    section: "Blog",
    details: "Publication d'un nouvel article sur les bases du machine learning",
  },
  {
    id: 4,
    title: "Documentation Python",
    description: "Ajout de nouvelles références Python",
    date: "2024-02-17",
    type: "Documentation",
    section: "Références",
    details: "Enrichissement de la section Python avec de nouvelles ressources",
  },
  {
    id: 5,
    title: "Correction du Menu Mobile",
    description: "Amélioration de la navigation sur mobile",
    date: "2024-02-16",
    type: "Correction",
    section: "Navigation",
    details: "Correction des problèmes d'affichage du menu sur les appareils mobiles",
  },
];

const sections = Array.from(new Set(activities.map(activity => activity.section)));

export default function ActivityPage(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedType, setSelectedType] = React.useState<string>('all');
  const [selectedSection, setSelectedSection] = React.useState<string>('all');

  // Filtrer et trier les activités
  const filteredActivities = activities
    .filter(activity => {
      const matchesType = selectedType === 'all' || activity.type === selectedType;
      const matchesSection = selectedSection === 'all' || activity.section === selectedSection;

      return matchesType && matchesSection;
    })
    .map(activity => {
      // Si pas de recherche, retourner l'activité telle quelle
      if (!searchQuery.trim()) {
        return { ...activity, similarityScore: 1 };
      }

      // Calculer le score de similarité
      const searchResults = fuzzySearch(
        [activity],
        searchQuery,
        {
          threshold: 0.3,
          keys: ['title', 'description', 'details']
        }
      );

      // Si aucun résultat ne dépasse le seuil, on exclut l'activité
      if (searchResults.length === 0) {
        return { ...activity, similarityScore: 0 };
      }

      // Sinon on garde le meilleur score
      return { ...activity, similarityScore: searchResults[0].similarity };
    })
    .filter(activity => !searchQuery.trim() || activity.similarityScore > 0)
    .sort((a, b) => {
      // Si une recherche est en cours, on trie d'abord par score de similarité
      if (searchQuery.trim()) {
        return b.similarityScore - a.similarityScore;
      }
      // Sinon, on trie par date
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

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
            Activité du Site
          </h1>
          <p className="text-muted-foreground">
            Suivez les dernières mises à jour, ajouts et améliorations du site.
          </p>
        </motion.div>

        {/* Filtres */}
        <div className="mt-12 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Barre de recherche */}
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une activité..."
                className="pl-8"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filtre par type */}
            <Select
              value={selectedType}
              onValueChange={(value: string) => setSelectedType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Type d'activité" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type d'activité</SelectLabel>
                  <SelectItem value="all">Tous les types</SelectItem>
                  {Object.keys(activityTypes).map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Filtre par section */}
            <Select
              value={selectedSection}
              onValueChange={(value: string) => setSelectedSection(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Section</SelectLabel>
                  <SelectItem value="all">Toutes les sections</SelectItem>
                  {sections.map(section => (
                    <SelectItem key={section} value={section}>
                      {section}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grille d'activités */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredActivities.map((activity) => (
            <motion.div key={activity.id} variants={item}>
              <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
                <CardHeader className="relative z-10">
                  <div className="mb-4 flex items-center justify-between">
                    <Badge variant="secondary" className={activityTypes[activity.type].color}>
                      <span className="mr-1">{activityTypes[activity.type].icon}</span>
                      {activity.type}
                    </Badge>
                    <Badge variant="outline">{activity.section}</Badge>
                  </div>
                  <CardTitle className="line-clamp-2 text-xl transition-colors group-hover:text-primary">
                    {activity.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {activity.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {activity.description}
                  </p>
                  {activity.details && (
                    <p className="mt-2 text-sm text-muted-foreground/80">
                      {activity.details}
                    </p>
                  )}
                </CardContent>
                {/* Effet de survol */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 transition-opacity group-hover:opacity-100" />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
} 