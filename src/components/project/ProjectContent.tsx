'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MDXRemote } from 'next-mdx-remote';
import MDXComponents from '@/components/mdx/MDXComponents';

interface ProjectContentProps {
  content: Parameters<typeof MDXRemote>[0];
}

export function ProjectContent({ content }: ProjectContentProps) {
  const t = useTranslations('projects.detail');

  return (
    <section className="container py-16">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-lg dark:prose-invert"
        >
          <MDXRemote {...content} components={MDXComponents} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Button asChild>
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('backToList')}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default ProjectContent;
