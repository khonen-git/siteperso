'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
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
import type { Reference } from '@/types/references';

const tagThemes: Record<string, string> = {
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
  math: 'bg-violet-500/10 text-violet-500 dark:bg-violet-400/10 dark:text-violet-400',
  web: 'bg-sky-500/10 text-sky-500 dark:bg-sky-400/10 dark:text-sky-400',
  react: 'bg-teal-500/10 text-teal-500 dark:bg-teal-400/10 dark:text-teal-400',
  docs: 'bg-zinc-500/10 text-zinc-600 dark:bg-zinc-400/10 dark:text-zinc-400',
};

interface ReferencesPageClientProps {
  references: Reference[];
  categories: Record<string, string>;
}

export function ReferencesPageClient({
  references,
  categories,
}: ReferencesPageClientProps): React.JSX.Element {
  const t = useTranslations('references');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [sortBy, setSortBy] = React.useState<'name' | 'category'>('name');

  const allTags = Array.from(new Set(references.flatMap((ref) => ref.tags)));

  const filteredReferences = references
    .filter((ref) => {
      const matchesCategory = selectedCategory === 'all' || ref.category === selectedCategory;
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags[0] === 'all' ||
        selectedTags.some((tag) => ref.tags.includes(tag));

      return matchesCategory && matchesTags;
    })
    .map((ref) => {
      if (!searchQuery.trim()) {
        return { ...ref, similarityScore: 1 };
      }

      const searchResults = fuzzySearch([ref], searchQuery, {
        threshold: 0.3,
        keys: ['name', 'description', 'tags'],
      });

      if (searchResults.length === 0) {
        return { ...ref, similarityScore: 0 };
      }

      return { ...ref, similarityScore: searchResults[0].similarity };
    })
    .filter((ref) => !searchQuery.trim() || ref.similarityScore > 0)
    .sort((a, b) => {
      if (searchQuery.trim()) {
        return b.similarityScore - a.similarityScore;
      }
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
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">{t('title')}</h1>
          <p className="text-muted-foreground">{t('subtitle')}</p>
        </motion.div>

        <div className="mt-12 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('searchPlaceholder')}
                className="pl-8"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
              />
            </div>

            <Select
              value={selectedCategory}
              onValueChange={(value: string) => setSelectedCategory(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('categoryPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{t('categoryLabel')}</SelectLabel>
                  <SelectItem value="all">{t('categoryAll')}</SelectItem>
                  {Object.keys(categories).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={selectedTags[0] || 'all'}
              onValueChange={(value: string) => setSelectedTags(value === 'all' ? [] : [value])}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('tagsPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{t('tagsLabel')}</SelectLabel>
                  <SelectItem value="all">{t('tagsAll')}</SelectItem>
                  {allTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value: 'name' | 'category') => setSortBy(value)}>
              <SelectTrigger>
                <SelectValue placeholder={t('sortPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{t('sortLabel')}</SelectLabel>
                  <SelectItem value="name">{t('sortName')}</SelectItem>
                  <SelectItem value="category">{t('sortCategory')}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className={cn(tagThemes[tag] ?? '', 'cursor-pointer')}
                  onClick={() => setSelectedTags((prev) => prev.filter((item) => item !== tag))}
                >
                  {tag} ×
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('tableName')}</TableHead>
                <TableHead>{t('tableDescription')}</TableHead>
                <TableHead>{t('tableLink')}</TableHead>
                <TableHead>{t('tableCategory')}</TableHead>
                <TableHead>{t('tableTags')}</TableHead>
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
                        <span>{t('viewLink')}</span>
                      </Link>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{ref.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {ref.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className={cn(tagThemes[tag] ?? '', 'text-xs')}
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
