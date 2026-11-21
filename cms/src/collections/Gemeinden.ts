import type { CollectionConfig } from 'payload'
import { loggedIn, publishedOrLoggedIn } from '../access'
import { faqArray, seo, slugField } from '../fields'
import { afterChangeRebuild, afterDeleteRebuild } from '../hooks/rebuild'

/** Gemeinde-Landingpages: /immobilienmakler-<slug>/ */
export const Gemeinden: CollectionConfig = {
  slug: 'gemeinden',
  labels: { singular: 'Gemeinde', plural: 'Gemeinden' },
  admin: { group: 'Region', useAsTitle: 'name', defaultColumns: ['name', 'landkreis', '_status'], description: 'Jede Gemeinde erhält automatisch die Seite /immobilienmakler-<name>/.' },
  versions: { drafts: true },
  access: { read: publishedOrLoggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: { afterChange: [afterChangeRebuild('Gemeinde')], afterDelete: [afterDeleteRebuild('Gemeinde')] },
  fields: [
    { name: 'name', label: 'Name', type: 'text', required: true },
    slugField('name'),
    { name: 'landkreis', label: 'Landkreis', type: 'text' },
    { name: 'einleitung', label: 'Einleitung', type: 'textarea' },
    { name: 'text', label: 'Lokaler Text', type: 'richText' },
    { type: 'row', fields: [
      { name: 'lat', label: 'Breitengrad', type: 'number', required: true },
      { name: 'lng', label: 'Längengrad', type: 'number', required: true },
    ] },
    faqArray(),
    seo(),
  ],
}
