import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Newspaper, FileText, ImageIcon, HelpCircle, Inbox } from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { getPostsCount } from '@/services/posts'
import { getArticlesCount } from '@/services/articles'
import { getUnreadSubmissionsCount } from '@/services/submissions'

export const metadata = {
  title: 'Dashboard | Admin',
}

export default async function AdminDashboardPage() {
  const [postsCount, articlesCount, unreadSubmissionsCount] = await Promise.all([
    getPostsCount(),
    getArticlesCount(),
    getUnreadSubmissionsCount(),
  ])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Hoş geldiniz, Eren Bey!</h1>
        <p className="text-muted-foreground mt-2">İşte web sitenizin içerik yönetim durumu.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href={ROUTES.ADMIN.SLIDER} className="block group">
          <Card className="hover:shadow-md transition-shadow h-full border-transparent hover:border-primary/50 group-hover:border-primary/50 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Slider</CardTitle>
              <ImageIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Resimler</div>
              <p className="text-xs text-muted-foreground mt-1">Ana sayfa kayan görselleri</p>
            </CardContent>
          </Card>
        </Link>

        <Link href={ROUTES.ADMIN.POSTS} className="block group">
          <Card className="hover:shadow-md transition-shadow h-full border-transparent hover:border-primary/50 group-hover:border-primary/50 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Duyurular</CardTitle>
              <Newspaper className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{postsCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Aktif duyurular</p>
            </CardContent>
          </Card>
        </Link>

        <Link href={ROUTES.ADMIN.ARTICLES} className="block group">
          <Card className="hover:shadow-md transition-shadow h-full border-transparent hover:border-primary/50 group-hover:border-primary/50 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pratik Bilgiler</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{articlesCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Hukuki makaleler</p>
            </CardContent>
          </Card>
        </Link>

        <Link href={ROUTES.ADMIN.FAQ} className="block group">
          <Card className="hover:shadow-md transition-shadow h-full border-transparent hover:border-primary/50 group-hover:border-primary/50 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">S.S.S.</CardTitle>
              <HelpCircle className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Sorular</div>
              <p className="text-xs text-muted-foreground mt-1">Sık sorulan soruları yönetin</p>
            </CardContent>
          </Card>
        </Link>

        <Link href={ROUTES.ADMIN.SUBMISSIONS} className="block group">
          <Card className="hover:shadow-md transition-shadow h-full border-transparent hover:border-primary/50 group-hover:border-primary/50 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gelen Formlar</CardTitle>
              <Inbox className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadSubmissionsCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Okunmamış talep</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
