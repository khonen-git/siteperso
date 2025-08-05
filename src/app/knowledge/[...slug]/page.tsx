'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { KnowledgeLayout } from '@/components/layouts/KnowledgeLayout';
import NotFoundKnowledge from '@/components/knowledge/NotFoundKnowledge';
import { useState, useEffect } from 'react';

interface KnowledgeData {
  content: any;
  frontmatter: {
    title: string;
    description: string;
  };
}

export default function KnowledgePage(): React.JSX.Element {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;
  
  const [pageData, setPageData] = useState<{
    content: any | null;
    metadata: any | null;
    loading: boolean;
    error: boolean;
  }>({
    content: null,
    metadata: null,
    loading: true,
    error: false
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/knowledge/${slug}`, {
          cache: process.env.NODE_ENV === 'development' ? 'no-store' : 'default',
        });
        
        if (!response.ok) {
          throw new Error(`Erreur lors du chargement du contenu: ${response.status}`);
        }
        
        const data: KnowledgeData = await response.json();
        
        setPageData({
          content: data.content,
          metadata: data.frontmatter,
          loading: false,
          error: false
        });
      } catch (error) {
        console.error("Erreur lors du chargement du contenu:", error);
        setPageData({
          content: null,
          metadata: null,
          loading: false,
          error: true
        });
      }
    };
    
    fetchContent();
  }, [slug]);

  // Afficher un message de chargement
  if (pageData.loading) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold">Chargement...</h1>
      </div>
    );
  }

  // Afficher un message d'erreur ou "contenu non trouvé"
  if (pageData.error || !pageData.content) {
    return <NotFoundKnowledge />;
  }

  return (
    <KnowledgeLayout>
      {pageData.content}
    </KnowledgeLayout>
  );
}