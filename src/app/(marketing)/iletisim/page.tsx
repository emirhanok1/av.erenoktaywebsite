import { Metadata } from 'next'
import { SITE } from '@/constants/site'

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Bizimle iletişime geçin ve randevu oluşturun.',
  alternates: { canonical: `${SITE.url}/iletisim` },
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-navy pt-32 pb-20 text-white text-center">
        <div className="container">
          <h1 className="font-heading text-fluid-h1 mb-4">İletişim</h1>
          <p className="text-fluid-body text-slate-300 max-w-2xl mx-auto">
            Bize ulaşmak için aşağıdaki bilgileri kullanabilir veya ofisimizi ziyaret edebilirsiniz.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white flex-grow">
        <div className="container max-w-4xl text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 text-left">
            <div className="bg-slate-50 p-8 rounded-xl border border-border">
              <h2 className="font-heading text-2xl text-navy mb-6">İletişim Bilgileri</h2>
              <div className="space-y-4 text-muted-foreground">
                <p><strong>Adres:</strong> Aşağı Öveçler Mahallesi, 1331. Cadde No: 3/3, Çankaya / Ankara</p>
                <p><strong>Telefon:</strong> +90 507 400 71 40</p>
                <p><strong>E-posta:</strong> <a href={`mailto:${SITE.email}`} className="text-accent hover:underline">{SITE.email}</a></p>
              </div>
            </div>
            <div className="bg-slate-50 p-8 rounded-xl border border-border">
              <h2 className="font-heading text-2xl text-navy mb-6">Çalışma Saatleri</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="flex justify-between"><span>Pazartesi - Cuma:</span> <span>09:00 - 18:00</span></p>
                <p className="flex justify-between"><span>Cumartesi - Pazar:</span> <span>Kapalı</span></p>
              </div>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-8 rounded-xl inline-block max-w-2xl">
            <h3 className="font-bold mb-2">Çok Yakında!</h3>
            <p>Randevu ve detaylı iletişim formu Faz 6 kapsamında sayfamıza eklenecektir. Anlayışınız için teşekkür ederiz.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
