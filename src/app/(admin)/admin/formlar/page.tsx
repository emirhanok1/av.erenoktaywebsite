import { Metadata } from 'next'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/constants/routes'
import { getAdminSubmissions, type SubmissionType } from '@/services/submissions'
import SubmissionRowActions from '@/features/admin/components/SubmissionRowActions'

export const metadata: Metadata = {
  title: 'Gelen Formlar | Admin',
}

const TYPE_LABELS: Record<SubmissionType, string> = {
  deger_kaybi: 'Değer Kaybı',
  bedeni_hasar: 'Bedeni Hasar',
}

const FILTERS: { label: string; value: SubmissionType | undefined }[] = [
  { label: 'Tümü', value: undefined },
  { label: 'Araç Değer Kaybı', value: 'deger_kaybi' },
  { label: 'Bedeni Hasar', value: 'bedeni_hasar' },
]

interface AdminSubmissionsPageProps {
  searchParams: Promise<{ type?: string }>
}

export default async function AdminSubmissionsPage({ searchParams }: AdminSubmissionsPageProps) {
  const { type } = await searchParams
  const activeType = type === 'deger_kaybi' || type === 'bedeni_hasar' ? type : undefined
  const submissions = await getAdminSubmissions(activeType)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gelen Formlar</h1>
        <p className="text-muted-foreground mt-2">
          Araç değer kaybı ve bedeni hasar formlarından gelen talepleri görüntüleyin.
        </p>
      </div>

      <div className="flex items-center gap-2">
        {FILTERS.map((filter) => (
          <Link
            key={filter.label}
            href={filter.value ? `${ROUTES.ADMIN.SUBMISSIONS}?type=${filter.value}` : ROUTES.ADMIN.SUBMISSIONS}
            className={cn(
              'text-sm px-3 py-1.5 rounded-md border transition-colors',
              activeType === filter.value
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border text-muted-foreground hover:text-foreground'
            )}
          >
            {filter.label}
          </Link>
        ))}
      </div>

      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ad Soyad</TableHead>
              <TableHead>Tür</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead className="w-[140px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  Henüz form gelmedi.
                </TableCell>
              </TableRow>
            ) : (
              submissions.map((submission) => (
                <TableRow key={submission.id} className={cn(!submission.is_read && 'bg-accent/5')}>
                  <TableCell className="font-medium">{submission.full_name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{TYPE_LABELS[submission.type]}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{submission.phone}</TableCell>
                  <TableCell>
                    <Badge variant={submission.is_read ? 'secondary' : 'default'}>
                      {submission.is_read ? 'Okundu' : 'Yeni'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(submission.created_at))}
                  </TableCell>
                  <TableCell>
                    <SubmissionRowActions id={submission.id} isRead={submission.is_read} />
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
