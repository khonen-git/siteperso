import React from 'react';
import { cn } from '@/lib/utils';

interface ListProps {
  children: React.ReactNode;
  className?: string;
}

export const UnorderedList = ({ children, className }: ListProps) => (
  <ul className={cn("mb-4 list-disc pl-5 space-y-2", className)}>
    {children}
  </ul>
);

export const OrderedList = ({ children, className }: ListProps) => (
  <ol className={cn("mb-4 list-decimal pl-5 space-y-2", className)}>
    {children}
  </ol>
);

export const ListItem = ({ children, className }: ListProps) => (
  <li className={cn("leading-relaxed", className)}>
    {children}
  </li>
);