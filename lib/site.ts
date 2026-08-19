/**
 * Sitenin kanonik adresi. Tek kaynak: metadataBase, JSON-LD, robots.txt ve
 * sitemap.xml hepsi buradan okur. Alan adı değişirse yalnızca burası
 * güncellenir, arama motorlarına verilen bütün mutlak adresler düzelir.
 *
 * Apex (www'suz) kanoniktir; www.erzurumlu.dev buraya 308 ile yönlenir.
 */
export const SITE_URL = 'https://erzurumlu.dev'
