export type DashboardStatus = 'live' | 'coming_soon';

export interface DashboardEntry {
  id: string;
  status: DashboardStatus;
  href: string;
  projectSlug?: string;
  githubUrl?: string;
}

const DASHBOARDS: DashboardEntry[] = [
  {
    id: 'implied-vol',
    status: 'live',
    href: '/dashboards/implied-vol',
    projectSlug: 'implied-volatility-surface',
    githubUrl: 'https://github.com/khonen-git/ImpliedVolatilitySurface',
  },
];

export function getDashboardEntry(id: string): DashboardEntry | undefined {
  return DASHBOARDS.find((d) => d.id === id);
}

export function getLiveDashboards(): DashboardEntry[] {
  return DASHBOARDS.filter((d) => d.status === 'live');
}
