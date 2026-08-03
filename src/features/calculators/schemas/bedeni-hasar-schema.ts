import { z } from 'zod'

const PHONE_REGEX = /^[0-9+\s()-]{10,}$/

export const bedeniHasarSchema = z.object({
  fullName: z.string().min(2, 'Ad soyad giriniz').max(150, 'Ad soyad çok uzun'),
  phone: z.string().regex(PHONE_REGEX, 'Geçerli bir telefon numarası giriniz'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  accidentDate: z.string().min(1, 'Kaza tarihi zorunludur'),
  injuryStatus: z.string().min(10, 'Yaralanma/maluliyet durumunu açıklayınız').max(2000, 'Çok uzun'),
  treatmentStatus: z.string().min(2, 'Tedavi durumunu belirtiniz').max(500, 'Çok uzun'),
  sgkInsuranceProcess: z.string().min(2, 'SGK/sigorta süreci hakkında bilgi veriniz').max(500, 'Çok uzun'),
  faultStatus: z.string().max(500, 'Çok uzun').optional().or(z.literal('')),
  additionalNote: z.string().max(2000, 'Çok uzun').optional().or(z.literal('')),
  kvkkConsent: z.literal(true, { error: 'Kişisel verilerinizin işlenmesini onaylamanız gerekmektedir' }),
})

export type BedeniHasarFormValues = z.infer<typeof bedeniHasarSchema>
