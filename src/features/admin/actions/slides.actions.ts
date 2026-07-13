'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { slideSchema } from '../schemas/slide-schema'
import { ROUTES } from '@/constants/routes'

export async function createSlide(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz işlem' }
  }

  const rawData = {
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string,
    link: formData.get('link') as string,
    is_active: formData.get('is_active') === 'true' || formData.get('is_active') === 'on',
  }

  const result = slideSchema.safeParse(rawData)

  if (!result.success) {
    return { error: 'Doğrulama hatası: ' + result.error.issues[0].message }
  }

  let image_url = null
  const image = formData.get('image') as File | null

  if (image && image.size > 0) {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(image.type)) {
      return { error: 'Geçersiz dosya tipi. Sadece JPG, PNG veya WEBP yüklenebilir.' }
    }
    if (image.size > 2 * 1024 * 1024) {
      return { error: 'Dosya boyutu çok büyük. Maksimum 2MB olmalıdır.' }
    }

    const fileExt = image.name.split('.').pop()
    const fileName = `slides/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(fileName, image)

    if (uploadError) {
      return { error: 'Görsel yüklenemedi: ' + uploadError.message }
    }

    const { data: publicUrlData } = supabase.storage
      .from('media')
      .getPublicUrl(fileName)

    image_url = publicUrlData.publicUrl
  }

  // Get max sort_order
  const { data: maxOrderData } = await supabase
    .from('slides')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)

  const newSortOrder = maxOrderData && maxOrderData.length > 0 ? maxOrderData[0].sort_order + 1 : 1

  const { error: insertError } = await supabase
    .from('slides')
    .insert({
      title: result.data.title,
      subtitle: result.data.subtitle,
      link: result.data.link,
      is_active: result.data.is_active,
      image_url,
      sort_order: newSortOrder,
    })

  if (insertError) {
    return { error: 'Veritabanına kaydedilemedi: ' + insertError.message }
  }

  revalidatePath('/')
  revalidatePath(ROUTES.ADMIN.SLIDER)

  return { success: true }
}

export async function updateSlide(id: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz işlem' }
  }

  const rawData = {
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string,
    link: formData.get('link') as string,
    is_active: formData.get('is_active') === 'true' || formData.get('is_active') === 'on',
  }

  const result = slideSchema.safeParse(rawData)

  if (!result.success) {
    return { error: 'Doğrulama hatası: ' + result.error.issues[0].message }
  }

  let image_url = undefined
  const image = formData.get('image') as File | null

  if (image && image.size > 0) {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(image.type)) {
      return { error: 'Geçersiz dosya tipi. Sadece JPG, PNG veya WEBP yüklenebilir.' }
    }
    if (image.size > 2 * 1024 * 1024) {
      return { error: 'Dosya boyutu çok büyük. Maksimum 2MB olmalıdır.' }
    }

    const fileExt = image.name.split('.').pop()
    const fileName = `slides/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(fileName, image)

    if (uploadError) {
      return { error: 'Görsel yüklenemedi: ' + uploadError.message }
    }

    const { data: publicUrlData } = supabase.storage
      .from('media')
      .getPublicUrl(fileName)

    image_url = publicUrlData.publicUrl

    const { data: oldSlide } = await supabase
      .from('slides')
      .select('image_url')
      .eq('id', id)
      .single()

    if (oldSlide?.image_url) {
      const parts = oldSlide.image_url.split('/media/')
      if (parts.length > 1) {
        const oldPath = parts[1]
        const { error: removeError } = await supabase.storage.from('media').remove([oldPath])
        if (removeError) {
          console.error('Eski görsel silinemedi:', removeError.message)
        }
      }
    }
  }

  type SlideUpdate = {
    title: string
    subtitle: string | null
    link: string | null
    is_active: boolean
    image_url?: string
  }

  const updateData: SlideUpdate = {
    title: result.data.title,
    subtitle: result.data.subtitle || null,
    link: result.data.link || null,
    is_active: result.data.is_active,
  }

  if (image_url !== undefined) {
    updateData.image_url = image_url
  }

  const { error: updateError } = await supabase
    .from('slides')
    .update(updateData)
    .eq('id', id)

  if (updateError) {
    return { error: 'Güncellenemedi: ' + updateError.message }
  }

  revalidatePath('/')
  revalidatePath(ROUTES.ADMIN.SLIDER)

  return { success: true }
}

export async function archiveSlide(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz işlem' }
  }

  const { error } = await supabase
    .from('slides')
    .update({ is_archived: true })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath(ROUTES.ADMIN.SLIDER)
  return { success: true }
}

export async function toggleSlideActive(id: string, current: boolean) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz işlem' }
  }

  const { error } = await supabase
    .from('slides')
    .update({ is_active: !current })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath(ROUTES.ADMIN.SLIDER)
  return { success: true }
}

export async function moveSlide(id: string, direction: 'up' | 'down') {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz işlem' }
  }

  const { data: currentSlide } = await supabase
    .from('slides')
    .select('sort_order')
    .eq('id', id)
    .single()

  if (!currentSlide) return { error: 'Slide bulunamadı' }

  const currentOrder = currentSlide.sort_order

  // Proper query for swap target
  let query = supabase
    .from('slides')
    .select('id, sort_order')
    .eq('is_archived', false)

  if (direction === 'up') {
    query = query.lt('sort_order', currentOrder).order('sort_order', { ascending: false })
  } else {
    query = query.gt('sort_order', currentOrder).order('sort_order', { ascending: true })
  }

  const { data: finalTarget } = await query.limit(1)

  if (finalTarget && finalTarget.length > 0) {
    const target = finalTarget[0]
    
    // Swap
    await supabase.from('slides').update({ sort_order: target.sort_order }).eq('id', id)
    await supabase.from('slides').update({ sort_order: currentOrder }).eq('id', target.id)
  }

  revalidatePath('/')
  revalidatePath(ROUTES.ADMIN.SLIDER)
  return { success: true }
}
