export const ROUTES = {
  HOME: '/',
  ABOUT: '/hakkimizda',
  NEWS: '/duyurular',
  ARTICLES: '/pratik-bilgiler',
  FAQ: '/sss',
  CONTACT: '/iletisim',
  PRIVACY: '/kvkk',
  ADMIN: {
    DASHBOARD: '/admin',
    SLIDER: '/admin/slider',
    SLIDER_NEW: '/admin/slider/yeni',
    SLIDER_EDIT: (id: string) => `/admin/slider/${id}`,
    POSTS: '/admin/haberler',
    ARTICLES: '/admin/makaleler',
    FAQ: '/admin/sss',
    MESSAGES: '/admin/mesajlar',
    APPOINTMENTS: '/admin/randevular',
  },
  AUTH: {
    LOGIN: '/giris',
  },
} as const
