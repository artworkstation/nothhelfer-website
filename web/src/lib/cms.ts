/**
 * Datenzugriff auf Payload CMS (nur zur Build-Zeit).
 * Alle Seiten werden statisch erzeugt – der Besucher spricht nie mit dem CMS,
 * außer beim Absenden von Formularen.
 */
const CMS = (import.meta.env.CMS_URL || process.env.CMS_URL || 'http://localhost:3000').replace(/\/$/, '')

const cache = new Map<string, Promise<any>>()

async function get(path: string): Promise<any> {
  if (!cache.has(path)) {
    cache.set(
      path,
      fetch(`${CMS}/api/${path}`).then(async (r) => {
        if (!r.ok) throw new Error(`CMS ${r.status} bei /api/${path}`)
        return r.json()
      }),
    )
  }
  return cache.get(path)!
}

const all = async (coll: string, extra = '') =>
  (await get(`${coll}?limit=500&depth=2${extra}`)).docs as any[]

export const getPages = () => all('pages', '&where[_status][equals]=published')
export const getObjekte = async () =>
  (await all('objekte', '&where[_status][equals]=published&sort=-eingestellt')).filter((o) => o.objektstatus !== 'verkauft')
export const getRatgeber = () => all('ratgeber', '&where[_status][equals]=published&sort=-datum')
export const getGemeinden = () => all('gemeinden', '&sort=name')
export const getKundenstimmen = () => all('kundenstimmen', '&sort=reihenfolge')
export const getEinstellungen = () => get('globals/einstellungen?depth=1')
export const getNavigation = () => get('globals/navigation?depth=0')

/** Bild-Objekt aus Payload → src/srcset für <img> */
export type Bild = { src: string; srcset?: string; w?: number; h?: number; alt: string }
export function bild(m: any, alt?: string): Bild | null {
  if (!m || typeof m !== 'object' || !m.url) return null
  const abs = (u: string) => (u.startsWith('http') ? u : CMS + u)
  const sizes = Object.values(m.sizes || {}).filter((s: any) => s && s.url) as any[]
  const set = [...sizes.map((s) => `${abs(s.url)} ${s.width}w`), m.width ? `${abs(m.url)} ${m.width}w` : '']
    .filter(Boolean)
    .join(', ')
  return { src: abs(m.url), srcset: set || undefined, w: m.width, h: m.height, alt: alt ?? m.alt ?? '' }
}
export const bildUrl = (m: any) => bild(m)?.src || ''

/** Link-Feld normalisieren: interne Pfade immer mit Slash am Ende */
export function href(l?: string | null): string {
  if (!l) return '#'
  if (/^(https?:|mailto:|tel:|#)/.test(l)) return l
  let p = l.startsWith('/') ? l : '/' + l
  if (!p.includes('#') && !p.endsWith('/')) p += '/'
  return p
}

export const tel = (t?: string) => 'tel:+49' + String(t || '0731 61202').replace(/\D/g, '').replace(/^0/, '')

export function datum(d?: string) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export const qm = (n?: number | null) => (n ? `${n.toLocaleString('de-DE')} m²` : '–')

/** Pfad aus dem CMS ("immobilien/kaufen") → URL */
export const pfadUrl = (pfad: string) => (pfad === 'startseite' ? '/' : `/${pfad}/`)
