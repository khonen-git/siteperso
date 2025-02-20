import * as React from 'react';
import Link from 'next/link';

const Footer = (): React.JSX.Element => {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            © 2024 Théo Knoepflin. Tous droits réservés.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="https://github.com/khonen-git"
            target="_blank"
            rel="noreferrer"
            className="text-sm underline underline-offset-4"
          >
            GitHub
          </Link>
          <Link
            href="https://linkedin.com/in/theo-knoepflin"
            target="_blank"
            rel="noreferrer"
            className="text-sm underline underline-offset-4"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 