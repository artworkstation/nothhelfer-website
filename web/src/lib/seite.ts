import { getPages } from './cms'

const NAMEN: Record<string, string> = { region: 'Region', immobilien: 'Immobilien', verkaufen: 'Verkaufen', gutachten: 'Gutachten', 'ueber-uns': 'Über uns', ratgeber: 'Ratgeber' }

/** Brotkrumen aus dem Seitenpfad, Namen aus den Seitentiteln im CMS */
export async function crumbsFor(pfad: string, letzter?: string) {
  const pages = await getPages()
  const byPfad = new Map(pages.map((p: any) => [p.pfad, p]))
  const teile = pfad.split('/')
  return teile.map((_, i) => {
    const p = teile.slice(0, i + 1).join('/')
    const page = byPfad.get(p) as any
    const name = i === teile.length - 1 && letzter ? letzter : page?.titel || NAMEN[p] || p
    return { name, url: i === teile.length - 1 ? undefined : page ? `/${p}/` : undefined }
  })
}

export function meta(doc: any, fallbackTitel: string) {
  return {
    title: doc?.seo?.metaTitel || fallbackTitel,
    description: doc?.seo?.metaBeschreibung || undefined,
    ogImage: doc?.seo?.ogBild,
    noindex: !!doc?.seo?.noindex,
  }
}
