import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İletişim',
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-32 text-center">
      <h1 className="text-3xl font-heading text-navy mb-4">İletişim</h1>
      <p className="text-muted-foreground">Bu sayfa Faz 4 kapsamında inşa edilecektir.</p>
    </div>
  )
}
