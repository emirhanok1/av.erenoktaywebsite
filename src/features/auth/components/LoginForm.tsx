'use client'

import { useTransition } from 'react'
import { loginAction } from '../actions/auth.actions'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm as useHookForm } from 'react-hook-form'

const loginSchema = z.object({
  email: z.string().email('Geçerli email giriniz'),
  password: z.string().min(6, 'En az 6 karakter'),
})

export default function LoginForm() {
  const [isPending, startTransition] = useTransition()
  
  const form = useHookForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      const formData = new FormData()
      formData.append('email', values.email)
      formData.append('password', values.password)
      
      const result = await loginAction({ error: null }, formData)
      
      if (result?.error) {
        toast.error(result.error)
      }
    })
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-serif text-primary">Av. Eren Oktay</h1>
        <p className="text-muted-foreground mt-2">Hukuk Bürosu</p>
      </div>

      <Card className="shadow-lg border-t-4 border-t-accent">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Yönetim Paneli</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="admin@erenoktay.av.tr" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Şifre</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-accent hover:text-white transition-colors"
                disabled={isPending}
              >
                {isPending ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="text-center mt-6 text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Eren Oktay Hukuk Bürosu
      </div>
    </div>
  )
}
