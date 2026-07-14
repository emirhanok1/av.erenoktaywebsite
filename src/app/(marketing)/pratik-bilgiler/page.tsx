import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getArticles } from '@/services/articles'
import LegalDisclaimer from '@/components/common/LegalDisclaimer'
import Pagination from '@/components/common/Pagination'
import { Badge } from '@/components/ui/badge'

import { SITE } from '@/constants/site'
import { BLUR_DATA_URL } from '@/lib/blur'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Pratik Bilgiler',
  description: 'Hukuki konular hakkında faydalı bilgiler ve makaleler.',
  alternates: { canonical: `${SITE.url}/pratik-bilgiler` },
}

interface PageProps {
  searchParams?: { page?: string }
}

export default async function ArticlesPage({ searchParams }: PageProps) {
  const allArticles = await getArticles()
  
  const page = Number(searchParams?.page ?? '1')
  const perPage = 9
  const totalPages = Math.ceil(allArticles.length / perPage)
  const articles = allArticles.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-navy pt-32 pb-20 text-white">
        <div className="container">
          <h1 className="font-heading text-fluid-h1 mb-4">Pratik Bilgiler</h1>
          <p className="text-fluid-body text-slate-300 max-w-2xl">
            Sık karşılaşılan hukuki sorunlara dair bilgilendirici makaleler ve pratik çözümler.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white flex-grow">
        <div className="container">
          {articles.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p>Henüz pratik bilgi bulunmamaktadır.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <article key={article.id} className="group flex flex-col border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-white relative">
                    {article.category && (
                      <Badge className="absolute top-4 right-4 z-10 bg-accent text-white hover:bg-accent/90 border-none">
                        {article.category}
                      </Badge>
                    )}
                    {article.cover_image && (
                      <div className="relative h-48 w-full bg-muted">
                        <Image 
                          src={article.cover_image} 
                          alt={article.title} 
                          fill 
                          className="object-cover transition-transform group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center text-xs text-muted-foreground mb-3 uppercase tracking-wider space-x-3">
                        <time className="font-bold text-accent">
                          {new Date(article.published_at!).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </time>
                        {article.read_time && (
                          <span>• {article.read_time} dk okuma</span>
                        )}
                      </div>
                      <h2 className="font-heading text-xl text-navy mb-3 line-clamp-2">
                        <Link href={`/pratik-bilgiler/${article.slug}`} className="hover:text-accent transition-colors">
                          {article.title}
                        </Link>
                      </h2>
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">
                        {article.excerpt}
                      </p>
                      <Link 
                        href={`/pratik-bilgiler/${article.slug}`}
                        className="text-navy font-semibold text-sm hover:text-accent transition-colors inline-flex items-center mt-auto"
                      >
                        Devamını Oku <span className="ml-2">→</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
              <Pagination currentPage={page} totalPages={totalPages} basePath="/pratik-bilgiler" />
            </>
          )}
        </div>
      </section>

      <LegalDisclaimer variant="prominent" />
    </div>
  )
}
