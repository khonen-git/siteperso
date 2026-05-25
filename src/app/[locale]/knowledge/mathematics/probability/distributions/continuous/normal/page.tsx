'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { KnowledgeLayout } from '@/components/layouts/KnowledgeLayout';
import FrNormal from '@/content/fr/knowledge/mathematics/probability/distributions/continuous/normal.mdx';
import EnNormal from '@/content/en/knowledge/mathematics/probability/distributions/continuous/normal.mdx';

export default function NormalDistributionPage(): React.JSX.Element {
  const locale = useLocale();
  const Content = locale === 'en' ? EnNormal : FrNormal;

  return (
    <KnowledgeLayout>
      <Content />
    </KnowledgeLayout>
  );
}
