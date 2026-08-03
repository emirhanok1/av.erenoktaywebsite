// 2026 yılı kıdem/ihbar tazminatı hesaplama parametreleri.
// Yıl değişince SADECE bu dosya güncellenir (lib/calculators/kidem-ihbar.ts
// bu tarihlere bakarak doğru tavanı seçer, aralık dışı fesih tarihlerinde
// hesaplama yapmaz).
export const TAZMINAT_2026 = {
  TAVAN_H1: 64948.77, // 01.01.2026 - 30.06.2026 arası fesihler
  TAVAN_H2: 73729.87, // 01.07.2026 - 31.12.2026 arası fesihler
  H2_BASLANGIC: '2026-07-01',
  GECERLI_YIL: 2026,
  DAMGA_VERGISI_ORANI: 0.00759,
  // Kıdem süresi eşiklerinin gün karşılığı (365 günlük yıl varsayımıyla):
  // 6 ay ~ 182 gün, 1.5 yıl ~ 547 gün, 3 yıl ~ 1095 gün.
  IHBAR_TABLOSU: [
    { ustSinirGun: 182, gun: 14 }, // 6 aydan az
    { ustSinirGun: 547, gun: 28 }, // 6 ay - 1,5 yıl
    { ustSinirGun: 1095, gun: 42 }, // 1,5 yıl - 3 yıl
    { ustSinirGun: Infinity, gun: 56 }, // 3 yıldan fazla
  ],
} as const
