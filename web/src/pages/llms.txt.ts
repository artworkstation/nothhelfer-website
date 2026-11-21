/** llms.txt – kompakte Übersicht für KI-Suchsysteme (GEO) */
import type { APIRoute } from 'astro'
import { getEinstellungen, getGemeinden, getObjekte, getPages, getRatgeber, pfadUrl } from '../lib/cms'

export const GET: APIRoute = async ({ site }) => {
  const [e, pages, objekte, ratgeber, gemeinden] = await Promise.all([getEinstellungen(), getPages(), getObjekte(), getRatgeber(), getGemeinden()])
  const u = (p: string) => new URL(p, site).href
  const lines = [
    `# ${e.firma}`,
    '',
    `> Immobilienmakler und Diplom-Sachverständiger (DIA) in Ulm, Neu-Ulm und der Region (40 km). Inhaber ${e.inhaber}, ${e.strasse}, ${e.plz} ${e.ort}. Telefon ${e.telefon}, ${e.email}. Mitglied im IVD, zertifiziert nach DIN EN 15733.`,
    '',
    '## Seiten',
    ...pages.filter((p: any) => !p.seo?.noindex).map((p: any) => `- [${p.titel}](${u(pfadUrl(p.pfad))})${p.seo?.metaBeschreibung ? ': ' + p.seo.metaBeschreibung : ''}`),
    '',
    '## Aktuelle Immobilien',
    ...objekte.map((o: any) => `- [${o.titel}, ${o.plz} ${o.ort} (${o.vermarktung})](${u(`/immobilien/${o.slug}/`)}): ${o.kurztext}`),
    '',
    '## Ratgeber',
    ...ratgeber.map((r: any) => `- [${r.titel}](${u(`/ratgeber/${r.slug}/`)})${r.lead ? ': ' + r.lead : ''}`),
    '',
    '## Region',
    ...gemeinden.map((g: any) => `- [Immobilienmakler ${g.name}](${u(`/immobilienmakler-${g.slug}/`)})`),
    '',
  ]
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
