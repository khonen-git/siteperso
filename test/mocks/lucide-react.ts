import * as React from 'react';

const MoonIcon = () => React.createElement('div', { 'data-testid': 'moon-icon' });
const SunIcon = () => React.createElement('div', { 'data-testid': 'sun-icon' });

export const Moon = MoonIcon;
export const Sun = SunIcon;

const createIcon = (testId: string) => {
  function LucideIcon(props: Record<string, unknown>) {
    return React.createElement('span', { 'data-testid': testId, ...props });
  }
  LucideIcon.displayName = `LucideIcon(${testId})`;
  return LucideIcon;
};

export const ArrowUpRight = createIcon('arrow-up-right');
export const ArrowLeft = createIcon('arrow-left');
export const Calendar = createIcon('calendar');
export const Info = createIcon('info');
export const HelpCircle = createIcon('help-circle');
export const RefreshCw = createIcon('refresh-cw');
export const Maximize2 = createIcon('maximize-2');
export const Minimize2 = createIcon('minimize-2');
export const Rotate3d = createIcon('rotate-3d');
export const Github = createIcon('github');
export const ChevronDown = createIcon('chevron-down');
export const Check = createIcon('check');
export const ChevronRight = createIcon('chevron-right');
export const Search = createIcon('search');
export const X = createIcon('x');
export const Menu = createIcon('menu');
export const Star = createIcon('star');
export const ExternalLink = createIcon('external-link');
