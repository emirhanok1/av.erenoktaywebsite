import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pratik Bilgiler',
}

export default function ArticlesPage() {
  return (
    <div className="container mx-auto px-4 py-32 text-center">
      <h1 className="text-3xl font-heading text-navy mb-4">Pratik Bilgiler</h1>
      <p className="text-muted-foreground">Bu sayfa Faz 4 kapsamında inşa edilecektir.</p>
    </div>
  )
}
