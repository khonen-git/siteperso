import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, CheckCircle2, XCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AlertProps } from "../types";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>div]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success:
          "border-success/50 text-success dark:border-success [&>svg]:text-success",
        warning:
          "border-warning/50 text-warning dark:border-warning [&>svg]:text-warning",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const alertIconMap = {
  default: Info,
  destructive: XCircle,
  success: CheckCircle2,
  warning: AlertCircle,
};

/**
 * Alert - Composant de notification
 * Affiche un message d'alerte avec différentes variantes et une icône
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", title, children, ...props }, ref) => {
    const Icon = alertIconMap[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        <Icon className="h-4 w-4" />
        <div>
          {title && <h5 className="mb-1 font-medium">{title}</h5>}
          {children}
        </div>
      </div>
    );
  }
);
Alert.displayName = "Alert";

export { Alert, alertVariants };