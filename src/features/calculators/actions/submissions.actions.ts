'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { ROUTES } from '@/constants/routes'
import { degerKaybiSchema } from '../schemas/deger-kaybi-schema'
import { bedeniHasarSchema } from '../schemas/bedeni-hasar-schema'

type SubmissionType = 'deger_kaybi' | 'bedeni_hasar'
type SubmissionOutcome = { success: true } | { error: string }

async function insertSubmission(
  type: SubmissionType,
  fullName: string,
  phone: string,
  email: string,
  payload: Record<string, string>
): Promise<SubmissionOutcome> {
  const supabase = await createClient()
  const { error } = await supabase
    .from('submissions')
    .insert({ type, full_name: fullName, phone, email, payload })

  if (error) {
    return { error: 'Formunuz kaydedilemedi, lütfen tekrar deneyin.' }
  }

  revalidatePath(ROUTES.ADMIN.SUBMISSIONS)
  return { success: true }
}

export async function createSubmission(type: SubmissionType, formData: FormData): Promise<SubmissionOutcome> {
  // Honeypot: gerçek kullanıcılar bu alanı hiç görmez, botlar her alanı doldurur.
  if (formData.get('website')) {
    return { success: true }
  }

  if (type === 'deger_kaybi') {
    const raw = {
      fullName: formData.get('fullName') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      accidentDate: formData.get('accidentDate') as string,
      vehicleInfo: formData.get('vehicleInfo') as string,
      accidentDescription: formData.get('accidentDescription') as string,
      faultStatus: formData.get('faultStatus') as string,
      damageRepairStatus: formData.get('damageRepairStatus') as string,
      otherPartyInsurance: formData.get('otherPartyInsurance') as string,
      additionalNote: formData.get('additionalNote') as string,
      kvkkConsent: formData.get('kvkkConsent') === 'true',
    }

    const result = degerKaybiSchema.safeParse(raw)
    if (!result.success) {
      return { error: 'Doğrulama hatası: ' + result.error.issues[0].message }
    }

    const d = result.data
    return insertSubmission(type, d.fullName, d.phone, d.email, {
      accidentDate: d.accidentDate,
      vehicleInfo: d.vehicleInfo,
      accidentDescription: d.accidentDescription,
      faultStatus: d.faultStatus || '',
      damageRepairStatus: d.damageRepairStatus,
      otherPartyInsurance: d.otherPartyInsurance || '',
      additionalNote: d.additionalNote || '',
    })
  }

  const raw = {
    fullName: formData.get('fullName') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    accidentDate: formData.get('accidentDate') as string,
    injuryStatus: formData.get('injuryStatus') as string,
    treatmentStatus: formData.get('treatmentStatus') as string,
    sgkInsuranceProcess: formData.get('sgkInsuranceProcess') as string,
    faultStatus: formData.get('faultStatus') as string,
    additionalNote: formData.get('additionalNote') as string,
    kvkkConsent: formData.get('kvkkConsent') === 'true',
  }

  const result = bedeniHasarSchema.safeParse(raw)
  if (!result.success) {
    return { error: 'Doğrulama hatası: ' + result.error.issues[0].message }
  }

  const d = result.data
  return insertSubmission(type, d.fullName, d.phone, d.email, {
    accidentDate: d.accidentDate,
    injuryStatus: d.injuryStatus,
    treatmentStatus: d.treatmentStatus,
    sgkInsuranceProcess: d.sgkInsuranceProcess,
    faultStatus: d.faultStatus || '',
    additionalNote: d.additionalNote || '',
  })
}
