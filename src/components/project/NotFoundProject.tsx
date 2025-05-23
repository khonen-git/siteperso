'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NotFoundProject() {
  return (
    <div className="container py-16 text-center">
      <h1 className="text-3xl font-bold">Projet non trouvé</h1>
      <p className="mt-4">Le projet que vous recherchez n'existe pas.</p>
      <Button asChild className="mt-8">
        <Link href="/projects">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux projets
        </Link>
      </Button>
    </div>
  );
}

export default NotFoundProject; 