'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { postSchema, type PostFormValues } from '../schemas/post-schema'
import { createPost, updatePost } from '../actions/posts.actions'
import { ROUTES } from '@/constants/routes'
import type { Post } from '@/services/posts'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'

interface PostFormProps {
  post?: Post
}

export default function PostForm({ post }: PostFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [previewUrl, setPreviewUrl] = useState<string | null>(post?.cover_image || null)
  
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title ?? '',
      excerpt: post?.excerpt ?? '',
      content: post?.content ?? '',
      is_published: post?.is_published ?? false,
    }
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Dosya boyutu çok büyük (Max 2MB)')
        e.target.value = ''
        return
      }
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const onSubmit = (data: PostFormValues) => {
    startTransition(async () => {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('excerpt', data.excerpt || '')
      formData.append('content', data.content)
      formData.append('is_published', data.is_published ? 'true' : 'false')

      const imageInput = document.getElementById('image') as HTMLInputElement
      if (imageInput?.files?.[0]) {
        formData.append('image', imageInput.files[0])
      }

      let result
      if (post) {
        result = await updatePost(post.id, formData)
      } else {
        result = await createPost(formData)
      }

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(post ? 'Duyuru güncellendi' : 'Duyuru eklendi')
        router.push(ROUTES.ADMIN.POSTS)
      }
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Başlık *</Label>
          <Input 
            id="title" 
            {...form.register('title')} 
            placeholder="Duyuru başlığını giriniz" 
          />
          {form.formState.errors.title && (
            <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Özet (Opsiyonel)</Label>
          <Textarea 
            id="excerpt" 
            {...form.register('excerpt')} 
            placeholder="Duyuru için kısa bir özet yazın" 
            rows={2}
          />
          {form.formState.errors.excerpt && (
            <p className="text-sm text-destructive">{form.formState.errors.excerpt.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">İçerik *</Label>
          <Textarea
            id="content"
            {...form.register('content')}
            placeholder="Duyuru içeriği (düz metin)"
            rows={12}
          />
          <p className="text-xs text-muted-foreground">Paragraf arası boşluk bırakmak için boş bir satır kullanın.</p>
          {form.formState.errors.content && (
            <p className="text-sm text-destructive">{form.formState.errors.content.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Kapak Görseli (Opsiyonel)</Label>
          <Input 
            id="image" 
            name="image" 
            type="file" 
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleImageChange}
          />
          <p className="text-xs text-muted-foreground">Sadece JPG, PNG, WEBP. Max 2MB.</p>
          
          {previewUrl && (
            <div className="mt-4 relative aspect-[16/9] w-full max-w-md overflow-hidden rounded-md border">
              <Image src={previewUrl} alt="Preview" fill className="object-cover" />
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="is_published" 
            checked={form.watch('is_published')}
            onCheckedChange={(checked) => form.setValue('is_published', checked as boolean)}
          />
          <Label htmlFor="is_published" className="font-normal cursor-pointer">
            Bu duyuruyu hemen yayınla
          </Label>
        </div>
      </div>

      <div className="flex gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.push(ROUTES.ADMIN.POSTS)}
          disabled={isPending}
        >
          İptal
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
      </div>
    </form>
  )
}
