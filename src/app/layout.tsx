import * as React from 'react';

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps): React.ReactNode {
  return children;
}
