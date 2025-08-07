export interface Category {
  id: string;
  label: string;
  description?: string;
}

export interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
  categories: Record<string, string>;
  className?: string;
}