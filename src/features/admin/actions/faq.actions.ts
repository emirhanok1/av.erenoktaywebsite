'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { faqSchema } from '../schemas/faq-schema'
import { ROUTES } from '@/constants/routes'

export async function createFaq(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz işlem' }
  }

  const rawData = {
    question: formData.get('question') as string,
    answer: formData.get('answer') as string,
    category: formData.get('category') as string,
    is_published: formData.get('is_published') === 'true' || formData.get('is_published') === 'on',
  }

  const result = faqSchema.safeParse(rawData)

  if (!result.success) {
    return { error: 'Doğrulama hatası: ' + result.error.issues[0].message }
  }

  // Get max sort_order
  const { data: maxOrderData } = await supabase
    .from('faq')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)

  const newSortOrder = maxOrderData && maxOrderData.length > 0 ? maxOrderData[0].sort_order + 1 : 1

  const { error: insertError } = await supabase
    .from('faq')
    .insert({
      question: result.data.question,
      answer: result.data.answer,
      category: result.data.category || null,
      is_published: result.data.is_published,
      sort_order: newSortOrder,
    })

  if (insertError) {
    return { error: 'Veritabanına kaydedilemedi: ' + insertError.message }
  }

  revalidatePath('/sss')
  revalidatePath(ROUTES.ADMIN.FAQ)

  return { success: true }
}

export async function updateFaq(id: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz işlem' }
  }

  const rawData = {
    question: formData.get('question') as string,
    answer: formData.get('answer') as string,
    category: formData.get('category') as string,
    is_published: formData.get('is_published') === 'true' || formData.get('is_published') === 'on',
  }

  const result = faqSchema.safeParse(rawData)

  if (!result.success) {
    return { error: 'Doğrulama hatası: ' + result.error.issues[0].message }
  }

  const { error: updateError } = await supabase
    .from('faq')
    .update({
      question: result.data.question,
      answer: result.data.answer,
      category: result.data.category || null,
      is_published: result.data.is_published,
    })
    .eq('id', id)

  if (updateError) {
    return { error: 'Güncellenemedi: ' + updateError.message }
  }

  revalidatePath('/sss')
  revalidatePath(ROUTES.ADMIN.FAQ)

  return { success: true }
}

export async function archiveFaq(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz işlem' }
  }

  const { error } = await supabase
    .from('faq')
    .update({ is_archived: true })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/sss')
  revalidatePath(ROUTES.ADMIN.FAQ)
  return { success: true }
}

export async function toggleFaqPublished(id: string, current: boolean) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz işlem' }
  }

  const { error } = await supabase
    .from('faq')
    .update({ is_published: !current })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/sss')
  revalidatePath(ROUTES.ADMIN.FAQ)
  return { success: true }
}

export async function moveFaq(id: string, direction: 'up' | 'down') {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz işlem' }
  }

  const { data: currentFaq } = await supabase
    .from('faq')
    .select('sort_order')
    .eq('id', id)
    .single()

  if (!currentFaq) return { error: 'Soru bulunamadı' }

  const currentOrder = currentFaq.sort_order

  let query = supabase
    .from('faq')
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
    const { error: err1 } = await supabase.from('faq').update({ sort_order: target.sort_order }).eq('id', id)
    if (err1) return { error: 'Sıralama güncellenemedi: ' + err1.message }

    const { error: err2 } = await supabase.from('faq').update({ sort_order: currentOrder }).eq('id', target.id)
    if (err2) return { error: 'Sıralama güncellenemedi: ' + err2.message }
  }

  revalidatePath('/sss')
  revalidatePath(ROUTES.ADMIN.FAQ)
  return { success: true }
}
