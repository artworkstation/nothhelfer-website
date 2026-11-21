import type { Field } from 'payload'

/** Link-Feld: interner Pfad wie /gutachten/ oder externe URL */
export const link = (name = 'link', label = 'Link'): Field => ({
  name,
  label,
  type: 'text',
  admin: { description: 'Interner Pfad, z. B. /gutachten/ – oder vollständige URL' },
})

export const label = (defaultValue?: string): Field => ({
  name: 'label',
  label: 'Kleine Überschrift (Label)',
  type: 'text',
  defaultValue,
})

/** Zweizeilige Headline: Zeile 1 grau, Zeile 2 blau */
export const headline = (): Field[] => [
  { name: 'zeile1', label: 'Headline Zeile 1', type: 'text' },
  { name: 'zeile2', label: 'Headline Zeile 2 (blau)', type: 'text' },
]

export const image = (name = 'bild', lbl = 'Bild', required = false): Field => ({
  name,
  label: lbl,
  type: 'upload',
  relationTo: 'media',
  required,
})

export const slugField = (from = 'titel'): Field => ({
  name: 'slug',
  label: 'URL-Name (slug)',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: 'Wird aus dem Titel erzeugt, kann angepasst werden. Nur Kleinbuchstaben, Zahlen und Bindestriche.',
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        const src = (value as string) || ((data as Record<string, unknown>)?.[from] as string) || ''
        return src
          .toLowerCase()
          .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
      },
    ],
  },
})

export const seo = (): Field => ({
  name: 'seo',
  label: 'SEO / GEO',
  type: 'group',
  admin: { position: 'sidebar' },
  fields: [
    { name: 'metaTitel', label: 'Meta-Titel', type: 'text', admin: { description: 'max. ca. 60 Zeichen' } },
    { name: 'metaBeschreibung', label: 'Meta-Beschreibung', type: 'textarea', admin: { description: 'max. ca. 155 Zeichen' } },
    { name: 'ogBild', label: 'Social-Media-Bild', type: 'upload', relationTo: 'media' },
    { name: 'noindex', label: 'Nicht in Google anzeigen (noindex)', type: 'checkbox' },
  ],
})

export const faqArray = (name = 'fragen'): Field => ({
  name,
  label: 'Häufige Fragen',
  type: 'array',
  labels: { singular: 'Frage', plural: 'Fragen' },
  fields: [
    { name: 'frage', label: 'Frage', type: 'text', required: true },
    { name: 'antwort', label: 'Antwort', type: 'textarea', required: true },
  ],
})
