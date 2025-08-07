import { ContentContainer } from './components/ContentContainer';
import { MDXRenderer } from './components/MDXRenderer';
import { BackButton } from '../../common/BackButton';
import { projectContentStyles as styles } from './styles';
import type { ProjectContentProps } from '../../types';

export function ProjectContent({ content, meta }: ProjectContentProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ContentContainer className={styles.content}>
          <MDXRenderer content={content} />
        </ContentContainer>

        <BackButton
          href="/projects"
          label="Retour aux projets"
          className={styles.backButton}
        />
      </div>
    </section>
  );
}