import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Anasayfa',
}

export default function HomePage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-heading text-navy">
          Hukukun Sessiz Gücü,<br/>
          <em className="text-accent italic">Müvekkilin Yanında.</em>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Eren Oktay Hukuk Bürosu — Anasayfa içerikleri Faz 4 kapsamında inşa edilecektir.
        </p>
      </div>
    </div>
  )
}
