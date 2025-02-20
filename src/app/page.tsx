import * as React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { LatestUpdates } from '@/components/sections/LatestUpdates';
import { RecentProjects } from '@/components/sections/RecentProjects';

export default function Home(): React.JSX.Element {
  return (
    <>
      <HeroSection 
        title="Data Analyst & Développeur" 
        subtitle="Passionné par la data science et le développement web"
        description="Je transforme des données complexes en insights actionnables et crée des applications web modernes."
      />
      <LatestUpdates />
      <RecentProjects />
    </>
  );
}
