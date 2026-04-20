import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'

export type Slide = {
  id: string
  title: string
  subtitle: string | null
  image_url: string | null
  link: string | null
  sort_order: number
}

export const getActiveSlides = cache(async (): Promise<Slide[]> => {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('slides')
      .select('id, title, subtitle, image_url, link, sort_order')
      .eq('is_active', true)
      .eq('is_archived', false)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('Supabase slides fetch hatası:', error.message)
      return []
    }

    if (!data || data.length === 0) {
      return []
    }

    return data as Slide[]
  } catch (error) {
    console.error('getActiveSlides unexpected error:', error)
    return []
  }
})
