import { getAdminSlides } from '@/services/slides'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import SlideRowActions from '@/features/admin/components/SlideRowActions'
import Image from 'next/image'

export const metadata = {
  title: 'Slider Yönetimi | Admin',
}

export default async function AdminSliderPage() {
  const slides = await getAdminSlides()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Slider Yönetimi</h1>
        <Button asChild>
          <Link href="/admin/slider/yeni">
            <Plus className="mr-2 h-4 w-4" /> Yeni Slide Ekle
          </Link>
        </Button>
      </div>

      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Görsel</TableHead>
              <TableHead>Başlık</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="w-[80px] text-center">Sıra</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {slides.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  Henüz slide eklenmemiş.
                </TableCell>
              </TableRow>
            ) : (
              slides.map((slide, index) => (
                <TableRow key={slide.id}>
                  <TableCell>
                    {slide.image_url ? (
                      <div className="relative w-16 h-12 bg-gray-100 rounded overflow-hidden">
                        <Image src={slide.image_url} alt={slide.title} fill className="object-cover" sizes="64px" />
                      </div>
                    ) : (
                      <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                        Yok
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{slide.title}</TableCell>
                  <TableCell>
                    <Badge variant={slide.is_active ? "default" : "secondary"}>
                      {slide.is_active ? "Aktif" : "Pasif"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{slide.sort_order}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      <SlideRowActions 
                        id={slide.id} 
                        isActive={slide.is_active} 
                        isFirst={index === 0} 
                        isLast={index === slides.length - 1} 
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
