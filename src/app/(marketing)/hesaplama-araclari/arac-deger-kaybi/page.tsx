import { Metadata } from 'next'
import { SITE } from '@/constants/site'
import { ROUTES } from '@/constants/routes'
import { JsonLd } from '@/components/JsonLd'
import { getBreadcrumbSchema } from '@/lib/schemas/breadcrumb'
import VehicleValueLossForm from '@/features/calculators/components/VehicleValueLossForm'

export const metadata: Metadata = {
  title: 'Araç Değer Kaybı Bilgi Formu',
  description: 'Trafik kazası sonrası araç değer kaybı talebiniz için bilgilerinizi iletin, tarafınızla iletişime geçelim.',
  alternates: { canonical: `${SITE.url}${ROUTES.TOOLS_VEHICLE_VALUE_LOSS}` },
}

export default function VehicleValueLossPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Anasayfa', path: '/' },
    { name: 'Hesaplama Araçları', path: ROUTES.TOOLS },
    { name: 'Araç Değer Kaybı', path: ROUTES.TOOLS_VEHICLE_VALUE_LOSS },
  ])

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={breadcrumbSchema} />
      <section className="bg-navy pt-32 pb-16 text-white text-center">
        <div className="container">
          <h1 className="font-heading text-3xl md:text-4xl text-white">Araç Değer Kaybı Bilgi Formu</h1>
          <p className="text-white/70 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Kaza bilgilerinizi iletin, durumunuzu değerlendirip sizinle iletişime geçelim.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white flex-grow">
        <div className="container max-w-2xl">
          <VehicleValueLossForm />
        </div>
      </section>
    </div>
  )
}
