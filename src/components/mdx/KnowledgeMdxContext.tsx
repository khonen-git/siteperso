'use client';

import * as React from 'react';

const KnowledgeMdxContext = React.createContext<string>('fr');

export function KnowledgeMdxProvider({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <KnowledgeMdxContext.Provider value={locale}>
      {children}
    </KnowledgeMdxContext.Provider>
  );
}

export function useKnowledgeMdxLocale(): string {
  return React.useContext(KnowledgeMdxContext);
}
