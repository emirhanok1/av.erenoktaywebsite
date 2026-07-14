import { SITE } from '@/constants/site'

export function getLegalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'LocalBusiness'],
    name: SITE.name,
    url: SITE.url,
    telephone: '+90 555 555 5555',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      addressLocality: 'İstanbul',
    },
    areaServed: 'İstanbul',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:30',
      },
    ],
  }
}
