'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[50vh] flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold text-primary">Bir sorun oluştu.</h2>
        <p className="text-muted-foreground max-w-md mx-auto text-sm">
          Bu bölüm yüklenirken beklenmedik bir hata meydana geldi. Lütfen tekrar deneyin.
        </p>
        <Button onClick={() => reset()}>Tekrar Dene</Button>
      </div>
    </div>
  )
}
