import { Metadata } from 'next'
import { SITE } from '@/constants/site'
import { ROUTES } from '@/constants/routes'
import { JsonLd } from '@/components/JsonLd'
import { getBreadcrumbSchema } from '@/lib/schemas/breadcrumb'
import { AnimatedReveal } from '@/features/home/components/AnimatedReveal'
import BodilyInjuryForm from '@/features/calculators/components/BodilyInjuryForm'

export const metadata: Metadata = {
  title: 'Trafik Kazası Bedeni Hasar Bilgi Formu',
  description: 'Trafik kazası kaynaklı yaralanma/maluliyet durumunuz için bilgilerinizi iletin, tarafınızla iletişime geçelim.',
  alternates: { canonical: `${SITE.url}${ROUTES.TOOLS_BODILY_INJURY}` },
}

const KAPSAM_ETIKETLERI = ['Maddi Tazminat', 'Manevi Tazminat', 'Tedavi Gideri', 'Kazanç Kaybı', 'SGK Süreci', 'Sigorta Süreci']

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

      {/* Açıklama */}
      <section className="bg-white py-20 lg:py-[100px]" aria-labelledby="bedeni-hasar-title">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <AnimatedReveal>
            <span className="text-accent font-heading font-medium tracking-[0.2em] text-xs uppercase flex items-center justify-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-accent inline-block" />
              BU FORM NE İŞE YARAR
              <span className="w-12 h-[1px] bg-accent inline-block" />
            </span>
            <h2 id="bedeni-hasar-title" className="text-2xl md:text-3xl font-heading text-navy mb-6 leading-tight">
              Yaralanma veya maluliyet durumunda <em className="text-accent italic font-light">haklarınız</em> vardır
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
              Trafik kazası sonucu yaralanma veya kalıcı maluliyet yaşadıysanız; tedavi giderleriniz, kazanç kaybınız ve varsa bakım ihtiyacınız için maddi, ayrıca yaşadığınız acı ve ızdırap için manevi tazminat talep etme hakkınız doğabilir. Süreç genellikle SGK ile başlar, karşı tarafın trafik sigortası ve gerekirse Güvence Hesabı ile devam eder. Bu form, durumunuzu ön bilgilendirme amacıyla değerlendirebilmemiz için hazırlandı; doldurup gönderdiğinizde size dönüş yaparız.
            </p>
          </AnimatedReveal>

          <AnimatedReveal delay={0.15} className="flex flex-wrap justify-center gap-3">
            {KAPSAM_ETIKETLERI.map((etiket) => (
              <span
                key={etiket}
                className="px-4 py-2 rounded-full border border-accent/30 text-navy text-xs font-semibold tracking-wide bg-[#f8f9fa]"
              >
                {etiket}
              </span>
            ))}
          </AnimatedReveal>
        </div>
      </section>

      <section className="py-24 bg-[#f8f9fa] flex-grow">
        <div className="container max-w-2xl">
          <BodilyInjuryForm />
        </div>
      </section>
    </div>
  )
}
