import { ThemeColor } from "@/types/project";

// Définition des thématiques et leurs couleurs associées
export const themes: Record<string, ThemeColor> = {
  Python: { color: 'bg-blue-500/10 text-blue-500 dark:bg-blue-400/10 dark:text-blue-400' },
  'Power BI': { color: 'bg-yellow-500/10 text-yellow-500 dark:bg-yellow-400/10 dark:text-yellow-400' },
  DAX: { color: 'bg-orange-500/10 text-orange-500 dark:bg-orange-400/10 dark:text-orange-400' },
  'scikit-learn': { color: 'bg-green-500/10 text-green-500 dark:bg-green-400/10 dark:text-green-400' },
  PostgreSQL: { color: 'bg-indigo-500/10 text-indigo-500 dark:bg-indigo-400/10 dark:text-indigo-400' },
  TypeScript: { color: 'bg-purple-500/10 text-purple-500 dark:bg-purple-400/10 dark:text-purple-400' },
  React: { color: 'bg-cyan-500/10 text-cyan-500 dark:bg-cyan-400/10 dark:text-cyan-400' },
};

export default themes; 