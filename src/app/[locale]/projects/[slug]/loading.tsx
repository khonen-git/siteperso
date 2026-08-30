import * as React from 'react';

export default function ProjectLoading(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background" aria-busy="true" aria-label="Chargement du projet">
      <div className="h-[50vh] animate-pulse bg-muted" />
      <div className="container py-16">
        <div className="mx-auto max-w-4xl space-y-4">
          <div className="h-8 w-2/3 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted/80" />
          <div className="h-4 w-full animate-pulse rounded bg-muted/80" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-muted/80" />
          <div className="mt-8 h-6 w-1/2 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted/70" />
          <div className="h-4 w-full animate-pulse rounded bg-muted/70" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-muted/70" />
        </div>
      </div>
    </div>
  );
}
