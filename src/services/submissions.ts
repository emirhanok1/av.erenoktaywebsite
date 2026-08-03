import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'

export type SubmissionType = 'deger_kaybi' | 'bedeni_hasar'

export interface AdminSubmissionListItem {
  id: string
  type: SubmissionType
  full_name: string
  phone: string
  is_read: boolean
  created_at: string
}

export interface AdminSubmission extends AdminSubmissionListItem {
  email: string
  payload: Record<string, string>
  is_archived: boolean
}

export const getAdminSubmissions = cache(async (type?: SubmissionType): Promise<AdminSubmissionListItem[]> => {
  const supabase = await createClient()
  let query = supabase
    .from('submissions')
    .select('id, type, full_name, phone, is_read, created_at')
    .eq('is_archived', false)
    .order('created_at', { ascending: false })

  if (type) {
    query = query.eq('type', type)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching submissions:', error.message)
    return []
  }
  return data || []
})

export const getAdminSubmissionById = cache(async (id: string): Promise<AdminSubmission | null> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('submissions')
    .select('id, type, full_name, phone, email, payload, is_read, is_archived, created_at')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching submission by id:', error.message)
    return null
  }
  return data as AdminSubmission
})

export const getUnreadSubmissionsCount = cache(async (): Promise<number> => {
  const supabase = await createClient()
  const { count, error } = await supabase
    .from('submissions')
    .select('id', { count: 'exact', head: true })
    .eq('is_read', false)
    .eq('is_archived', false)

  if (error) {
    console.error('Error counting unread submissions:', error.message)
    return 0
  }
  return count || 0
})
