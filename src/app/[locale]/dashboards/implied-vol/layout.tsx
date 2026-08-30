import * as React from 'react';

interface ImpliedVolLayoutProps {
  children: React.ReactNode;
}

export default function ImpliedVolLayout({
  children,
}: ImpliedVolLayoutProps): React.JSX.Element {
  return (
    <div className="fixed inset-x-0 top-14 bottom-0 flex flex-col overflow-hidden bg-background">
      {children}
    </div>
  );
}
