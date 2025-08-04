'use client';

import * as React from 'react';
import { KnowledgeSidebar } from '@/components/knowledge/KnowledgeSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CodeBlock } from '@/components/knowledge/CodeBlock';
import { MathBlock, MathInline } from '@/components/knowledge/Math';
import { TableOfContents } from '@/components/knowledge/TableOfContents';
import { Progress } from '@/components/ui/progress';

export default function StatisticalTestsPage() {
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="flex min-h-screen relative">
      {/* Sidebar gauche fixe */}
      <aside className="fixed top-[64px] left-0 w-64 h-[calc(100vh-64px)] border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <ScrollArea className="h-full">
          <KnowledgeSidebar />
        </ScrollArea>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 ml-64 mr-64">
        {/* Barre de progression fixe */}
        <div className="fixed left-[16rem] right-64 top-[64px] z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Progress value={scrollProgress} className="w-full h-1" />
        </div>

        <div className="max-w-5xl mx-auto mt-[64px]">
          <article className="space-y-8 px-8">
            <header className="space-y-4">
              <h1 className="text-4xl font-bold">Tests Statistiques</h1>
              <p className="text-lg text-muted-foreground">
                Guide complet des tests statistiques : de la théorie à la pratique, pour choisir et appliquer le test approprié à vos données.
              </p>
            </header>

            <section id="introduction" className="space-y-4">
              <h2 className="text-2xl font-semibold">Introduction</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <p>
                      Un test statistique est une procédure de décision permettant d'évaluer une hypothèse statistique 
                      à partir d'un échantillon de données. L'objectif est de quantifier l'évidence contre une hypothèse 
                      nulle{' '}<MathInline>H_0</MathInline>{' '}en faveur d'une hypothèse alternative{' '}<MathInline>H_1</MathInline>.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-xl font-medium mb-2">Processus de test</h3>
                        <ol className="list-decimal pl-6 space-y-2">
                          <li>Formulation des hypothèses</li>
                          <li>Choix du test approprié</li>
                          <li>Vérification des conditions d'application</li>
                          <li>Calcul de la statistique de test</li>
                          <li>Décision statistique</li>
                        </ol>
                      </div>
                      <div>
                        <h3 className="text-xl font-medium mb-2">Éléments clés</h3>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Niveau de signification (α)</li>
                          <li>P-valeur</li>
                          <li>Puissance du test (1-β)</li>
                          <li>Taille d'effet</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="key-concepts" className="space-y-4">
              <h2 className="text-2xl font-semibold">Concepts clés</h2>
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Concept</TableHead>
                        <TableHead>Définition</TableHead>
                        <TableHead>Importance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Hypothèse nulle (H₀)</TableCell>
                        <TableCell>Hypothèse par défaut que l'on cherche à rejeter</TableCell>
                        <TableCell>Définit le cadre de référence pour l'analyse</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Hypothèse alternative (H₁)</TableCell>
                        <TableCell>Hypothèse concurrente que l'on cherche à établir</TableCell>
                        <TableCell>Représente l'effet ou la différence recherchée</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Erreur de Type I (α)</TableCell>
                        <TableCell>Rejeter H₀ alors qu'elle est vraie</TableCell>
                        <TableCell>Risque de faux positif, fixé a priori</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Erreur de Type II (β)</TableCell>
                        <TableCell>Ne pas rejeter H₀ alors qu'elle est fausse</TableCell>
                        <TableCell>Risque de faux négatif, dépend de la taille d'effet</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>P-valeur</TableCell>
                        <TableCell>{' '}<MathInline>{"P(T \\geq t_{\\text{obs}}|H_0)"}</MathInline>{' '}</TableCell>
                        <TableCell>Mesure de l'évidence contre H₀</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Puissance</TableCell>
                        <TableCell>{' '}<MathInline>{"1-\\beta = P(\\text{Rejeter }H_0|H_1)"}</MathInline>{' '}</TableCell>
                        <TableCell>Capacité à détecter un effet réel</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Taille d'effet</TableCell>
                        <TableCell>Magnitude de l'effet observé</TableCell>
                        <TableCell>Mesure l'importance pratique du résultat</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-medium mb-4">Interprétation de la p-valeur</h3>
                  <div className="space-y-4">
                    <p>La p-valeur est souvent mal interprétée. Voici les points clés à retenir :</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Une p-valeur n'est PAS la probabilité que H₀ soit vraie</li>
                      <li>Une p-valeur n'est PAS la probabilité de faire une erreur en rejetant H₀</li>
                      <li>Une p-valeur n'est PAS une mesure de la taille ou de l'importance de l'effet</li>
                      <li>Une p-valeur est la probabilité d'observer des données aussi ou plus extrêmes que celles observées, sous H₀</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="test-classification" className="space-y-4">
              <h2 className="text-2xl font-semibold">Classification des tests</h2>
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type de données</TableHead>
                        <TableHead>Tests paramétriques</TableHead>
                        <TableHead>Tests non paramétriques</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Un échantillon quantitatif</TableCell>
                        <TableCell>Test Z, Test t de Student</TableCell>
                        <TableCell>Test de Wilcoxon</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Deux échantillons indépendants</TableCell>
                        <TableCell>Test t de Student</TableCell>
                        <TableCell>Test de Mann-Whitney</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Deux échantillons appariés</TableCell>
                        <TableCell>Test t apparié</TableCell>
                        <TableCell>Test de Wilcoxon signé</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Plus de deux groupes</TableCell>
                        <TableCell>ANOVA</TableCell>
                        <TableCell>Test de Kruskal-Wallis</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Variables qualitatives</TableCell>
                        <TableCell>Test du χ²</TableCell>
                        <TableCell>Test exact de Fisher</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Corrélation</TableCell>
                        <TableCell>Test de Pearson</TableCell>
                        <TableCell>Test de Spearman</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-medium mb-4">Arbre de décision</h3>
                  <CodeBlock language="python">
                    {`
import graphviz

# Création du graphe
dot = graphviz.Digraph(comment='Arbre de décision pour les tests statistiques')
dot.attr(rankdir='TB')

# Ajout des nœuds
dot.node('A', 'Type de données ?')
dot.node('B', 'Quantitatives')
dot.node('C', 'Qualitatives')
dot.node('D', 'Nombre de groupes ?')
dot.node('E', 'Test du χ²\\nou Fisher')
dot.node('F', '1 groupe')
dot.node('G', '2 groupes')
dot.node('H', '> 2 groupes')
dot.node('I', 'Normalité ?')
dot.node('J', 'Appariés ?')
dot.node('K', 'ANOVA')
dot.node('L', 'Test Z/t')
dot.node('M', 'Wilcoxon')
dot.node('N', 'Test t')
dot.node('O', 'Mann-Whitney')
dot.node('P', 'Test t apparié')
dot.node('Q', 'Wilcoxon signé')

# Ajout des arêtes
dot.edge('A', 'B', 'Quantitatives')
dot.edge('A', 'C', 'Qualitatives')
dot.edge('B', 'D')
dot.edge('C', 'E')
dot.edge('D', 'F', '1')
dot.edge('D', 'G', '2')
dot.edge('D', 'H', '> 2')
dot.edge('F', 'I')
dot.edge('G', 'J')
dot.edge('H', 'K')
dot.edge('I', 'L', 'Oui')
dot.edge('I', 'M', 'Non')
dot.edge('J', 'P', 'Oui')
dot.edge('J', 'N', 'Non')
dot.edge('N', 'O', 'Non normal')

# Affichage du graphe
dot.render('decision_tree', format='png', cleanup=True)
`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </section>

          </article>
        </div>
      </main>

      {/* Table des matières flottante fixe */}
      <aside className="fixed top-[64px] right-0 w-64 h-[calc(100vh-64px)] border-l bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <ScrollArea className="h-full p-4">
          <TableOfContents />
        </ScrollArea>
      </aside>
    </div>
  );
} 