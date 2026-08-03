import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { SeveranceResult } from '@/lib/calculators/kidem-ihbar'

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(value)

export default function SeveranceResultCard({ result }: { result: SeveranceResult }) {
  const {
    tenure,
    capApplied,
    grossSeverance,
    stampTax,
    netSeverance,
    isEntitledToNotice,
    noticeDays,
    grossNoticePay,
  } = result

  return (
    <Card className="border-accent/40">
      <CardHeader>
        <CardTitle className="font-heading text-2xl text-navy font-normal">Hesaplama Sonucu</CardTitle>
        <p className="text-sm text-muted-foreground">
          Kıdem süreniz: {tenure.fullYears} tam yıl, {tenure.remainingDays} gün
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        {capApplied !== null && (
          <p className="text-xs bg-slate-50 border border-border rounded-md p-3 text-muted-foreground">
            Giydirilmiş ücretiniz, fesih tarihinizde geçerli olan yasal tavanı ({formatCurrency(capApplied)}) aştığı için hesaplama tavan tutarı üzerinden yapılmıştır.
          </p>
        )}

        {/* KIDEM TAZMİNATI */}
        <div>
          <h3 className="font-heading text-lg text-navy mb-3">Kıdem Tazminatı</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Brüt Kıdem Tazminatı</span>
              <span>{formatCurrency(grossSeverance)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Damga Vergisi (%0,759)</span>
              <span>&minus; {formatCurrency(stampTax)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-base font-semibold text-navy">
              <span>Net Kıdem Tazminatı</span>
              <span>{formatCurrency(netSeverance)}</span>
            </div>
          </div>
        </div>

        {/* İHBAR TAZMİNATI */}
        <div>
          <h3 className="font-heading text-lg text-navy mb-3">İhbar Tazminatı</h3>
          {isEntitledToNotice && noticeDays !== null && grossNoticePay !== null ? (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>İhbar Süresi</span>
                <span>{noticeDays} gün</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-semibold text-navy">
                <span>Brüt İhbar Tazminatı</span>
                <span>{formatCurrency(grossNoticePay)}</span>
              </div>
              <p className="text-xs text-muted-foreground pt-1">
                Bu tutar <strong>brüttür</strong> — net tutar, gelir vergisi kümülatif matrahınıza göre değişir. Net kıdem tazminatı ile doğrudan toplanamaz.
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Seçtiğiniz fesih türünde ihbar tazminatı hakkı doğmamaktadır.
            </p>
          )}
        </div>

        {/* YASAL UYARI */}
        <div className="border-t border-border pt-6">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Bu hesaplama tahmini bir ön bilgilendirmedir ve bağlayıcı değildir. Giydirilmiş ücretin kapsamı ve özel durumlar sonucu değiştirebilir. Kesin hesaplama için{' '}
            <a
              href="https://wa.me/905074007140"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-navy transition-colors font-medium"
            >
              bizimle iletişime geçin
            </a>
            .
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
