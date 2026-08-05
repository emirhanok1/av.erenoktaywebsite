'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { kidemSchema, type KidemFormValues } from '../schemas/kidem-schema'
import { calculateSeverance, type SeveranceResult, type FesihTuru } from '@/lib/calculators/kidem-ihbar'
import SeveranceResultCard from './SeveranceResultCard'

const FESIH_SECENEKLERI: { value: FesihTuru; label: string; hint: string }[] = [
  { value: 'isveren_haksiz', label: 'İşveren çıkardı (haksız)', hint: 'Kıdem ve ihbar tazminatı hesaplanır' },
  { value: 'hakli_neden_ayrilma', label: 'Haklı nedenle ayrıldım', hint: 'Sadece kıdem tazminatı hesaplanır' },
  { value: 'istifa', label: 'İstifa ettim', hint: 'Kural olarak kıdem tazminatı hakkı doğmaz; yalnızca kanundaki istisnai hallerde (emeklilik, askerlik, evlilik vb.) hak doğabilir' },
]

export default function SeveranceCalculatorForm() {
  const [result, setResult] = useState<SeveranceResult | null>(null)

  const form = useForm<KidemFormValues>({
    resolver: zodResolver(kidemSchema),
    defaultValues: {
      startDate: '',
      endDate: '',
      grossSalary: 0,
      transportAllowance: 0,
      mealAllowance: 0,
      annualBonus: 0,
      terminationType: '' as unknown as z.infer<typeof kidemSchema>['terminationType'],
    },
  })

  function onSubmit(values: KidemFormValues) {
    const outcome = calculateSeverance(values)
    if (!outcome.success) {
      toast.error(outcome.error)
      setResult(null)
      return
    }
    setResult(outcome.result)
  }

  return (
    <div className="space-y-8">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-heading text-2xl text-navy font-normal">Bilgilerinizi Girin</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>İşe Giriş Tarihi</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>İşten Çıkış Tarihi</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="grossSalary"
                  render={() => (
                    <FormItem>
                      <FormLabel>Aylık Çıplak Brüt Maaş (TL)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Örn: 40000"
                          onFocus={(e) => e.currentTarget.select()}
                          {...form.register('grossSalary', { setValueAs: (v) => (v === '' ? undefined : Number(v)) })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="transportAllowance"
                  render={() => (
                    <FormItem>
                      <FormLabel>Aylık Yol Yardımı (varsa)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0"
                          onFocus={(e) => e.currentTarget.select()}
                          {...form.register('transportAllowance', { setValueAs: (v) => (v === '' ? 0 : Number(v)) })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="mealAllowance"
                  render={() => (
                    <FormItem>
                      <FormLabel>Aylık Yemek Yardımı (varsa)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0"
                          onFocus={(e) => e.currentTarget.select()}
                          {...form.register('mealAllowance', { setValueAs: (v) => (v === '' ? 0 : Number(v)) })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="annualBonus"
                  render={() => (
                    <FormItem>
                      <FormLabel>Yıllık İkramiye Toplamı (varsa)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0"
                          onFocus={(e) => e.currentTarget.select()}
                          {...form.register('annualBonus', { setValueAs: (v) => (v === '' ? 0 : Number(v)) })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="terminationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fesih Türü</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="gap-3 pt-1"
                      >
                        {FESIH_SECENEKLERI.map((secenek) => (
                          <div
                            key={secenek.value}
                            className="flex items-start gap-3 border border-border rounded-lg p-4 hover:border-accent/60 transition-colors"
                          >
                            <RadioGroupItem value={secenek.value} id={secenek.value} className="mt-0.5" />
                            <Label htmlFor={secenek.value} className="font-normal cursor-pointer">
                              <span className="block text-foreground">{secenek.label}</span>
                              <span className="block text-xs text-muted-foreground mt-0.5">{secenek.hint}</span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-navy hover:bg-secondary text-white py-6 text-sm font-semibold tracking-widest uppercase">
                Hesapla
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {result && <SeveranceResultCard result={result} />}
    </div>
  )
}
