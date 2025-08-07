import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProjectAnimation } from '../../hooks/useProjectAnimation';

interface BackButtonProps {
  href: string;
  label: string;
  className?: string;
}

export function BackButton({ href, label, className }: BackButtonProps) {
  const animation = useProjectAnimation({ delay: 0.4 });

  return (
    <motion.div {...animation} className={className}>
      <Button asChild>
        <Link href={href}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {label}
        </Link>
      </Button>
    </motion.div>
  );
}