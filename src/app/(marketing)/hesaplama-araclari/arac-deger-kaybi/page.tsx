import { Metadata } from 'next'
import { ShieldAlert, TrendingDown, Send } from 'lucide-react'
import { SITE } from '@/constants/site'
import { ROUTES } from '@/constants/routes'
import { JsonLd } from '@/components/JsonLd'
import { getBreadcrumbSchema } from '@/lib/schemas/breadcrumb'
import { AnimatedReveal } from '@/features/home/components/AnimatedReveal'
import VehicleValueLossForm from '@/features/calculators/components/VehicleValueLossForm'

export const metadata: Metadata = {
  title: 'Araç Değer Kaybı Bilgi Formu',
  description: 'Trafik kazası sonrası araç değer kaybı talebiniz için bilgilerinizi iletin, tarafınızla iletişime geçelim.',
  alternates: { canonical: `${SITE.url}${ROUTES.TOOLS_VEHICLE_VALUE_LOSS}` },
}

const ADIMLAR = [
  {
    id: 1,
    title: 'Kaza ve Onarım',
    icon: <ShieldAlert className="text-accent" strokeWidth={1.5} size={26} />,
    text: 'Kazada kusursuz veya asli kusurlu olmasanız bile aracınız kaza kaydı taşır; onarım ne kadar iyi yapılırsa yapılsın bu kayıt silinmez.',
  },
  {
    id: 2,
    title: 'Değer Kaybı Oluşur',
    icon: <TrendingDown className="text-accent" strokeWidth={1.5} size={26} />,
    text: '"Kazalı araç" olarak anılması nedeniyle aracınızın ikinci el piyasa değeri, hiç kaza yapmamış eşdeğerine göre düşer.',
  },
  {
    id: 3,
    title: 'Talep Hakkınız Doğar',
    icon: <Send className="text-accent" strokeWidth={1.5} size={26} />,
    text: 'Bu değer kaybı, kusurlu tarafın trafik sigortasından veya kusurlu sürücüden talep edilebilir. Bu form ön bilgilendirme amaçlıdır; bilgilerinizi değerlendirip size dönüş yaparız.',
  },
]

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

      {/* Açıklama */}
      <section className="bg-white py-20 lg:py-[100px]" aria-labelledby="deger-kaybi-title">
        <div className="container mx-auto px-4">
          <AnimatedReveal className="max-w-2xl mb-16">
            <span className="text-accent font-heading font-medium tracking-[0.2em] text-xs uppercase flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-accent inline-block" />
              ARAÇ DEĞER KAYBI NEDİR
            </span>
            <h2 id="deger-kaybi-title" className="text-2xl md:text-3xl font-heading text-navy mb-6 leading-tight">
              Onarılmış olsa da aracınızın değeri <em className="text-accent italic font-light">geri gelmeyebilir</em>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Araç değer kaybı tazminatı, karşılaştığınız trafik kazasında oluşan hasarın onarımı tamamlansa dahi, aracınızın ikinci el piyasa değerinde meydana gelen kalıcı düşüşün karşılanmasını amaçlar. Aşağıdaki formu doldurarak durumunuzu tarafımıza iletebilirsiniz.
            </p>
          </AnimatedReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 border-l border-t border-gray-200">
            {ADIMLAR.map((adim, index) => (
              <AnimatedReveal
                key={adim.id}
                delay={index * 0.15}
                className="border-r border-b border-gray-200 p-8 relative flex flex-col h-full"
              >
                <div className="text-accent/60 font-heading text-sm tracking-widest mb-6">
                  0{adim.id} <span className="opacity-50">/</span> ADIM
                </div>
                <div className="w-14 h-14 border border-accent/30 rounded-lg flex items-center justify-center mb-6 bg-[#f8f9fa]">
                  {adim.icon}
                </div>
                <h3 className="text-lg font-heading text-navy mb-3 leading-tight">{adim.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{adim.text}</p>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#f8f9fa] flex-grow">
        <div className="container max-w-2xl">
          <VehicleValueLossForm />
        </div>
      </section>
    </div>
  )
}
