'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { CodeBlock } from '@/components/features/knowledge/math/CodeBlock';

interface CommandSwitchProps {
  unixCommand: string;
  windowsCommand: string;
  unixLabel?: string;
  windowsLabel?: string;
  unixLanguage?: string;
  windowsLanguage?: string;
  className?: string;
}

export function CommandSwitch({
  unixCommand,
  windowsCommand,
  unixLabel = 'Linux/macOS',
  windowsLabel = 'Windows',
  unixLanguage = 'bash',
  windowsLanguage = 'powershell',
  className,
}: CommandSwitchProps): React.JSX.Element {
  const [platform, setPlatform] = React.useState<'unix' | 'windows'>('unix');

  return (
    <div className={cn('not-prose my-6', className)}>
      <nav
        aria-label="Choix plateforme commandes"
        className="mb-2 inline-flex items-center gap-1 rounded-md border p-0.5 text-sm"
      >
        <button
          type="button"
          onClick={() => setPlatform('unix')}
          className={cn(
            'rounded px-2 py-1 font-medium transition-colors',
            platform === 'unix'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
          aria-pressed={platform === 'unix'}
        >
          {unixLabel}
        </button>
        <button
          type="button"
          onClick={() => setPlatform('windows')}
          className={cn(
            'rounded px-2 py-1 font-medium transition-colors',
            platform === 'windows'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
          aria-pressed={platform === 'windows'}
        >
          {windowsLabel}
        </button>
      </nav>

      {platform === 'unix' ? (
        <CodeBlock language={unixLanguage}>{unixCommand}</CodeBlock>
      ) : (
        <CodeBlock language={windowsLanguage}>{windowsCommand}</CodeBlock>
      )}
    </div>
  );
}
