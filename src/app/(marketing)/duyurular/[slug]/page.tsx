import { getPostBySlug } from '@/services/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import LegalDisclaimer from '@/components/common/LegalDisclaimer'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: 'Bulunamadı' }
  return {
    title: post.title,
    description: post.excerpt ?? '',
  }
}

export default async function PostDetailPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="container max-w-3xl pt-32 pb-24">
        <Link 
          href="/duyurular" 
          className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-navy transition-colors mb-8"
        >
          <span className="mr-2">←</span> Duyurulara Dön
        </Link>

        <article>
          <header className="mb-10">
            <time className="text-sm text-accent font-bold mb-4 uppercase tracking-wider block">
              {new Date(post.published_at!).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </time>
            <h1 className="font-heading text-fluid-h2 text-navy leading-tight">{post.title}</h1>
          </header>

          {post.cover_image && (
            <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-12 bg-muted">
              <Image 
                src={post.cover_image} 
                alt={post.title} 
                fill 
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 800px"
                priority
              />
            </div>
          )}

          <div 
            className="prose prose-lg prose-slate max-w-none mb-16 prose-headings:font-heading prose-headings:text-navy prose-a:text-accent hover:prose-a:text-navy"
            dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
          />
        </article>
      </div>

      <LegalDisclaimer variant="default" />
    </div>
  )
}
