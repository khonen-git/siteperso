import fs from 'fs/promises'; // Utilisation de la version promise
import path from 'path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

// Chemin vers le dossier de contenu
const projectsDirectory = path.join(process.cwd(), 'src/content/projects');

// Validation des champs requis
function isValidProject(data: any): boolean {
  return (
    data &&
    typeof data.id === 'number' &&
    typeof data.title === 'string' &&
    typeof data.description === 'string' &&
    typeof data.image === 'string' &&
    typeof data.date === 'string' &&
    typeof data.category === 'string' &&
    Array.isArray(data.tags)
  );
}

// Récupère tous les projets avec leurs méta-données
export async function GET() {
  try {
    // Lecture asynchrone du répertoire
    const fileNames = await fs.readdir(projectsDirectory);
    
    // Lecture asynchrone de tous les fichiers
    const allProjectsData = await Promise.all(
      fileNames.map(async (fileName) => {
        try {
          const slug = fileName.replace(/\.mdx$/, '');
          const fullPath = path.join(projectsDirectory, fileName);
          const fileContents = await fs.readFile(fullPath, 'utf8');
          const { data } = matter(fileContents);

          // Validation des données
          if (!isValidProject(data)) {
            console.warn(`Projet invalide ${fileName}: données manquantes ou incorrectes`);
            return null;
          }

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
            visible: data.visible ?? true,
            link: `/projects/${slug}`
          };
        } catch (error) {
          console.error(`Erreur lors de la lecture du projet ${fileName}:`, error);
          return null;
        }
      })
    );

    // Filtrer les projets null et non visibles
    const validProjects = allProjectsData
      .filter((project): project is NonNullable<typeof project> => 
        project !== null && project.visible
      );

    // Trier les projets par date
    const sortedData = validProjects.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    if (sortedData.length === 0) {
      return NextResponse.json({ 
        error: 'Aucun projet valide trouvé',
        projects: [] 
      }, { status: 404 });
    }

    return NextResponse.json(sortedData);
  } catch (error) {
    const err = error as Error;
    console.error('Erreur lors de la lecture des projets:', err);
    return NextResponse.json({ 
      error: 'Erreur lors du chargement des projets',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    }, { status: 500 });
  }
}