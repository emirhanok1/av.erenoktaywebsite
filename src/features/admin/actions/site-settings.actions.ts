'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { ROUTES } from '@/constants/routes'

export async function updateAttorneyPhoto(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz işlem' }
  }

  const image = formData.get('image') as File | null

  if (!image || image.size === 0) {
    return { error: 'Lütfen bir görsel seçin' }
  }

  if (!['image/jpeg', 'image/png', 'image/webp'].includes(image.type)) {
    return { error: 'Geçersiz dosya tipi. Sadece JPG, PNG veya WEBP yüklenebilir.' }
  }
  if (image.size > 4 * 1024 * 1024) {
    return { error: 'Dosya boyutu çok büyük. Maksimum 4MB olmalıdır.' }
  }

  const { data: currentRow } = await supabase
    .from('site_settings')
    .select('attorney_photo_url')
    .eq('id', 1)
    .single()

  const fileExt = image.name.split('.').pop()
  const fileName = `site/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from('media')
    .upload(fileName, image)

  if (uploadError) {
    return { error: 'Görsel yüklenemedi: ' + uploadError.message }
  }

  const { data: publicUrlData } = supabase.storage
    .from('media')
    .getPublicUrl(fileName)

  const { error: updateError } = await supabase
    .from('site_settings')
    .update({ attorney_photo_url: publicUrlData.publicUrl })
    .eq('id', 1)

  if (updateError) {
    await supabase.storage.from('media').remove([fileName])
    return { error: 'Kaydedilemedi: ' + updateError.message }
  }

  const oldUrl = currentRow?.attorney_photo_url
  if (oldUrl) {
    const parts = oldUrl.split('/media/')
    if (parts.length > 1) {
      const oldPath = parts[1]
      const { error: removeError } = await supabase.storage.from('media').remove([oldPath])
      if (removeError) {
        console.error('Eski fotoğraf silinemedi:', removeError.message)
      }
    }
  }

  revalidatePath(ROUTES.ABOUT)
  revalidatePath(ROUTES.ADMIN.SETTINGS)

  return { success: true, url: publicUrlData.publicUrl }
}
