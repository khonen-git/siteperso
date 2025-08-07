export type SortOption = 'date' | 'title';

export interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  className?: string;
}