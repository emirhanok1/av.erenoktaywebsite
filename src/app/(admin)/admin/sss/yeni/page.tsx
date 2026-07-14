import { Metadata } from 'next'
import { FaqForm } from '@/features/admin/components/FaqForm'

export const metadata: Metadata = {
  title: 'Yeni Soru | Admin',
}

export default function NewFaqPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Yeni Soru Ekle</h1>
        <p className="text-muted-foreground mt-2">
          Sıkça sorulan sorulara yeni bir soru ve cevap ekleyin.
        </p>
      </div>

      <div className="border rounded-lg bg-white dark:bg-slate-950 p-6">
        <FaqForm />
      </div>
    </div>
  )
}
