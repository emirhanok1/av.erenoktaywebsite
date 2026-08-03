'use client'

import { useTransition } from 'react'
import Link from 'next/link'
import { Eye, MailOpen, Mail, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { markSubmissionRead, archiveSubmission } from '../actions/submissions.actions'
import { toast } from 'sonner'
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

interface SubmissionRowActionsProps {
  id: string
  isRead: boolean
}

export default function SubmissionRowActions({ id, isRead }: SubmissionRowActionsProps) {
  const [isPending, startTransition] = useTransition()

  const handleToggleRead = () => {
    startTransition(async () => {
      const result = await markSubmissionRead(id)
      if (result.error) toast.error(result.error)
    })
  }

  const handleArchive = () => {
    startTransition(async () => {
      const result = await archiveSubmission(id)
      if (result.error) toast.error(result.error)
      else toast.success('Form arşivlendi')
    })
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" asChild title="Görüntüle">
        <Link href={ROUTES.ADMIN.SUBMISSIONS_DETAIL(id)}>
          <Eye className="h-4 w-4" />
        </Link>
      </Button>

      <Button
        variant={isRead ? 'secondary' : 'default'}
        size="icon"
        onClick={handleToggleRead}
        disabled={isPending || isRead}
        title={isRead ? 'Okundu' : 'Okundu işaretle'}
      >
        {isRead ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="icon" disabled={isPending} title="Arşivle">
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
            <AlertDialogDescription>
              Bu form arşivlenecek ve listede görünmeyecek. Bu işlem geri alınabilir ancak şu anki yönetim panelinden erişilemez.
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
