'use client';

import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { KnowledgeSidebarNav } from './KnowledgeSidebarNav';
import type { TreeItem } from '@/config/knowledge/types';
import { cn } from '@/lib/utils';

interface KnowledgeSidebarDrawerProps {
  items: TreeItem[];
}

export function KnowledgeSidebarDrawer({ items }: KnowledgeSidebarDrawerProps): React.JSX.Element {
  const t = useTranslations('knowledge.layout');
  const [open, setOpen] = React.useState(false);

  const handleNavigate = React.useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="lg:hidden"
          aria-label={t('openSidebar')}
          data-testid="knowledge-sidebar-drawer-trigger"
        >
          <Menu className="mr-2 h-4 w-4" aria-hidden />
          {t('openSidebar')}
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
          )}
        />
        <Dialog.Content
          className={cn(
            'fixed inset-y-0 left-0 z-50 flex w-full max-w-xs flex-col',
            'border-r bg-background shadow-lg outline-none lg:hidden',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left'
          )}
          data-testid="knowledge-sidebar-drawer"
        >
          <div className="flex items-center justify-between gap-4 border-b p-4">
            <Dialog.Title className="text-base font-semibold">{t('sidebarLabel')}</Dialog.Title>
            <Dialog.Close asChild>
              <Button type="button" variant="ghost" size="icon" aria-label={t('closeSidebar')}>
                <X className="h-5 w-5" aria-hidden />
              </Button>
            </Dialog.Close>
          </div>

          <ScrollArea className="min-h-0 flex-1">
            <KnowledgeSidebarNav items={items} onNavigate={handleNavigate} />
          </ScrollArea>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
