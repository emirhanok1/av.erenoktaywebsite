import { Metadata } from 'next'
import { getFaqs } from '@/services/faq'
import { getFaqSchema } from '@/lib/schemas/faq-schema'
import { getBreadcrumbSchema } from '@/lib/schemas/breadcrumb'
import { JsonLd } from '@/components/JsonLd'
import { SITE } from '@/constants/site'
import LegalDisclaimer from '@/components/common/LegalDisclaimer'
import PageHero from '@/components/common/PageHero'
import ClosingRibbon from '@/components/common/ClosingRibbon'
import { AnimatedReveal } from '@/features/home/components/AnimatedReveal'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular',
  description: 'Hukuki süreçlerle ilgili en çok merak edilen sorular ve yanıtları.',
  alternates: { canonical: `${SITE.url}/sss` },
}

type FAQ = {
  id: string
  question: string
  answer: string
  category: string | null
  sort_order: number
}

export default async function FAQPage() {
  const faqs = await getFaqs()
  const schema = getFaqSchema(faqs)
  const breadcrumbItems = [
    { name: 'Anasayfa', path: '/' },
    { name: 'S.S.S.', path: '/sss' },
  ]
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems)

  const grouped = faqs.reduce((acc, faq) => {
    const cat = faq.category ?? 'Genel'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(faq)
    return acc
  }, {} as Record<string, FAQ[]>)

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={schema} />
      <JsonLd data={breadcrumbSchema} />
      <PageHero
        eyebrow="Yardım Merkezi"
        title="Sıkça Sorulan Sorular"
        breadcrumb={breadcrumbItems}
      />

      <section className="py-24 bg-slate-50 flex-grow">
        <div className="container max-w-3xl">
          {Object.keys(grouped).length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p>Henüz soru bulunmamaktadır.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {Object.entries(grouped).map(([category, categoryFaqs], index) => (
                <AnimatedReveal key={category} delay={index * 0.1}>
                  <h2 className="font-heading text-2xl text-navy mb-6 border-b border-border pb-4">{category}</h2>
                  <Accordion type="multiple" className="w-full bg-white rounded-xl shadow-sm border border-border px-6">
                    {categoryFaqs.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left font-bold text-navy hover:text-accent">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AnimatedReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <ClosingRibbon quote="Aradığınızı bulamadınız mı?" ctaText="WhatsApp'tan Sorun" />
      <LegalDisclaimer variant="default" />
    </div>
  )
}
