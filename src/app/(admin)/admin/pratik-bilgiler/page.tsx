import { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { ROUTES } from '@/constants/routes'
import { getAdminArticles } from '@/services/articles'
import { ArticleRowActions } from '@/features/admin/components/ArticleRowActions'

export const metadata: Metadata = {
  title: 'Pratik Bilgiler Yönetimi | Admin',
}

export default async function AdminArticlesPage() {
  const articles = await getAdminArticles()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pratik Bilgiler</h1>
          <p className="text-muted-foreground mt-2">
            Hukuki pratik bilgileri ve makaleleri buradan yönetebilirsiniz.
          </p>
        </div>
        <Button asChild>
          <Link href={ROUTES.ADMIN.ARTICLES_NEW}>
            <Plus className="mr-2 h-4 w-4" />
            Yeni Pratik Bilgi
          </Link>
        </Button>
      </div>

      <div className="border rounded-lg bg-white dark:bg-slate-950">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Başlık</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  Henüz pratik bilgi bulunmuyor.
                </TableCell>
              </TableRow>
            ) : (
              articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium max-w-[300px] truncate">
                    {article.title}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{article.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={article.is_published ? "default" : "secondary"}>
                      {article.is_published ? 'Yayında' : 'Taslak'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(article.created_at))}
                  </TableCell>
                  <TableCell>
                    <ArticleRowActions id={article.id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
