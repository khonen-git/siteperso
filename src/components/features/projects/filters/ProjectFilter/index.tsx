import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/inputs/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/inputs/select';
import { cn } from '@/lib/utils';
import { categories } from '@/config/categories';
import type { ProjectFilterProps } from '../../types';

/**
 * ProjectFilter - Composant de filtrage pour la liste des projets
 * Gère la recherche, le tri et le filtrage par catégorie/tags
 */
export function ProjectFilter({
  onSearch,
  onCategoryChange,
  onTagSelect,
  onSortChange,
  selectedCategory,
  selectedTags,
  sortBy,
  className
}: ProjectFilterProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Barre de recherche */}
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un projet..."
            className="pl-8"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* Sélection de la catégorie */}
        <Select
          value={selectedCategory}
          onValueChange={onCategoryChange}
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
          onValueChange={(value) => onTagSelect(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Technologies" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Technologies</SelectLabel>
              <SelectItem value="all">Toutes les technologies</SelectItem>
              {/* Les tags seront injectés dynamiquement */}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Tri */}
        <Select
          value={sortBy}
          onValueChange={(value: 'date' | 'title') => onSortChange(value)}
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
    </div>
  );
}