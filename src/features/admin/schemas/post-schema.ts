import { z } from 'zod'

export const postSchema = z.object({
  title: z.string().min(3, 'Başlık en az 3 karakter olmalıdır').max(150, 'Başlık en fazla 150 karakter olmalıdır'),
  excerpt: z.string().max(300, 'Özet en fazla 300 karakter olmalıdır').optional().or(z.literal('')),
  content: z.string().min(10, 'İçerik en az 10 karakter olmalıdır'),
  is_published: z.boolean(),
})

export type PostFormValues = z.infer<typeof postSchema>
