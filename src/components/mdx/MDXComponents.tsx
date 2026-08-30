import { MathBlock, MathInline } from '@/components/features/knowledge/math/MathBlock';
import { CodeBlock } from '@/components/features/knowledge/math/CodeBlock';
import { MdxCard } from '@/components/mdx/MdxCard';
import { MdxDistributionVisualizer } from '@/components/mdx/MdxDistributionVisualizer';
import { MdxNormalDistributionVisualizer } from '@/components/mdx/MdxNormalDistributionVisualizer';
import { ConsoleOutput } from '@/components/mdx/ConsoleOutput';
import { CommandSwitch } from '@/components/mdx/CommandSwitch';
import { NotaBene } from '@/components/mdx/NotaBene';
import { InfoTooltip, InfoTooltipProvider } from '@/components/mdx/InfoTooltip';
import { TermTip } from '@/components/mdx/TermTip';
import { OptionPayoffVisualizer } from '@/components/mdx/OptionPayoffVisualizer';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Link } from '@/i18n/navigation';
import { mdxBaseComponents, ProjectImages, ProjectImage } from '@/components/mdx/mdxBaseComponents';
import {
  CompressionAblationFigure,
  CompressionV1V1bFigure,
} from '@/components/blog/figures/CompressionExpansionFigures';
import { HmmAucOnsetMidFigure, HmmCifFigure } from '@/components/blog/figures/HmmSlopeFigures';
import {
  MultiScaleEvNetFigure,
  MultiScaleGatesFigure,
} from '@/components/blog/figures/MultiScaleFigures';
import { StochAucRawVsAltFigure } from '@/components/blog/figures/StochAucRawVsAltFigure';
import { StochSamplingBiasFigure } from '@/components/blog/figures/StochSamplingBiasFigure';
import {
  Tr8drDeltaHitFigure,
  Tr8drValidOosFigure,
} from '@/components/blog/figures/Tr8drTrendFigures';

export { ProjectImages, ProjectImage } from '@/components/mdx/mdxBaseComponents';

const MDXComponents = {
  ...mdxBaseComponents,
  Link,
  ProjectImages,
  ProjectImage,
  MathBlock,
  MathInline,
  CodeBlock,
  MdxCard,
  MdxDistributionVisualizer,
  MdxNormalDistributionVisualizer,
  ConsoleOutput,
  CommandSwitch,
  NotaBene,
  InfoTooltip,
  InfoTooltipProvider,
  TermTip,
  OptionPayoffVisualizer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  StochSamplingBiasFigure,
  StochAucRawVsAltFigure,
  MultiScaleGatesFigure,
  MultiScaleEvNetFigure,
  HmmCifFigure,
  HmmAucOnsetMidFigure,
  Tr8drDeltaHitFigure,
  Tr8drValidOosFigure,
  CompressionV1V1bFigure,
  CompressionAblationFigure,
};

export default MDXComponents;
