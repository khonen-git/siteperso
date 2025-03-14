import {
  Calculator,
  Code,
  BarChart,
  Brain,
  type LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  calculator: Calculator,
  code: Code,
  "bar-chart": BarChart,
  brain: Brain,
} as const 