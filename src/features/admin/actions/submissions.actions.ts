'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { ROUTES } from '@/constants/routes'

export async function markSubmissionRead(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz işlem' }
  }

  const { error } = await supabase
    .from('submissions')
    .update({ is_read: true })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath(ROUTES.ADMIN.SUBMISSIONS)
  revalidatePath(ROUTES.ADMIN.DASHBOARD)
  return { success: true }
}

export async function archiveSubmission(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz işlem' }
  }

  const { error } = await supabase
    .from('submissions')
    .update({ is_archived: true })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath(ROUTES.ADMIN.SUBMISSIONS)
  revalidatePath(ROUTES.ADMIN.DASHBOARD)
  return { success: true }
}
