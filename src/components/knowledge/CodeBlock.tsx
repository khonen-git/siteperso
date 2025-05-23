"use client";

import React from 'react';

interface CodeBlockProps {
  children: string;
  language: string;
}

export function CodeBlock({ children, language }: CodeBlockProps): React.JSX.Element {
  return (
    <div className="code-block relative my-4">
      <div className="code-language absolute top-2 right-2 text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
        {language}
      </div>
      
      <pre className={`language-${language} p-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto`}>
        <code>{children}</code>
      </pre>
    </div>
  );
} 