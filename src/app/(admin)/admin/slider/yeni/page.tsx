import SlideForm from '@/features/admin/components/SlideForm'

export const metadata = {
  title: 'Yeni Slide Ekle | Admin',
}

export default function NewSlidePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Yeni Slide Ekle</h1>
        <p className="text-muted-foreground">Ana sayfa slider'ına yeni bir görsel ekleyin.</p>
      </div>

      <div className="p-6 border rounded-md bg-white">
        <SlideForm />
      </div>
    </div>
  )
}
