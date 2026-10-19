'use client'

import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import type { Dil } from '@/lib/i18n'
import s from './ProjectVisual.module.css'
import MotionScope, { AnimatedNumber, useSceneProgress } from './MotionScope'

type Props = { slug: string; dil: Dil; compact?: boolean }
type Exam = 'YKS' | 'LGS'
const courses = {
  YKS: [
    ['Türkçe', 'Turkish', 80],
    ['Matematik', 'Mathematics', 45],
    ['Fen Bilimleri', 'Science', 72],
    ['Sosyal Bilimler', 'Social Sciences', 58],
  ],
  LGS: [
    ['Türkçe', 'Turkish', 76],
    ['Matematik', 'Mathematics', 62],
    ['Fen Bilimleri', 'Science', 84],
    ['T.C. İnkılap Tarihi', 'Revolution History', 68],
    ['Din Kültürü', 'Religion', 81],
    ['İngilizce', 'English', 73],
  ],
} as const
const recommended = {
  YKS: [
    ['Fonksiyonlar', 'Functions', 'Matematik', 'Mathematics'],
    ['Paragrafta anlam', 'Meaning in paragraphs', 'Türkçe', 'Turkish'],
    ['Kuvvet ve hareket', 'Force and motion', 'Fen Bilimleri', 'Science'],
  ],
  LGS: [
    ['Doğrusal denklemler', 'Linear equations', 'Matematik', 'Mathematics'],
    [
      'Milli Mücadele',
      'War of Independence',
      'T.C. İnkılap Tarihi',
      'Revolution History',
    ],
    ['DNA ve genetik kod', 'DNA and genetic code', 'Fen Bilimleri', 'Science'],
  ],
} as const

function useExamPreference() {
  const [exam, setExam] = useState<Exam>('YKS')
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('portfolio-karnova-exam')
      if (saved === 'YKS' || saved === 'LGS') setExam(saved)
    } catch { /* The illustration also works when browser storage is disabled. */ }
  }, [])
  const chooseExam = (value: Exam) => {
    setExam(value)
    try { sessionStorage.setItem('portfolio-karnova-exam', value) } catch { /* Optional preference only. */ }
  }
  return [exam, chooseExam] as const
}

function ExamToggle({ exam, chooseExam, dil }: {
  exam: Exam
  chooseExam: (value: Exam) => void
  dil: Dil
}) {
  return (
    <div className={s.examToggle} role="group"
      aria-label={dil === 'tr' ? 'Sınav seçimi' : 'Choose exam'}>
      {(['YKS', 'LGS'] as const).map((value) => (
        <button key={value} type="button" aria-pressed={exam === value}
          onClick={() => chooseExam(value)}>{value}</button>
      ))}
    </div>
  )
}

function LockMark() {
  return (
    <svg viewBox="0 0 32 38" width="28" height="34" aria-hidden="true">
      <path
        d="M8 16V10a8 8 0 0 1 16 0v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <rect x="3" y="15" width="26" height="21" rx="5" fill="currentColor" />
      <circle cx="16" cy="24" r="3" fill="#d7e4ff" />
      <path d="M16 25v5" stroke="#d7e4ff" strokeWidth="2" />
    </svg>
  )
}
function Glyph({ children }: { children: React.ReactNode }) {
  return (
    <span className={s.glyph} aria-hidden="true">
      {children}
    </span>
  )
}
function Sidebar({ name, items }: { name: string; items: string[] }) {
  return (
    <aside className={s.sidebar}>
      <strong className={s.brand}>
        <Glyph>
          {name === 'Karnova' ? '▣' : name === 'SmartScheduler' ? '▦' : '◫'}
        </Glyph>
        {name}
      </strong>
      <div className={s.sideItems}>
        {items.map((x, i) => (
          <span key={x} className={i === 0 ? s.selectedNav : ''}>
            <span aria-hidden="true">
              {['⌂', '▤', '▦', '◇', '◷', '⚙'][i % 6]}
            </span>
            {x}
          </span>
        ))}
      </div>
    </aside>
  )
}

