import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-4 mt-12">
      <Button
        variant="outline"
        disabled={currentPage <= 1}
        asChild={currentPage > 1}
      >
        {currentPage > 1 ? (
          <Link href={`${basePath}?page=${currentPage - 1}`}>Önceki</Link>
        ) : (
          <span>Önceki</span>
        )}
      </Button>
      
      <span className="text-sm text-muted-foreground">
        Sayfa {currentPage} / {totalPages}
      </span>

      <Button
        variant="outline"
        disabled={currentPage >= totalPages}
        asChild={currentPage < totalPages}
      >
        {currentPage < totalPages ? (
          <Link href={`${basePath}?page=${currentPage + 1}`}>Sonraki</Link>
        ) : (
          <span>Sonraki</span>
        )}
      </Button>
    </div>
  )
}
