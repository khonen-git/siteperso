export interface TagsSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  availableTags: string[];
  className?: string;
}