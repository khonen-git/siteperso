import * as React from "react";
import { cn } from "@/lib/utils";
import type { LoadingSpinnerProps } from "../types";

/**
 * LoadingSpinner - Composant d'indicateur de chargement
 * Affiche une animation de chargement avec différentes tailles
 */
export function LoadingSpinner({
  size = "default",
  className,
  ...props
}: LoadingSpinnerProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "animate-spin",
        size === "sm" && "h-4 w-4",
        size === "default" && "h-6 w-6",
        size === "lg" && "h-8 w-8",
        className
      )}
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}