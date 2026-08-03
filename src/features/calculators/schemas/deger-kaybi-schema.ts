import { z } from 'zod'

const PHONE_REGEX = /^[0-9+\s()-]{10,}$/

export const degerKaybiSchema = z.object({
  fullName: z.string().min(2, 'Ad soyad giriniz').max(150, 'Ad soyad çok uzun'),
  phone: z.string().regex(PHONE_REGEX, 'Geçerli bir telefon numarası giriniz'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  accidentDate: z.string().min(1, 'Kaza tarihi zorunludur'),
  vehicleInfo: z.string().min(2, 'Aracın marka/model/yılını giriniz').max(200, 'Çok uzun'),
  accidentDescription: z.string().min(10, 'Kaza açıklaması en az 10 karakter olmalıdır').max(2000, 'Çok uzun'),
  faultStatus: z.string().max(500, 'Çok uzun').optional().or(z.literal('')),
  damageRepairStatus: z.string().min(2, 'Hasar/onarım durumunu belirtiniz').max(500, 'Çok uzun'),
  otherPartyInsurance: z.string().max(300, 'Çok uzun').optional().or(z.literal('')),
  additionalNote: z.string().max(2000, 'Çok uzun').optional().or(z.literal('')),
  kvkkConsent: z.literal(true, { error: 'Kişisel verilerinizin işlenmesini onaylamanız gerekmektedir' }),
})

export type DegerKaybiFormValues = z.infer<typeof degerKaybiSchema>
