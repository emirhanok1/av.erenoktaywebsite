import { Metadata } from 'next'
import { CheckCircle2 } from 'lucide-react'
import { SITE } from '@/constants/site'
import { ROUTES } from '@/constants/routes'
import { JsonLd } from '@/components/JsonLd'
import { getBreadcrumbSchema } from '@/lib/schemas/breadcrumb'
import { AnimatedReveal } from '@/features/home/components/AnimatedReveal'
import SeveranceCalculatorForm from '@/features/calculators/components/SeveranceCalculatorForm'

export const metadata: Metadata = {
  title: 'Kıdem ve İhbar Tazminatı Hesaplama',
  description: '2026 güncel tavan ve damga vergisi oranlarıyla kıdem ve ihbar tazminatınızı tahmini olarak hesaplayın.',
  alternates: { canonical: `${SITE.url}${ROUTES.TOOLS_SEVERANCE}` },
}

const HAZIRLIK_LISTESI = [
  'İşe giriş ve işten çıkış tarihiniz',
  'Aylık çıplak brüt maaşınız',
  'Varsa aylık yol/yemek yardımı ve yıllık ikramiye tutarınız',
  'Fesih türünüz: işveren mi çıkardı, haklı nedenle mi ayrıldınız, yoksa istifa mı ettiniz',
]

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

      {/* Açıklama */}
      <section className="bg-white py-20 lg:py-[100px]" aria-labelledby="kidem-nedir-title">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-start">
            <AnimatedReveal>
              <span className="text-gold-700 font-heading font-semibold tracking-[0.2em] text-xs uppercase flex items-center gap-4 mb-6">
                <span className="w-12 h-[1px] bg-accent inline-block" />
                BU ARAÇ NE İŞE YARAR
              </span>
              <h2 id="kidem-nedir-title" className="text-2xl md:text-3xl font-heading text-navy mb-6 leading-tight">
                Kıdem ve <em className="text-accent italic font-light">ihbar tazminatı</em> nedir?
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Kıdem tazminatı, 1475 sayılı Kanun&apos;un halen yürürlükte olan 14. maddesi uyarınca, aynı işverene bağlı olarak en az 1 yıl çalışmış bir işçinin; işveren tarafından haksız şekilde işten çıkarılması, işçinin haklı bir nedenle (ücretin ödenmemesi, mobbing, iş güvenliği ihlali gibi) işten ayrılması ya da kanunda sayılan özel hallerde (emeklilik şartlarının oluşması, askerlik, evlilik sonrası kadın çalışanın ayrılması gibi) hak kazandığı bir tazminattır. Sıradan bir istifa, kural olarak bu haktan yararlandırmaz.
                </p>
                <p>
                  İhbar tazminatı ise, iş sözleşmesini fesheden tarafın kanunda öngörülen bildirim süresine uymadan feshi gerçekleştirmesi halinde karşı tarafa ödenir; süre kıdeme göre 2 ile 8 hafta arasında değişir. Bu araç, girdiğiniz bilgilerle 2026 yılı için geçerli brüt ücret tavanını ve %0,759 damga vergisi oranını kullanarak size tahmini bir rakam sunar.
                </p>
              </div>
            </AnimatedReveal>

            <AnimatedReveal delay={0.15} className="border border-accent/30 rounded-lg p-8 bg-[#f8f9fa]">
              <h3 className="font-heading text-lg text-navy mb-6">Hesaplamaya başlamadan önce hazırlayın</h3>
              <ul className="space-y-4">
                {HAZIRLIK_LISTESI.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={20} strokeWidth={1.75} />
                    <span className="text-sm text-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedReveal>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#f8f9fa] flex-grow">
        <div className="container max-w-2xl">
          <SeveranceCalculatorForm />
        </div>
      </section>
    </div>
  )
}
