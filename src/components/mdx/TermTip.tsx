'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { getGlossaryDefinition } from '@/config/knowledge/glossary';
import { useKnowledgeMdxLocale } from '@/components/mdx/KnowledgeMdxContext';
import { cn } from '@/lib/utils';

export interface TermTipProps {
  children: React.ReactNode;
  /** Clé du glossaire partagé (ex. `bagging`, `concept-drift`). */
  term?: string;
  /** Définition inline ; prioritaire sur le glossaire. */
  definition?: string;
  className?: string;
}

export function TermTip({
  children,
  term,
  definition,
  className,
}: TermTipProps): React.JSX.Element {
  const locale = useKnowledgeMdxLocale();
  const resolvedDefinition =
    definition ?? (term ? getGlossaryDefinition(locale, term) : undefined);

  const triggerRef = React.useRef<HTMLSpanElement>(null);
  const tooltipId = React.useId();
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [position, setPosition] = React.useState({ top: 0, left: 0 });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = React.useCallback((): void => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPosition({
      top: rect.top,
      left: rect.left + rect.width / 2,
    });
  }, []);

  const show = React.useCallback((): void => {
    updatePosition();
    setOpen(true);
  }, [updatePosition]);

  const hide = React.useCallback((): void => {
    setOpen(false);
  }, []);

  if (!resolvedDefinition) {
    return <>{children}</>;
  }

  const tooltip =
    mounted && open
      ? createPortal(
          <span
            id={tooltipId}
            role="tooltip"
            style={{
              position: 'fixed',
              top: position.top,
              left: position.left,
              transform: 'translate(-50%, calc(-100% - 8px))',
            }}
            className="z-50 block w-max max-w-sm rounded-md border bg-card p-3 text-sm leading-relaxed text-card-foreground shadow-md"
          >
            {resolvedDefinition}
          </span>,
          document.body
        )
      : null;

  return (
    <>
      <span
        ref={triggerRef}
        tabIndex={0}
        aria-describedby={open ? tooltipId : undefined}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        className={cn(
          'cursor-help border-b border-dotted border-muted-foreground/70 font-[inherit] text-inherit',
          'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm',
          className
        )}
      >
        {children}
      </span>
      {tooltip}
    </>
  );
}
