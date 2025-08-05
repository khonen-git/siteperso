export interface BaseLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export interface HeaderProps {
  className?: string;
}

export interface FooterProps {
  className?: string;
}

export interface KnowledgeLayoutProps extends BaseLayoutProps {
  toc?: boolean;  // Table of Contents
}

export interface ProjectLayoutProps extends BaseLayoutProps {
  showHeader?: boolean;
  showFooter?: boolean;
}