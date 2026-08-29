export interface TreeItem {
  title: string;
  href?: string;
  children?: TreeItem[];
}

export interface SidebarProps {
  className?: string;
}

export interface TreeViewProps {
  items: TreeItem[];
  level?: number;
  onLinkClick?: () => void;
}

export interface TableOfContentsProps {
  className?: string;
}

export interface KnowledgeSectionProps {
  title: string;
  description: string;
  icon?: string;
  className?: string;
}
