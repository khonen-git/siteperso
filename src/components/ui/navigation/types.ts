import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  className?: string;
}

export interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  inset?: boolean;
  destructive?: boolean;
}

export interface ScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  orientation?: "horizontal" | "vertical";
  scrollHideDelay?: number;
}

export interface NavigationMenuProps {
  children: React.ReactNode;
  className?: string;
}

export interface NavigationMenuItemProps {
  href: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}
