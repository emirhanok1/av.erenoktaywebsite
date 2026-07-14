import { z } from 'zod'

export const articleSchema = z.object({
  title: z.string().min(3, 'Başlık en az 3 karakter olmalıdır').max(150, 'Başlık en fazla 150 karakter olmalıdır'),
  excerpt: z.string().max(300, 'Özet en fazla 300 karakter olmalıdır').optional().or(z.literal('')),
  content: z.string().min(10, 'İçerik en az 10 karakter olmalıdır'),
  category: z.string().min(2, 'Kategori en az 2 karakter olmalıdır').max(50, 'Kategori en fazla 50 karakter olmalıdır'),
  read_time: z.number().int('Tam sayı olmalıdır').min(1, 'En az 1 dakika').max(60, 'En fazla 60 dakika').optional(),
  is_published: z.boolean(),
})

export type ArticleFormValues = z.infer<typeof articleSchema>
