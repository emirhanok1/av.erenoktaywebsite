'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarHeader
} from '@/components/ui/sidebar'
import { ROUTES } from '@/constants/routes'
import { logoutAction } from '@/features/auth/actions/auth.actions'
import { useTransition } from 'react'

// Menü tanımları
const ITEMS = [
  { title: "Dashboard", url: ROUTES.ADMIN.DASHBOARD, icon: "🏠" },
  { title: "Slider", url: ROUTES.ADMIN.SLIDER, icon: "🖼️" },
  { title: "Duyurular", url: ROUTES.ADMIN.POSTS, icon: "📰" },
  { title: "Pratik Bilgiler", url: ROUTES.ADMIN.ARTICLES, icon: "📝" },
  { title: "SSS", url: ROUTES.ADMIN.FAQ, icon: "❓" },
  { title: "Gelen Formlar", url: ROUTES.ADMIN.SUBMISSIONS, icon: "📥" },
  { title: "Ayarlar", url: ROUTES.ADMIN.SETTINGS, icon: "⚙️" },
]

export default function AdminSidebar({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="h-16 flex items-center px-4 border-b">
        <span className="font-serif text-lg font-bold text-primary truncate">Eren Oktay</span>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Yönetim Paneli</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ITEMS.map((item) => {
                const isActive = pathname === item.url || (item.url !== ROUTES.ADMIN.DASHBOARD && pathname.startsWith(item.url))
                
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton 
                      asChild
                      isActive={isActive} 
                      tooltip={item.title}
                    >
                      <Link href={item.url}>
                        <span className="mr-2">{item.icon}</span>
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex flex-col space-y-3">
          <div className="text-xs text-muted-foreground truncate" title={userEmail}>
            {userEmail}
          </div>
          <button 
            type="button"
            disabled={isPending}
            onClick={() => startTransition(() => logoutAction())}
            className="text-sm font-medium text-destructive hover:text-destructive/80 text-left transition-colors"
          >
            {isPending ? 'Çıkış Yapılıyor...' : 'Çıkış Yap'}
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
