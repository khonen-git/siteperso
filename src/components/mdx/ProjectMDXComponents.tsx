import { Link } from '@/i18n/navigation';
import { mdxBaseComponents, ProjectImages, ProjectImage } from '@/components/mdx/mdxBaseComponents';

/** Lightweight MDX map for project pages — avoids blog figures and heavy visualizers. */
const ProjectMDXComponents = {
  ...mdxBaseComponents,
  Link,
  ProjectImages,
  ProjectImage,
};

export default ProjectMDXComponents;
