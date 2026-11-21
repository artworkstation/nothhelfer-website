/**
 * Füllt ein leeres CMS mit den Inhalten aus dem Prototyp.
 * Aufruf:  npm run seed
 * Achtung: Nur auf einer frischen Datenbank ausführen – vorhandene Seiten mit gleichem Pfad werden übersprungen.
 */
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'
import config from '../payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const BILDER = path.join(dirname, 'bilder')

/** Einfacher Rich-Text: Absätze, **fett** wird hervorgehoben */
function rt(...absaetze: string[]) {
  const para = (t: string) => ({
    type: 'paragraph',
    version: 1,
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
    children: t.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map((part) => ({
      type: 'text',
      version: 1,
      detail: 0,
      mode: 'normal',
      style: '',
      format: part.startsWith('**') ? 1 : 0,
      text: part.replace(/\*\*/g, ''),
    })),
  })
  return { root: { type: 'root', version: 1, direction: 'ltr', format: '', indent: 0, children: absaetze.map(para) } }
}

const ALT: Record<string, string> = {
  'hero-fassade': 'Büro von Immobilien Nothhelfer in der Fischergasse, Ulmer Altstadt',
  'facade-night': 'Büro von Immobilien Nothhelfer in der Ulmer Altstadt bei Nacht',
  'erik': 'Erik Nothhelfer',
  'erik-2': 'Erik Nothhelfer im Büro',
  'chev-a': 'Beratungsgespräch bei Immobilien Nothhelfer',
  'testimonial': 'Beratungsgespräch',
  'ulm-aerial': 'Ulm mit Münster aus der Luft',
  'binders': 'Exposé-Ordner von Immobilien Nothhelfer',
  'team-1': 'Mitarbeiterin von Immobilien Nothhelfer',
}

