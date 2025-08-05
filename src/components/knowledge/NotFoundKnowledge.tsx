import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFoundKnowledge(): React.JSX.Element {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-bold">Contenu Non Trouvé</h1>
      <p className="text-muted-foreground">
        Le contenu que vous recherchez n&apos;existe pas ou a été déplacé.
      </p>
      <Button asChild>
        <Link href="/knowledge">
          Retour à la page des connaissances
        </Link>
      </Button>
    </div>
  );
}