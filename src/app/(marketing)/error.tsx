'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
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
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-heading text-navy">Bir sorun oluştu.</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          İstediğiniz sayfa yüklenirken beklenmedik bir hata meydana geldi. Lütfen tekrar deneyin.
        </p>
        <Button
          onClick={() => reset()}
          className="bg-navy hover:bg-secondary text-white rounded-none px-8 py-6"
        >
          Tekrar Dene
        </Button>
      </div>
    </div>
  )
}
