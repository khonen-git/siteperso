export const SITE_NAV = [
  { href: '/about', messageKey: 'about' },
  { href: '/knowledge', messageKey: 'knowledge' },
  { href: '/dashboards', messageKey: 'dashboards' },
  { href: '/projects', messageKey: 'projects' },
  { href: '/blog', messageKey: 'blog' },
  { href: '/references', messageKey: 'references' },
  { href: '/contact', messageKey: 'contact' },
] as const;

export type SiteNavMessageKey = (typeof SITE_NAV)[number]['messageKey'];
