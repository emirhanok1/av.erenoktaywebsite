import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'

export const getActiveSlides = cache(async () => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('slides')
    .select('id, title, subtitle, image_url, link, sort_order')
    .eq('is_active', true)
    .eq('is_archived', false)
    .order('sort_order', { ascending: true })
  if (error) throw new Error(error.message)
  return data ?? []
})
