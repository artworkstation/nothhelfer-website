import type { CollectionConfig } from 'payload'
import { anyone, loggedIn } from '../access'
import { afterChangeRebuild, afterDeleteRebuild } from '../hooks/rebuild'

export const Kundenstimmen: CollectionConfig = {
  slug: 'kundenstimmen',
  labels: { singular: 'Kundenstimme', plural: 'Kundenstimmen' },
  admin: { group: 'Inhalte', useAsTitle: 'name', defaultColumns: ['name', 'ort', 'sterne', 'reihenfolge'] },
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: { afterChange: [afterChangeRebuild('Kundenstimme')], afterDelete: [afterDeleteRebuild('Kundenstimme')] },
  defaultSort: 'reihenfolge',
  fields: [
    { name: 'zitat', label: 'Zitat', type: 'textarea', required: true },
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'ort', label: 'Ort', type: 'text' },
    { name: 'sterne', label: 'Sterne', type: 'number', min: 1, max: 5, defaultValue: 5 },
    { name: 'reihenfolge', label: 'Reihenfolge', type: 'number', defaultValue: 10 },
  ],
}
