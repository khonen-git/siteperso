import * as React from 'react';
import { KnowledgeSidebar } from '@/components/knowledge/KnowledgeSidebar';
import { cn } from '@/lib/utils';

export default function KnowledgePage(): React.JSX.Element {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <KnowledgeSidebar />
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 overflow-y-auto p-8">
        <section id="knowledge__presentation" className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Répertoire de Connaissances Personnelles</h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none space-y-4">
            <p>
              Bienvenue dans mon répertoire de connaissances personnelles, un espace dédié à la synthèse de mon savoir 
              acquis tout au long de mon parcours. Ici, je partage un condensé de divers domaines qui ont captivé mon 
              intérêt tout au long de ma vie. Ce répertoire représente une source d'informations riche et diversifiée, 
              comprenant des sujets aussi variés que les mathématiques, la programmation, la finance ainsi que divers 
              outils me servant dans mes activités.
            </p>
            <p>
              Il est important de noter que ce répertoire n'est pas conçu comme un cours formel, mais plutôt comme une 
              collection soigneusement organisée de concepts clés, d'idées fascinantes et d'outils pratiques. Il vise 
              à offrir un aperçu rapide et informatif pour quiconque souhaite explorer ces domaines ou simplement 
              enrichir sa compréhension personnelle.
            </p>
          </div>
        </section>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Mathématiques</h2>
            <p className="text-muted-foreground">
              Les mathématiques sont la langue universelle de la science et de la compréhension rationnelle. 
              Cette partie du répertoire explore des concepts mathématiques fondamentaux, offrant une base solide 
              pour quiconque souhaite explorer des sujets allant de la physique à l'informatique.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Programmation</h2>
            <p className="text-muted-foreground">
              La programmation informatique est l'art de donner des instructions à un ordinateur en utilisant un 
              langage de programmation spécifique. Elle joue un rôle central dans le monde de la technologie et 
              est utilisée dans une variété de domaines, de la science informatique à l'ingénierie logicielle.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Data Analytics</h2>
            <p className="text-muted-foreground">
              La Data Analytics est le processus d'examen, de nettoyage, de transformation et d'interprétation des 
              données pour en extraire des informations utiles. Elle aide à prendre des décisions stratégiques, 
              identifier des tendances et améliorer les opérations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Data Science</h2>
            <p className="text-muted-foreground">
              La Data Science combine statistiques, analyse de données et apprentissage automatique pour extraire 
              des connaissances et des insights à partir de données structurées et non structurées.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
} 