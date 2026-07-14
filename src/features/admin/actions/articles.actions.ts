'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { articleSchema } from '../schemas/article-schema'
import { ROUTES } from '@/constants/routes'
import { slugify } from '@/lib/slugify'
import { SupabaseClient } from '@supabase/supabase-js'

async function generateUniqueSlug(supabase: SupabaseClient, baseSlug: string, currentId?: string): Promise<string> {
  let slug = baseSlug
  let counter = 2
  while (true) {
    let query = supabase.from('articles').select('id').eq('slug', slug)
    if (currentId) {
      query = query.neq('id', currentId)
    }
    const { data } = await query
    if (!data || data.length === 0) {
      return slug
    }
    slug = `${baseSlug}-${counter}`
    counter++
  }
}

export async function createArticle(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz işlem' }
  }

  const rawData = {
    title: formData.get('title') as string,
    excerpt: formData.get('excerpt') as string,
    content: formData.get('content') as string,
    category: formData.get('category') as string,
    read_time: formData.get('read_time') as string,
    is_published: formData.get('is_published') === 'true' || formData.get('is_published') === 'on',
  }

  const result = articleSchema.safeParse(rawData)

  if (!result.success) {
    return { error: 'Doğrulama hatası: ' + result.error.issues[0].message }
  }

  const baseSlug = slugify(result.data.title)
  const finalSlug = await generateUniqueSlug(supabase, baseSlug)

  let cover_image = null
  const image = formData.get('image') as File | null

  if (image && image.size > 0) {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(image.type)) {
      return { error: 'Geçersiz dosya tipi. Sadece JPG, PNG veya WEBP yüklenebilir.' }
    }
    if (image.size > 2 * 1024 * 1024) {
      return { error: 'Dosya boyutu çok büyük. Maksimum 2MB olmalıdır.' }
    }

    const fileExt = image.name.split('.').pop()
    const fileName = `articles/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(fileName, image)

    if (uploadError) {
      return { error: 'Görsel yüklenemedi: ' + uploadError.message }
    }

    const { data: publicUrlData } = supabase.storage
      .from('media')
      .getPublicUrl(fileName)

    cover_image = publicUrlData.publicUrl
  }

  const published_at = result.data.is_published ? new Date().toISOString() : null
  
  let read_time = result.data.read_time
  if (!read_time) {
    const wordCount = result.data.content.trim().split(/\s+/).length
    read_time = Math.max(1, Math.ceil(wordCount / 200))
  }

  const { error: insertError } = await supabase
    .from('articles')
    .insert({
      title: result.data.title,
      slug: finalSlug,
      excerpt: result.data.excerpt || null,
      content: result.data.content,
      category: result.data.category,
      read_time,
      cover_image,
      is_published: result.data.is_published,
      published_at,
    })

  if (insertError) {
    return { error: 'Veritabanına kaydedilemedi: ' + insertError.message }
  }

  revalidatePath('/pratik-bilgiler')
  revalidatePath(ROUTES.ADMIN.ARTICLES)

  return { success: true }
}

export async function updateArticle(id: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz işlem' }
  }

  const rawData = {
    title: formData.get('title') as string,
    excerpt: formData.get('excerpt') as string,
    content: formData.get('content') as string,
    category: formData.get('category') as string,
    read_time: formData.get('read_time') as string,
    is_published: formData.get('is_published') === 'true' || formData.get('is_published') === 'on',
  }

  const result = articleSchema.safeParse(rawData)

  if (!result.success) {
    return { error: 'Doğrulama hatası: ' + result.error.issues[0].message }
  }

  let cover_image = undefined
  const image = formData.get('image') as File | null

  if (image && image.size > 0) {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(image.type)) {
      return { error: 'Geçersiz dosya tipi. Sadece JPG, PNG veya WEBP yüklenebilir.' }
    }
    if (image.size > 2 * 1024 * 1024) {
      return { error: 'Dosya boyutu çok büyük. Maksimum 2MB olmalıdır.' }
    }

    const fileExt = image.name.split('.').pop()
    const fileName = `articles/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(fileName, image)

    if (uploadError) {
      return { error: 'Görsel yüklenemedi: ' + uploadError.message }
    }

    const { data: publicUrlData } = supabase.storage
      .from('media')
      .getPublicUrl(fileName)

    cover_image = publicUrlData.publicUrl

    const { data: oldArticle } = await supabase
      .from('articles')
      .select('cover_image')
      .eq('id', id)
      .single()

    if (oldArticle?.cover_image) {
      const parts = oldArticle.cover_image.split('/media/')
      if (parts.length > 1) {
        const oldPath = parts[1]
        const { error: removeError } = await supabase.storage.from('media').remove([oldPath])
        if (removeError) {
          console.error('Eski görsel silinemedi:', removeError.message)
        }
      }
    }
  }

  const { data: currentArticle } = await supabase
    .from('articles')
    .select('published_at, is_published')
    .eq('id', id)
    .single()

  let published_at = currentArticle?.published_at
  if (result.data.is_published && !currentArticle?.is_published && !published_at) {
    published_at = new Date().toISOString()
  }
  
  let read_time = result.data.read_time
  if (!read_time) {
    const wordCount = result.data.content.trim().split(/\s+/).length
    read_time = Math.max(1, Math.ceil(wordCount / 200))
  }

  type ArticleUpdate = {
    title: string
    excerpt: string | null
    content: string
    category: string
    read_time: number
    is_published: boolean
    published_at?: string | null
    cover_image?: string
  }

  const updateData: ArticleUpdate = {
    title: result.data.title,
    excerpt: result.data.excerpt || null,
    content: result.data.content,
    category: result.data.category,
    read_time,
    is_published: result.data.is_published,
    published_at,
  }

  if (cover_image !== undefined) {
    updateData.cover_image = cover_image
  }

  const { error: updateError } = await supabase
    .from('articles')
    .update(updateData)
    .eq('id', id)

  if (updateError) {
    return { error: 'Güncellenemedi: ' + updateError.message }
  }

  revalidatePath('/pratik-bilgiler')
  revalidatePath(ROUTES.ADMIN.ARTICLES)

  return { success: true }
}

export async function archiveArticle(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz işlem' }
  }

  const { error } = await supabase
    .from('articles')
    .update({ is_archived: true })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/pratik-bilgiler')
  revalidatePath(ROUTES.ADMIN.ARTICLES)
  return { success: true }
}
