import {
  Calculator,
  Code,
  BarChart,
  Brain,
  Sun,
  Moon,
  ChevronDown,
  ChevronRight,
  X,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Info,
  type LucideIcon,
} from "lucide-react";

export type Icon = LucideIcon;

/**
 * Icons - Collection d'icônes utilisées dans l'application
 * Centralisé pour une meilleure gestion et cohérence
 */
export const Icons = {
  // Navigation
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  close: X,

  // Thème
  sun: Sun,
  moon: Moon,

  // Feedback
  alert: AlertCircle,
  success: CheckCircle2,
  error: XCircle,
  info: Info,

  // Domaines
  calculator: Calculator,
  code: Code,
  barChart: BarChart,
  brain: Brain,
} as const;