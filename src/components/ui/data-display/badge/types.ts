import { HTMLAttributes } from 'react';
import { VariantProps } from 'class-variance-authority';
import { badgeVariants } from './styles';

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  removable?: boolean;
  onRemove?: () => void;
}