export type Slide = {
  id: string
  title: string
  subtitle: string | null
  image_url: string | null
  order: number
  is_active: boolean
}

const FALLBACK_SLIDES: Slide[] = [
  {
    id: 'fallback-1',
    title: 'Hukukun sessiz gücü, müvekkilin yanında.',
    subtitle: 'Kurumsal Hukuk · Tecrübeli Ekip',
    image_url: null,
    order: 1,
    is_active: true,
  },
  {
    id: 'fallback-2',
    title: 'Ticari ilişkilerde öngörü, kararlılık.',
    subtitle: 'Ticaret ve Şirketler Hukuku',
    image_url: null,
    order: 2,
    is_active: true,
  },
  {
    id: 'fallback-3',
    title: 'Mülkiyetin değerini koruyan hukuki mimari.',
    subtitle: 'Gayrimenkul ve İnşaat Hukuku',
    image_url: null,
    order: 3,
    is_active: true,
  },
]

export async function getActiveSlides(): Promise<Slide[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return FALLBACK_SLIDES
  }

  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/slides?is_active=eq.true&order=order.asc`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
        // ISR: revalidate every hour (matches page-level revalidate=3600)
        next: { revalidate: 3600 },
      }
    )

    if (!res.ok) {
      console.error('Supabase slides fetch hatası:', res.status, res.statusText)
      return FALLBACK_SLIDES
    }

    const slides: Slide[] = await res.json()

    if (!slides || slides.length === 0) {
      return FALLBACK_SLIDES
    }

    return slides
  } catch (error) {
    console.error('getActiveSlides exception:', error)
    return FALLBACK_SLIDES
  }
}
