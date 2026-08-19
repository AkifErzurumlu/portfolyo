import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Kok from '@/components/Kok'
import { PROFIL } from '@/content/profil'
import { SITE_URL } from '@/lib/site'
import '../globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${PROFIL.ad} — ${PROFIL.unvan.tr}`,
  description: PROFIL.unvan.tr + '. ' + PROFIL.egitim.tr + '. ' + PROFIL.durum.tr + '.',
  alternates: {
    canonical: '/',
    languages: { tr: '/', en: '/en' },
  },
  openGraph: {
    type: 'profile',
    locale: 'tr_TR',
    url: '/',
    siteName: PROFIL.ad,
    title: `${PROFIL.ad} — ${PROFIL.unvan.tr}`,
    description: PROFIL.durum.tr,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${PROFIL.ad} — ${PROFIL.unvan.tr}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PROFIL.ad} — ${PROFIL.unvan.tr}`,
    description: PROFIL.durum.tr,
    images: ['/og.png'],
  },
}

export default function TrLayout({ children }: { children: ReactNode }) {
  return <Kok dil="tr">{children}</Kok>
}
