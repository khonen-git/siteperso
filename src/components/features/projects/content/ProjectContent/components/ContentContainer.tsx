import { motion } from 'framer-motion';
import { useProjectAnimation } from '../../../hooks/useProjectAnimation';
import { cn } from '@/lib/utils';

interface ContentContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ContentContainer({ children, className }: ContentContainerProps) {
  const animation = useProjectAnimation({ delay: 0.2 });

  return (
    <motion.div
      {...animation}
      className={cn('prose prose-lg dark:prose-invert', className)}
    >
      {children}
    </motion.div>
  );
}