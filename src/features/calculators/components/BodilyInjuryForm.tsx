'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { bedeniHasarSchema, type BedeniHasarFormValues } from '../schemas/bedeni-hasar-schema'
import { createSubmission } from '../actions/submissions.actions'
import SubmissionLegalFooter from './SubmissionLegalFooter'

export default function BodilyInjuryForm() {
  const [isPending, startTransition] = useTransition()
  const [honeypot, setHoneypot] = useState('')

  const form = useForm<BedeniHasarFormValues>({
    resolver: zodResolver(bedeniHasarSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      accidentDate: '',
      injuryStatus: '',
      treatmentStatus: '',
      sgkInsuranceProcess: '',
      faultStatus: '',
      additionalNote: '',
      kvkkConsent: false as unknown as true,
    },
  })

  function onSubmit(values: BedeniHasarFormValues) {
    startTransition(async () => {
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => formData.append(key, String(value)))
      formData.append('website', honeypot)

      const result = await createSubmission('bedeni_hasar', formData)
      if ('error' in result) {
        toast.error(result.error)
        return
      }
      toast.success('Talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.')
      form.reset()
    })
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="font-heading text-2xl text-navy font-normal">Trafik Kazası Bedeni Hasar Bilgi Formu</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <input
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="absolute -left-[9999px] w-px h-px opacity-0"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="fullName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Ad Soyad</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon</FormLabel>
                  <FormControl><Input type="tel" placeholder="05XX XXX XX XX" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>E-posta</FormLabel>
                <FormControl><Input type="email" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="accidentDate" render={({ field }) => (
              <FormItem>
                <FormLabel>Kaza Tarihi</FormLabel>
                <FormControl><Input type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="injuryStatus" render={({ field }) => (
              <FormItem>
                <FormLabel>Yaralanma / Maluliyet Durumu</FormLabel>
                <FormControl><Textarea rows={4} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="treatmentStatus" render={({ field }) => (
              <FormItem>
                <FormLabel>Tedavi Durumu</FormLabel>
                <FormControl><Textarea rows={2} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="sgkInsuranceProcess" render={({ field }) => (
              <FormItem>
                <FormLabel>SGK / Sigorta Süreci</FormLabel>
                <FormControl><Textarea rows={2} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="faultStatus" render={({ field }) => (
              <FormItem>
                <FormLabel>Kusur Durumu (biliniyorsa)</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="additionalNote" render={({ field }) => (
              <FormItem>
                <FormLabel>Ek Not (varsa)</FormLabel>
                <FormControl><Textarea rows={3} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="kvkkConsent" render={({ field, fieldState }) => (
              <SubmissionLegalFooter
                checked={field.value === true}
                onCheckedChange={field.onChange}
                error={fieldState.error?.message}
              />
            )} />

            <Button type="submit" disabled={isPending} className="w-full bg-navy hover:bg-secondary text-white py-6 text-sm font-semibold tracking-widest uppercase">
              {isPending ? 'Gönderiliyor...' : 'Gönder'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
