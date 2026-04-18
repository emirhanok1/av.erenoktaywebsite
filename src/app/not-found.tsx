import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="text-center space-y-8 max-w-lg">
        <h1 className="text-8xl md:text-9xl font-heading text-accent/20 absolute inset-0 flex items-center justify-center -z-10 pointer-events-none select-none">
          404
        </h1>
        <div className="space-y-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-heading text-navy">Sayfa Bulunamadı</h2>
          <p className="text-muted-foreground leading-relaxed">
            Aradığınız sayfa mevcut değil, taşınmış veya geçici olarak kullanım dışı olabilir. 
            Lütfen bağlantıyı kontrol edin veya anasayfaya dönün.
          </p>
        </div>
        <div className="relative z-10">
          <Link 
            href={ROUTES.HOME}
            className={cn(
              buttonVariants({ variant: 'default' }),
              "bg-navy hover:bg-secondary text-white rounded-none px-8 py-7 text-sm font-semibold tracking-widest uppercase"
            )}
          >
            Anasayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  )
}
