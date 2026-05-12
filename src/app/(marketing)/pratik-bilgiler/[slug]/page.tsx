import { getArticleBySlug } from '@/services/articles'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import LegalDisclaimer from '@/components/common/LegalDisclaimer'
import { Badge } from '@/components/ui/badge'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)
  if (!article) return { title: 'Bulunamadı' }
  return {
    title: article.title,
    description: article.excerpt ?? '',
  }
}

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)
  
  if (!article) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="container max-w-3xl pt-32 pb-24">
        <Link 
          href="/pratik-bilgiler" 
          className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-navy transition-colors mb-8"
        >
          <span className="mr-2">←</span> Pratik Bilgilere Dön
        </Link>

        <article>
          <header className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              {article.category && (
                <Badge className="bg-accent text-white hover:bg-accent/90 border-none">
                  {article.category}
                </Badge>
              )}
              <time className="text-sm text-muted-foreground font-bold uppercase tracking-wider block">
                {new Date(article.published_at!).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </time>
              {article.read_time && (
                <span className="text-sm text-muted-foreground">• {article.read_time} dk okuma</span>
              )}
            </div>
            <h1 className="font-heading text-fluid-h2 text-navy leading-tight">{article.title}</h1>
          </header>

          {article.cover_image && (
            <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-12 bg-muted">
              <Image 
                src={article.cover_image} 
                alt={article.title} 
                fill 
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 800px"
                priority
              />
            </div>
          )}

          <div 
            className="prose prose-lg prose-slate max-w-none mb-16 prose-headings:font-heading prose-headings:text-navy prose-a:text-accent hover:prose-a:text-navy"
            dangerouslySetInnerHTML={{ __html: article.content ?? '' }}
          />
        </article>
      </div>

      <LegalDisclaimer variant="prominent" />
    </div>
  )
}
