import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'

export type Post = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  cover_image: string | null
  published_at: string | null
  is_published: boolean
  is_archived: boolean
  created_at: string
  updated_at: string
}

export type AdminPost = Pick<Post, 'id' | 'title' | 'slug' | 'excerpt' | 'published_at' | 'is_published' | 'created_at'>


export const getPosts = cache(async () => {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, slug, excerpt, cover_image, published_at')
      .eq('is_published', true)
      .eq('is_archived', false)
      .order('published_at', { ascending: false })
    if (error) {
      console.error('Fetch error:', error.message)
      return []
    }
    return data ?? []
  } catch (error) {
    console.error("Posts fetch hatası:", error)
    return []
  }
})

export const getPostBySlug = cache(async (slug: string) => {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, slug, content, excerpt, cover_image, published_at')
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
    console.error("Post fetch hatası:", error)
    return null
  }
})

export const getAdminPosts = cache(async (): Promise<AdminPost[]> => {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, slug, excerpt, published_at, is_published, created_at')
      .eq('is_archived', false)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Admin Posts fetch hatası:', error.message)
      return []
    }
    return data as AdminPost[]
  } catch (error) {
    console.error('getAdminPosts unexpected error:', error)
    return []
  }
})

export const getAdminPostById = cache(async (id: string): Promise<Post | null> => {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, slug, excerpt, content, cover_image, is_published, published_at, created_at')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Admin Post fetch hatası:', error.message)
      return null
    }
    return data as Post
  } catch (error) {
    console.error('getAdminPostById unexpected error:', error)
    return null
  }
})
