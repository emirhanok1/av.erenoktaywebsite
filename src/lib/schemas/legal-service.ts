import { SITE } from '@/constants/site'

export function getLegalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'LocalBusiness'],
    name: SITE.name,
    url: SITE.url,
    telephone: '+90 507 400 71 40',
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      addressLocality: 'Ankara',
      addressRegion: 'Ankara',
      streetAddress: 'Aşağı Öveçler Mahallesi, 1331. Cadde No: 3/3, Çankaya',
    },
    areaServed: 'Ankara',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
  }
}
