import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'

export const getPosts = cache(async () => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, cover_image, published_at')
    .eq('is_published', true)
    .eq('is_archived', false)
    .order('published_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data ?? []
})

export const getPostBySlug = cache(async (slug: string) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, slug, content, excerpt, cover_image, published_at')
    .eq('slug', slug)
    .eq('is_published', true)
    .eq('is_archived', false)
    .single()
  if (error) throw new Error(error.message)
  return data
})
