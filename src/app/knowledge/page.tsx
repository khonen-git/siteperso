import * as React from 'react';
import { KnowledgeSidebar } from '@/components/features/knowledge/navigation/KnowledgeSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TableOfContents } from '@/components/features/knowledge/navigation/TableOfContents';
import { KnowledgeSection } from '@/components/features/knowledge/navigation/Section';

export default function KnowledgePage(): React.JSX.Element {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar avec ScrollArea pour le défilement fluide */}
      <aside className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <ScrollArea className="h-full">
          <KnowledgeSidebar />
        </ScrollArea>
      </aside>

      {/* Contenu principal avec marges fixes */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-8 my-6">
          <section id="knowledge__presentation" className="space-y-6">
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

          <div className="mt-12 grid gap-6">
            {/* Sections avec icônes */}
            <KnowledgeSection
              title="Mathématiques"
              icon="calculator"
              description="Les mathématiques sont la langue universelle de la science et de la compréhension rationnelle."
            />
            <KnowledgeSection
              title="Programmation"
              icon="code"
              description="La programmation informatique est l'art de donner des instructions à un ordinateur."
            />
            <KnowledgeSection
              title="Data Analytics"
              icon="bar-chart"
              description="La Data Analytics est le processus d'examen et d'interprétation des données."
            />
            <KnowledgeSection
              title="Data Science"
              icon="brain"
              description="La Data Science combine statistiques, analyse de données et apprentissage automatique."
            />
          </div>
        </div>
      </main>

      {/* Table des matières flottante */}
      <aside className="hidden xl:block w-64 border-l bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <ScrollArea className="h-full p-4">
          <TableOfContents />
        </ScrollArea>
      </aside>
    </div>
  );
} 