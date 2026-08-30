'use client';

import * as React from 'react';

export function useDashboardFocusMode() {
  const [isFocused, setIsFocused] = React.useState(false);

  React.useEffect(() => {
    if (!isFocused) return;

    document.body.classList.add('iv-dashboard-focus');

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsFocused(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('iv-dashboard-focus');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isFocused]);

  const toggle = React.useCallback(() => {
    setIsFocused((value) => !value);
  }, []);

  return { isFocused, toggle, setIsFocused };
}
