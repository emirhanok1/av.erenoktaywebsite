import { cn } from '@/lib/utils'

interface LegalDisclaimerProps {
  variant?: 'default' | 'prominent'
}

export default function LegalDisclaimer({ 
  variant = 'default' 
}: LegalDisclaimerProps) {
  return (
    <div className={cn(
      "border-t border-border",
      variant === 'prominent' 
        ? "bg-amber-50/50 py-8" 
        : "bg-muted/30 py-6"
    )}>
      <div className="container">
        <p className={cn(
          "text-center max-w-prose mx-auto text-muted-foreground leading-relaxed",
          variant === 'prominent' ? "text-sm" : "text-xs"
        )}>
          Bu sitedeki bilgiler genel bilgilendirme amaçlıdır ve somut olayınıza dair hukuki görüş yerine geçmez. Durumunuza özel bir değerlendirme için <a href="https://wa.me/905074007140" target="_blank" rel="noopener noreferrer" className="underline hover:text-navy transition-colors">bizimle iletişime geçebilirsiniz</a>.
        </p>
      </div>
    </div>
  )
}
