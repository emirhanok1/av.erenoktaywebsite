import { Metadata } from 'next'
import Link from 'next/link'
import { Calculator, Car, HeartPulse, ArrowRight } from 'lucide-react'
import { SITE } from '@/constants/site'
import { ROUTES } from '@/constants/routes'
import { JsonLd } from '@/components/JsonLd'
import { getBreadcrumbSchema } from '@/lib/schemas/breadcrumb'
import { AnimatedReveal } from '@/features/home/components/AnimatedReveal'
import PageHero from '@/components/common/PageHero'
import ClosingRibbon from '@/components/common/ClosingRibbon'

export const metadata: Metadata = {
  title: 'Hesaplama Araçları',
  description: 'Kıdem ve ihbar tazminatı hesaplama aracı, araç değer kaybı ve trafik kazası bedeni hasar bilgi formları.',
  alternates: { canonical: `${SITE.url}${ROUTES.TOOLS}` },
}

const TOOLS = [
  {
    id: 1,
    title: 'Kıdem ve İhbar Tazminatı Hesaplama',
    description: '2026 güncel tavan ve damga vergisi oranlarıyla tahmini hesaplama yapın.',
    href: ROUTES.TOOLS_SEVERANCE,
    icon: <Calculator className="text-accent" strokeWidth={1.5} size={28} />,
  },
  {
    id: 2,
    title: 'Araç Değer Kaybı Bilgi Formu',
    description: 'Kaza sonrası değer kaybı talebiniz için bilgilerinizi iletin, size dönüş yapalım.',
    href: ROUTES.TOOLS_VEHICLE_VALUE_LOSS,
    icon: <Car className="text-accent" strokeWidth={1.5} size={28} />,
  },
  {
    id: 3,
    title: 'Trafik Kazası Bedeni Hasar Bilgi Formu',
    description: 'Yaralanma veya maluliyet durumunuz için bilgilerinizi iletin, durumunuzu değerlendirelim.',
    href: ROUTES.TOOLS_BODILY_INJURY,
    icon: <HeartPulse className="text-accent" strokeWidth={1.5} size={28} />,
  },
]

export default function ToolsHubPage() {
  const breadcrumbItems = [
    { name: 'Anasayfa', path: '/' },
    { name: 'Hesaplama Araçları', path: ROUTES.TOOLS },
  ]
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems)

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={breadcrumbSchema} />
      <PageHero
        eyebrow="Ücretsiz Araçlar"
        title="Hesaplama Araçları"
        description="Hukuki süreçlerinizde size yol gösterecek araçlar ve bilgi formları."
        breadcrumb={breadcrumbItems}
      />

      <section className="bg-white py-20 lg:py-[100px] flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 border-l border-t border-gray-200">
            {TOOLS.map((tool, index) => (
              <AnimatedReveal
                key={tool.id}
                delay={index * 0.15}
                className="group border-r border-b border-gray-200 p-8 lg:p-[44px_38px] hover:bg-gray-50 transition-colors duration-500 relative flex flex-col h-full overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="w-14 h-14 border border-accent/30 rounded-lg flex items-center justify-center mb-8 bg-white transition-all duration-500 group-hover:bg-gold group-hover:border-gold group-hover:-translate-y-1 group-hover:-rotate-[4deg]">
                  {tool.icon}
                </div>
                <h3 className="text-xl font-heading text-navy mb-4 leading-tight">
                  {tool.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                  {tool.description}
                </p>
                <Link
                  href={tool.href}
                  className="inline-flex items-center gap-3 text-navy font-semibold text-xs tracking-widest uppercase mt-auto group/link"
                >
                  <span>Devam Et</span>
                  <ArrowRight size={16} className="text-accent transition-all duration-300 group-hover:text-gold group-hover:translate-x-1.5" />
                </Link>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingRibbon quote="Sonucunuzda net bir yanıt bulamadınız mı?" ctaText="Avukatla Görüşün" />
    </div>
  )
}
