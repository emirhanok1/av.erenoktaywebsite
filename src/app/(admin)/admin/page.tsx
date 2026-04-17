import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Newspaper, FileText, MessageSquare, Calendar } from 'lucide-react'

export const metadata = {
  title: 'Dashboard | Admin',
}

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Get counts directly
  const { count: postsCount } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('is_archived', false)

  const { count: articlesCount } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true })
    .eq('is_archived', false)

  const { count: messagesCount } = await supabase
    .from('messages')
    .select('*', { count: 'exact', head: true })
    .eq('is_archived', false)
    .eq('is_read', false)

  const { count: appointmentsCount } = await supabase
    .from('appointments')
    .select('*', { count: 'exact', head: true })
    .eq('is_archived', false)
    .eq('status', 'pending')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Hoş geldiniz, Eren Bey!</h1>
        <p className="text-muted-foreground mt-2">İşte bugün büro sisteminizin genel durumu.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Haber</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{postsCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Aktif haberler ve duyurular</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Makale</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{articlesCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Pratik bilgiler ve blog</p>
          </CardContent>
        </Card>

        <Card className="border-accent/50 hover:shadow-md transition-shadow hover:border-accent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">Okunmamış Mesaj</CardTitle>
            <MessageSquare className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messagesCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Yeni gönderilmiş mesajlar</p>
          </CardContent>
        </Card>

        <Card className="border-accent/50 hover:shadow-md transition-shadow hover:border-accent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">Bekleyen Randevu</CardTitle>
            <Calendar className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointmentsCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Onay bekleyen talepler</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
