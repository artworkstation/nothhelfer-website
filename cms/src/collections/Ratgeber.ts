import type { CollectionConfig } from 'payload'
import { loggedIn, publishedOrLoggedIn } from '../access'
import { faqArray, seo, slugField } from '../fields'
import { afterChangeRebuild, afterDeleteRebuild } from '../hooks/rebuild'

export const Ratgeber: CollectionConfig = {
  slug: 'ratgeber',
  labels: { singular: 'Ratgeber-Beitrag', plural: 'Ratgeber' },
  admin: { group: 'Inhalte', useAsTitle: 'titel', defaultColumns: ['titel', 'kategorie', 'datum', '_status'] },
  versions: { drafts: true, maxPerDoc: 20 },
  access: { read: publishedOrLoggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: { afterChange: [afterChangeRebuild('Ratgeber')], afterDelete: [afterDeleteRebuild('Ratgeber')] },
  defaultSort: '-datum',
  fields: [
    { name: 'titel', label: 'Titel', type: 'text', required: true },
    slugField('titel'),
    { name: 'kategorie', label: 'Kategorie', type: 'text', defaultValue: 'Verkauf' },
    { name: 'datum', label: 'Datum', type: 'date', defaultValue: () => new Date().toISOString(), admin: { position: 'sidebar', date: { displayFormat: 'dd.MM.yyyy' } } },
    { name: 'bild', label: 'Bild', type: 'upload', relationTo: 'media', required: true },
    { name: 'lead', label: 'Einleitung', type: 'textarea' },
    { name: 'kurzfassung', label: 'Das Wichtigste in Kürze (wichtig für KI-Suchen)', type: 'array', fields: [{ name: 'punkt', label: 'Punkt', type: 'text', required: true }] },
    { name: 'inhalt', label: 'Inhalt', type: 'richText' },
    faqArray(),
    seo(),
  ],
}
