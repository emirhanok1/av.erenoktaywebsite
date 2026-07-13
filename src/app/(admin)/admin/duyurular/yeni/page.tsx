import PostForm from '@/features/admin/components/PostForm'

export const metadata = {
  title: 'Yeni Duyuru Ekle | Admin',
}

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Yeni Duyuru Ekle</h1>
        <p className="text-muted-foreground mt-2">
          Sitede yayınlanacak yeni bir duyuru oluşturun.
        </p>
      </div>
      
      <div className="p-6 border rounded-md bg-white">
        <PostForm />
      </div>
    </div>
  )
}
