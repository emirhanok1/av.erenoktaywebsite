'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { slideSchema, type SlideFormValues } from '../schemas/slide-schema'
import { createSlide, updateSlide } from '../actions/slides.actions'
import { ROUTES } from '@/constants/routes'
import type { Slide } from '@/services/slides'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'

interface SlideFormProps {
  slide?: Slide
}

export default function SlideForm({ slide }: SlideFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [previewUrl, setPreviewUrl] = useState<string | null>(slide?.image_url || null)
  
  const form = useForm<SlideFormValues>({
    resolver: zodResolver(slideSchema),
    defaultValues: {
      title: slide?.title ?? '',
      subtitle: slide?.subtitle ?? '',
      link: slide?.link ?? '',
      is_active: slide?.is_active ?? true,
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

  const onSubmit = (data: SlideFormValues) => {
    startTransition(async () => {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('subtitle', data.subtitle || '')
      formData.append('link', data.link || '')
      formData.append('is_active', data.is_active ? 'true' : 'false')

      const imageInput = document.getElementById('image') as HTMLInputElement
      if (imageInput?.files?.[0]) {
        formData.append('image', imageInput.files[0])
      }

      let result
      if (slide) {
        result = await updateSlide(slide.id, formData)
      } else {
        if (!imageInput?.files?.[0]) {
          toast.error('Lütfen bir görsel seçin')
          return
        }
        result = await createSlide(formData)
      }

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(slide ? 'Slide güncellendi' : 'Slide eklendi')
        router.push(ROUTES.ADMIN.SLIDER)
      }
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Başlık *</Label>
          <Input 
            id="title" 
            {...form.register('title')} 
            placeholder="Örn: Hukuki Danışmanlık" 
          />
          {form.formState.errors.title && (
            <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="subtitle">Alt Başlık</Label>
          <Input 
            id="subtitle" 
            {...form.register('subtitle')} 
            placeholder="Örn: Uzman kadromuzla yanınızdayız" 
          />
          {form.formState.errors.subtitle && (
            <p className="text-sm text-destructive">{form.formState.errors.subtitle.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="link">Yönlendirme Linki (İsteğe Bağlı)</Label>
          <Input 
            id="link" 
            {...form.register('link')} 
            placeholder="Örn: /iletisim veya https://..." 
          />
          {form.formState.errors.link && (
            <p className="text-sm text-destructive">{form.formState.errors.link.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Görsel {!slide && '*'}</Label>
          <Input 
            id="image" 
            name="image" 
            type="file" 
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleImageChange}
          />
          <p className="text-xs text-muted-foreground">Sadece JPG, PNG, WEBP. Max 2MB.</p>
          
          {previewUrl && (
            <div className="mt-4 relative aspect-[21/9] w-full max-w-md overflow-hidden rounded-md border">
              <Image src={previewUrl} alt="Preview" fill className="object-cover" />
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="is_active" 
            checked={form.watch('is_active')}
            onCheckedChange={(checked) => form.setValue('is_active', checked as boolean)}
          />
          <Label htmlFor="is_active" className="font-normal cursor-pointer">
            Bu slide sitede aktif olarak gösterilsin
          </Label>
        </div>
      </div>

      <div className="flex gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.push(ROUTES.ADMIN.SLIDER)}
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
