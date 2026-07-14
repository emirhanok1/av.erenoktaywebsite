'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { articleSchema, type ArticleFormValues } from '../schemas/article-schema'
import { createArticle, updateArticle } from '../actions/articles.actions'
import { ROUTES } from '@/constants/routes'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'

interface ArticleFormProps {
  article?: {
    id: string
    title: string
    excerpt: string | null
    content: string
    category: string
    read_time: number
    cover_image: string | null
    is_published: boolean
  } | null
}

export function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [previewUrl, setPreviewUrl] = useState<string | null>(article?.cover_image ?? null)
  
  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: article?.title ?? '',
      excerpt: article?.excerpt ?? '',
      content: article?.content ?? '',
      category: article?.category ?? '',
      read_time: article?.read_time ?? undefined,
      is_published: article?.is_published ?? false,
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        toast.error('Sadece JPG, PNG veya WEBP formatları desteklenir')
        e.target.value = ''
        return
      }

      if (file.size > 2 * 1024 * 1024) {
        toast.error('Dosya boyutu çok büyük (Max 2MB)')
        e.target.value = ''
        return
      }
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const onSubmit = (data: ArticleFormValues) => {
    startTransition(async () => {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('excerpt', data.excerpt || '')
      formData.append('content', data.content)
      formData.append('category', data.category)
      if (data.read_time) {
        formData.append('read_time', data.read_time.toString())
      }
      formData.append('is_published', data.is_published ? 'true' : 'false')

      const imageInput = document.getElementById('image') as HTMLInputElement
      if (imageInput?.files?.[0]) {
        formData.append('image', imageInput.files[0])
      }

      const result = article
        ? await updateArticle(article.id, formData)
        : await createArticle(formData)

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(article ? 'Pratik bilgi güncellendi' : 'Pratik bilgi oluşturuldu')
        router.push(ROUTES.ADMIN.ARTICLES)
        router.refresh()
      }
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="title">Başlık *</Label>
          <Input 
            id="title" 
            {...form.register('title')} 
            placeholder="Pratik bilgi başlığı..." 
          />
          {form.formState.errors.title && (
            <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Kategori *</Label>
          <Input 
            id="category" 
            {...form.register('category')} 
            placeholder="Örn: İş Hukuku, Aile Hukuku..." 
          />
          {form.formState.errors.category && (
            <p className="text-sm text-destructive">{form.formState.errors.category.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="read_time">Okuma Süresi (Dakika)</Label>
          <Input 
            id="read_time" 
            type="number"
            {...form.register('read_time', { 
              setValueAs: v => v === '' ? undefined : Number(v) 
            })} 
            placeholder="Otomatik hesaplanması için boş bırakın" 
          />
          <p className="text-xs text-muted-foreground">Boş bırakılırsa içeriğin uzunluğuna göre otomatik hesaplanır.</p>
          {form.formState.errors.read_time && (
            <p className="text-sm text-destructive">{form.formState.errors.read_time.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Kısa Özet (Opsiyonel)</Label>
        <Textarea 
          id="excerpt" 
          {...form.register('excerpt')} 
          placeholder="Liste sayfalarında ve SEO metninde görünecek kısa açıklama..."
          className="resize-none h-20"
        />
        <p className="text-xs text-muted-foreground">Maksimum 300 karakter. Boş bırakılabilir.</p>
        {form.formState.errors.excerpt && (
          <p className="text-sm text-destructive">{form.formState.errors.excerpt.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">İçerik *</Label>
        <Textarea 
          id="content" 
          {...form.register('content')} 
          placeholder="İçerik metni..."
          className="min-h-[300px]"
        />
        {form.formState.errors.content && (
          <p className="text-sm text-destructive">{form.formState.errors.content.message}</p>
        )}
      </div>

      <div className="space-y-2 border p-6 rounded-lg bg-slate-50 dark:bg-slate-900">
        <Label htmlFor="image" className="block mb-2">Kapak Görseli</Label>
        <p className="text-sm text-muted-foreground mb-4">
          JPG, PNG veya WEBP. Maksimum 2MB. İçerik sayfasının başında görünür.
        </p>
        
        <Input 
          id="image" 
          name="image" 
          type="file" 
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleImageChange}
          className="max-w-md cursor-pointer"
        />
        
        {previewUrl && (
          <div className="mt-4 relative aspect-[16/9] w-full max-w-md overflow-hidden rounded-md border">
            <Image src={previewUrl} alt="Kapak görseli önizleme" fill className="object-cover" />
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2 pt-4 border-t">
        <Checkbox 
          id="is_published" 
          checked={form.watch('is_published')}
          onCheckedChange={(checked) => form.setValue('is_published', checked as boolean)}
        />
        <Label htmlFor="is_published" className="font-normal cursor-pointer">
          Bu pratik bilgiyi hemen yayınla
        </Label>
      </div>

      <div className="flex gap-4 pt-4 border-t">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.push(ROUTES.ADMIN.ARTICLES)}
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
