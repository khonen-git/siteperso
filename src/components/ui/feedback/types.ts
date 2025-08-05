import { VariantProps } from "class-variance-authority";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  indicatorClassName?: string;
}

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: "default" | "destructive" | "success";
  duration?: number;
  className?: string;
}

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive" | "success" | "warning";
  title?: string;
}

export interface LoadingSpinnerProps extends React.SVGAttributes<SVGElement> {
  size?: "sm" | "default" | "lg";
}

export interface ToastProviderProps {
  children: React.ReactNode;
  swipeDirection?: "up" | "down" | "left" | "right";
  duration?: number;
}