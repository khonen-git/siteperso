export interface TagsSelectLabels {
  placeholder: string;
  group: string;
  all: string;
}

export interface TagsSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  availableTags: string[];
  labels: TagsSelectLabels;
  className?: string;
}