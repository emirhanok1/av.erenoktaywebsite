import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ROUTES } from '@/constants/routes'
import { getAdminSubmissionById, type SubmissionType } from '@/services/submissions'
import SubmissionArchiveButton from '@/features/admin/components/SubmissionArchiveButton'
import MarkSubmissionReadOnView from '@/features/admin/components/MarkSubmissionReadOnView'

export const metadata: Metadata = {
  title: 'Form Detayı | Admin',
}

const TYPE_LABELS: Record<SubmissionType, string> = {
  deger_kaybi: 'Araç Değer Kaybı',
  bedeni_hasar: 'Trafik Kazası Bedeni Hasar',
}

const FIELD_LABELS: Record<string, string> = {
  accidentDate: 'Kaza Tarihi',
  vehicleInfo: 'Araç Marka / Model / Yıl',
  accidentDescription: 'Kaza Açıklaması',
  faultStatus: 'Kusur Durumu',
  damageRepairStatus: 'Hasar / Onarım Durumu',
  otherPartyInsurance: 'Karşı Taraf Sigortası',
  additionalNote: 'Ek Not',
  injuryStatus: 'Yaralanma / Maluliyet Durumu',
  treatmentStatus: 'Tedavi Durumu',
  sgkInsuranceProcess: 'SGK / Sigorta Süreci',
}

function formatPayloadValue(key: string, value: string): string {
  if (key === 'accidentDate' && value) {
    const date = new Date(value + 'T00:00:00Z')
    if (!Number.isNaN(date.getTime())) {
      return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date)
    }
  }
  return value || '-'
}

interface SubmissionDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function SubmissionDetailPage({ params }: SubmissionDetailPageProps) {
  const { id } = await params
  const submission = await getAdminSubmissionById(id)

  if (!submission) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <MarkSubmissionReadOnView id={submission.id} isRead={submission.is_read} />
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <Link
            href={ROUTES.ADMIN.SUBMISSIONS}
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="h-4 w-4" /> Gelen Formlara Dön
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">{submission.full_name}</h1>
          <Badge variant="outline" className="mt-2">{TYPE_LABELS[submission.type]}</Badge>
        </div>
        <SubmissionArchiveButton id={submission.id} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">İletişim Bilgileri</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Telefon</p>
            <p className="font-medium">{submission.phone}</p>
          </div>
          <div>
            <p className="text-muted-foreground">E-posta</p>
            <p className="font-medium">{submission.email}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Gönderim Tarihi</p>
            <p className="font-medium">
              {new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(submission.created_at))}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Form Detayları</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          {Object.entries(submission.payload).map(([key, value]) => (
            <div key={key}>
              <p className="text-muted-foreground">{FIELD_LABELS[key] || key}</p>
              <p className="font-medium whitespace-pre-wrap">{formatPayloadValue(key, value)}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
