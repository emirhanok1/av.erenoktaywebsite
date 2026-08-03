import { Metadata } from 'next'
import { SITE } from '@/constants/site'
import { ROUTES } from '@/constants/routes'
import { JsonLd } from '@/components/JsonLd'
import { getBreadcrumbSchema } from '@/lib/schemas/breadcrumb'
import SeveranceCalculatorForm from '@/features/calculators/components/SeveranceCalculatorForm'

export const metadata: Metadata = {
  title: 'Kıdem ve İhbar Tazminatı Hesaplama',
  description: '2026 güncel tavan ve damga vergisi oranlarıyla kıdem ve ihbar tazminatınızı tahmini olarak hesaplayın.',
  alternates: { canonical: `${SITE.url}${ROUTES.TOOLS_SEVERANCE}` },
}

export default function SeveranceCalculatorPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Anasayfa', path: '/' },
    { name: 'Hesaplama Araçları', path: ROUTES.TOOLS },
    { name: 'Kıdem ve İhbar Tazminatı', path: ROUTES.TOOLS_SEVERANCE },
  ])

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={breadcrumbSchema} />
      <section className="bg-navy pt-32 pb-16 text-white text-center">
        <div className="container">
          <h1 className="font-heading text-3xl md:text-4xl text-white">Kıdem ve İhbar Tazminatı Hesaplama</h1>
          <p className="text-white/70 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            2026 yılı güncel tavan ve damga vergisi oranlarıyla tahmini hesaplama yapın.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white flex-grow">
        <div className="container max-w-2xl">
          <SeveranceCalculatorForm />
        </div>
      </section>
    </div>
  )
}
