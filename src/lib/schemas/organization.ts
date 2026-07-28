import { SITE } from '@/constants/site'

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}${SITE.logo}`,
    email: SITE.email,
    telephone: '+90 507 400 71 40',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      addressLocality: 'Ankara',
      addressRegion: 'Ankara',
      streetAddress: 'Aşağı Öveçler Mahallesi, 1331. Cadde No: 3/3, Çankaya',
    },
  }
}
