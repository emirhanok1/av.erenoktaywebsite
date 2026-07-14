import type { Metadata, Viewport } from 'next'
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

import { SITE } from '@/constants/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    images: [{
      url: '/og-image.jpg',
      width: 1200, 
      height: 630,
      alt: SITE.name,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE.url },
}

export const viewport: Viewport = {
  themeColor: '#0f172a', // navy
  width: 'device-width',
  initialScale: 1,
}

import { Toaster } from '@/components/ui/sonner'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
