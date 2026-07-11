import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'

export type Slide = {
  id: string
  title: string
  subtitle: string | null
  image_url: string | null
  link: string | null
  sort_order: number
  is_active: boolean
  created_at?: string
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

export const getAdminSlides = cache(async (): Promise<Slide[]> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('slides')
    .select('id, title, subtitle, image_url, link, sort_order, is_active, created_at')
    .eq('is_archived', false)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Admin slides fetch:', error.message)
    return []
  }
  return (data as Slide[]) ?? []
})

