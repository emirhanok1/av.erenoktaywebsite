'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { faqSchema, type FaqFormValues } from '../schemas/faq-schema'
import { createFaq, updateFaq } from '../actions/faq.actions'
import { ROUTES } from '@/constants/routes'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'

interface FaqFormProps {
  faq?: {
    id: string
    question: string
    answer: string
    category: string | null
    is_published: boolean
  } | null
}

export function FaqForm({ faq }: FaqFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  
  const form = useForm<FaqFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: faq?.question ?? '',
      answer: faq?.answer ?? '',
      category: faq?.category ?? '',
      is_published: faq?.is_published ?? false,
    },
  })

  const onSubmit = (data: FaqFormValues) => {
    startTransition(async () => {
      const formData = new FormData()
      formData.append('question', data.question)
      formData.append('answer', data.answer)
      formData.append('category', data.category || '')
      formData.append('is_published', data.is_published ? 'true' : 'false')

      const result = faq
        ? await updateFaq(faq.id, formData)
        : await createFaq(formData)

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(faq ? 'Soru güncellendi' : 'Soru oluşturuldu')
        router.push(ROUTES.ADMIN.FAQ)
        router.refresh()
      }
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="question">Soru *</Label>
          <Input 
            id="question" 
            {...form.register('question')} 
            placeholder="Sıkça sorulan soru..." 
          />
          {form.formState.errors.question && (
            <p className="text-sm text-destructive">{form.formState.errors.question.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Kategori (Opsiyonel)</Label>
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
          <Label htmlFor="answer">Cevap *</Label>
          <Textarea 
            id="answer" 
            {...form.register('answer')} 
            placeholder="Soruya verilecek detaylı cevap..."
            className="min-h-[150px]"
            rows={6}
          />
          {form.formState.errors.answer && (
            <p className="text-sm text-destructive">{form.formState.errors.answer.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Checkbox 
            id="is_published" 
            checked={form.watch('is_published')}
            onCheckedChange={(checked) => form.setValue('is_published', checked as boolean)}
          />
          <Label htmlFor="is_published" className="font-normal cursor-pointer">
            Bu soruyu hemen yayınla
          </Label>
        </div>
      </div>

      <div className="flex gap-4 pt-4 border-t">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.push(ROUTES.ADMIN.FAQ)}
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
