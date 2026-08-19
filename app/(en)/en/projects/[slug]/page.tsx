import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProjeDetay from '@/components/ProjeDetay'
import { PROJELER, projeBul } from '@/content/projeler'
import { PROFIL } from '@/content/profil'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return PROJELER.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const proje = projeBul(slug)
  if (!proje) return {}

  return {
    title: `${proje.ad} — ${PROFIL.ad}`,
    description: proje.ozet.en,
    alternates: {
      canonical: `/en/projects/${slug}`,
      languages: { tr: `/projeler/${slug}`, en: `/en/projects/${slug}` },
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const proje = projeBul(slug)
  if (!proje) notFound()

  return <ProjeDetay proje={proje} dil="en" />
}
