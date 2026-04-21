import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'S.S.S.',
}

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 pt-48 pb-32 text-center">
      <h1 className="text-3xl font-heading text-navy mb-4">Sıkça Sorulan Sorular</h1>
      <p className="text-muted-foreground">Bu sayfa Faz 4 kapsamında inşa edilecektir.</p>
    </div>
  )
}
