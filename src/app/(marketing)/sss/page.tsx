import { Metadata } from 'next'
import { getFaqs } from '@/services/faq'
import { getFaqSchema } from '@/lib/schemas/faq-schema'
import { JsonLd } from '@/components/JsonLd'
import { SITE } from '@/constants/site'
import LegalDisclaimer from '@/components/common/LegalDisclaimer'
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

  const grouped = faqs.reduce((acc, faq) => {
    const cat = faq.category ?? 'Genel'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(faq)
    return acc
  }, {} as Record<string, FAQ[]>)

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={schema} />
      <section className="bg-navy pt-32 pb-20 text-white">
        <div className="container max-w-4xl text-center">
          <h1 className="font-heading text-fluid-h1 mb-4">Sıkça Sorulan Sorular</h1>
          <p className="text-fluid-body text-slate-300">
            Hukuki süreçler hakkında merak ettiğiniz temel soruların yanıtlarını burada bulabilirsiniz.
          </p>
        </div>
      </section>

      <section className="py-24 bg-slate-50 flex-grow">
        <div className="container max-w-3xl">
          {Object.keys(grouped).length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p>Henüz soru bulunmamaktadır.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {Object.entries(grouped).map(([category, categoryFaqs]) => (
                <div key={category}>
                  <h2 className="font-heading text-2xl text-navy mb-6 border-b border-border pb-4">{category}</h2>
                  <Accordion type="multiple" className="w-full bg-white rounded-xl shadow-sm border border-border px-6">
                    {categoryFaqs.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left font-bold text-navy hover:text-accent">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <LegalDisclaimer variant="default" />
    </div>
  )
}
