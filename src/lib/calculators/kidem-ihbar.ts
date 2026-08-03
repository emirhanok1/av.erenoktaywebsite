import { TAZMINAT_2026 } from '@/constants/tazminat-2026'

export type FesihTuru = 'isveren_haksiz' | 'hakli_neden_ayrilma' | 'istifa'

export interface SeveranceInput {
  startDate: string
  endDate: string
  grossSalary: number
  transportAllowance: number
  mealAllowance: number
  annualBonus: number
  terminationType: FesihTuru
}

export interface TenureBreakdown {
  fullYears: number
  remainingDays: number
  totalDays: number
}

export interface SeveranceResult {
  dressedGrossSalary: number
  tenure: TenureBreakdown
  capApplied: number | null
  grossSeverance: number
  stampTax: number
  netSeverance: number
  isEntitledToNotice: boolean
  noticeDays: number | null
  grossNoticePay: number | null
}

export type SeveranceCalcOutcome =
  | { success: true; result: SeveranceResult }
  | { success: false; error: string }

function calculateTenure(startDate: Date, endDate: Date): TenureBreakdown {
  const msPerDay = 1000 * 60 * 60 * 24
  let fullYears = endDate.getFullYear() - startDate.getFullYear()

  const lastAnniversary = new Date(startDate)
  lastAnniversary.setFullYear(startDate.getFullYear() + fullYears)

  if (lastAnniversary > endDate) {
    fullYears -= 1
    lastAnniversary.setFullYear(lastAnniversary.getFullYear() - 1)
  }

  const remainingDays = Math.round((endDate.getTime() - lastAnniversary.getTime()) / msPerDay)
  const totalDays = Math.round((endDate.getTime() - startDate.getTime()) / msPerDay)

  return { fullYears, remainingDays, totalDays }
}

function getNoticeDays(totalDays: number): number {
  const tier = TAZMINAT_2026.IHBAR_TABLOSU.find((t) => totalDays < t.ustSinirGun)
  return tier ? tier.gun : TAZMINAT_2026.IHBAR_TABLOSU[TAZMINAT_2026.IHBAR_TABLOSU.length - 1].gun
}

function selectCap(endDate: Date): number | null {
  if (endDate.getUTCFullYear() !== TAZMINAT_2026.GECERLI_YIL) return null
  const h2Start = new Date(TAZMINAT_2026.H2_BASLANGIC + 'T00:00:00Z')
  return endDate >= h2Start ? TAZMINAT_2026.TAVAN_H2 : TAZMINAT_2026.TAVAN_H1
}

export function calculateSeverance(input: SeveranceInput): SeveranceCalcOutcome {
  if (input.grossSalary <= 0) {
    return { success: false, error: 'Aylık çıplak brüt maaş sıfırdan büyük olmalıdır.' }
  }
  if (input.transportAllowance < 0 || input.mealAllowance < 0 || input.annualBonus < 0) {
    return { success: false, error: 'Yardım ve ikramiye tutarları negatif olamaz.' }
  }

  const startDate = new Date(input.startDate + 'T00:00:00Z')
  const endDate = new Date(input.endDate + 'T00:00:00Z')

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return { success: false, error: 'Geçerli bir işe giriş ve işten çıkış tarihi giriniz.' }
  }
  if (endDate <= startDate) {
    return { success: false, error: 'İşten çıkış tarihi, işe giriş tarihinden sonra olmalıdır.' }
  }

  const cap = selectCap(endDate)
  if (cap === null) {
    return {
      success: false,
      error: `Bu hesaplayıcı şu an yalnızca ${TAZMINAT_2026.GECERLI_YIL} yılı içindeki fesih tarihleri için geçerlidir. Farklı bir yıl için kesin hesaplama adına bizimle iletişime geçin.`,
    }
  }

  const dressedGrossSalary =
    input.grossSalary + input.transportAllowance + input.mealAllowance + input.annualBonus / 12

  const tenure = calculateTenure(startDate, endDate)
  const capApplied = dressedGrossSalary > cap ? cap : null
  const baseForSeverance = capApplied ?? dressedGrossSalary

  const fullYearSeverance = baseForSeverance * tenure.fullYears
  const remainingDaySeverance = (baseForSeverance / 365) * tenure.remainingDays
  const grossSeverance = fullYearSeverance + remainingDaySeverance
  const stampTax = grossSeverance * TAZMINAT_2026.DAMGA_VERGISI_ORANI
  const netSeverance = grossSeverance - stampTax

  const isEntitledToNotice = input.terminationType === 'isveren_haksiz'
  const noticeDays = isEntitledToNotice ? getNoticeDays(tenure.totalDays) : null
  const grossNoticePay = isEntitledToNotice && noticeDays !== null
    ? (dressedGrossSalary / 30) * noticeDays
    : null

  return {
    success: true,
    result: {
      dressedGrossSalary,
      tenure,
      capApplied,
      grossSeverance,
      stampTax,
      netSeverance,
      isEntitledToNotice,
      noticeDays,
      grossNoticePay,
    },
  }
}
