import { getAdminPostById } from '@/services/posts'
import PostForm from '@/features/admin/components/PostForm'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'Duyuru Düzenle | Admin',
}

interface EditPostPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditPostPage(props: EditPostPageProps) {
  const params = await props.params;
  const post = await getAdminPostById(params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Duyuru Düzenle</h1>
        <p className="text-muted-foreground mt-2">
          {post.title} başlıklı duyuruyu düzenliyorsunuz.
        </p>
      </div>
      
      <div className="p-6 border rounded-md bg-white">
        <PostForm post={post} />
      </div>
    </div>
  )
}
