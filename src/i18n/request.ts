import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const [common, home, contact, projects, knowledge] = await Promise.all([
    import(`../../messages/${locale}/common.json`),
    import(`../../messages/${locale}/home.json`),
    import(`../../messages/${locale}/contact.json`),
    import(`../../messages/${locale}/projects.json`),
    import(`../../messages/${locale}/knowledge.json`),
  ]);

  return {
    locale,
    messages: {
      common: common.default,
      home: home.default,
      contact: contact.default,
      projects: projects.default,
      knowledge: knowledge.default,
    },
  };
});
