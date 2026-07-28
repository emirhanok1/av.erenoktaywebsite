import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAdminFaqById } from '@/services/faq'
import { FaqForm } from '@/features/admin/components/FaqForm'

export const metadata: Metadata = {
  title: 'Soru Düzenle | Admin',
}

interface EditFaqPageProps {
  params: Promise<{ id: string }>
}

export default async function EditFaqPage({ params }: EditFaqPageProps) {
  const { id } = await params
  const faq = await getAdminFaqById(id)

  if (!faq) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Soru Düzenle</h1>
        <p className="text-muted-foreground mt-2">
          Seçilen soruyu ve cevabını güncelleyin.
        </p>
      </div>

      <div className="border rounded-lg bg-white p-6">
        <FaqForm faq={faq} />
      </div>
    </div>
  )
}
