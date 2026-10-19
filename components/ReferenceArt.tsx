import type { CSSProperties } from 'react'
import type { Dil } from '@/lib/i18n'
import MotionScope, { AnimatedNumber } from './MotionScope'
import EAArtwork from './EAArtwork'
import ProjectVisual from './ProjectVisual'
import ProjectThumb from './ProjectThumb'
import Icon from './Icon'
import s from './AnimatedArt.module.css'

type Region = 'hero' | 'detail' | 'diagram' | 'thumb' | 'featured'
export default function ReferenceArt({
  page,
  dil,
  region,
  className = '',
}: {
  page: string
  dil: Dil
  region: Region
  className?: string
}) {
  const tr = dil === 'tr'
  if (page === 'anasayfa') return <EAArtwork dil={dil} />
  if (region === 'hero' || region === 'featured')
    return (
      <ProjectVisual slug={page} dil={dil} compact={region === 'featured'} />
    )
  if (region === 'thumb') return <ProjectThumb slug={page} dil={dil} />
  let content
  if (page === 'karnova')
    content = (
      <div className={s.panel}>
        <header>
          <strong>← {tr ? 'Kazanım analizi' : 'Learning objectives'}</strong>
          <span>{tr ? 'Matematik' : 'Mathematics'}⌄</span>
        </header>
        <div className={s.tree}>
          {(tr
            ? ['Oran ve Orantı', 'Oran', 'Doğru Orantı', 'Ters Orantı']
            : [
                'Ratios and Proportions',
                'Ratio',
                'Direct proportion',
                'Inverse proportion',
              ]
          ).map((name, i) => (
            <div key={i}>
              {name}
              <b>
                <AnimatedNumber value={[45, 78, 42, 20][i]!} suffix="%" />
              </b>
            </div>
          ))}
        </div>
        <div className={s.recommendations}>
          <strong>{tr ? 'Önerilen içerikler' : 'Recommended content'}</strong>
          {(tr
            ? [
                'Oran ve Orantı · Temel Kavramlar',
                'Doğru Orantı Problemleri',
                'Günlük Hayatta Oran',
              ]
            : [
                'Ratios · Key concepts',
                'Direct proportion problems',
                'Ratios in everyday life',
              ]
          ).map((text, i) => (
            <div key={i}>
              <Icon name={['play', 'document', 'book'][i]!} />
              <span>
                {text}
                <small>
                  {tr
                    ? [
                        'Video · 12 dk',
                        'Soru seti · 15 soru',
                        'Okuma metni · 10 dk',
                      ][i]
                    : [
                        'Video · 12 min',
                        'Practice · 15 questions',
                        'Reading · 10 min',
                      ][i]}
                </small>
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  else if (page === 'smartscheduler' && region === 'diagram')
    content = (
      <div className={s.nodes}>
        <div className={s.columns}>
          {(tr
            ? ['Derslik kapasitesi', 'Öğretim elemanı', 'Zaman çakışmaları']
            : ['Room capacity', 'Instructor availability', 'Time conflicts']
          ).map((text, i) => (
            <div className={s.node} key={i}>
              <Icon name={['graduation', 'user', 'calendar'][i]!} />
              <strong>{text}</strong>
              <span>
                {tr ? 'Kısıtlar kontrol edilir.' : 'Constraints are checked.'}
              </span>
            </div>
          ))}
        </div>
        <div className={s.line} />
        <div className={s.node}>
          <Icon name="calendar" />
          <strong>{tr ? 'Ders programı' : 'Timetable'}</strong>
          <span>{tr ? 'Açıklanabilir kararlar' : 'Explainable decisions'}</span>
        </div>
      </div>
    )
  else if (page === 'smartscheduler')
    content = (
      <div className={s.miniCalendar}>
        <div className={s.timeGrid}>
          <div className={s.movingEvent}>
            <strong>{tr ? 'Veritabanları' : 'Databases'}</strong>
            <small>11:00 – 12:30</small>
          </div>
        </div>
        <div className={s.conflict}>
          <strong>! {tr ? 'Derslik dolu' : 'Room unavailable'}</strong>
          <p>
            {tr
              ? 'Bu saatte seçilen derslikte yeterli kapasite bulunmuyor.'
              : 'The selected room is not available at this time.'}
          </p>
        </div>
      </div>
    )
  else if (page === 'sismik-analiz' && region === 'diagram')
    content = (
      <div className={s.architecture}>
        {['Bi-LSTM', 'Attention LSTM'].map((name, i) => (
          <div className={s.model} key={name}>
            <strong>{name}</strong>
            <div>
              {['20 × 1', 'LSTM', i ? 'Attention' : 'Dense', 'ŷ'].map(
                (text, j) => (
                  <span key={j}>{text}</span>
                ),
              )}
            </div>
            <small>
              PyTorch · {tr ? 'model mimarisi' : 'model architecture'}
            </small>
          </div>
        ))}
      </div>
    )
  else if (page === 'sismik-analiz')
    content = (
      <div className={s.plotGrid}>
        {[false, true].map((purple, i) => (
          <div className={s.plot} key={i}>
            <strong>
              {purple ? 'Attention LSTM' : 'Bi-LSTM'} · R² ={' '}
              {purple ? '0.02' : '0.10'}
            </strong>
            <svg viewBox="0 0 240 180">
              <path
                d="M25 15V145H225M25 115H225M25 85H225M25 55H225M65 15V145M105 15V145M145 15V145M185 15V145"
                fill="none"
                stroke="#e2e9fa"
              />
              <path d="M25 145 225 15" stroke="#8293b8" strokeDasharray="5 4" />
              {Array.from({ length: 140 }, (_, j) => (
                <circle
                  key={j}
                  cx={37 + ((j * 37) % 125) + Math.sin(j) * 8}
                  cy={118 + Math.sin(j * 3.2) * 15 + Math.cos(j * 4.1) * 11}
                  r="1.6"
                  fill={purple ? '#9565f8' : '#3864ff'}
                />
              ))}
              <text x="125" y="169" textAnchor="middle">
                {tr ? 'Gerçek büyüklük' : 'True magnitude'}
              </text>
            </svg>
          </div>
        ))}
      </div>
    )
  else if (page === 'fintrack')
    content = (
      <div className={s.panel}>
        <header>
          <strong>{tr ? 'Aylık Gider Dağılımı' : 'Monthly spending'}</strong>
          <span>{tr ? 'Bu ay' : 'This month'}</span>
        </header>
        <div className={s.finance}>
          <div className={s.donut}>
            <div>
              <AnimatedNumber value={16020} prefix="₺" dil={dil} />
              <small>{tr ? 'Toplam Gider' : 'Total spending'}</small>
            </div>
          </div>
          <div className={s.legend}>
            {(tr
              ? ['Konut', 'Gıda', 'Ulaşım', 'Eğlence', 'Sağlık', 'Diğer']
              : ['Housing', 'Food', 'Transport', 'Leisure', 'Health', 'Other']
            ).map((text, i) => (
              <div key={i}>
                <i
                  style={
                    {
                      '--tone': [
                        '#3155ff',
                        '#35bea8',
                        '#ffc05b',
                        '#ff917e',
                        '#a486fa',
                        '#c6d0f2',
                      ][i],
                    } as CSSProperties
                  }
                />
                <span>{text}</span>
                <b>
                  <AnimatedNumber
                    value={[32, 22, 14, 11, 9, 12][i]!}
                    suffix="%"
                  />
                </b>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  else if (page === 'web-kutuphane' && region === 'diagram')
    content = (
      <div className={s.nodes}>
        {(tr
          ? ['Üye', 'Kitap', 'Ödünç kaydı']
          : ['Member', 'Book', 'Loan']
        ).map((name, i) => (
          <div key={i} className={s.node}>
            <Icon name={['user', 'book', 'document'][i]!} />
            <strong>{name}</strong>
            <span>
              {tr
                ? [
                    'Hesap ve üyelik bilgileri',
                    'Kitap ve müsaitlik bilgileri',
                    'Üyeyi bir kitaba bağlar',
                  ][i]
                : [
                    'Account and membership',
                    'Books and availability',
                    'Connects a member to a book',
                  ][i]}
            </span>
          </div>
        ))}
      </div>
    )
  else if (page === 'web-kutuphane')
    content = (
      <div className={s.panel}>
        <div className={s.bookCard}>
          <div className={s.bookCover} />
          <div>
            <strong>{tr ? 'Sakin Zihin' : 'A Quiet Mind'}</strong>
            <p>Deniz Karaca</p>
            <span className={s.available}>● {tr ? 'Müsait' : 'Available'}</span>
            <p>
              <small>
                {tr
                  ? 'Kategori: Kişisel gelişim'
                  : 'Category: Personal development'}
                <br />
                {tr ? 'Sayfa: 320' : 'Pages: 320'}
                <br />
                {tr ? 'Dil: Türkçe' : 'Language: Turkish'}
              </small>
            </p>
            <span className={s.borrow}>
              {tr ? 'Ödünç al' : 'Borrow book'} →
            </span>
          </div>
        </div>
      </div>
    )
  else
    content = (
      <div className={s.userList}>
        <strong>{tr ? 'Kullanıcılar' : 'Users'}</strong>
        {[
          'Emin',
          'Ahmet',
          'Zeynep',
          tr ? 'Yeni kullanıcı ekle' : 'Add new user',
        ].map((name, i) => (
          <div key={i}>
            <i>{i === 3 ? '+' : name[0]}</i>
            {name}
          </div>
        ))}
      </div>
    )
  return (
    <MotionScope
      className={`${s.art} ${className}`}
      label={tr ? 'Hareketli ürün gösterimi' : 'Animated product illustration'}
    >
      {content}
    </MotionScope>
  )
}
