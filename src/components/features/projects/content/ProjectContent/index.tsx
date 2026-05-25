'use client';

import { useTranslations } from 'next-intl';
import { ContentContainer } from './components/ContentContainer';
import { MDXRenderer } from './components/MDXRenderer';
import { BackButton } from '../../common/BackButton';
import { projectContentStyles as styles } from './styles';
import type { ProjectContentProps } from '../../types';

export function ProjectContent({ content }: ProjectContentProps) {
  const t = useTranslations('projects.detail');

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ContentContainer className={styles.content}>
          <MDXRenderer content={content} />
        </ContentContainer>

        <BackButton
          href="/projects"
          label={t('backToList')}
          className={styles.backButton}
        />
      </div>
    </section>
  );
}
