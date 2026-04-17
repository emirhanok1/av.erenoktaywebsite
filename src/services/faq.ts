import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'

export const getFaqs = cache(async () => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('faq')
    .select('id, question, answer, category, sort_order')
    .eq('is_published', true)
    .eq('is_archived', false)
    .order('sort_order', { ascending: true })
  if (error) throw new Error(error.message)
  return data ?? []
})
