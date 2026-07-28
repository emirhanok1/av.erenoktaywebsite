import { Metadata } from 'next'
import LoginForm from '@/features/auth/components/LoginForm'

export const metadata: Metadata = {
  title: 'Giriş | Eren Oktay',
  description: 'Eren Oktay Hukuk Bürosu Yönetim Paneli',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return <LoginForm />
}
