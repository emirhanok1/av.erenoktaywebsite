import { MetadataRoute } from 'next'
import { SITE } from '@/constants/site'
import { getPosts } from '@/services/posts'
import { getArticles } from '@/services/articles'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapUrls: MetadataRoute.Sitemap = [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE.url}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE.url}/duyurular`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE.url}/pratik-bilgiler`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE.url}/sss`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE.url}/iletisim`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${SITE.url}/kvkk`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  try {
    const posts = await getPosts()
    const articles = await getArticles()

    posts.forEach((post) => {
      sitemapUrls.push({
        url: `${SITE.url}/duyurular/${post.slug}`,
        lastModified: new Date(post.published_at || new Date()),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    })

    articles.forEach((article) => {
      sitemapUrls.push({
        url: `${SITE.url}/pratik-bilgiler/${article.slug}`,
        lastModified: new Date(article.published_at || new Date()),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    })
  } catch (error) {
    console.error('Sitemap dinamik sayfa oluşturma hatası:', error)
  }

  return sitemapUrls
}
