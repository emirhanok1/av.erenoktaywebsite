import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'

export const getArticles = cache(async () => {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('articles')
      .select('id, title, slug, excerpt, cover_image, category, read_time, published_at')
      .eq('is_published', true)
      .eq('is_archived', false)
      .order('published_at', { ascending: false })
    if (error) {
      console.error('Fetch error:', error.message)
      return []
    }
    return data ?? []
  } catch (error) {
    console.error("Articles fetch hatası:", error)
    return []
  }
})

export const getArticleBySlug = cache(async (slug: string) => {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('articles')
      .select('id, title, slug, content, excerpt, cover_image, category, read_time, published_at')
      .eq('slug', slug)
      .eq('is_published', true)
      .eq('is_archived', false)
      .single()
    if (error) {
      console.error('Fetch error:', error.message)
      return null
    }
    return data
  } catch (error) {
    console.error("Article fetch hatası:", error)
    return null
  }
})

export type AdminArticle = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  category: string
  is_published: boolean
  created_at: string
}

export const getAdminArticles = cache(async (): Promise<AdminArticle[]> => {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('articles')
      .select('id, title, slug, excerpt, category, is_published, created_at')
      .eq('is_archived', false)
      .order('created_at', { ascending: false })
      
    if (error) {
      console.error('Admin articles fetch:', error.message)
      return []
    }
    return (data as AdminArticle[]) ?? []
  } catch (error) {
    console.error('getAdminArticles unexpected error:', error)
    return []
  }
})

export const getAdminArticleById = cache(async (id: string) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('articles')
    .select('id, title, slug, excerpt, content, cover_image, category, read_time, is_published, published_at, created_at')
    .eq('id', id)
    .single()

  if (error) return null
  return data
})
