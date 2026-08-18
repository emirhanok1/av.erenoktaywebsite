import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnimatedReveal } from './AnimatedReveal'
import { HeadingUnderline } from './HeadingUnderline'
import { ROUTES } from '@/constants/routes'
import type { Post } from '@/services/posts'

const MONTHS_SHORT = ['OCA', 'ŞUB', 'MAR', 'NİS', 'MAY', 'HAZ', 'TEM', 'AĞU', 'EYL', 'EKİ', 'KAS', 'ARA']

type RecentPost = Pick<Post, 'id' | 'title' | 'slug' | 'excerpt' | 'published_at'>

interface RecentNewsSectionProps {
  posts: RecentPost[]
}

export default function RecentNewsSection({ posts }: RecentNewsSectionProps) {
  if (posts.length === 0) return null

  return (
    <section className="bg-white py-20 lg:py-[120px] overflow-hidden" aria-labelledby="news-title">
      <div className="container mx-auto px-4">

        <AnimatedReveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 lg:mb-20">
          <div className="max-w-xl">
            <span className="text-gold-700 font-heading font-semibold tracking-[0.2em] text-xs uppercase flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-accent inline-block" />
              GÜNCEL GELİŞMELER
            </span>
            <h2 id="news-title" className="text-3xl md:text-4xl lg:text-5xl font-heading text-navy leading-tight">
              Bürodan <em className="text-gold-700 italic font-normal">Son Duyurular</em>
            </h2>
            <HeadingUnderline />
          </div>

          <Link
            href={ROUTES.NEWS}
            className="inline-flex items-center gap-3 text-navy font-bold tracking-widest text-sm uppercase group hover:text-accent transition-colors shrink-0"
          >
            <span>Tüm Duyurular</span>
            <div className="w-8 h-[1px] bg-navy group-hover:bg-accent transition-colors" />
            <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedReveal>

        <div className="border-t border-gray-100 divide-y divide-gray-100" role="list">
          {posts.map((post, index) => {
            const date = post.published_at ? new Date(post.published_at) : null

            return (
              <AnimatedReveal key={post.id} delay={index * 0.12} className="block" role="listitem">
                <Link
                  href={`/duyurular/${post.slug}`}
                  className="group flex items-start gap-5 md:gap-8 py-8"
                >
                  <div className="shrink-0 w-16 md:w-[72px] bg-navy border-l-4 border-gold flex flex-col items-center justify-center py-3 transition-colors group-hover:bg-navy-900">
                    {date ? (
                      <>
                        <span className="font-heading text-2xl md:text-3xl text-white leading-none">
                          {String(date.getDate()).padStart(2, '0')}
                        </span>
                        <span className="text-[10px] tracking-[0.15em] text-gold mt-1.5">
                          {MONTHS_SHORT[date.getMonth()]}
                        </span>
                      </>
                    ) : (
                      <span className="text-gold text-lg leading-none">•</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className="font-heading text-xl md:text-[22px] text-navy mb-2 leading-snug group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-3 max-w-2xl">
                        {post.excerpt}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-2 text-navy text-xs font-semibold tracking-widest uppercase">
                      Devamını Oku
                      <ArrowRight size={14} className="text-accent transition-transform group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </Link>
              </AnimatedReveal>
            )
          })}
        </div>

      </div>
    </section>
  )
}
