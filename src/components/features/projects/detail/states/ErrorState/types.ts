export interface ErrorStateProps {
  error?: Error | null;
  className?: string;
  onRetry?: () => void;
}