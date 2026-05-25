export type SortOption = 'date' | 'title';

export interface SortSelectLabels {
  placeholder: string;
  group: string;
  date: string;
  title: string;
}

export interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  labels: SortSelectLabels;
  className?: string;
}