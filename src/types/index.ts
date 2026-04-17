// ============================================================
// TEMEL TİP TANIMLARI
// Av. Eren Oktay Hukuk Bürosu - Faz 0
// ============================================================

export interface Slide {
  id: string
  title: string
  subtitle?: string
  description?: string
  image_url: string
  cta_text?: string
  cta_link?: string
  order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  cover_image_url?: string
  is_published: boolean
  published_at?: string
  created_at: string
  updated_at: string
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  category?: string
  cover_image_url?: string
  is_published: boolean
  published_at?: string
  created_at: string
  updated_at: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
  order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  full_name: string
  email: string
  phone?: string
  subject?: string
  message: string
  is_read: boolean
  created_at: string
}

export interface Appointment {
  id: string
  full_name: string
  email: string
  phone: string
  preferred_date?: string
  preferred_time?: string
  subject?: string
  notes?: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  role: 'admin' | 'super_admin'
  created_at: string
  last_sign_in_at?: string
}
