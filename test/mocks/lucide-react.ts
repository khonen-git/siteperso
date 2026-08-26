import * as React from 'react';

const MoonIcon = () => React.createElement('div', { 'data-testid': 'moon-icon' });
const SunIcon = () => React.createElement('div', { 'data-testid': 'sun-icon' });

export const Moon = MoonIcon;
export const Sun = SunIcon;

const createIcon =
  (testId: string) =>
  (props: Record<string, unknown>) =>
    React.createElement('span', { 'data-testid': testId, ...props });

export const ArrowUpRight = createIcon('arrow-up-right');
export const ArrowLeft = createIcon('arrow-left');
export const Calendar = createIcon('calendar');
export const Info = createIcon('info');
export const ChevronDown = createIcon('chevron-down');
export const ChevronRight = createIcon('chevron-right');
export const Search = createIcon('search');
export const X = createIcon('x');
export const Menu = createIcon('menu');
