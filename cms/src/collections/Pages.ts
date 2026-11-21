import type { CollectionConfig } from 'payload'
import { loggedIn, publishedOrLoggedIn } from '../access'
import { allBlocks } from '../blocks'
import { seo } from '../fields'
import { afterChangeRebuild, afterDeleteRebuild } from '../hooks/rebuild'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Seite', plural: 'Seiten' },
  admin: {
    group: 'Inhalte',
    useAsTitle: 'titel',
    defaultColumns: ['titel', 'pfad', '_status', 'updatedAt'],
    description: 'Seiten werden aus Bausteinen zusammengesetzt. Reihenfolge per Drag & Drop.',
  },
  versions: { drafts: true, maxPerDoc: 30 },
  access: { read: publishedOrLoggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: { afterChange: [afterChangeRebuild('Seite')], afterDelete: [afterDeleteRebuild('Seite')] },
  fields: [
    { name: 'titel', label: 'Seitentitel', type: 'text', required: true },
    {
      name: 'pfad',
      label: 'Adresse (Pfad)',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'z. B. „gutachten/kurzbewertung“ – ohne Schrägstrich am Anfang. Startseite: „startseite“.',
      },
      hooks: {
        beforeValidate: [({ value }) => (typeof value === 'string' ? value.trim().replace(/^\/+|\/+$/g, '').toLowerCase() : value)],
      },
    },
    seo(),
    { name: 'layout', label: 'Bausteine', type: 'blocks', blocks: allBlocks },
  ],
}
