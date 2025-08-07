import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { ProjectImageContainerProps } from '../../../types';

export function ImageContainer({ image, className }: ProjectImageContainerProps) {
  return (
    <div className={cn('aspect-[4/3] relative', className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}