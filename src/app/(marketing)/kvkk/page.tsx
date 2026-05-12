import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni',
}

export default function KVKKPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-navy pt-32 pb-20 text-white text-center">
        <div className="container">
          <h1 className="font-heading text-fluid-h1">KVKK Aydınlatma Metni</h1>
        </div>
      </section>

      <section className="py-24 bg-white flex-grow">
        <div className="container max-w-3xl">
          <div className="prose prose-lg prose-slate max-w-none prose-headings:font-heading prose-headings:text-navy">
            <h2>1. Veri Sorumlusu</h2>
            <p>
              Kişisel verileriniz, veri sorumlusu sıfatıyla [Avukat Adı/Büro Adı Placeholder] tarafından aşağıda açıklanan kapsamda işlenebilecektir.
            </p>

            <h2>2. İşlenen Kişisel Veriler</h2>
            <p>
              Bizimle iletişime geçtiğinizde veya hizmetlerimizden faydalandığınızda kimlik, iletişim (telefon, e-posta), müşteri işlem bilgileri ve hukuki sürece konu olan sair kişisel verileriniz işlenebilmektedir.
            </p>

            <h2>3. Verilerin İşlenme Amacı</h2>
            <p>
              Kişisel verileriniz;
              <ul>
                <li>Hukuki danışmanlık ve avukatlık hizmetlerinin sunulması,</li>
                <li>İletişim faaliyetlerinin yürütülmesi,</li>
                <li>Randevu süreçlerinin yönetilmesi,</li>
                <li>Yasal yükümlülüklerimizin yerine getirilmesi amaçlarıyla işlenmektedir.</li>
              </ul>
            </p>

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
              KVKK kapsamındaki taleplerinizi [E-posta Placeholder] adresi üzerinden yazılı olarak iletebilirsiniz.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
