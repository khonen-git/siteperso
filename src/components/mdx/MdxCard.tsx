import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MdxCardProps {
  children: React.ReactNode;
  className?: string;
}

export function MdxCard({ children, className }: MdxCardProps) {
  return (
    <Card className={cn('p-4 mb-6', className)}>
      {children}
    </Card>
  );
} 