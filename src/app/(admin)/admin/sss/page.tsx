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
import { getAdminFaqs } from '@/services/faq'
import FaqRowActions from '@/features/admin/components/FaqRowActions'

export const metadata: Metadata = {
  title: 'SSS Yönetimi | Admin',
}

export default async function AdminFaqPage() {
  const faqs = await getAdminFaqs()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sıkça Sorulan Sorular</h1>
          <p className="text-muted-foreground mt-2">
            Ziyaretçilerin sık sorduğu soruları ve cevaplarını yönetin.
          </p>
        </div>
        <Button asChild>
          <Link href={ROUTES.ADMIN.FAQ_NEW}>
            <Plus className="mr-2 h-4 w-4" />
            Yeni Soru Ekle
          </Link>
        </Button>
      </div>

      <div className="border rounded-lg bg-white dark:bg-slate-950">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Soru</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead className="w-[180px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faqs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  Henüz soru bulunmuyor.
                </TableCell>
              </TableRow>
            ) : (
              faqs.map((faq, index) => (
                <TableRow key={faq.id}>
                  <TableCell className="font-medium max-w-[300px] truncate">
                    {faq.question}
                  </TableCell>
                  <TableCell>
                    {faq.category ? (
                      <Badge variant="outline">{faq.category}</Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={faq.is_published ? "default" : "secondary"}>
                      {faq.is_published ? 'Yayında' : 'Taslak'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(faq.created_at))}
                  </TableCell>
                  <TableCell>
                    <FaqRowActions 
                      id={faq.id} 
                      isPublished={faq.is_published}
                      isFirst={index === 0}
                      isLast={index === faqs.length - 1}
                    />
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
