import { Metadata } from 'next'
import { Camera } from 'lucide-react'
import { SITE } from '@/constants/site'

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Bizimle iletişime geçin ve randevu oluşturun.',
  alternates: { canonical: `${SITE.url}/iletisim` },
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-navy pt-32 pb-16 text-white text-center">
        <div className="container">
          <h1 className="font-heading text-3xl md:text-4xl text-white">İletişim</h1>
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
          {/* Ofisimiz Bölümü */}
          <div className="mt-24">
            <h2 className="font-heading text-3xl text-navy mb-4">Ofisimiz</h2>
            <p className="text-muted-foreground mb-12">
              Çankaya&apos;daki ofisimizde görüşmelerinizi gerçekleştiriyoruz.
            </p>
            
            {/* Fotoğraf Grid'i (Placeholder) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((index) => (
                <div 
                  key={index} 
                  className="bg-slate-100 rounded-xl aspect-[4/3] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 text-slate-400 transition-colors hover:bg-slate-50"
                >
                  <Camera size={40} className="mb-3 opacity-50" strokeWidth={1.5} />
                  <span className="text-sm font-medium tracking-wide uppercase opacity-70">
                    Fotoğraf Yakında
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
