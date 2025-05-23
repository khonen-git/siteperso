'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import ProjectHero from '@/components/project/ProjectHero';
import ProjectContent from '@/components/project/ProjectContent';
import NotFoundProject from '@/components/project/NotFoundProject';
import { useState, useEffect } from 'react';
import { ProjectDetail } from '@/types/project';

export default function ProjectPage(): React.JSX.Element {
  const params = useParams();
  const slug = params.slug as string;
  
  const [projectData, setProjectData] = useState<{
    project: ProjectDetail | null;
    content: any | null;
    loading: boolean;
    error: boolean;
  }>({
    project: null,
    content: null,
    loading: true,
    error: false
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Récupérer le contenu du projet via l'API
        const response = await fetch(`/api/projects/${slug}`, {
          // Évite le cache en développement
          cache: process.env.NODE_ENV === 'development' ? 'no-store' : 'default',
        });
        
        if (!response.ok) {
          throw new Error(`Erreur lors du chargement du projet: ${response.status}`);
        }
        
        const projectContent = await response.json();
        
        // Transformer les métadonnées en objet ProjectDetail
        const projectDetail: ProjectDetail = {
          id: projectContent.frontmatter.id,
          title: projectContent.frontmatter.title,
          description: projectContent.frontmatter.description,
          image: projectContent.frontmatter.image,
          date: projectContent.frontmatter.date,
          category: projectContent.frontmatter.category,
          tags: projectContent.frontmatter.tags,
          content: {
            summary: '', // Ces champs ne sont plus utilisés directement
            objectives: [],
            approach: '',
            technologies: [],
            results: '',
            images: [],
            conclusion: ''
          }
        };
        
        setProjectData({
          project: projectDetail,
          content: projectContent.content,
          loading: false,
          error: false
        });
      } catch (error) {
        console.error("Erreur lors du chargement du projet:", error);
        setProjectData({
          project: null, 
          content: null, 
          loading: false, 
          error: true
        });
      }
    };
    
    fetchProject();
  }, [slug]);

  // Afficher un message de chargement
  if (projectData.loading) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold">Chargement...</h1>
      </div>
    );
  }

  // Afficher un message d'erreur ou "projet non trouvé"
  if (projectData.error || !projectData.project || !projectData.content) {
    return <NotFoundProject />;
  }

  return (
    <div className="min-h-screen bg-background">
      <ProjectHero project={projectData.project} />
      <ProjectContent content={projectData.content} />
    </div>
  );
} 