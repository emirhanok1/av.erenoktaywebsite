import { Metadata } from 'next'
import { ArticleForm } from '@/features/admin/components/ArticleForm'

export const metadata: Metadata = {
  title: 'Yeni Pratik Bilgi | Admin',
}

export default function NewArticlePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Yeni Pratik Bilgi</h1>
        <p className="text-muted-foreground mt-2">
          Yeni bir hukuki makale veya pratik bilgi içeriği oluşturun.
        </p>
      </div>

      <div className="border rounded-lg bg-white dark:bg-slate-950 p-6">
        <ArticleForm />
      </div>
    </div>
  )
}
