// Generated from the live public schema on 2026-07-28 (Supabase CLI's own
// `gen types` command kept losing auth mid-session in this environment, so
// this was reconstructed by hand from a direct schema introspection instead
// of the CLI's codegen). Column names/types/nullability/defaults below are
// exact matches to the live database as of this date. Regenerate with
// `npx supabase gen types typescript --linked > src/types/supabase.ts`
// next time CLI auth holds for the whole command, to guarantee it stays
// byte-for-byte in sync going forward.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          cover_image: string | null
          category: string | null
          read_time: number | null
          is_published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
          is_archived: boolean
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          cover_image?: string | null
          category?: string | null
          read_time?: number | null
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
          is_archived?: boolean
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          cover_image?: string | null
          category?: string | null
          read_time?: number | null
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
          is_archived?: boolean
        }
        Relationships: []
      }
      faq: {
        Row: {
          id: string
          question: string
          answer: string
          category: string | null
          sort_order: number
          is_published: boolean
          created_at: string
          updated_at: string
          is_archived: boolean
        }
        Insert: {
          id?: string
          question: string
          answer: string
          category?: string | null
          sort_order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
          is_archived?: boolean
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          category?: string | null
          sort_order?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
          is_archived?: boolean
        }
        Relationships: []
      }
      posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          cover_image: string | null
          is_published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
          is_archived: boolean
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          cover_image?: string | null
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
          is_archived?: boolean
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          cover_image?: string | null
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
          is_archived?: boolean
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          full_name: string
          role: string
          avatar_url: string | null
          created_at: string
          updated_at: string
          is_archived: boolean
        }
        Insert: {
          id: string
          full_name: string
          role?: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          is_archived?: boolean
        }
        Update: {
          id?: string
          full_name?: string
          role?: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          is_archived?: boolean
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: number
          attorney_photo_url: string | null
          updated_at: string
        }
        Insert: {
          id?: number
          attorney_photo_url?: string | null
          updated_at?: string
        }
        Update: {
          id?: number
          attorney_photo_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      slides: {
        Row: {
          id: string
          title: string
          subtitle: string | null
          image_url: string | null
          link: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
          is_archived: boolean
        }
        Insert: {
          id?: string
          title: string
          subtitle?: string | null
          image_url?: string | null
          link?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
          is_archived?: boolean
        }
        Update: {
          id?: string
          title?: string
          subtitle?: string | null
          image_url?: string | null
          link?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
          is_archived?: boolean
        }
        Relationships: []
      }
      submissions: {
        Row: {
          id: string
          type: string
          full_name: string
          phone: string
          email: string
          payload: Json
          is_read: boolean
          is_archived: boolean
          created_at: string
        }
        Insert: {
          id?: string
          type: string
          full_name: string
          phone: string
          email: string
          payload?: Json
          is_read?: boolean
          is_archived?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          type?: string
          full_name?: string
          phone?: string
          email?: string
          payload?: Json
          is_read?: boolean
          is_archived?: boolean
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
