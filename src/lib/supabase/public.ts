import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * Cookie-free client for public, unauthenticated reads only (published/
 * active content). Unlike lib/supabase/server.ts's createClient(), this
 * does not call cookies() - that call alone forces Next.js to render the
 * whole route dynamically with Cache-Control: no-store, even on pages
 * with no per-user data. Never use this for admin queries.
 */
export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
