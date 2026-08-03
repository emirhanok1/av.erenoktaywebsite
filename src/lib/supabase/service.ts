import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * Service-role client - bypasses RLS entirely. Only use for narrow,
 * server-only operations where the security boundary is enforced in
 * application code (Zod validation, honeypot) rather than by a
 * table policy, e.g. public form submissions where the anon-role RLS
 * insert path is unavailable. Never import this into client code and
 * never widen its use beyond the specific action that needs it.
 */
export function createServiceClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
