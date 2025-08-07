export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}