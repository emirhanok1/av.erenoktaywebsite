'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function LoginError({
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
    <div className="w-full max-w-md mx-auto text-center space-y-4 p-4">
      <h2 className="text-xl font-semibold text-primary">Bir sorun oluştu.</h2>
      <p className="text-muted-foreground text-sm">
        Giriş sayfası yüklenirken beklenmedik bir hata meydana geldi. Lütfen tekrar deneyin.
      </p>
      <Button onClick={() => reset()}>Tekrar Dene</Button>
    </div>
  )
}
