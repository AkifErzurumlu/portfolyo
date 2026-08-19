"""OG (link önizleme) görsellerini üretir.

Neden build sırasında değil de elle: `next/og` her derlemede yeniden üretirdi
ama derlemeye font dosyası ve satori bağımlılığı eklerdi. Kart yılda birkaç kez
değişeceği için üretimi derlemeden ayırdık — çıktı `public/` içine yazılır ve
depoya işlenir. İçerik değişince bu betiği tekrar çalıştır:

    python scripts/og/uret.py

Yazı tipleri OFL lisanslı; scripts/og/fonts/ içinde depoyla birlikte geliyor.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

KOK = Path(__file__).resolve().parents[2]
FONT_DIZINI = Path(__file__).resolve().parent / "fonts"
CIKTI = KOK / "public"

GENISLIK, YUKSEKLIK = 1200, 630
KENAR = 84

KAGIT = "#F4F1EA"
MUREKKEP = "#16150F"
MUREKKEP_2 = "#4A473E"
MUREKKEP_3 = "#6E6A5E"
CIZGI = "#D6D0C1"
VURGU = "#9A3324"


def font(ad: str, boyut: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_DIZINI / f"{ad}.ttf"), boyut)


def aralikli_yaz(cizim, konum, metin, yazitipi, renk, aralik):
    """PIL'de letter-spacing yok; harfleri tek tek koyarak elde ediyoruz."""
    x, y = konum
    for harf in metin:
        cizim.text((x, y), harf, font=yazitipi, fill=renk)
        x += cizim.textlength(harf, font=yazitipi) + aralik
    return x


def kart(dil: str) -> Path:
    tr = dil == "tr"

    gorsel = Image.new("RGB", (GENISLIK, YUKSEKLIK), KAGIT)
    cizim = ImageDraw.Draw(gorsel)

    ad_font = font("newsreader-300", 96)
    unvan_font = font("plexsans-400", 33)
    mono_font = font("plexmono-400", 20)

    # Üst hairline ve künye satırı
    cizim.line([(KENAR, 88), (GENISLIK - KENAR, 88)], fill=CIZGI, width=1)
    aralikli_yaz(
        cizim,
        (KENAR, 54),
        "PORTFOLYO" if tr else "PORTFOLIO",
        mono_font,
        MUREKKEP_3,
        2.6,
    )

    # Ad
    cizim.text((KENAR, 150), "Emin Akif", font=ad_font, fill=MUREKKEP)
    cizim.text((KENAR, 258), "Erzurumlu", font=ad_font, fill=MUREKKEP)

    # Ünvan
    unvan = "Full-Stack Yazılım Geliştirici" if tr else "Full-Stack Software Developer"
    cizim.text((KENAR, 386), unvan, font=unvan_font, fill=MUREKKEP_2)

    # Alt hairline
    cizim.line([(KENAR, 462), (GENISLIK - KENAR, 462)], fill=CIZGI, width=1)

    # Projeler — özel isimler olduğu için harf düzeni bozulmuyor
    aralikli_yaz(
        cizim,
        (KENAR, 494),
        "Karnova · SmartScheduler · Sismik Analiz · FinTrack",
        mono_font,
        MUREKKEP_2,
        1.1,
    )

    # Durum satırı, vurgu rengiyle
    durum = (
        "Staj ve yeni mezun pozisyonlarına açığım"
        if tr
        else "Open to internships and new-graduate roles"
    )
    aralikli_yaz(cizim, (KENAR, 540), durum, mono_font, VURGU, 1.1)

    # Sağ alt köşede kısa vurgu çizgisi — sitenin hairline motifinin izi
    cizim.rectangle(
        [GENISLIK - KENAR - 96, 546, GENISLIK - KENAR, 549], fill=VURGU
    )

    CIKTI.mkdir(parents=True, exist_ok=True)
    yol = CIKTI / ("og.png" if tr else "og-en.png")
    gorsel.save(yol, "PNG", optimize=True)
    return yol


if __name__ == "__main__":
    for dil in ("tr", "en"):
        yol = kart(dil)
        print(f"{yol.relative_to(KOK)}  ({yol.stat().st_size // 1024} KB)")
