import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import { createClient as createPublicClient } from '@/lib/supabase/public'

export type SiteSettings = {
  attorney_photo_url: string | null
}

const DEFAULT_SETTINGS: SiteSettings = {
  attorney_photo_url: '/images/eren-oktay.webp',
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const supabase = createPublicClient()

    const { data, error } = await supabase
      .from('site_settings')
      .select('attorney_photo_url')
      .eq('id', 1)
      .single()

    if (error || !data) {
      console.error('Supabase site_settings fetch hatasi:', error?.message)
      return DEFAULT_SETTINGS
    }

    return data as SiteSettings
  } catch (error) {
    console.error('getSiteSettings unexpected error:', error)
    return DEFAULT_SETTINGS
  }
})

export const getAdminSiteSettings = cache(async (): Promise<SiteSettings> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('site_settings')
    .select('attorney_photo_url')
    .eq('id', 1)
    .single()

  if (error || !data) {
    console.error('Admin site_settings fetch:', error?.message)
    return DEFAULT_SETTINGS
  }
  return data as SiteSettings
})
