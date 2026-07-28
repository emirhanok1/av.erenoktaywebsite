import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import { createClient as createPublicClient } from '@/lib/supabase/public'

export interface Faq {
  id: string
  question: string
  answer: string
  category: string | null
  sort_order: number
  is_published: boolean
  is_archived: boolean
  created_at: string
  updated_at: string
}

export const getFaqs = cache(async (): Promise<Faq[]> => {
  const supabase = createPublicClient()
  const { data, error } = await supabase
    .from('faq')
    .select('id, question, answer, category, sort_order, is_published, is_archived, created_at, updated_at')
    .eq('is_published', true)
    .eq('is_archived', false)
    .order('sort_order', { ascending: true })
    
  if (error) {
    console.error('Error fetching FAQs:', error.message)
    return []
  }
  return data || []
})

export type AdminFaq = Pick<Faq, 'id' | 'question' | 'category' | 'sort_order' | 'is_published' | 'created_at'>

export const getAdminFaqs = cache(async (): Promise<AdminFaq[]> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('faq')
    .select('id, question, category, sort_order, is_published, created_at')
    .eq('is_archived', false)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching admin FAQs:', error.message)
    return []
  }
  return data || []
})

export const getAdminFaqById = cache(async (id: string): Promise<Faq | null> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('faq')
    .select('id, question, answer, category, sort_order, is_published, is_archived, created_at, updated_at')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching admin FAQ by ID:', error.message)
    return null
  }
  return data
})
