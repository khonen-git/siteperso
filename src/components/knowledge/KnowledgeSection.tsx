import * as React from 'react';
import { Icons } from '@/components/icons';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface KnowledgeSectionProps {
  title: string;
  icon: keyof typeof Icons;
  description: string;
}

export function KnowledgeSection({ title, icon, description }: KnowledgeSectionProps) {
  const Icon = Icons[icon];

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-center space-x-4">
          {Icon && <Icon className="h-6 w-6 text-primary" />}
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
} 