async function run() {
  const payload = await getPayload({ config })
  const log = (m: string) => payload.logger.info(m)

  // ---------- Bilder ----------
  const media: Record<string, number> = {}
  for (const file of fs.readdirSync(BILDER).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))) {
    const key = file.replace(/\.\w+$/, '')
    const existing = await payload.find({ collection: 'media', where: { filename: { like: key } }, limit: 1 })
    if (existing.docs[0]) {
      media[key] = existing.docs[0].id as number
      continue
    }
    const doc = await payload.create({
      collection: 'media',
      data: { alt: ALT[key] || key.replace(/-/g, ' ') },
      filePath: path.join(BILDER, file),
    })
    media[key] = doc.id as number
    log(`Bild: ${file}`)
  }
  const m = (k: string) => media[k]

  // ---------- Einstellungen & Navigation ----------
  await payload.updateGlobal({
    slug: 'einstellungen',
    data: {
      firma: 'Immobilien Nothhelfer IVD',
      inhaber: 'Erik Nothhelfer',
      strasse: 'Fischergasse 21',
      plz: '89073',
      ort: 'Ulm',
      telefon: '0731 61202',
      fax: '0731 61220',
      email: 'info@immobilien-nothhelfer.de',
      termine: 'Im Büro, am Telefon oder per Video – nach Vereinbarung.',
      anfrageEmpfaenger: 'info@immobilien-nothhelfer.de',
      lat: 48.3972,
      lng: 9.9893,
      portrait: m('erik'),
    },
  })
  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      hauptmenue: [
        { text: 'Immobilien', link: '/immobilien/', unterpunkte: [
          { text: 'Aktuelle Angebote', link: '/immobilien/' },
          { text: 'Kaufen', link: '/immobilien/kaufen/' },
          { text: 'Mieten', link: '/immobilien/mieten/' },
          { text: 'Suchauftrag anlegen', link: '/immobilien/suchauftrag/' },
        ] },
        { text: 'Verkaufen', link: '/verkaufen/', unterpunkte: [
          { text: 'Erfolgreich verkaufen', link: '/verkaufen/' },
          { text: 'Online-Wertermittlung', link: '/verkaufen/online-wertermittlung/' },
          { text: 'Ratgeber', link: '/ratgeber/' },
        ] },
        { text: 'Gutachten', link: '/gutachten/', unterpunkte: [
          { text: 'Gutachten & Bewertung', link: '/gutachten/' },
          { text: 'Verkehrswertgutachten', link: '/gutachten/verkehrswertgutachten/' },
          { text: 'Kurzbewertung', link: '/gutachten/kurzbewertung/' },
        ] },
        { text: 'Region', link: '/region/ulm-neu-ulm/', unterpunkte: [
          { text: 'Ulm & Neu-Ulm', link: '/region/ulm-neu-ulm/' },
          { text: 'Alb-Donau-Kreis', link: '/region/alb-donau-kreis/' },
        ] },
        { text: 'Über uns', link: '/ueber-uns/', unterpunkte: [
          { text: 'Unternehmen & Team', link: '/ueber-uns/' },
          { text: 'Erik Nothhelfer', link: '/ueber-uns/erik-nothhelfer/' },
          { text: 'Referenzen', link: '/ueber-uns/referenzen/' },
          { text: 'Kundenstimmen', link: '/ueber-uns/kundenstimmen/' },
        ] },
        { text: 'Kontakt', link: '/kontakt/', unterpunkte: [] },
      ],
    },
  })

  // ---------- Kundenstimmen (Platzhalter) ----------
  const stimmen = [
    ['Dies ist ein Beispiel für eine echte persönliche Kundenstimme und Bewertung über Nothhelfer Immobilien.', 'Name Person', 'Ulm'],
    ['Platzhalter: Vom ersten Gespräch bis zur Schlüsselübergabe fühlten wir uns bestens begleitet.', 'Name Person', 'Neu-Ulm'],
    ['Platzhalter: Das Gutachten war klar, verständlich und hat uns bei der Erbauseinandersetzung sehr geholfen.', 'Name Person', 'Senden'],
    ['Platzhalter: Realistische Preiseinschätzung, schneller Verkauf – genau so, wie besprochen.', 'Name Person', 'Dornstadt'],
    ['Platzhalter: Persönlich, kompetent und immer erreichbar. Klare Empfehlung.', 'Name Person', 'Blaustein'],
  ]
  if ((await payload.count({ collection: 'kundenstimmen' })).totalDocs === 0) {
    for (const [i, [zitat, name, ort]] of stimmen.entries()) {
      await payload.create({ collection: 'kundenstimmen', data: { zitat, name, ort, sterne: 5, reihenfolge: i + 1 } })
    }
    log('Kundenstimmen angelegt')
  }

  // ---------- Gemeinden ----------
  const gemeinden: [string, string, number, number][] = [
    ['Senden', 'Landkreis Neu-Ulm', 48.3256, 10.0447],
    ['Blaustein', 'Alb-Donau-Kreis', 48.4136, 9.9181],
    ['Dornstadt', 'Alb-Donau-Kreis', 48.4703, 9.9441],
    ['Erbach', 'Alb-Donau-Kreis', 48.3283, 9.8869],
    ['Langenau', 'Alb-Donau-Kreis', 48.4986, 10.1197],
    ['Elchingen', 'Landkreis Neu-Ulm', 48.4519, 10.0953],
  ]
  const gemIds: Record<string, number> = {}
  for (const [name, landkreis, lat, lng] of gemeinden) {
    const ex = await payload.find({ collection: 'gemeinden', where: { name: { equals: name } }, limit: 1, draft: true })
    if (ex.docs[0]) { gemIds[name] = ex.docs[0].id as number; continue }
    const d = await payload.create({
      collection: 'gemeinden',
      data: {
        name, landkreis, lat, lng, _status: 'published',
        einleitung: `Verkaufen, kaufen, vermieten oder bewerten in ${name} – mit einem Ansprechpartner, der die Region kennt.`,
        text: rt(`[Lokaler Text zu ${name}: Lagen, Nachfrage, Besonderheiten – wird je Gemeinde individuell geschrieben.]`),
        fragen: [
          { frage: `Was kostet ein Haus in ${name}?`, antwort: `Die Preise in ${name} hängen stark von Lage, Baujahr und Zustand ab. Eine erste Orientierung gibt unsere Online-Wertermittlung – eine verlässliche Einschätzung bekommst du von Erik Nothhelfer als Diplom-Sachverständigem (DIA).` },
          { frage: `Wie lange dauert der Verkauf einer Immobilie in ${name}?`, antwort: 'Mit realistischem Preis und vorgemerkten Suchkunden oft nur wenige Wochen. Wir zeigen dir im Erstgespräch den typischen Ablauf.' },
          { frage: `Bewertet Nothhelfer auch Immobilien in ${name}?`, antwort: `Ja. ${name} liegt in unserem Kerngebiet im Umkreis von 40 km um Ulm.` },
        ],
      } as never,
    })
    gemIds[name] = d.id as number
  }
  log('Gemeinden angelegt')

  // ---------- Immobilien (Beispieldaten) ----------
  type O = { titel: string; teaser: string; vermarktung: 'Kauf' | 'Miete'; objektart: string; plz: string; ort: string; preis: string; kurztext: string; bilder: string[]; z: string; b: string; wfl: number; gr?: number; bj: string; kl: string; kw: number; lat: number; lng: number }
  const objekte: O[] = [
    { titel: 'Einfamilienhaus mit traumhaftem Pool', teaser: 'Wo Wohnen zum Urlaub wird', vermarktung: 'Kauf', objektart: 'Haus', plz: '89347', ort: 'Bubesheim', preis: 'Preis auf Anfrage', kurztext: 'Einfamilienhaus mit traumhaftem Pool. Ein Zuhause, das Lebensqualität neu definiert. Modernes Wohnen mit außergewöhnlichem Komfort.', bilder: ['obj-1', 'obj-1b', 'obj-1c'], z: '5', b: '2', wfl: 168, gr: 620, bj: '2008', kl: 'C', kw: 82, lat: 48.4333, lng: 10.24 },
    { titel: 'Repräsentatives Bürogebäude mit 20 Stellplätzen', teaser: 'Ein repräsentatives Bürogebäude', vermarktung: 'Kauf', objektart: 'Gewerbe', plz: '89160', ort: 'Dornstadt', preis: 'Preis auf Anfrage', kurztext: 'Das Gewerbeobjekt mit ca. 808 m² Gesamtnutzfläche verfügt über 20 PKW-Stellplätze und verbindet hochwertige Büroflächen mit flexiblen Nutzungsmöglichkeiten.', bilder: ['obj-2'], z: '–', b: '4', wfl: 808, gr: 2150, bj: '1998', kl: 'D', kw: 118, lat: 48.47, lng: 9.944 },
    { titel: 'Gepflegte Doppelhaushälfte mit Wintergarten', teaser: 'Stadtnah wohnen in Ludwigsfeld', vermarktung: 'Kauf', objektart: 'Haus', plz: '89231', ort: 'Neu-Ulm/Ludwigsfeld', preis: 'Preis auf Anfrage', kurztext: 'Praktisch mitten in der Stadt und doch im Grünen. Kurze Wege in die nahegelegene Innenstadt und zu zahlreichen Einkaufsmöglichkeiten.', bilder: ['obj-3', 'obj-1c'], z: '4', b: '1', wfl: 106, gr: 263, bj: '1965', kl: 'D', kw: 121, lat: 48.375, lng: 10.0 },
    { titel: 'Freistehendes Einfamilienhaus mit Garten', teaser: 'Platz für die ganze Familie', vermarktung: 'Kauf', objektart: 'Haus', plz: '89134', ort: 'Blaustein', preis: 'Preis auf Anfrage', kurztext: 'Ruhige Wohnlage, großzügiger Garten und viel Licht – ein Haus für Familien, die ankommen wollen. (Beispielobjekt)', bilder: ['obj-4'], z: '6', b: '2', wfl: 182, gr: 710, bj: '1994', kl: 'E', kw: 146, lat: 48.414, lng: 9.918 },
    { titel: 'Helle 3-Zimmer-Wohnung mit Balkon', teaser: 'Hell, modern, zentral', vermarktung: 'Miete', objektart: 'Wohnung', plz: '89231', ort: 'Neu-Ulm', preis: '1.150 € Kaltmiete', kurztext: 'Moderne Wohnung mit offenem Wohn-Essbereich, Balkon und Tiefgaragenstellplatz in zentraler Lage. (Beispielobjekt)', bilder: ['obj-5', 'svc-mieten'], z: '3', b: '1', wfl: 84, bj: '2016', kl: 'B', kw: 58, lat: 48.392, lng: 10.011 },
    { titel: 'Charmante Altbauwohnung nahe Münster', teaser: 'Wohnen in der Altstadt', vermarktung: 'Miete', objektart: 'Wohnung', plz: '89073', ort: 'Ulm', preis: '980 € Kaltmiete', kurztext: 'Hohe Decken, Dielenboden und das Münster in Sichtweite – Altstadtflair mit modernem Komfort. (Beispielobjekt)', bilder: ['svc-mieten'], z: '2,5', b: '1', wfl: 72, bj: '1910', kl: 'F', kw: 172, lat: 48.398, lng: 9.99 },
  ]
  if ((await payload.count({ collection: 'objekte' })).totalDocs === 0) {
    const tage = ['2026-09-09T12:00', '2026-09-09T11:00', '2026-09-09T10:00', '2026-09-02T10:00', '2026-08-28T10:00', '2026-08-20T10:00']
    for (const [i, o] of objekte.entries()) {
      await payload.create({
        collection: 'objekte',
        data: {
          titel: o.titel, teaser: o.teaser, vermarktung: o.vermarktung, objektart: o.objektart as never, objektstatus: 'aktiv',
          plz: o.plz, ort: o.ort, preis: o.preis, kurztext: o.kurztext,
          beschreibung: rt(o.kurztext, 'Die gut geschnittenen Räume schaffen eine wohnliche Atmosphäre und bieten Platz für unterschiedliche Wohnbedürfnisse. (Beispieltext – später aus der Makler-Software.)'),
          bilder: o.bilder.map(m),
          daten: { zimmer: o.z, baeder: o.b, baujahr: o.bj, wohnflaeche: o.wfl, grundstueck: o.gr, heizung: 'Zentralheizung', verfuegbar: 'nach Vereinbarung' },
          energie: { art: 'Bedarfsausweis', klasse: o.kl as never, kennwert: o.kw },
          lage: { lat: o.lat, lng: o.lng },
          eingestellt: new Date(tage[i] + ':00Z').toISOString(),
          _status: 'published',
        } as never,
      })
    }
    log('Immobilien angelegt')
  }

  // ---------- Ratgeber ----------
  const ratgeber = [
    ['Immobilie verkaufen bei Scheidung – was jetzt wichtig ist', 'Verkauf', 'rat-1'],
    ['Geerbte Immobilie: behalten, vermieten oder verkaufen?', 'Erbe', 'rat-2'],
    ['Das Haus wird zu groß – Wege in den neuen Lebensabschnitt', 'Wohnen im Alter', 'rat-3'],
  ]
  if ((await payload.count({ collection: 'ratgeber' })).totalDocs === 0) {
    for (const [titel, kategorie, bild] of ratgeber) {
      await payload.create({
        collection: 'ratgeber',
        data: {
          titel, kategorie, bild: m(bild), _status: 'published',
          lead: 'Beispielartikel: Hier steht später ein kurzer, fachlich fundierter Einstieg ins Thema – geschrieben aus der Praxis von Immobilien Nothhelfer.',
          kurzfassung: [
            { punkt: 'Kernaussage 1 – kurz und klar formuliert (gut für KI-Suchen)' },
            { punkt: 'Kernaussage 2 mit Bezug zur Region Ulm' },
            { punkt: 'Kernaussage 3: Wann ein Gutachten sinnvoll ist' },
          ],
          inhalt: rt('Fließtext des Ratgebers. Redakteure schreiben Beiträge mit Zwischenüberschriften, Listen und Links.'),
          fragen: [{ frage: 'Beispielfrage zum Thema?', antwort: 'Kurze, direkte Antwort – wird automatisch als FAQ-Schema ausgegeben.' }],
        } as never,
      })
    }
    log('Ratgeber angelegt')
  }

  // ---------- Seiten ----------
  const pfeil = 'pfeil'
  const cardsGutachten = [
    { bild: m('gut-1'), tag: 'Ausführlich', titel: 'Verkehrswertgutachten', text: 'Für Erbe, Scheidung, Finanzamt oder Gericht – das vollständige Gutachten mit allen Grundlagen.', link: '/gutachten/verkehrswertgutachten/', buttonText: 'Mehr erfahren', icon: 'plus' },
    { bild: m('gut-2'), tag: 'Kompakt', titel: 'Kurzbewertung', text: 'Eine fundierte Einschätzung für deine Entscheidung – schnell und mit fachlichem Blick.', link: '/gutachten/kurzbewertung/', buttonText: 'Mehr erfahren', icon: 'plus' },
    { bild: m('gut-3'), tag: 'Online', neu: true, titel: 'Online-Wertermittlung', text: 'In wenigen Schritten eine erste Preisindikation für deine Immobilie – kostenlos und unverbindlich.', link: '/verkaufen/online-wertermittlung/', buttonText: 'Jetzt starten', icon: pfeil },
  ]
  const ctaBand = (titel = 'Lass uns sprechen.', text = 'Persönlich in der Fischergasse in der Ulmer Altstadt, am Telefon oder per Videoberatung.') => ({ blockType: 'ctaBand', titel, text })
  const kopf = (bild: string, kurz = false, kacheln: unknown[] = []) => ({ blockType: 'seitenkopf', bild: m(bild), kurz, kacheln })
  const intro = (label: string, zeile1: string, zeile2: string, lead: string, text = '') => ({ blockType: 'intro', label, zeile1, zeile2, lead, text })
  const liste = (label: string, zeile1: string, zeile2: string, punkte: string[], hintergrund = 'weiss', hinweis = '') => ({ blockType: 'liste', label, zeile1, zeile2, punkte: punkte.map((text) => ({ text })), hintergrund, hinweis })
  const kachelnAngebote = [
    { text: 'Aktuelle\nKaufangebote', bild: m('obj-4'), link: '/immobilien/kaufen/' },
    { text: 'Aktuelle\nMietangebote', bild: m('obj-5'), link: '/immobilien/mieten/' },
  ]
  const angebotsliste = (zeile2: string, vermarktung: string) => [
    kopf('gut-3', false, kachelnAngebote),
    { blockType: 'angebote', zeile1: 'Unsere aktuellen', zeile2, text: 'Jede Suche beginnt mit einer Vorstellung.\nVielleicht wird daraus schon bald dein neues Zuhause.', vermarktung, anzahl: 0, mitFilter: true, hintergrund: true },
    ctaBand('Nichts Passendes dabei?', 'Leg einen Suchauftrag an – wir melden uns, sobald ein passendes Objekt reinkommt, oft noch bevor es auf den Portalen erscheint.'),
  ]

  const seiten: { titel: string; pfad: string; layout: unknown[]; seo?: Record<string, string> }[] = [
    {
      titel: 'Startseite', pfad: 'startseite',
      seo: { metaTitel: 'Immobilien Nothhelfer – Immobilienmakler & Sachverständiger in Ulm', metaBeschreibung: 'Immobilienmakler und Diplom-Sachverständiger (DIA) in Ulm, Neu-Ulm und der Region. Verkaufen, kaufen, mieten, bewerten.' },
      layout: [
        { blockType: 'heroSzene', headline: 'Finde, was dich bewegt.', subline: 'Für Immobilienentscheidungen', sublineAkzent: 'mit mehr als gutem Gefühl.', bild: m('hero-fassade'), claim: 'Seit 1989 in Ulm, Neu-Ulm und der Region.',
          kacheln: [
            { text: 'Immobilie\nverkaufen', bild: m('svc-kaufen'), link: '/verkaufen/' },
            { text: 'Gutachten\nanfragen', bild: m('rat-1'), link: '/gutachten/' },
            { text: 'Aktuelle\nImmobilien', bild: m('svc-mieten'), link: '/immobilien/' },
          ] },
        { blockType: 'warum', label: 'warum NOTHHELFER', text: 'Wenn sich dein Leben verändert, brauchst du nicht einfach nur einen neuen Ort –', textAkzent: 'sondern einen verlässlichen Partner, der dich mit Erfahrung, Klarheit und Sachverstand begleitet.', bild: m('facade-night') },
        { blockType: 'pfeile', zeile1: 'Es geht nicht nur', zeile2: 'um Immobilien.', bildLinks: m('erik-2'), bildRechts: m('chev-a'), text: 'Es geht um Identität. Es geht um ein Zuhause.\nDu suchst nicht einfach nur einen Ort.', textAkzent: 'Du suchst etwas, das wirklich zu dir passt.\nGenau dabei helfen wir dir.', button: { text: 'Mehr über Nothhelfer', link: '/ueber-uns/' } },
        { blockType: 'stufen', label: 'drei Stufen-Methodik', zeile1: 'Sicher', zeile2: 'und klar', button: { text: 'Starte deine Suche', link: '/immobilien/' },
          schritte: [
            { titel: 'Sprich mit einem echten Menschen.', text: 'Dem Experten, der wirklich zuhört.' },
            { titel: 'Gewinne Klarheit.', text: 'Wir sprechen darüber, was für dich möglich sein kann und nicht nur über das, was gerade verfügbar ist.' },
            { titel: 'Wir finden, was zu dir passt', text: '– und sorgen dafür, dass es wahr wird.' },
          ] },
        { blockType: 'karten', label: 'Gutachten & Bewertung', zeile1: 'Wissen, was deine', zeile2: 'Immobilie wert ist.', text: 'Als Diplom-Sachverständiger (DIA) bewertet Erik Nothhelfer bebaute und unbebaute Grundstücke, Mieten und Pachten – fundiert, nachvollziehbar und gerichtsfest.', hintergrund: 'weiss', karten: cardsGutachten },
        { blockType: 'kundenstimmen', headline: 'Überzeug dich selbst.', label: 'Kundenstimmen', bild: m('testimonial'), anzahl: 5, hinweis: 'Echte Bewertungen später z. B. über ProvenExpert' },
        { blockType: 'service', label: 'unser Service', outro: 'Nothhelfer begleitet dich durch jede Phase deiner Immobilienentscheidung – mit fundiertem Fachwissen und verlässlicher Unterstützung.', buttonText: 'Jetzt anrufen',
          zeilen: [
            { wort: 'Kaufen', text: 'Die richtige Immobilie zu finden, ist Vertrauenssache. Wir begleiten dich persönlich und kompetent auf dem Weg zu deinem neuen Zuhause.', bild: m('svc-kaufen'), link: '/immobilien/kaufen/' },
            { wort: 'Mieten', text: 'Ein neues Zuhause muss einfach passen. Wir bringen Menschen und Immobilien zusammen – unkompliziert und mit Gespür für deine Wünsche.', bild: m('svc-mieten'), link: '/immobilien/mieten/' },
            { wort: 'Verkaufen', text: 'Eine Immobilie zu verkaufen, braucht Erfahrung und Vertrauen. Wir begleiten dich mit Expertise und dem Blick für den bestmöglichen Verkauf.', bild: m('svc-verkaufen'), link: '/verkaufen/' },
          ] },
        { blockType: 'angebote', zeile1: 'Unsere aktuellen', zeile2: 'Immobilienangebote', text: 'Jede Suche beginnt mit einer Vorstellung.\nVielleicht wird daraus schon bald dein neues Zuhause.', vermarktung: 'alle', anzahl: 3, mitFilter: false, hintergrund: true },
        { blockType: 'kompetenz', label: 'Expertise', headline: 'Kompetenz, die\nden Unterschied\nmacht', portrait: m('erik'), bild: m('ulm-aerial'),
          text: rt('Der Name Nothhelfer steht in der Region Ulm seit 1989 für eine qualitativ hochwertige Beratung und Betreuung in allen Fragen der Immobilienwirtschaft.', '**Inhaber Erik Nothhelfer ist der bundesweit erste nach Europanorm DIN EN 15733 zertifizierte Immobilienmakler.** Als Diplom-Sachverständiger (DIA) für die Bewertung von bebauten und unbebauten Grundstücken, für Mieten und Pachten steht er dir in allen Bewertungsfragen gerne zur Verfügung.'),
          button: { text: 'Erik Nothhelfer E-Mail senden', link: 'mailto:info@immobilien-nothhelfer.de' },
          fakten: [
            { zahl: '1989', zaehlen: true, text: 'in Ulm gegründet' },
            { zahl: '40', einheit: 'km', zaehlen: true, text: 'Region rund um Ulm & Neu-Ulm' },
            { zahl: 'DIN EN', zaehlen: false, text: '15733 zertifiziert · Diplom-Sachverständiger (DIA)' },
          ] },
        { blockType: 'ratgeberTeaser', headline: 'Ratgeber', anzahl: 3 },
        { blockType: 'cta', zeile1: 'Bereit für deinen', zeile2: 'nächsten Schritt?', text: 'Lass uns sprechen – persönlich in der Fischergasse in der Ulmer Altstadt, am Telefon oder per Videoberatung.', bild: m('cta'),
          buttons: [{ text: 'Suchauftrag anlegen', link: '/immobilien/suchauftrag/' }, { text: 'Immobilie bewerten', link: '/verkaufen/online-wertermittlung/' }] },
      ],
    },
    { titel: 'Immobilienangebote', pfad: 'immobilien', layout: angebotsliste('Immobilienangebote', 'alle') },
    { titel: 'Kaufangebote', pfad: 'immobilien/kaufen', layout: angebotsliste('Kaufangebote', 'Kauf') },
    { titel: 'Mietangebote', pfad: 'immobilien/mieten', layout: angebotsliste('Mietangebote', 'Miete') },
    { titel: 'Suchauftrag anlegen', pfad: 'immobilien/suchauftrag', layout: [
      kopf('obj-4', true),
      intro('Suchauftrag', 'Wir suchen', 'für dich weiter.', 'Viele Objekte vermitteln wir, bevor sie auf den Portalen erscheinen.', 'Beschreib uns dein Wunschobjekt – wir melden uns, sobald etwas Passendes reinkommt.'),
      { blockType: 'kontakt', label: 'Suchauftrag', zeile1: '', zeile2: '', formular: 'suchauftrag' },
    ] },
    { titel: 'Immobilie verkaufen', pfad: 'verkaufen', layout: [
      kopf('svc-verkaufen'),
      intro('Für Eigentümer & Verkäufer', 'Erfolgreich verkaufen', 'in 5 klaren Schritten.', 'Eine Immobilie zu verkaufen, braucht Erfahrung und Vertrauen.', 'Wir begleiten dich zuverlässig – mit Expertise und dem Blick für den bestmöglichen Verkauf.'),
      { blockType: 'prozess', label: 'Der Prozess', schritte: [
        { titel: 'Erstgespräch', text: 'Wir lernen dich und deine Immobilie kennen – persönlich, vor Ort und ohne Verpflichtung.' },
        { titel: 'Fundierte Bewertung', text: 'Als Diplom-Sachverständiger (DIA) ermittelt Erik Nothhelfer einen realistischen, marktgerechten Preis.' },
        { titel: 'Vermarktungsstrategie', text: 'Hochwertiges Exposé, professionelle Fotos, gezielte Ansprache vorgemerkter Suchkunden und ausgewählter Portale.' },
        { titel: 'Besichtigung & Verhandlung', text: 'Wir prüfen Interessenten vorab, führen Besichtigungen und verhandeln in deinem Sinne.' },
        { titel: 'Notar & Übergabe', text: 'Wir bereiten den Kaufvertrag mit dem Notar vor und begleiten dich bis zur Schlüsselübergabe.' },
      ] },
      { blockType: 'karten', label: 'Wertermittlung', zeile1: 'Was ist meine', zeile2: 'Immobilie wert?', text: 'Starte mit einer ersten Online-Einschätzung – oder lass dir direkt ein fundiertes Gutachten erstellen.', hintergrund: 'hell', karten: [cardsGutachten[2], cardsGutachten[1], cardsGutachten[0]] },
      { blockType: 'ratgeberTeaser', headline: 'Ratgeber', anzahl: 3 },
      ctaBand('Lass uns über deine Immobilie sprechen.'),
    ] },
    { titel: 'Online-Wertermittlung', pfad: 'verkaufen/online-wertermittlung', layout: [
      kopf('gut-3', true),
      intro('Online-Wertermittlung', 'Was ist deine', 'Immobilie wert?', 'In wenigen Schritten zur ersten Preisindikation – kostenlos und unverbindlich.'),
      { blockType: 'wertermittlung' },
    ] },
    { titel: 'Gutachten & Bewertung', pfad: 'gutachten', layout: [
      kopf('binders'),
      intro('Gutachten & Bewertung', 'Wissen, was deine', 'Immobilie wert ist.', 'Als Diplom-Sachverständiger (DIA) bewertet Erik Nothhelfer bebaute und unbebaute Grundstücke, Mieten und Pachten.', 'Verkehrswert, Beleihungswert und Mietwert – fundiert, nachvollziehbar und unabhängig.'),
      { blockType: 'karten', label: '', zeile1: '', zeile2: '', hintergrund: 'weiss', karten: cardsGutachten },
      liste('Bewertet werden', '', '', ['Eigentumswohnungen', 'Freistehende Ein- und Zweifamilienhäuser', 'Reihenhäuser und Doppelhaushälften', 'Mehrfamilienhäuser', 'Gemischt genutzte Grundstücke', 'Geschäftsgrundstücke', 'Gewerbe- und Industriegrundstücke', 'Erbbaurechte', 'Rechte und Belastungen an Grundstücken'], 'hell'),
      liste('Anlässe', 'Wann brauche ich', 'ein Gutachten?', ['Erbschaft und Schenkung', 'Scheidung und Vermögensauseinandersetzung', 'Kauf oder Verkauf', 'Steuerliche Zwecke (Finanzamt)', 'Gerichtliche Verfahren', 'Finanzierung und Beleihung']),
      liste('Unterlagen', 'Was wird benötigt?', '', ['Grundbuchauszug', 'Flurkarte / Lageplan', 'Baupläne und Baubeschreibung', 'Wohn- und Nutzflächenberechnung', 'Teilungserklärung (bei Wohnungen)', 'Energieausweis', 'Mietverträge (bei vermieteten Objekten)'], 'dunkel', 'Fehlende Unterlagen? Kein Problem – vieles können wir für dich bei den Ämtern anfordern.'),
      { blockType: 'kontakt', label: 'Gutachten anfragen', zeile1: 'Sprich mit', zeile2: 'dem Sachverständigen.', formular: 'gutachten' },
    ] },
    { titel: 'Verkehrswertgutachten', pfad: 'gutachten/verkehrswertgutachten', layout: [
      kopf('gut-1', true),
      intro('Ausführlich', 'Verkehrswertgutachten', '', 'Das vollständige Gutachten über den Verkehrswert nach § 194 BauGB – nachvollziehbar dokumentiert und belastbar.'),
      liste('Wann sinnvoll?', '', '', ['Erbschaft, Schenkung und Erbauseinandersetzung', 'Scheidung und Zugewinnausgleich', 'Vorlage beim Finanzamt oder Gericht', 'Kauf, Verkauf und Vermögensplanung'], 'hell'),
      liste('Leistungsumfang', '', '', ['Ortsbesichtigung und Objektaufnahme', 'Auswertung von Unterlagen und Marktdaten', 'Wertermittlung nach anerkannten Verfahren', 'Schriftliches Gutachten mit allen Grundlagen']),
      ctaBand('Fragen zum Gutachten?'),
    ] },
    { titel: 'Kurzbewertung', pfad: 'gutachten/kurzbewertung', layout: [
      kopf('gut-2', true),
      intro('Kompakt', 'Kurzbewertung', '', 'Eine fundierte, fachliche Einschätzung des Marktwerts – schneller und günstiger als das vollständige Gutachten.'),
      liste('Wann sinnvoll?', '', '', ['Vorbereitung eines Verkaufs', 'Orientierung bei Kauf oder Finanzierung', 'Interne Vermögensübersicht'], 'hell'),
      liste('Leistungsumfang', '', '', ['Besichtigung', 'Marktvergleich in der Region', 'Kompakte schriftliche Einschätzung', 'Besprechung der Ergebnisse']),
      ctaBand('Fragen zur Bewertung?'),
    ] },
    { titel: 'Immobilien Ulm & Neu-Ulm', pfad: 'region/ulm-neu-ulm', layout: [
      kopf('ulm-aerial'),
      intro('Regionale Expertise', 'Immobilien', 'Ulm & Neu-Ulm', 'Altstadt, Söflingen, Wiblingen, Ludwigsfeld oder Pfuhl – wir kennen die Lagen beidseits der Donau.', 'Seit Jahrzehnten kennen wir die Märkte zwischen Alb, Donau und Iller – Straße für Straße.'),
      { blockType: 'region', label: 'Unser Gebiet', zeile1: '40 km rund', zeile2: 'um Ulm.', text: 'Für jede Gemeinde gibt es eine eigene Seite mit lokalen Infos, aktuellen Angeboten und Referenzen.', gemeinden: [gemIds.Senden, gemIds.Elchingen], referenzen: true },
      { blockType: 'angebote', zeile1: 'Aktuelle Angebote', zeile2: 'in der Region', vermarktung: 'alle', anzahl: 2, hintergrund: false },
      ctaBand(),
    ] },
    { titel: 'Immobilien Alb-Donau-Kreis', pfad: 'region/alb-donau-kreis', layout: [
      kopf('ulm-aerial'),
      intro('Regionale Expertise', 'Immobilien', 'Alb-Donau-Kreis', 'Von Blaustein bis Langenau, von Dornstadt bis Erbach – Immobilien im Ulmer Umland.'),
      { blockType: 'region', label: 'Unser Gebiet', zeile1: '40 km rund', zeile2: 'um Ulm.', text: 'Für jede Gemeinde gibt es eine eigene Seite mit lokalen Infos, aktuellen Angeboten und Referenzen.', gemeinden: [gemIds.Blaustein, gemIds.Dornstadt, gemIds.Erbach, gemIds.Langenau], referenzen: true },
      { blockType: 'angebote', zeile1: 'Aktuelle Angebote', zeile2: 'in der Region', vermarktung: 'alle', anzahl: 2, hintergrund: false },
      ctaBand(),
    ] },
    { titel: 'Über uns', pfad: 'ueber-uns', layout: [
      kopf('facade-night'),
      intro('Unternehmen', 'Immobilien Nothhelfer', 'in der Ulmer Altstadt.', 'Seit Jahrzehnten steht der Name Nothhelfer in der Region Ulm für qualitativ hochwertige Beratung in allen Fragen der Immobilienwirtschaft.', 'Persönlich, zertifiziert und unabhängig – in der Fischergasse 21, mitten in der Ulmer Altstadt.'),
      { blockType: 'team', label: 'Team / Ansprechpersonen', mitglieder: [
        { name: 'Erik Nothhelfer', funktion: 'Inhaber · Immobilienwirt (Dipl. VWA) · Dipl.-Sachverständiger (DIA)', bild: m('erik'), link: '/ueber-uns/erik-nothhelfer/' },
        { name: '[Name Mitarbeiterin]', funktion: 'Vertrieb & Planung · [Funktion]', bild: m('team-1'), link: '/kontakt/' },
      ] },
      { blockType: 'siegel', label: 'Auszeichnungen & Mitgliedschaften', punkte: [
        { text: 'Mitglied im Immobilienverband Deutschland IVD' }, { text: 'Zertifizierter Immobilienmakler nach DIN EN 15733' }, { text: 'Haus & Grund Immobilien-Verbund' }, { text: 'Bellevue Best Property Agents' },
      ] },
      { blockType: 'karten', label: '', zeile1: '', zeile2: '', hintergrund: 'hell', karten: [
        { bild: m('erik-2'), titel: 'Erik Nothhelfer', text: 'Biografie, Qualifikationen, Lehrtätigkeit.', link: '/ueber-uns/erik-nothhelfer/', buttonText: 'Mehr erfahren', icon: 'plus' },
        { bild: m('ulm-aerial'), titel: 'Referenzen', text: 'Verkaufte Objekte im Umkreis von 40 km.', link: '/ueber-uns/referenzen/', buttonText: 'Ansehen', icon: 'plus' },
        { bild: m('testimonial'), titel: 'Kundenstimmen', text: 'Was unsere Kunden über uns sagen.', link: '/ueber-uns/kundenstimmen/', buttonText: 'Lesen', icon: 'plus' },
      ] },
      ctaBand(),
    ] },
    { titel: 'Erik Nothhelfer', pfad: 'ueber-uns/erik-nothhelfer', layout: [
      { blockType: 'ansprechpartner', name: 'Erik Nothhelfer', portrait: m('erik'), bild: m('erik-2'),
        text: rt('**Inhaber von Immobilien Nothhelfer, Immobilienwirt (Dipl. VWA) und Diplom-Sachverständiger (DIA).** Als bundesweit erster nach DIN EN 15733 zertifizierter Immobilienmakler verbindet er Maklerpraxis, Bewertung und Lehre.'),
        button: { text: 'E-Mail senden', link: 'mailto:info@immobilien-nothhelfer.de' } },
      { blockType: 'zeitstrahl', label: 'Stationen', zeile1: 'Biografie', zeile2: '', eintraege: [
        { jahr: '1991–1993', text: 'Studium an der VWA Freiburg, Abschluss Immobilienwirt (Dipl. VWA)' },
        { jahr: '1997–1999', text: 'Deutsche Immobilienakademie Freiburg, Dipl.-Sachverständiger (DIA) für bebaute und unbebaute Grundstücke, Mieten und Pachten' },
        { jahr: '1998', text: 'Mitglied im Gutachterausschuss der Stadt Ulm' },
        { jahr: '2001', text: 'Mitglied im Gutachterausschuss des Landkreises Neu-Ulm' },
        { jahr: '2007', text: 'Vorstandsvorsitzender des IVD Süd e.V.' },
        { jahr: '2009', text: 'Zertifizierter Immobilienmakler nach EN 15733' },
        { jahr: '2013', text: 'Lehrbeauftragter an der HfWU Nürtingen-Geislingen' },
        { jahr: '2019', text: 'Aufsichtsratsvorsitzender der IVD24 AG' },
      ] },
      { blockType: 'text', label: 'Lehre', zeile1: 'Dozent &', zeile2: 'Prüfer', inhalt: rt('Erik Nothhelfer gibt sein Wissen weiter – u. a. als Dozent an der Deutschen Immobilien Akademie (DIA) Freiburg, am CRES der Steinbeis-Hochschule Berlin und als Lehrbeauftragter an der HfWU Nürtingen-Geislingen.', '[Quelle: bestehende Website – vor Livegang mit dem Kunden abstimmen.]') },
      ctaBand(),
    ] },
    { titel: 'Referenzen', pfad: 'ueber-uns/referenzen', layout: [
      kopf('ulm-aerial', true),
      intro('Referenzen', 'Erfolgreich vermittelt', 'in der Region.', 'Verkaufte Objekte im Umkreis von 40 km um Ulm – als Karte statt als Liste.', '[Beispieldaten]'),
      { blockType: 'referenzen', label: 'Karte', text: 'Jeder Punkt steht für ein vermitteltes Objekt – ungefähr verortet, ohne genaue Adresse.', eintraege: [
        { titel: 'Einfamilienhaus', ort: 'Senden', jahr: '2025' }, { titel: 'Eigentumswohnung', ort: 'Ulm-Söflingen', jahr: '2026' }, { titel: 'Doppelhaushälfte', ort: 'Neu-Ulm', jahr: '2025' }, { titel: 'Mehrfamilienhaus', ort: 'Ulm', jahr: '2024' },
        { titel: 'Reihenhaus', ort: 'Blaustein', jahr: '2026' }, { titel: 'Baugrundstück', ort: 'Dornstadt', jahr: '2025' }, { titel: 'Bürogebäude', ort: 'Ulm-Donautal', jahr: '2024' }, { titel: 'Einfamilienhaus', ort: 'Elchingen', jahr: '2026' },
      ] },
      ctaBand('Deine Immobilie als nächste Referenz?'),
    ] },
    { titel: 'Kundenstimmen', pfad: 'ueber-uns/kundenstimmen', layout: [
      { blockType: 'kundenstimmen', headline: 'Überzeug dich selbst.', label: 'Kundenstimmen', bild: m('testimonial'), anzahl: 0, hinweis: 'Live z. B. über ProvenExpert oder Google eingebunden.' },
      ctaBand(),
    ] },
    { titel: 'Ratgeber', pfad: 'ratgeber', layout: [
      intro('Ratgeber', 'Wissen für deine', 'Immobilienentscheidung.', 'Erbe, Scheidung, Wohnen im Alter – verständlich erklärt vom Sachverständigen.'),
      { blockType: 'ratgeberTeaser', headline: '', anzahl: 0 },
      ctaBand(),
    ] },
    { titel: 'Kontakt', pfad: 'kontakt', layout: [
      intro('Kontakt', 'Lass uns', 'sprechen.', 'Persönlich in der Ulmer Altstadt, am Telefon oder per Videoberatung.'),
      { blockType: 'kontakt', label: 'Nachricht', zeile1: '', zeile2: '', formular: 'kontakt', mitKontaktdaten: true },
    ] },
    ...(['Impressum', 'Datenschutz', 'AGB'] as const).map((t) => ({
      titel: t, pfad: t.toLowerCase(), seo: { noindex: 'true' } as Record<string, string>,
      layout: [{ blockType: 'text', label: '', zeile1: t, zeile2: '', inhalt: rt('Platzhalter – der Inhalt wird von der bestehenden Website übernommen und rechtlich geprüft.') }],
    })),
  ]

  for (const s of seiten) {
    const ex = await payload.find({ collection: 'pages', where: { pfad: { equals: s.pfad } }, limit: 1, draft: true })
    if (ex.docs[0]) continue
    const seo = s.seo ? { ...s.seo, noindex: s.seo.noindex === 'true' } : undefined
    await payload.create({ collection: 'pages', data: { titel: s.titel, pfad: s.pfad, seo, layout: s.layout, _status: 'published' } as never })
    log(`Seite: /${s.pfad}`)
  }

  log('Fertig. Alle Inhalte aus dem Prototyp sind angelegt.')
  process.exit(0)
}

try {
  await run()
} catch (e) {
  console.error(e)
  process.exit(1)
}
