import { createClient } from '@/lib/supabase/server'

export async function createMessage(data: {
  name: string
  email: string
  phone?: string
  subject?: string
  body: string
  kvkk_consent: boolean
}) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('messages')
    .insert(data)
  if (error) throw new Error(error.message)
  return { success: true }
}
