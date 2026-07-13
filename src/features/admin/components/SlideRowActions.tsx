'use client'

import { useTransition } from 'react'
import { ArrowUp, ArrowDown, Power, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toggleSlideActive, moveSlide, archiveSlide } from '../actions/slides.actions'
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

interface SlideRowActionsProps {
  id: string
  isActive: boolean
  isFirst: boolean
  isLast: boolean
}

export default function SlideRowActions({ id, isActive, isFirst, isLast }: SlideRowActionsProps) {
  const [isPending, startTransition] = useTransition()

  const handleToggleActive = () => {
    startTransition(async () => {
      const result = await toggleSlideActive(id, isActive)
      if (result.error) toast.error(result.error)
      else toast.success(isActive ? 'Slide pasife alındı' : 'Slide aktife alındı')
    })
  }

  const handleMove = (direction: 'up' | 'down') => {
    startTransition(async () => {
      const result = await moveSlide(id, direction)
      if (result.error) toast.error(result.error)
    })
  }

  const handleArchive = () => {
    startTransition(async () => {
      const result = await archiveSlide(id)
      if (result.error) toast.error(result.error)
      else toast.success('Slide arşivlendi')
    })
  }

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => handleMove('up')} 
        disabled={isFirst || isPending}
        title="Yukarı Taşı"
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => handleMove('down')} 
        disabled={isLast || isPending}
        title="Aşağı Taşı"
      >
        <ArrowDown className="h-4 w-4" />
      </Button>
      <Button 
        variant={isActive ? "default" : "secondary"} 
        size="icon" 
        onClick={handleToggleActive}
        disabled={isPending}
        title={isActive ? "Pasife Al" : "Aktife Al"}
      >
        <Power className="h-4 w-4" />
      </Button>
      
      <Button variant="outline" size="icon" asChild title="Düzenle">
        <Link href={ROUTES.ADMIN.SLIDER_EDIT(id)}>
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
              Bu slide arşivlenecek (kullanıcılar göremeyecek). Bu işlem geri alınabilir ancak şu anki yönetim panelinden erişilemez.
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
