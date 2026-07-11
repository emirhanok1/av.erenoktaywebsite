import { z } from 'zod'

export const slideSchema = z.object({
  title: z.string()
    .min(3, 'Başlık en az 3 karakter olmalı')
    .max(120, 'Başlık en fazla 120 karakter'),
  subtitle: z.string()
    .max(80, 'Alt başlık en fazla 80 karakter')
    .optional()
    .or(z.literal('')),
  link: z.string()
    .max(200)
    .optional()
    .or(z.literal('')),
  is_active: z.boolean().default(true),
})

export type SlideFormValues = z.infer<typeof slideSchema>
