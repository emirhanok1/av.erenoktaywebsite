'use client'

import { useState, useTransition } from 'react'
import { MoreHorizontal, Pencil, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import { archiveArticle } from '../actions/articles.actions'
import { toast } from 'sonner'

interface ArticleRowActionsProps {
  id: string
}

export function ArticleRowActions({ id }: ArticleRowActionsProps) {
  const [isArchiveOpen, setIsArchiveOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleArchive = () => {
    startTransition(async () => {
      const result = await archiveArticle(id)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Pratik bilgi başarıyla arşivlendi')
      }
      setIsArchiveOpen(false)
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Menüyü aç</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={ROUTES.ADMIN.ARTICLES_EDIT(id)} className="flex items-center cursor-pointer">
              <Pencil className="mr-2 h-4 w-4" />
              Düzenle
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-red-600 focus:text-red-600 cursor-pointer"
            onSelect={(e) => {
              e.preventDefault()
              setIsArchiveOpen(true)
            }}
          >
            <Trash className="mr-2 h-4 w-4" />
            Sil (Arşivle)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isArchiveOpen} onOpenChange={setIsArchiveOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
            <AlertDialogDescription>
              Bu işlem pratik bilgiyi yayından kaldıracak ve arşive taşıyacaktır.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>İptal</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault()
                handleArchive()
              }}
              className="bg-red-600 hover:bg-red-700"
              disabled={isPending}
            >
              {isPending ? 'Siliniyor...' : 'Sil'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
