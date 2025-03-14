'use client';

import * as React from 'react';
import { KnowledgeLayout } from '@/components/layouts/KnowledgeLayout';
import * as normalContent from '@/content/knowledge/mathematics/probability/distributions/continuous/normal.mdx';

export default function NormalDistributionPage() {
  return (
    <KnowledgeLayout content={normalContent} />
  );
} 