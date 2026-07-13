'use client'

import { useTransition } from 'react'
import { Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { archivePost } from '../actions/posts.actions'
import { toast } from 'sonner'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface PostRowActionsProps {
  id: string
}

export default function PostRowActions({ id }: PostRowActionsProps) {
  const [isPending, startTransition] = useTransition()

  const handleArchive = () => {
    startTransition(async () => {
      const result = await archivePost(id)
      if (result.error) toast.error(result.error)
      else toast.success('Duyuru arşivlendi')
    })
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" asChild title="Düzenle">
        <Link href={ROUTES.ADMIN.POSTS_EDIT(id)}>
          <Edit className="h-4 w-4" />
        </Link>
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="icon" disabled={isPending} title="Arşivle (Sil)">
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
            <AlertDialogDescription>
              Bu duyuru arşivlenecek ve siteden kaldırılacak. Bu işlem geri alınabilir ancak şu anki yönetim panelinden erişilemez.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction onClick={handleArchive}>Arşivle</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
