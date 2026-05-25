import { cn } from '@/lib/utils';

interface ConsoleOutputProps {
  /** Texte brut — préférer cette prop en MDX si la sortie contient `{`, `<`, etc. */
  output?: string;
  children?: React.ReactNode;
  title?: string;
  className?: string;
}

/** Affiche une sortie console attendue sous un bloc de code. */
export function ConsoleOutput({
  output,
  children,
  title = 'Sortie console',
  className,
}: ConsoleOutputProps) {
  const content = output ?? children;

  return (
    <div className={cn('mb-6', className)}>
      <p className="mb-2 text-sm font-medium text-muted-foreground">{title}</p>
      <pre className="overflow-x-auto rounded-md border bg-zinc-950 p-4 font-mono text-sm text-zinc-100">
        {content}
      </pre>
    </div>
  );
}
