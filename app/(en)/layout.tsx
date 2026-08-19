import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Kok from '@/components/Kok'
import { PROFIL } from '@/content/profil'
import { SITE_URL } from '@/lib/site'
import '../globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${PROFIL.ad} — ${PROFIL.unvan.en}`,
  description: PROFIL.unvan.en + '. ' + PROFIL.egitim.en + '. ' + PROFIL.durum.en + '.',
  alternates: {
    canonical: '/en',
    languages: { tr: '/', en: '/en' },
  },
  openGraph: {
    type: 'profile',
    locale: 'en_GB',
    url: '/en',
    siteName: PROFIL.ad,
    title: `${PROFIL.ad} — ${PROFIL.unvan.en}`,
    description: PROFIL.durum.en,
    images: [{ url: '/og-en.png', width: 1200, height: 630, alt: `${PROFIL.ad} — ${PROFIL.unvan.en}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PROFIL.ad} — ${PROFIL.unvan.en}`,
    description: PROFIL.durum.en,
    images: ['/og-en.png'],
  },
}

export default function EnLayout({ children }: { children: ReactNode }) {
  return <Kok dil="en">{children}</Kok>
}
