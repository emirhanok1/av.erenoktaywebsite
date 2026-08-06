'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import { updateAttorneyPhoto } from '../actions/site-settings.actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface SiteSettingsFormProps {
  currentPhotoUrl: string | null
}

export default function SiteSettingsForm({ currentPhotoUrl }: SiteSettingsFormProps) {
  const [isPending, startTransition] = useTransition()
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentPhotoUrl)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [inputKey, setInputKey] = useState(0)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error('Geçersiz dosya tipi. Sadece JPG, PNG veya WEBP.')
      e.target.value = ''
      return
    }
    if (file.size > 4 * 1024 * 1024) {
      toast.error('Dosya boyutu çok büyük (Max 4MB)')
      e.target.value = ''
      return
    }

    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) {
      toast.error('Lütfen önce bir görsel seçin')
      return
    }

    startTransition(async () => {
      const formData = new FormData()
      formData.append('image', selectedFile)

      const result = await updateAttorneyPhoto(formData)

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Fotoğraf güncellendi')
        setSelectedFile(null)
        setInputKey((k) => k + 1)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="space-y-2">
        <Label htmlFor="image">Avukat Fotoğrafı</Label>
        <Input
          key={inputKey}
          id="image"
          name="image"
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleImageChange}
        />
        <p className="text-xs text-muted-foreground">
          Sadece JPG, PNG, WEBP. Max 4MB. Dikey (portre) fotoğraflar en iyi sonucu verir — Hakkımızda sayfasında 4:5 oranlı bir çerçevede gösterilir.
        </p>

        {previewUrl && (
          <div className="mt-4 relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-md border">
            <Image src={previewUrl} alt="Önizleme" fill className="object-cover object-center" />
          </div>
        )}
      </div>

      <Button type="submit" disabled={isPending || !selectedFile}>
        {isPending ? 'Kaydediliyor...' : 'Kaydet'}
      </Button>
    </form>
  )
}
