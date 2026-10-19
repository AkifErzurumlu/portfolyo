import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'

const pages = [
  '',
  'karnova',
  'smartscheduler',
  'sismik-analiz',
  'fintrack',
  'web-kutuphane',
  'sifre-kasam',
]
const root = path.resolve('out')
const reports = []
function inspect(slug, locale) {
  const route = slug
    ? locale === 'tr'
      ? `/projeler/${slug}/`
      : `/en/projects/${slug}/`
    : locale === 'tr'
      ? '/'
      : '/en/'
  const html = fs.readFileSync(path.join(root, route, 'index.html'), 'utf8')
  assert(html.includes(`lang="${locale}"`), `Wrong language: ${route}`)
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1]
  assert(main, `Missing main: ${route}`)
  const illustrations = [...main.matchAll(/<img\b[^>]*src="([^"]+)"/g)].map(
    (m) => m[1],
  )
  assert(
    illustrations.every(
      (src) => src.startsWith('/images/tech/') && src.endsWith('.svg'),
    ),
    `Raster illustration found: ${route}`,
  )
  const scenes = [...main.matchAll(/class="[^"]*motion-scene[^\"]*"/g)].length
  assert(scenes > 0, `No animated illustrations: ${route}`)
  const signature = [...main.matchAll(/<(\/?)([a-z][a-z0-9-]*)([^>]*)>/gi)]
    .map((m) => m[1] + m[2] + ':' + (m[3].match(/class="([^"]*)"/)?.[1] ?? ''))
    .join('\n')
  return { route, signature, scenes, technologyLogos: illustrations.length }
}
for (const slug of pages) {
  const tr = inspect(slug, 'tr'),
    en = inspect(slug, 'en')
  assert.equal(
    en.signature,
    tr.signature,
    `Locale changes page structure: ${slug || 'home'}`,
  )
  reports.push({
    page: slug || 'home',
    sharedStructure: true,
    trScenes: tr.scenes,
    enScenes: en.scenes,
    onlyTechnologyLogosAreImages: true,
  })
}
console.log(
  JSON.stringify({ routes: 14, status: 'passed', pages: reports }, null, 2),
)
