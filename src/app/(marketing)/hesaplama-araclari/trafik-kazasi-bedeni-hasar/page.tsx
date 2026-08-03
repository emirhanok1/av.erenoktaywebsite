import { Metadata } from 'next'
import { SITE } from '@/constants/site'
import { ROUTES } from '@/constants/routes'
import { JsonLd } from '@/components/JsonLd'
import { getBreadcrumbSchema } from '@/lib/schemas/breadcrumb'
import BodilyInjuryForm from '@/features/calculators/components/BodilyInjuryForm'

export const metadata: Metadata = {
  title: 'Trafik Kazası Bedeni Hasar Bilgi Formu',
  description: 'Trafik kazası kaynaklı yaralanma/maluliyet durumunuz için bilgilerinizi iletin, tarafınızla iletişime geçelim.',
  alternates: { canonical: `${SITE.url}${ROUTES.TOOLS_BODILY_INJURY}` },
}

export default function BodilyInjuryPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Anasayfa', path: '/' },
    { name: 'Hesaplama Araçları', path: ROUTES.TOOLS },
    { name: 'Trafik Kazası Bedeni Hasar', path: ROUTES.TOOLS_BODILY_INJURY },
  ])

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={breadcrumbSchema} />
      <section className="bg-navy pt-32 pb-16 text-white text-center">
        <div className="container">
          <h1 className="font-heading text-3xl md:text-4xl text-white">Trafik Kazası Bedeni Hasar Bilgi Formu</h1>
          <p className="text-white/70 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Kaza bilgilerinizi iletin, durumunuzu değerlendirip sizinle iletişime geçelim.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white flex-grow">
        <div className="container max-w-2xl">
          <BodilyInjuryForm />
        </div>
      </section>
    </div>
  )
}
