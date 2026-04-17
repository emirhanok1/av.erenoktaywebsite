import { createClient } from '@/lib/supabase/server'

export async function createAppointment(data: {
  client_name: string
  client_email: string
  client_phone: string
  preferred_date?: string
  preferred_time?: string
  subject?: string
  notes?: string
  kvkk_consent: boolean
}) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('appointments')
    .insert(data)
  if (error) throw new Error(error.message)
  return { success: true }
}
