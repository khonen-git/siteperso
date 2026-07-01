import type { JSX } from 'react';
import { MdxDistributionVisualizer } from '@/components/mdx/MdxDistributionVisualizer';
import { normalDistribution } from '@/lib/distributions/normal';

/** Visualiseur loi normale — config intégrée pour le rendu MDX remote. */
export function MdxNormalDistributionVisualizer(): JSX.Element {
  return <MdxDistributionVisualizer distribution={normalDistribution} />;
}
