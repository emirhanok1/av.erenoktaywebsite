'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { postSchema } from '../schemas/post-schema'
import { ROUTES } from '@/constants/routes'
import { slugify } from '@/lib/slugify'

import { SupabaseClient } from '@supabase/supabase-js'

async function generateUniqueSlug(supabase: SupabaseClient, baseSlug: string, currentId?: string): Promise<string> {
  let slug = baseSlug
  let counter = 2
  while (true) {
    let query = supabase.from('posts').select('id').eq('slug', slug)
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

export async function createPost(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz işlem' }
  }

  const rawData = {
    title: formData.get('title') as string,
    excerpt: formData.get('excerpt') as string,
    content: formData.get('content') as string,
    is_published: formData.get('is_published') === 'true' || formData.get('is_published') === 'on',
  }

  const result = postSchema.safeParse(rawData)

  if (!result.success) {
    return { error: 'Doğrulama hatası: ' + result.error.issues[0].message }
  }

  const baseSlug = slugify(result.data.title) || `icerik-${Date.now()}`
  const finalSlug = await generateUniqueSlug(supabase, baseSlug)

  let cover_image = null
  let uploadedPath: string | undefined = undefined
  const image = formData.get('image') as File | null

  if (image && image.size > 0) {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(image.type)) {
      return { error: 'Geçersiz dosya tipi. Sadece JPG, PNG veya WEBP yüklenebilir.' }
    }
    if (image.size > 2 * 1024 * 1024) {
      return { error: 'Dosya boyutu çok büyük. Maksimum 2MB olmalıdır.' }
    }

    const fileExt = image.name.split('.').pop()
    const fileName = `posts/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(fileName, image)

    if (uploadError) {
      return { error: 'Görsel yüklenemedi: ' + uploadError.message }
    }

    uploadedPath = fileName
    const { data: publicUrlData } = supabase.storage
      .from('media')
      .getPublicUrl(fileName)

    cover_image = publicUrlData.publicUrl
  }

  const published_at = result.data.is_published ? new Date().toISOString() : null

  const { error: insertError } = await supabase
    .from('posts')
    .insert({
      title: result.data.title,
      slug: finalSlug,
      excerpt: result.data.excerpt || null,
      content: result.data.content,
      cover_image,
      is_published: result.data.is_published,
      published_at,
    })

  if (insertError) {
    if (uploadedPath) {
      await supabase.storage.from('media').remove([uploadedPath])
    }
    return { error: 'Veritabanına kaydedilemedi: ' + insertError.message }
  }

  revalidatePath('/duyurular')
  revalidatePath('/')
  revalidatePath(ROUTES.ADMIN.POSTS)

  return { success: true }
}

export async function updatePost(id: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz işlem' }
  }

  const rawData = {
    title: formData.get('title') as string,
    excerpt: formData.get('excerpt') as string,
    content: formData.get('content') as string,
    is_published: formData.get('is_published') === 'true' || formData.get('is_published') === 'on',
  }

  const result = postSchema.safeParse(rawData)

  if (!result.success) {
    return { error: 'Doğrulama hatası: ' + result.error.issues[0].message }
  }

  const { data: currentPost } = await supabase
    .from('posts')
    .select('published_at, is_published, cover_image')
    .eq('id', id)
    .single()

  let cover_image = undefined
  let uploadedPath: string | undefined = undefined
  const image = formData.get('image') as File | null

  if (image && image.size > 0) {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(image.type)) {
      return { error: 'Geçersiz dosya tipi. Sadece JPG, PNG veya WEBP yüklenebilir.' }
    }
    if (image.size > 2 * 1024 * 1024) {
      return { error: 'Dosya boyutu çok büyük. Maksimum 2MB olmalıdır.' }
    }

    const fileExt = image.name.split('.').pop()
    const fileName = `posts/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(fileName, image)

    if (uploadError) {
      return { error: 'Görsel yüklenemedi: ' + uploadError.message }
    }

    uploadedPath = fileName
    const { data: publicUrlData } = supabase.storage
      .from('media')
      .getPublicUrl(fileName)

    cover_image = publicUrlData.publicUrl
  }

  let published_at = currentPost?.published_at
  if (result.data.is_published && !currentPost?.is_published && !published_at) {
    published_at = new Date().toISOString()
  }

  type PostUpdate = {
    title: string
    excerpt: string | null
    content: string
    is_published: boolean
    published_at?: string | null
    cover_image?: string
  }

  const updateData: PostUpdate = {
    title: result.data.title,
    excerpt: result.data.excerpt || null,
    content: result.data.content,
    is_published: result.data.is_published,
    published_at,
  }

  if (cover_image !== undefined) {
    updateData.cover_image = cover_image
  }

  const { error: updateError } = await supabase
    .from('posts')
    .update(updateData)
    .eq('id', id)

  if (updateError) {
    if (uploadedPath) {
      await supabase.storage.from('media').remove([uploadedPath])
    }
    return { error: 'Güncellenemedi: ' + updateError.message }
  }

  if (uploadedPath && currentPost?.cover_image) {
    const parts = currentPost.cover_image.split('/media/')
    if (parts.length > 1) {
      const oldPath = parts[1]
      const { error: removeError } = await supabase.storage.from('media').remove([oldPath])
      if (removeError) {
        console.error('Eski görsel silinemedi:', removeError.message)
      }
    }
  }

  revalidatePath('/duyurular')
  revalidatePath('/')
  revalidatePath(ROUTES.ADMIN.POSTS)

  return { success: true }
}

export async function archivePost(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yetkisiz işlem' }
  }

  const { error } = await supabase
    .from('posts')
    .update({ is_archived: true })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/duyurular')
  revalidatePath('/')
  revalidatePath(ROUTES.ADMIN.POSTS)
  return { success: true }
}
