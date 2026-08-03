import Link from 'next/link'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ROUTES } from '@/constants/routes'

export default function SubmissionLegalFooter({
  checked,
  onCheckedChange,
  error,
}: {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  error?: string
}) {
  return (
    <div className="space-y-4 border-t border-border pt-6">
      <p className="text-xs bg-slate-50 border border-border rounded-md p-3 text-muted-foreground leading-relaxed">
        Bu form ön bilgilendirme amaçlıdır ve hukuki sonuç doğurmaz; durumunuz tarafımızca değerlendirilecektir.
      </p>
      <div className="flex items-start gap-3">
        <Checkbox
          id="kvkkConsent"
          checked={checked}
          onCheckedChange={(value) => onCheckedChange(value === true)}
          className="mt-0.5"
        />
        <Label htmlFor="kvkkConsent" className="font-normal text-sm text-muted-foreground leading-relaxed cursor-pointer">
          Kişisel verilerimin{' '}
          <Link href={ROUTES.PRIVACY} target="_blank" rel="noopener noreferrer" className="underline hover:text-navy transition-colors">
            KVKK Aydınlatma Metni
          </Link>{' '}
          kapsamında işlenmesini kabul ediyorum.
        </Label>
      </div>
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  )
}
