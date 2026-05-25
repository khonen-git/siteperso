export interface Category {
  id: string;
  label: string;
  description?: string;
}

export interface CategorySelectLabels {
  placeholder: string;
  group: string;
  all: string;
}

export interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
  categories: Record<string, string>;
  labels: CategorySelectLabels;
  className?: string;
}