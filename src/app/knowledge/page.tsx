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
                Bienvenue dans mon répertoire de connaissances personnelles. Ici, je partage un condensé de diverses notions que j'ai pu acquérir tout au long de mon parcours. Ce répertoire est organisé en différentes sections avec chacune leur propre thématique. Vous pouvez y naviguer dans la barre latérale gauche et accédez aux informations de la thématique en cliquant dessus ou allez dans les sous thématiques en cliquant sur la flèche à côté du titre de la thématique. Vous pouvez également naviguer dans la page avec la table des matières à droite de la page.
              </p>
              <p>
                Il est important de noter que ce répertoire n'est pas conçu comme un cours classique, mais plutôt comme une synthèse de chaque notion avec les éléments essentiels à connaître. Nombreux sont les cours et les outils qui permettent d'apprendre ces notions, si vous souhaitez mieux apprendre un sujet, je vous invite à faire vos propres recherches sur des cours ou de demander des explications plus détaillées à des LLM comme ChatGPT. Avec tout le flux d'information que nous recevons, nous oublions vite et retenons peu. Ce repertoire permet de revoir rapidement ces notions et des éléments qui auraient été oubliés.
              </p>
            </div>
          </section>

          <section id="knowledge__mathematics" className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight">Mathématiques</h2>
            
            <div className="prose prose-gray dark:prose-invert max-w-none space-y-4">
              <p>
                Dans la partie mathématiques, je partage des notions théoriques importantes, principalement sur les probabilités et les statistiques. J'y ai aussi mis en place des visuels dynamiques pour visualiser des fonctions comme les distributions de probabilités et des éléments de code liés à ces notions.
              </p>
            </div>
          </section>

          <section id="knowledge__programming" className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight">Programmation</h2>
            
            <div className="prose prose-gray dark:prose-invert max-w-none space-y-4">
              <p>
                La partie programmation est un peu différente par rapport à ce qui peut se faire habituellement dans un cours de programmation. Je me focalise plus sur les concepts et les principes algorithmiques que ce soit en général ou dans des langages de programmation spécifiques plutôt que sur le code en lui même. La réelle difficulté d'un programmeur n'est pas dans la rédaction du code ou du langage de programmation, mais dans la compréhension générale d'un système ou d'une application, les différentes problématiques qui peuvent survenir et comment les résoudre
              </p>
            </div>
          </section>

          <section id="knowledge__programming" className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight">Data</h2>
            
            <div className="prose prose-gray dark:prose-invert max-w-none space-y-4">
              <p>
                La data est devenu en enjeu majeur dans les entreprises. L'importance des données est de plus en plus conscientisée et les entreprises cherchent à exploiter ces données pour améliorer leurs performances, leur organisation ou leur logistique et avoir des solutions data driven permettant de meilleurs prises de décision sur leurs stratégies. La gouvernance des données n'est pas à mettre en second plan et il est important de guider les entreprises dans la gestion de leurs données.
              </p>
            </div>
          </section>

          <section id="knowledge__programming" className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight">Finance</h2>
            
            <div className="prose prose-gray dark:prose-invert max-w-none space-y-4">
              <p>

              </p>
            </div>
          </section>

          <section id="knowledge__programming" className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight">Outils</h2>
            
            <div className="prose prose-gray dark:prose-invert max-w-none space-y-4">
              <p>

              </p>
            </div>
          </section>
          
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