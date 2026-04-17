import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'

export const getArticles = cache(async () => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('articles')
    .select('id, title, slug, excerpt, cover_image, category, read_time, published_at')
    .eq('is_published', true)
    .eq('is_archived', false)
    .order('published_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data ?? []
})

export const getArticleBySlug = cache(async (slug: string) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('articles')
    .select('id, title, slug, content, excerpt, cover_image, category, read_time, published_at')
    .eq('slug', slug)
    .eq('is_published', true)
    .eq('is_archived', false)
    .single()
  if (error) throw new Error(error.message)
  return data
})
