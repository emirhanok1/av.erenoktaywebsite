import { getPostBySlug, getPosts } from '@/services/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import LegalDisclaimer from '@/components/common/LegalDisclaimer'
import { JsonLd } from '@/components/JsonLd'
import { getBreadcrumbSchema } from '@/lib/schemas/breadcrumb'
import { SITE } from '@/constants/site'
import { BLUR_DATA_URL } from '@/lib/blur'

export const revalidate = 3600

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: 'Bulunamadı' }
  const url = `${SITE.url}/duyurular/${params.slug}`
  return {
    title: post.title,
    description: post.excerpt || SITE.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.excerpt || SITE.description,
      images: post.cover_image
        ? [{ url: post.cover_image, width: 1200, height: 630 }]
        : [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
    },
  }
}

export default async function PostDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const url = `${SITE.url}/duyurular/${params.slug}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: url,
    headline: post.title,
    datePublished: post.published_at,
    dateModified: post.published_at,
    author: {
      '@type': 'Organization',
      name: SITE.name,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE.url}${SITE.logo}`,
      },
    },
    image: post.cover_image ? [post.cover_image] : undefined,
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Anasayfa', path: '/' },
    { name: 'Duyurular', path: '/duyurular' },
    { name: post.title, path: `/duyurular/${params.slug}` },
  ])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <div className="container max-w-3xl pt-32 pb-24">
        <Link 
          href="/duyurular" 
          className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-navy transition-colors mb-8"
        >
          <span className="mr-2">←</span> Duyurulara Dön
        </Link>

        <article>
          <header className="mb-10">
            <time className="text-sm text-gold-700 font-bold mb-4 uppercase tracking-wider block">
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
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </div>
          )}

          <div className="prose prose-lg prose-slate max-w-none mb-16 whitespace-pre-line">
            {post.content}
          </div>
        </article>
      </div>

      <LegalDisclaimer variant="default" />
    </div>
  )
}
