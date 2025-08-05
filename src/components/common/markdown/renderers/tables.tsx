import React from 'react';
import { cn } from '@/lib/utils';
import {
  Table as UITable,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table = ({ children, className }: TableProps) => (
  <div className={cn("mb-4 overflow-x-auto", className)}>
    <UITable>{children}</UITable>
  </div>
);

export const THead = ({ children, className }: TableProps) => (
  <TableHeader className={className}>{children}</TableHeader>
);

export const TBody = ({ children, className }: TableProps) => (
  <TableBody className={className}>{children}</TableBody>
);

export const TR = ({ children, className }: TableProps) => (
  <TableRow className={className}>{children}</TableRow>
);

export const TH = ({ children, className }: TableProps) => (
  <TableHead className={className}>{children}</TableHead>
);

export const TD = ({ children, className }: TableProps) => (
  <TableCell className={className}>{children}</TableCell>
);