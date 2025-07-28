import { Project } from "@/types/project";

// Données statiques comme fallback
const fallbackProjects: Project[] = [
  {
    id: 1,
    title: "Analyse Prédictive des Ventes",
    description: "Utilisation de modèles ML pour prédire les ventes futures et optimiser les stocks en temps réel.",
    image: "https://placehold.co/600x400/png",
    date: "2024-02",
    category: "Machine Learning",
    tags: ["Python", "scikit-learn", "PostgreSQL"],
    link: "/projects/sales-prediction",
  },
  {
    id: 2,
    title: "Dashboard Power BI",
    description: "Tableau de bord interactif pour l'analyse des KPIs et la visualisation des données en temps réel.",
    image: "https://placehold.co/600x400/png",
    date: "2024-01",
    category: "Data",
    tags: ["Power BI", "DAX"],
    link: "/projects/powerbi-dashboard",
  },
  {
    id: 3,
    title: "ETL Pipeline",
    description: "Pipeline de données automatisé pour le traitement des données à grande échelle.",
    image: "https://placehold.co/600x400/png",
    date: "2023-12",
    category: "Automatisation",
    tags: ["Python", "PostgreSQL"],
    link: "/projects/etl-pipeline",
  },
];

// Fonction pour récupérer les projets depuis l'API
export async function fetchProjects(): Promise<Project[]> {
  try {
    const response = await fetch('/api/projects', {
      // Évite le cache en développement
      cache: process.env.NODE_ENV === 'development' ? 'no-store' : 'default',
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des projets');
    }
    
    const data = await response.json();
    
    // Vérifie que data est un tableau
    if (!Array.isArray(data)) {
      console.error("La réponse de l'API n'est pas un tableau:", data);
      return fallbackProjects;
    }
    
    // Valide et transforme les projets
    const validProjects = data
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

    return validProjects.length > 0 ? validProjects : fallbackProjects;
  } catch (error) {
    console.error("Erreur lors du chargement des projets:", error);
    return fallbackProjects;
  }
}

export default fallbackProjects; 