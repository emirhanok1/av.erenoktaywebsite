import { z } from 'zod'

export const kidemSchema = z.object({
  startDate: z.string().min(1, 'İşe giriş tarihi zorunludur'),
  endDate: z.string().min(1, 'İşten çıkış tarihi zorunludur'),
  grossSalary: z.number({ error: 'Aylık brüt maaş giriniz' }).positive('Aylık brüt maaş sıfırdan büyük olmalıdır'),
  transportAllowance: z.number().min(0, 'Negatif olamaz'),
  mealAllowance: z.number().min(0, 'Negatif olamaz'),
  annualBonus: z.number().min(0, 'Negatif olamaz'),
  terminationType: z.enum(['isveren_haksiz', 'hakli_neden_ayrilma', 'istifa'], {
    error: 'Fesih türünü seçiniz',
  }),
})

export type KidemFormValues = z.infer<typeof kidemSchema>
