import { copyFile, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

/**
 * Dışa aktarımdan sonra 404 sayfasını kendi tasarımımızla değiştirir.
 *
 * Neden gerekli: uygulamada iki kök layout var — `(tr)` ve `(en)` — çünkü
 * `<html lang>` rotaya göre değişmeli. Next.js bu yapıda `app/not-found.tsx`
 * dosyasını kabul etmiyor ("not-found.tsx doesn't have a root layout") ve
 * `out/404.html` dosyasını kendi İngilizce varsayılanıyla üretiyor.
 *
 * `public/404.html` koymak da yetmiyor: dışa aktarım, public kopyalandıktan
 * sonra kendi 404'ünü üstüne yazıyor. Bu yüzden kopyalama en sona alındı.
 *
 * npm `postbuild` kancasıyla çalışır; `npm run build` sonrası kendiliğinden
 * tetiklenir, Vercel'in derleme komutunu değiştirmeye gerek kalmaz.
 */

const kok = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const kaynak = path.join(kok, 'public', '404.html')
const hedef = path.join(kok, 'out', '404.html')

try {
  const oncekiBoyut = (await stat(hedef)).size
  await copyFile(kaynak, hedef)
  const sonrakiBoyut = (await stat(hedef)).size
  console.log(
    `404.html değiştirildi: ${oncekiBoyut} → ${sonrakiBoyut} bayt (tasarımlı sürüm)`,
  )
} catch (hata) {
  // Sessizce geçmiyoruz: 404 sayfasının İngilizce varsayılana düşmesi
  // fark edilmesi zor bir gerileme olurdu.
  console.error('404.html değiştirilemedi:', hata.message)
  process.exit(1)
}
