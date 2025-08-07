import { Project } from "@/types/project";

// Fonction pour récupérer les projets depuis l'API
export async function fetchProjects(): Promise<Project[]> {
  try {
    const response = await fetch('/api/projects', {
      cache: 'no-store', // Toujours récupérer les dernières données
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des projets');
    }
    
    const data = await response.json();
    
    // Vérifie que data est un tableau
    if (!Array.isArray(data)) {
      console.error("La réponse de l'API n'est pas un tableau:", data);
      return [];
    }
    
    // Valide et transforme les projets
    return data
      .filter(project => 
        project &&
        typeof project.id === 'number' &&
        typeof project.title === 'string' &&
        typeof project.description === 'string' &&
        typeof project.image === 'string' &&
        typeof project.date === 'string' &&
        typeof project.category === 'string' &&
        project.slug
      )
      .map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        image: project.image,
        date: project.date,
        category: project.category,
        tags: Array.isArray(project.tags) ? project.tags : [],
        link: `/projects/${project.slug}`
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Erreur lors du chargement des projets:", error);
    return [];
  }
}

// Export un tableau vide par défaut (plus de fallback)
export default [];