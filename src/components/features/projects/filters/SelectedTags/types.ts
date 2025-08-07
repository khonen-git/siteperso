export interface SelectedTagsProps {
  tags: string[];
  onRemove: (tag: string) => void;
  className?: string;
  themes?: Record<string, { color: string }>;
}