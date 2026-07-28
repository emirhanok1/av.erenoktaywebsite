import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPosts } from '@/services/posts'
import LegalDisclaimer from '@/components/common/LegalDisclaimer'
import Pagination from '@/components/common/Pagination'

import { SITE } from '@/constants/site'
import { BLUR_DATA_URL } from '@/lib/blur'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Duyurular',
  description: 'Eren Oktay Hukuk Bürosu güncel duyurular ve hukuki gelişmeler.',
  alternates: { canonical: `${SITE.url}/duyurular` },
}

interface PageProps {
  searchParams?: Promise<{ page?: string }>
}

export default async function NewsPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const allPosts = await getPosts()

  const page = Number(searchParams?.page ?? '1')
  const perPage = 9
  const totalPages = Math.ceil(allPosts.length / perPage)
  const posts = allPosts.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sayfa Hero */}
      <section className="bg-navy pt-32 pb-16 text-white text-center">
        <div className="container">
          <h1 className="font-heading text-3xl md:text-4xl text-white">Duyurular</h1>
        </div>
      </section>

      {/* İçerik Alanı */}
      <section className="py-24 bg-white flex-grow">
        <div className="container">
          {posts.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p>Henüz duyuru bulunmamaktadır.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article key={post.id} className="group flex flex-col border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-white">
                    {post.cover_image && (
                      <div className="relative h-48 w-full bg-muted">
                        <Image 
                          src={post.cover_image} 
                          alt={post.title} 
                          fill 
                          className="object-cover transition-transform group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                      <time className="text-xs text-accent font-bold mb-3 uppercase tracking-wider">
                        {new Date(post.published_at!).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </time>
                      <h2 className="font-heading text-xl text-navy mb-3 line-clamp-2">
                        <Link href={`/duyurular/${post.slug}`} className="hover:text-accent transition-colors">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">
                        {post.excerpt}
                      </p>
                      <Link 
                        href={`/duyurular/${post.slug}`}
                        className="text-navy font-semibold text-sm hover:text-accent transition-colors inline-flex items-center mt-auto"
                      >
                        Devamını Oku <span className="ml-2">→</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
              <Pagination currentPage={page} totalPages={totalPages} basePath="/duyurular" />
            </>
          )}
        </div>
      </section>

      <LegalDisclaimer variant="default" />
    </div>
  )
}
