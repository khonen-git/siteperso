import React from 'react';

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps): React.JSX.Element {
  return (
    <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 fixed top-[64px] left-0 right-0 z-50">
      <div 
        className="h-full bg-blue-500 dark:bg-blue-400 transition-all duration-300 ease-out"
        style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
      />
    </div>
  );
} 