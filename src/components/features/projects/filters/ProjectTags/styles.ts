export const projectTagsStyles = {
  container: 'flex flex-wrap gap-2',
  tag: {
    base: 'flex items-center gap-1',
    colors: {
      React: 'bg-cyan-500/10 text-cyan-500 dark:bg-cyan-400/10 dark:text-cyan-400',
      TypeScript: 'bg-purple-500/10 text-purple-500 dark:bg-purple-400/10 dark:text-purple-400',
      'Next.js': 'bg-black/10 text-black dark:bg-white/10 dark:text-white',
    },
  },
  removeIcon: 'hover:text-destructive h-3 w-3 cursor-pointer',
} as const;