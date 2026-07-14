import { Metadata } from 'next'
import { SITE } from '@/constants/site'
import LegalDisclaimer from '@/components/common/LegalDisclaimer'

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: 'Eren Oktay Hukuk Bürosu hakkında bilgi edinin.',
  alternates: { canonical: `${SITE.url}/hakkimizda` },
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Avukat Profili */}
      <section className="pt-32 pb-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Sol: Görsel */}
            <div className="relative aspect-[4/5] bg-gradient-to-tr from-navy to-navy/80 rounded-lg overflow-hidden shadow-xl flex items-center justify-center">
              <span className="text-white/20 text-4xl font-heading font-bold absolute">EST. 2007</span>
              {/* Buraya gerçek görsel eklenecektir */}
            </div>

            {/* Sağ: Bilgiler */}
            <div className="flex flex-col justify-center">
              <span className="text-accent text-sm font-bold tracking-wider uppercase mb-4 block">Kurucu Avukat</span>
              <h2 className="font-heading text-fluid-h2 text-navy mb-8">Av. Eren Oktay</h2>
              
              <div className="prose max-w-none text-muted-foreground mb-8">
                <p>
                  Eren Oktay Hukuk Bürosu&apos;nun kurucusu olan Avukat Eren Oktay, meslek hayatı boyunca ticaret hukuku, borçlar hukuku ve aile hukuku başta olmak üzere birçok alanda ulusal ve uluslararası müvekkillerine hizmet vermiştir.
                </p>
                <p>
                  Amacımız, her somut olayın özelliklerine uygun, yenilikçi ve hukukun temel prensiplerinden şaşmayan bir yaklaşımla, müvekkillerimizin haklarını en üst düzeyde korumaktır.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-navy mb-3">Uzmanlık Alanları</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Ticaret Hukuku</li>
                    <li>• Aile ve Miras Hukuku</li>
                    <li>• İş Hukuku</li>
                    <li>• Gayrimenkul Hukuku</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-navy mb-3">Diller</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm mb-6">
                    <li>• Türkçe (Anadil)</li>
                    <li>• İngilizce (İleri Düzey)</li>
                    <li>• Almanca (Orta Düzey)</li>
                  </ul>
                  <h3 className="font-bold text-navy mb-3">Baro Kaydı</h3>
                  <p className="text-sm text-muted-foreground">İstanbul Barosu - Sicil No: 12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Değerlerimiz */}
      <section className="py-24 bg-slate-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-heading text-fluid-h2 text-navy">Temel Değerlerimiz</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-border">
              <h3 className="text-xl font-heading text-navy mb-4">İlkeli Yaklaşım</h3>
              <p className="text-muted-foreground">Meslek kurallarına ve etiğine sıkı sıkıya bağlı kalarak dürüst ve şeffaf bir süreç yönetimi benimsiyoruz.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-border">
              <h3 className="text-xl font-heading text-navy mb-4">Sektörel Tecrübe</h3>
              <p className="text-muted-foreground">Farklı sektörlerdeki uyuşmazlıklarda edindiğimiz derin tecrübe ile öngörülebilir stratejiler kuruyoruz.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-border">
              <h3 className="text-xl font-heading text-navy mb-4">Çok Dilli Hizmet</h3>
              <p className="text-muted-foreground">Yabancı müvekkillerimiz için anadillerinde kesintisiz ve şeffaf iletişim ile hukuki süreçlerini yönetiyoruz.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LegalDisclaimer */}
      <LegalDisclaimer variant="default" />
    </div>
  )
}