function Trend({ dil }: { dil: Dil }) {
  const phase = useSceneProgress()
  const points = [
    [10, 65],
    [90, 58],
    [170, 42],
    [250, 25],
    [330, 48],
    [410, 33],
    [490, 43],
  ].map(([x, y]) => [x!, 70 - (70 - y!) * phase])
  const line = points.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join('')
  return (
    <div className={s.trend}>
      <div className={s.panelHeading}>
        <strong>
          {dil === 'tr' ? 'Performans trendi' : 'Performance trend'}
        </strong>
        <span>{dil === 'tr' ? 'Son 7 hafta' : 'Last 7 weeks'}</span>
      </div>
      <svg
        viewBox="0 0 500 85"
        role="img"
        aria-label={
          dil === 'tr'
            ? 'Örnek haftalık performans eğilimi'
            : 'Illustrative weekly performance trend'
        }
      >
        <path
          d="M10 10H490M10 40H490M10 70H490M10 10V70M90 10V70M170 10V70M250 10V70M330 10V70M410 10V70M490 10V70"
          stroke="#e8edfb"
          fill="none"
        />
        <path d={`${line}V70H10Z`} fill="#244bff" opacity=".07" />
        <path
          pathLength={1}
          d={line}
          fill="none"
          stroke="#3155ff"
          strokeWidth="2.5"
        />
        {points.map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="3.5" fill="#3155ff" />
        ))}
      </svg>
      <div className={s.weekLabels}>
        {Array.from({ length: 7 }, (_, i) => (
          <span key={i}>
            {dil === 'tr' ? `${i + 1}. hafta` : `Week ${i + 1}`}
          </span>
        ))}
      </div>
    </div>
  )
}

