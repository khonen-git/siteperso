'use client';

import * as React from 'react';
import { KnowledgeLayout } from '@/components/layouts/KnowledgeLayout';
import * as statisticalTestsContent from '@/content/knowledge/mathematics/statistics/inductive/statistical-tests/index.mdx';

export default function StatisticalTestsPage() {
  return (
    <KnowledgeLayout content={statisticalTestsContent} />
  );
} 