import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAdminArticleById } from '@/services/articles'
import { ArticleForm } from '@/features/admin/components/ArticleForm'

export const metadata: Metadata = {
  title: 'Pratik Bilgi Düzenle | Admin',
}

interface PageProps {
  params: {
    id: string
  }
}

export default async function EditArticlePage({ params }: PageProps) {
  const article = await getAdminArticleById(params.id)

  if (!article) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pratik Bilgi Düzenle</h1>
        <p className="text-muted-foreground mt-2">
          Seçili içeriğin detaylarını güncelleyin.
        </p>
      </div>

      <div className="border rounded-lg bg-white dark:bg-slate-950 p-6">
        <ArticleForm article={article} />
      </div>
    </div>
  )
}
