import * as z from 'zod'

export const faqSchema = z.object({
  question: z.string().min(5, 'Soru en az 5 karakter olmalıdır').max(300, 'Soru en fazla 300 karakter olmalıdır'),
  answer: z.string().min(10, 'Cevap en az 10 karakter olmalıdır'),
  category: z.string().min(2, 'Kategori en az 2 karakter olmalıdır').max(50, 'Kategori en fazla 50 karakter olmalıdır')
    .optional().or(z.literal('')),
  is_published: z.boolean(),
})

export type FaqFormValues = z.infer<typeof faqSchema>
