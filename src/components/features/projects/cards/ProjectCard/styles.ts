export const projectCardStyles = {
  container: 'group block',
  card: 'relative overflow-hidden transition-all duration-300 hover:shadow-xl',
  imageContainer: 'aspect-[4/3] relative',
  image: 'object-cover transition-transform duration-300 group-hover:scale-105',
  header: 'p-4 pb-2',
  tagList: 'flex flex-wrap gap-2 mb-2',
  title: 'line-clamp-1 text-xl group-hover:text-primary transition-colors duration-300',
  titleContainer: 'flex items-center justify-between',
  arrow: 'h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300',
  description: 'line-clamp-2 text-sm text-muted-foreground',
  content: 'p-4 pt-0',
  badge: 'absolute top-2 right-2'
} as const;