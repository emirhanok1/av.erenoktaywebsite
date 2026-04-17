'use client'

import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar'

export default function AdminHeader({ userEmail }: { userEmail?: string }) {
  const { isMobile } = useSidebar()

  return (
    <header className="sticky top-0 z-40 bg-white border-b px-6 h-16 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-4">
        {isMobile && <SidebarTrigger className="mr-2" />}
        <h2 className="text-xl font-semibold tracking-tight text-primary">Yönetim Paneli</h2>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden sm:block text-sm text-muted-foreground mr-4">
          {userEmail}
        </div>
        <div className="h-8 w-8 rounded-full bg-accent text-primary flex items-center justify-center font-bold font-serif cursor-pointer" title={userEmail}>
          A
        </div>
      </div>
    </header>
  )
}
