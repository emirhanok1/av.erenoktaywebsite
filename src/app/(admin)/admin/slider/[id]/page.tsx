import SlideForm from '@/features/admin/components/SlideForm'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import type { Slide } from '@/services/slides'

export const metadata = {
  title: 'Slide Düzenle | Admin',
}

interface EditSlidePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditSlidePage(props: EditSlidePageProps) {
  const params = await props.params;
  const supabase = await createClient()

  const { data: slide, error } = await supabase
    .from('slides')
    .select('id, title, subtitle, image_url, link, sort_order, is_active')
    .eq('id', params.id)
    .single()

  if (error || !slide) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Slide Düzenle</h1>
        <p className="text-muted-foreground">Seçili slide&apos;ın bilgilerini güncelleyin.</p>
      </div>

      <div className="p-6 border rounded-md bg-white">
        <SlideForm slide={slide as Slide} />
      </div>
    </div>
  )
}
