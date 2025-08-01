import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

// Chemin vers le dossier de contenu
const projectsDirectory = path.join(process.cwd(), 'src/content/projects');

// Récupère tous les projets avec leurs méta-données
export async function GET() {
  try {
    const fileNames = fs.readdirSync(projectsDirectory);
    const allProjectsData = fileNames.map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        slug,
        ...(data as {
          id: number;
          title: string;
          description: string;
          image: string;
          date: string;
          category: string;
          tags: string[];
          visible?: boolean;
        }),
        visible: data.visible ?? true // Par défaut visible si non spécifié
      };
    });
    
    // Trier les projets par date décroissante
    // Filtrer les projets non visibles
    const visibleProjects = allProjectsData.filter(project => project.visible);

    // Trier les projets visibles par date décroissante
    const sortedData = visibleProjects.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
    
    return NextResponse.json(sortedData);
  } catch (error) {
    console.error('Erreur lors de la lecture des projets:', error);
    return NextResponse.json({ error: 'Erreur lors du chargement des projets' }, { status: 500 });
  }
} 