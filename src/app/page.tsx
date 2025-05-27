import * as React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { LatestUpdates } from '@/components/sections/LatestUpdates';
import { RecentProjects } from '@/components/sections/RecentProjects';

export default function Home(): React.JSX.Element {
  return (
    <>
      <HeroSection 
        title="Théo Charron" 
        subtitle="Data Analyst"
        description="J'analyse des données pour en tirer des informations clés qui aident à la prise de décision"
      />
      <LatestUpdates />
      <RecentProjects />
    </>
  );
}
