import { cn } from '@/lib/utils';

interface ConsoleOutputProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

/** Affiche une sortie console attendue sous un bloc de code. */
export function ConsoleOutput({
  children,
  title = 'Sortie console',
  className,
}: ConsoleOutputProps) {
  return (
    <div className={cn('mb-6', className)}>
      <p className="mb-2 text-sm font-medium text-muted-foreground">{title}</p>
      <pre className="overflow-x-auto rounded-md border bg-zinc-950 p-4 font-mono text-sm text-zinc-100">
        {children}
      </pre>
    </div>
  );
}