function KarnovaJourney({ dil }: { dil: Dil }) {
  const tr = dil === 'tr'
  const [exam, chooseExam] = useExamPreference()
  return (
    <div className={s.screen}>
      <Sidebar
        name="Karnova"
        items={
          tr
            ? [
                'Ana sayfa',
                'Derslerim',
                'Planım',
                'Yapay zekâ asistanı',
                'İlerleme',
                'Ayarlar',
              ]
            : [
                'Home',
                'My courses',
                'Study plan',
                'AI study assistant',
                'Progress',
                'Settings',
              ]
        }
      />
      <div className={s.dashboard}>
        <div className={s.topline}>
          <h3>{tr ? 'Öğrenme yolculuğun' : 'Your learning journey'}</h3>
          <ExamToggle exam={exam} chooseExam={chooseExam} dil={dil} />
        </div>
        <p className={s.journeyHint}>
          {tr
            ? 'Hedeflerini adım adım, daha net bir şekilde gör.'
            : 'Set your goals and take the next step with clarity.'}
        </p>
        <div className={s.searchHint}>
          ⌕{' '}
          {tr
            ? 'Ders, konu veya beceri ara…'
            : 'Search courses, topics or skills…'}
        </div>
        <div className={s.journeyStats}>
          <MotionScope className={s.journeyCard}>
            <div className={s.journeyRing}>
              <svg viewBox="0 0 90 90" aria-hidden="true">
                <circle
                  cx="45"
                  cy="45"
                  r="36"
                  fill="none"
                  stroke="#e8eeff"
                  strokeWidth="7"
                />
                <circle
                  cx="45"
                  cy="45"
                  r="36"
                  fill="none"
                  stroke="#3155ff"
                  strokeWidth="7"
                  strokeLinecap="round"
                  pathLength="1"
                />
              </svg>
              <strong>
                <AnimatedNumber value={72} suffix="%" />
              </strong>
            </div>
            <div>
              <strong>{tr ? 'Genel ilerleme' : 'Overall progress'}</strong>
              <small>{tr ? 'Bu hafta' : 'This week'}</small>
            </div>
          </MotionScope>
          <div className={s.journeyWeek}>
            <strong>{tr ? 'Bu hafta' : 'This week'}</strong>
            {[3, 12, 2].map((n, i) => (
              <div key={i}>
                <i>{['✓', '◷', '?'][i]}</i>
                <span>
                  <AnimatedNumber value={n} />{' '}
                  {tr
                    ? ['kazanım tamamlandı', 'saat çalışıldı', 'yeni rozet'][i]
                    : ['objectives completed', 'hours studied', 'new badges'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
        <h4 className={s.journeyTitle}>
          {tr ? 'Önerilen sonraki kazanımlar:' : 'Recommended learning objectives:'}
        </h4>
        <div className={s.journeyLower}>
          <div>
            {recommended[exam].map(([trName, enName, trCourse, enCourse], i) => (
              <div key={trName} className={s.journeyLesson}>
                <Glyph>{['▣', '◧', '▤'][i]}</Glyph>
                <div>
                  <strong>{tr ? trName : enName}</strong>
                  <small>
                    {tr ? trCourse : enCourse} · {exam}
                  </small>
                </div>
              </div>
            ))}
          </div>
          <MotionScope className={s.journeyStudy}>
            <strong>{tr ? 'Çalışma isteğin' : 'Study time'}</strong>
            <Trend dil={dil} />
          </MotionScope>
        </div>
      </div>
    </div>
  )
}
function PasswordDots() {
  const phase = useSceneProgress()
  return (
    <strong aria-hidden="true">
      {'● '.repeat(Math.round(8 * phase)).trim() || ' '}
    </strong>
  )
}

function Karnova({ dil }: { dil: Dil }) {
  const [exam, chooseExam] = useExamPreference()
  const tr = dil === 'tr'
  return (
    <div className={s.screen}>
      <Sidebar
        name="Karnova"
        items={
          tr
            ? [
                'Ana sayfa',
                'Öğrenciler',
                'Kazanımlar',
                'İçerik önerileri',
                'Raporlar',
                'Ayarlar',
              ]
            : [
                'Overview',
                'Students',
                'Learning outcomes',
                'Recommendations',
                'Reports',
                'Settings',
              ]
        }
      />
      <div className={s.dashboard}>
        <div className={s.topline}>
          <h3>{tr ? 'Öğrenci analizi' : 'Student analysis'}</h3>
          <span className={s.student}>◉ &nbsp; Ahmet Yılmaz</span>
        </div>
        <div className={s.tabs}>
          <span>{tr ? 'Genel görünüm' : 'Overview'}</span>
          <strong>{tr ? 'Kazanım analizi' : 'Learning outcomes'}</strong>
          <span>{tr ? 'İçerik önerileri' : 'Recommendations'}</span>
        </div>
        <MotionScope resetKey={exam} className={s.learningGrid}>
          <section className={s.panel}>
            <div className={s.panelHeading}>
              <h4>{tr ? 'Kazanım ilerlemesi' : 'Course progress'}</h4>
              <ExamToggle exam={exam} chooseExam={chooseExam} dil={dil} />
            </div>
            <div className={s.progressList} aria-live="off">
              {courses[exam].map(([trName, enName, percent], i) => (
                <div className={s.course} key={trName}>
                  <span
                    className={s.courseDot}
                    style={
                      {
                        '--accent': [
                          '#2ab8a8',
                          '#f6b742',
                          '#6080fb',
                          '#ef798a',
                          '#926bdb',
                          '#48a1cc',
                        ][i],
                      } as CSSProperties
                    }
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <span>{tr ? trName : enName}</span>
                    <div className={s.progressTrack}>
                      <i
                        style={{
                          width: `${percent}%`,
                          background: [
                            '#2ab8a8',
                            '#f6b742',
                            '#6080fb',
                            '#ef798a',
                            '#926bdb',
                            '#48a1cc',
                          ][i],
                        }}
                      />
                    </div>
                  </div>
                  <b>
                    <AnimatedNumber value={percent} suffix="%" dil={dil} />
                  </b>
                </div>
              ))}
            </div>
          </section>
          <section className={s.panel}>
            <div className={s.panelHeading}>
              <h4>{tr ? 'Önerilen içerikler' : 'Recommended lessons'}</h4>
              <small>{exam}</small>
            </div>
            {recommended[exam].map(([title, en, subject, enSubject], i) => (
              <div className={s.lesson} key={title}>
                <Glyph>{['▷', '▤', '◫'][i]}</Glyph>
                <div>
                  <strong>{tr ? title : en}</strong>
                  <span>
                    {tr ? subject : enSubject} ·{' '}
                    {tr
                      ? [
                          'Video · 12 dk',
                          'Soru seti · 15 soru',
                          'Etkinlik · 10 dk',
                        ][i]
                      : [
                          'Video · 12 min',
                          'Practice · 15 questions',
                          'Activity · 10 min',
                        ][i]}
                  </span>
                </div>
              </div>
            ))}
          </section>
        </MotionScope>
        <Trend dil={dil} />
      </div>
    </div>
  )
}

function Scheduler({ dil, compact = false }: { dil: Dil; compact?: boolean }) {
  const tr = dil === 'tr'
  const events = [
    ['Veritabanları', 'Databases', 1, 1, 2, 'blue'],
    ['Web Geliştirme', 'Web Development', 2, 3, 2, 'green'],
    ['Bilgisayar Ağları', 'Computer Networks', 1, 5, 2, 'blue'],
    ['Mobil Uygulama', 'Mobile Applications', 4, 5, 2, 'purple'],
    ['Yapay Zekâ', 'Artificial Intelligence', 5, 1, 2, 'purple'],
    ['Proje Geliştirme', 'Project Development', 3, 7, 2, 'blue'],
  ] as const
  return (
    <div className={`${s.screen} ${s.scheduleScreen}`}>
      <Sidebar
        name="SmartScheduler"
        items={
          tr
            ? [
                'Program',
                'Dersler',
                'Derslikler',
                'Öğretim Elemanları',
                'Kısıtlar',
                'Senaryolar',
              ]
            : [
                'Schedule',
                'Courses',
                'Rooms',
                'Instructors',
                'Constraints',
                'Scenarios',
              ]
        }
      />
      <div className={s.dashboard}>
        <div className={s.topline}>
          <strong>{compact ? 'SmartScheduler' : <>12 – 18 {tr ? 'Mayıs' : 'May'} 2025</>}</strong>
          <span className={s.student}>
            {tr ? 'Hafta görünümü' : 'Week view'}
          </span>
        </div>
        <div className={s.schedulerBody}>
          <div className={s.calendar}>
            <div className={s.days}>
              <span />
              {(tr
                ? ['Pzt 12', 'Sal 13', 'Çar 14', 'Per 15', 'Cum 16']
                : ['Mon 12', 'Tue 13', 'Wed 14', 'Thu 15', 'Fri 16']
              ).map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
            <div className={s.calendarRows}>
              <div className={s.hours}>
                {Array.from({ length: 9 }, (_, i) => (
                  <span key={i}>{String(i + 8).padStart(2, '0')}:00</span>
                ))}
              </div>
              <div className={s.calendarGrid}>
                {events.map(([a, b, col, row, height, color]) => (
                  <div
                    key={a}
                    className={`${s.event} ${s[color]}`}
                    style={{
                      gridColumn: col,
                      gridRow: `${row} / span ${height}`,
                    }}
                  >
                    <strong>{tr ? a : b}</strong>
                    <span>
                      {String(row + 8).padStart(2, '0')}:00 –{' '}
                      {String(row + 9).padStart(2, '0')}:30
                    </span>
                    <span>A-101</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <aside className={s.constraints}>
            <h4>{tr ? 'Ders detayı' : 'Course details'}</h4>
            <Glyph>◈</Glyph>
            <strong>{tr ? 'Web Geliştirme' : 'Web Development'}</strong>
            <span>BLM301 · 3 {tr ? 'kredi' : 'credits'}</span>
            <div className={s.tabs}>
              <strong>{tr ? 'Kısıtlar' : 'Constraints'}</strong>
            </div>
            {(tr
              ? [
                  'Derslik kapasitesi',
                  'Öğretim elemanı',
                  'Zaman çakışması',
                  'Bina uygunluğu',
                ]
              : ['Room capacity', 'Instructor', 'Time conflict', 'Building']
            ).map((x) => (
              <div className={s.constraint} key={x}>
                <b aria-hidden="true">✓</b>
                <div>
                  <strong>{x}</strong>
                  <span>{tr ? 'Uygun' : 'Satisfied'}</span>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </div>
  )
}

function Scatter({ purple = false, dil }: { purple?: boolean; dil: Dil }) {
  const color = purple ? '#9162fa' : '#3155ff'
  return (
    <div className={s.scatter}>
      <strong>
        {purple ? 'Attention LSTM' : 'Bi-LSTM'} &nbsp; R² ={' '}
        {purple ? '0.02' : '0.10'}
      </strong>
      <svg
        viewBox="0 0 220 175"
        role="img"
        aria-label={
          dil === 'tr'
            ? 'Düşük açıklama gücünü gösteren örnek saçılım grafiği'
            : 'Illustrative scatter plot showing low explanatory power'
        }
      >
        <path
          d="M25 15V145H205M25 45H205M25 80H205M25 112H205M70 15V145M115 15V145M160 15V145M205 15V145"
          fill="none"
          stroke="#e0e7fa"
        />
        <path
          d="M25 145L205 15"
          stroke={color}
          strokeDasharray="4 4"
          fill="none"
          opacity=".7"
        />
        {Array.from({ length: 150 }, (_, i) => {
          const x = 38 + ((i * 41) % 87) + Math.sin(i * 2.3) * 12
          const y = 116 + Math.sin(i * 4.13) * 17 + Math.cos(i * 1.8) * 11
          return (
            <circle key={i} cx={x} cy={y} r="1.5" fill={color} opacity=".65" />
          )
        })}
        <text x="115" y="168" textAnchor="middle">
          {dil === 'tr' ? 'Gerçek büyüklük' : 'Actual magnitude'}
        </text>
        <text x="13" y="85" transform="rotate(-90 13 85)" textAnchor="middle">
          {dil === 'tr' ? 'Tahmin edilen' : 'Predicted magnitude'}
        </text>
      </svg>
    </div>
  )
}
function Seismic({ dil }: { dil: Dil }) {
  const wave = Array.from(
    { length: 180 },
    (_, i) =>
      `${i * 4},${65 + Math.sin(i * 2.6) * Math.exp(-Math.pow((i - 93) / 29, 2)) * 59}`,
  ).join(' ')
  return (
    <div className={s.research}>
      <div className={s.wave}>
        <span>
          Bi-LSTM <b>R² = 0.10</b>
        </span>
        <span>
          Attention LSTM <b>R² = 0.02</b>
        </span>
        <svg viewBox="0 0 720 130" aria-hidden="true">
          <polyline
            pathLength={1}
            points={wave}
            fill="none"
            stroke="#3155ff"
            strokeWidth="1.6"
          />
        </svg>
      </div>
      <div className={`${s.screen} ${s.notebook}`}>
        <div className={s.windowBar}>
          <span aria-hidden="true">● ● ●</span> model_comparison.ipynb
        </div>
        <div className={s.scatterGrid}>
          <Scatter dil={dil} />
          <Scatter purple dil={dil} />
        </div>
      </div>
    </div>
  )
}

function Finance({ dil }: { dil: Dil }) {
  const tr = dil === 'tr'
  return (
    <div className={`${s.screen} ${s.finance}`}>
      <div className={s.topline}>
        <strong className={s.brand}>
          <Glyph>▥</Glyph>FinTrack
        </strong>
        <span className={s.student}>{tr ? 'Nisan' : 'April'} 2026</span>
      </div>
      <div className={s.financeGrid}>
        <div>
          <section className={s.panel}>
            <h4>{tr ? 'Toplam bakiye' : 'Total balance'}</h4>
            <p className={s.balance}>
              <AnimatedNumber value={12480} prefix="₺" dil={dil} />
            </p>
            <div className={s.moneyCards}>
              <div>
                <Glyph>↑</Glyph>
                <span>{tr ? 'Gelir' : 'Income'}</span>
                <strong>
                  <AnimatedNumber value={28500} prefix="₺" dil={dil} />
                </strong>
              </div>
              <div>
                <Glyph>↓</Glyph>
                <span>{tr ? 'Gider' : 'Expenses'}</span>
                <strong>
                  <AnimatedNumber value={16020} prefix="₺" dil={dil} />
                </strong>
              </div>
            </div>
          </section>
          <section className={s.panel}>
            <h4>{tr ? 'Tasarruf hedefi' : 'Savings goal'}</h4>
            <p>{tr ? 'Yeni bilgisayar' : 'New computer'}</p>
            <div className={s.progressTrack}>
              <i style={{ width: '53%' }} />
            </div>
            <div className={s.goal}>
              <span>₺8.000 / ₺15.000</span>
              <b>
                <AnimatedNumber value={53} suffix="%" dil={dil} />
              </b>
            </div>
          </section>
        </div>
        <div>
          <section className={s.panel}>
            <h4>{tr ? 'Kategori dağılımı' : 'Category breakdown'}</h4>
            <div className={s.donutRow}>
              <div
                className={s.donut}
                role="img"
                aria-label={
                  tr
                    ? 'Örnek gider dağılımı: konut %32, gıda %22, ulaşım %14, eğlence %11, sağlık %9, diğer %12'
                    : 'Example expenses: housing 32%, food 22%, transport 14%, entertainment 11%, health 9%, other 12%'
                }
              >
                <div>
                  <strong>
                    <AnimatedNumber value={32} suffix="%" dil={dil} />
                  </strong>
                  <span>{tr ? 'Konut' : 'Housing'}</span>
                </div>
              </div>
              <div className={s.legend}>
                {(tr
                  ? ['Konut', 'Gıda', 'Ulaşım', 'Eğlence', 'Sağlık', 'Diğer']
                  : [
                      'Housing',
                      'Food',
                      'Transport',
                      'Leisure',
                      'Health',
                      'Other',
                    ]
                ).map((x, i) => (
                  <span key={x}>
                    <i
                      style={{
                        background: [
                          '#3155ff',
                          '#3bbfaa',
                          '#ffb449',
                          '#ff8d78',
                          '#a485f4',
                          '#bec7ee',
                        ][i],
                      }}
                    />
                    {x}
                    <b>{[32, 22, 14, 11, 9, 12][i]}%</b>
                  </span>
                ))}
              </div>
            </div>
          </section>
          <section className={s.panel}>
            <h4>{tr ? 'Son işlemler' : 'Recent transactions'}</h4>
            {(tr
              ? ['Maaş', 'Market alışverişi', 'Elektrik faturası', 'Kafe']
              : ['Salary', 'Groceries', 'Electricity', 'Coffee']
            ).map((x, i) => (
              <div className={s.transaction} key={x}>
                <span>{x}</span>
                <strong className={i === 0 ? s.income : s.expense}>
                  {['+28.500', '−1.250', '−780', '−320'][i]}
                </strong>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  )
}

const books = [
  ['Sakin Zihin', 'Quiet Mind', 'Deniz Karaca'],
  ['Veriyle Düşünmek', 'Thinking with Data', 'Mert Yılmaz'],
  ['Kayıp Işıklar', 'Lost Lights', 'Elif Demir'],
  ['Minimal Yaşam', 'Minimal Living', 'Can Tamer'],
  ['Derin Çalışma', 'Deep Focus', 'Selin Aydın'],
  ['Yarının Dünyası', 'Tomorrow’s World', 'Selin Arslan'],
]
function Library({ dil }: { dil: Dil }) {
  const tr = dil === 'tr'
  return (
    <div className={s.screen}>
      <Sidebar
        name={tr ? 'Kütüphane' : 'Library'}
        items={
          tr
            ? ['Ana sayfa', 'Kitaplar', 'Ödünç kayıtlarım', 'Profil']
            : ['Overview', 'Books', 'My loans', 'Profile']
        }
      />
      <div className={s.dashboard}>
        <div className={s.topline}>
          <h3>{tr ? 'Kitaplar' : 'Books'}</h3>
          <span className={s.student}>◉ &nbsp; Emin Akif</span>
        </div>
        <p className={s.hint}>
          {tr
            ? 'Katalogdaki kitapları keşfedin.'
            : 'Discover books in the catalog.'}
        </p>
        <div className={s.searchHint}>
          ⌕ &nbsp;{' '}
          {tr
            ? 'Kitap adı, yazar veya konu ara…'
            : 'Search title, author or subject…'}
        </div>
        <div className={s.tags}>
          {(tr
            ? ['Tümü', 'Roman', 'Bilim', 'Tarih', 'Teknoloji']
            : ['All', 'Fiction', 'Science', 'History', 'Technology']
          ).map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
        <div className={s.bookGrid}>
          {books.map(([a, b, author], i) => (
            <article className={s.book} key={a}>
              <div
                className={`${s.bookCover} ${s[`cover${i}`]}`}
                aria-hidden="true"
              >
                <span />
                {i === 2 ? '◯' : i === 4 ? '△' : '▰'}
              </div>
              <strong>{tr ? a : b}</strong>
              <span>{author}</span>
              <small className={i % 3 === 2 ? s.expense : s.income}>
                ● &nbsp;
                {tr
                  ? i % 3 === 2
                    ? 'Ödünçte'
                    : 'Müsait'
                  : i % 3 === 2
                    ? 'On loan'
                    : 'Available'}
              </small>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

function Vault({ dil }: { dil: Dil }) {
  const tr = dil === 'tr'
  return (
    <div className={s.phones}>
      <div className={`${s.phone} ${s.unlock}`}>
        <div className={s.phoneStatus}>
          9:41 <span aria-hidden="true">▰ ▰</span>
        </div>
        <div className={s.unlockCenter}>
          <div className={s.lockIcon} aria-hidden="true">
            <LockMark />
          </div>
          <h3>{tr ? 'Kasanızı açın' : 'Unlock your vault'}</h3>
          <p>
            {tr
              ? 'Devam etmek için ana parolanızı girin.'
              : 'Enter your master password to continue.'}
          </p>
          <div className={s.password}>
            <span>{tr ? 'Ana parola' : 'Master password'}</span>
            <PasswordDots />
          </div>
          <span className={s.unlockArrow} aria-hidden="true">
            →
          </span>
        </div>
        <div className={s.phoneWaves} />
      </div>
      <div className={`${s.phone} ${s.vault}`}>
        <div className={s.phoneStatus}>
          9:41 <span aria-hidden="true">▰ ▰</span>
        </div>
        <h3>{tr ? 'Kasa' : 'Vault'}</h3>
        <p>{tr ? 'Hesaplarınız güvende.' : 'Your accounts, safely stored.'}</p>
        <div className={s.searchHint}>
          ⌕ &nbsp;{tr ? 'Hesap ara…' : 'Search accounts…'}
        </div>
        <div className={s.tags}>
          <span>{tr ? 'Tümü' : 'All'}</span>
          <span>{tr ? 'Kişisel' : 'Personal'}</span>
          <span>{tr ? 'İş' : 'Work'}</span>
        </div>
        {[
          'Google',
          'GitHub',
          'LinkedIn',
          tr ? 'E-posta' : 'Email',
          tr ? 'Banka' : 'Bank',
        ].map((x, i) => (
          <div className={s.vaultAccount} key={x}>
            <Glyph>{['G', '◉', 'in', '✉', '⌂'][i]}</Glyph>
            <div>
              <strong>{x}</strong>
              <span>••••••••</span>
            </div>
            <span aria-hidden="true">›</span>
          </div>
        ))}
        <div className={s.vaultBottom}>
          <span>
            ♙<br />
            {tr ? 'Kasa' : 'Vault'}
          </span>
          <span>
            ▦<br />
            {tr ? 'Kategoriler' : 'Categories'}
          </span>
          <span>
            ⚙<br />
            {tr ? 'Ayarlar' : 'Settings'}
          </span>
        </div>
      </div>
      <div className={s.floatingLock} aria-hidden="true">
        <span />
        <LockMark />
      </div>
    </div>
  )
}

export default function ProjectVisual({ slug, dil, compact = false }: Props) {
  const content =
    slug === 'karnova' ? (
      compact ? (
        <KarnovaJourney dil={dil} />
      ) : (
        <Karnova dil={dil} />
      )
    ) : slug === 'smartscheduler' ? (
      <Scheduler dil={dil} compact={compact} />
    ) : slug === 'sismik-analiz' ? (
      <Seismic dil={dil} />
    ) : slug === 'fintrack' ? (
      <Finance dil={dil} />
    ) : slug === 'web-kutuphane' ? (
      <Library dil={dil} />
    ) : (
      <Vault dil={dil} />
    )
  return (
    <figure
      className={`${s.visual} ${s[slug.replaceAll('-', '')]} ${compact ? s.compact : ''}`}
    >
      <MotionScope className={s.scene}>{content}</MotionScope>
      <figcaption>
        {dil === 'tr'
          ? 'Temsili arayüz · Örnek veriler'
          : 'Illustrative interface · Sample data'}
      </figcaption>
    </figure>
  )
}
