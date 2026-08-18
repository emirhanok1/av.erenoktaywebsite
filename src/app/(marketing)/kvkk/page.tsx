import { Metadata } from 'next'
import { SITE } from '@/constants/site'
import { JsonLd } from '@/components/JsonLd'
import { getBreadcrumbSchema } from '@/lib/schemas/breadcrumb'
import PageHero from '@/components/common/PageHero'

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni',
  alternates: { canonical: `${SITE.url}/kvkk` },
}

export default function KVKKPage() {
  const breadcrumbItems = [
    { name: 'Anasayfa', path: '/' },
    { name: 'KVKK Aydınlatma Metni', path: '/kvkk' },
  ]
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems)

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={breadcrumbSchema} />
      <PageHero
        eyebrow="Gizlilik & Veri"
        title="KVKK Aydınlatma Metni"
        breadcrumb={breadcrumbItems}
      />

      <section className="py-24 bg-white flex-grow">
        <div className="container max-w-3xl">
          <div className="prose prose-lg prose-slate max-w-none prose-headings:font-heading prose-headings:text-navy">
            <h2>1. Veri Sorumlusu</h2>
            <p>
              Kişisel verileriniz, veri sorumlusu sıfatıyla Av. Eren Oktay (Aşağı Öveçler Mahallesi, 1331. Cadde No: 3/3, Çankaya / Ankara, Tel: +90 507 400 71 40) tarafından aşağıda açıklanan kapsamda işlenebilecektir.
            </p>

            <h2>2. İşlenen Kişisel Veriler</h2>
            <p>
              Bizimle iletişime geçtiğinizde veya hizmetlerimizden faydalandığınızda kimlik, iletişim (telefon, e-posta), müşteri işlem bilgileri ve hukuki sürece konu olan sair kişisel verileriniz işlenebilmektedir.
            </p>

            <h2>3. Verilerin İşlenme Amacı</h2>
            <p>Kişisel verileriniz;</p>
            <ul>
              <li>Hukuki danışmanlık ve avukatlık hizmetlerinin sunulması,</li>
              <li>İletişim faaliyetlerinin yürütülmesi,</li>
              <li>Randevu süreçlerinin yönetilmesi,</li>
              <li>Yasal yükümlülüklerimizin yerine getirilmesi amaçlarıyla işlenmektedir.</li>
            </ul>

            <h2>4. Verilerin Aktarıldığı Taraflar</h2>
            <p>
              Kişisel verileriniz, kural olarak üçüncü kişilerle paylaşılmamaktadır. Ancak hukuki uyuşmazlıkların çözümü amacıyla yetkili adli/idari makamlarla yasal sınırlar çerçevesinde paylaşılabilir.
            </p>

            <h2>5. Veri Sahibinin Hakları</h2>
            <p>
              KVKK&apos;nın 11. maddesi kapsamında; verilerinizin işlenip işlenmediğini öğrenme, amacına uygun kullanılıp kullanılmadığını bilme, eksik/yanlış ise düzeltilmesini isteme ve silinmesini talep etme haklarına sahipsiniz.
            </p>

            <h2>6. İletişim</h2>
            <p>
              KVKK kapsamındaki taleplerinizi <a href={`mailto:${SITE.email}`} className="text-gold-700 hover:underline">{SITE.email}</a> adresi üzerinden yazılı olarak iletebilirsiniz.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
