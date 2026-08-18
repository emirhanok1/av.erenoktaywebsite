import { updateSession } from '@/lib/supabase/middleware'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  return await updateSession(request)
}

// Scoped to /admin only: the broad catch-all previously ran this proxy's
// NextResponse.next({ request }) rewrite-plumbing on every public route,
// including "/". Per Next 16's usePathname docs, a Proxy file that rewrites
// can make usePathname() diverge between server and client on statically
// prerendered pages - this was the cause of the intermittent white navbar
// flash on the ISR'd homepage. Public marketing pages don't need Supabase
// session refresh; only /admin does.
export const config = {
  matcher: ['/admin/:path*'],
}
