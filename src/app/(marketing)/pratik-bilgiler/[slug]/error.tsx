'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */

export default function Error({
  error: _error,
  reset: _reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="min-h-[50vh] flex 
      flex-col items-center justify-center 
      gap-4 container">
      <p className="text-muted-foreground">
        Bir sorun oluştu. Lütfen daha sonra 
        tekrar deneyiniz.
      </p>
      <a href="/" className="text-navy 
        underline text-sm">
        Anasayfaya Dön
      </a>
    </div>
  )
}
