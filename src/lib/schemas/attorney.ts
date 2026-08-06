import { SITE } from '@/constants/site'

export function getAttorneyPersonSchema(photoUrl?: string | null) {
  const image = photoUrl
    ? (photoUrl.startsWith('http') ? photoUrl : `${SITE.url}${photoUrl}`)
    : `${SITE.url}/images/eren-oktay.webp`

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Eren Oktay',
    jobTitle: 'Avukat',
    image,
    url: `${SITE.url}/hakkimizda`,
    email: SITE.email,
    telephone: '+90 507 400 71 40',
    worksFor: {
      '@type': 'LegalService',
      name: SITE.name,
      url: SITE.url,
    },
    memberOf: {
      '@type': 'Organization',
      name: 'Ankara Barosu',
    },
  }
}
