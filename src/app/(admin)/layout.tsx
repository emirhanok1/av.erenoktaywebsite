import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminSidebar from '@/features/admin/components/AdminSidebar'
import AdminHeader from '@/features/admin/components/AdminHeader'
import { SidebarProvider } from '@/components/ui/sidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/giris')
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50 w-full">
        <AdminSidebar userEmail={user.email} />
        
        <div className="flex-1 flex flex-col min-w-0">
          <AdminHeader userEmail={user.email} />
          
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
