import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const playfair = localFont({
  src: [
    { path: '../styles/fonts/playfair-400.woff2', weight: '400', style: 'normal' },
    { path: '../styles/fonts/playfair-500.woff2', weight: '500', style: 'normal' },
    { path: '../styles/fonts/playfair-600.woff2', weight: '600', style: 'normal' },
    { path: '../styles/fonts/playfair-700.woff2', weight: '700', style: 'normal' },
    { path: '../styles/fonts/playfair-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = localFont({
  src: [
    { path: '../styles/fonts/inter-300.woff2', weight: '300', style: 'normal' },
    { path: '../styles/fonts/inter-400.woff2', weight: '400', style: 'normal' },
    { path: '../styles/fonts/inter-500.woff2', weight: '500', style: 'normal' },
    { path: '../styles/fonts/inter-600.woff2', weight: '600', style: 'normal' },
    { path: '../styles/fonts/inter-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Avukat Eren Oktay',
    default: 'Avukat Eren Oktay — Hukuk Bürosu',
  },
  description:
    'Eren Oktay Hukuk Bürosu – Profesyonel hukuki danışmanlık ve avukatlık hizmetleri.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
