import { getAdminPosts } from '@/services/posts'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import PostRowActions from '@/features/admin/components/PostRowActions'
import { ROUTES } from '@/constants/routes'

export const metadata = {
  title: 'Duyurular Yönetimi | Admin',
}

export default async function AdminPostsPage() {
  const posts = await getAdminPosts()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Duyurular</h1>
        <Button asChild>
          <Link href={ROUTES.ADMIN.POSTS_NEW}>
            <Plus className="mr-2 h-4 w-4" /> Yeni Duyuru Ekle
          </Link>
        </Button>
      </div>

      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Başlık</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Yayın Tarihi</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  Henüz duyuru eklenmemiş.
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    <Badge variant={post.is_published ? "default" : "secondary"}>
                      {post.is_published ? "Yayında" : "Taslak"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {post.published_at 
                      ? new Date(post.published_at).toLocaleDateString('tr-TR') 
                      : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      <PostRowActions id={post.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
