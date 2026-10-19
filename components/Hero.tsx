import { type Dil, t } from '@/lib/i18n'
import { CV, PROFIL } from '@/content/profil'
import Icon from './Icon'
import stil from './Hero.module.css'
import ReferenceArt from './ReferenceArt'
export default function Hero({ dil }: { dil: Dil }) {
  return (
    <section className={`kabuk ${stil.hero}`}>
      <div className={stil.copy}>
        <p className={stil.status}>
          <span />
          {dil === 'tr' ? 'Yeni fırsatlara açığım' : 'Open to opportunities'}
        </p>
        <h1>
          Emin Akif
          <br />
          Erzurumlu<span>.</span>
        </h1>
        <p className={stil.tagline}>
          {dil === 'tr'
            ? 'Fikirden çalışan ürüne.'
            : 'From idea to working product.'}
        </p>
        <p className={stil.description}>
          {dil === 'tr' ? (
            <>
              Backend, yapay zekâ ve arayüzler.
              <br />
              Ölçerek geliştiriyorum.
            </>
          ) : (
            <>
              Backend, AI and interfaces.
              <br />
              Built with measurable results.
            </>
          )}
        </p>
        <div className={stil.actions}>
          <a className="btn btn-primary" href="#calismalar">
            {dil === 'tr' ? 'Çalışmalarımı keşfet' : 'Explore my work'}
            <Icon name="arrow-right" size={18} />
          </a>
          <a className="btn btn-link" href={CV[dil]} download>
            {dil === 'tr' ? 'CV’mi indir' : 'Download CV'}
            <Icon name="download" size={17} />
          </a>
        </div>
        <div className={stil.meta}>
          <span>
            <Icon name="location" size={17} />
            {t(PROFIL.konum, dil)}
          </span>
          <span>
            <Icon name="graduation" size={20} />
            {dil === 'tr' ? 'Yazılım mühendisliği' : 'Software engineering'}
          </span>
        </div>
      </div>
      <div
        className={stil.artwork}
        role="img"
        aria-label={
          dil === 'tr'
            ? 'Kobalt mavisi EA monogramı ve cam yapı katmanları'
            : 'Cobalt blue EA monogram with glass architectural layers'
        }
      >
        <ReferenceArt page="anasayfa" dil={dil} region="hero" />
      </div>
    </section>
  )
}
