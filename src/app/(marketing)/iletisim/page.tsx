import { Metadata } from 'next'
import Image from 'next/image'
import { SITE } from '@/constants/site'
import { BLUR_DATA_URL } from '@/lib/blur'
import { JsonLd } from '@/components/JsonLd'
import { getBreadcrumbSchema } from '@/lib/schemas/breadcrumb'

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Bizimle iletişime geçin ve randevu oluşturun.',
  alternates: { canonical: `${SITE.url}/iletisim` },
}

export default function ContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Anasayfa', path: '/' },
    { name: 'İletişim', path: '/iletisim' },
  ])

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={breadcrumbSchema} />
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
            
            {/* Fotoğraf Grid'i */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                <Image
                  src="/images/ofis-1.webp"
                  alt="Eren Oktay Hukuk Bürosu Ofis İçi"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                <Image
                  src="/images/ofis-2.webp"
                  alt="Eren Oktay Hukuk Bürosu Çalışma Alanı"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
