import type { CollectionConfig } from 'payload'
import { loggedIn, publishedOrLoggedIn } from '../access'
import { seo, slugField } from '../fields'
import { afterChangeRebuild, afterDeleteRebuild } from '../hooks/rebuild'

/**
 * Immobilienangebote. Später werden diese Datensätze automatisch aus der
 * Makler-Software (OpenImmo/API) befüllt – Feld „externeId“ verbindet beide.
 */
export const Objekte: CollectionConfig = {
  slug: 'objekte',
  labels: { singular: 'Immobilie', plural: 'Immobilien' },
  admin: {
    group: 'Immobilien',
    useAsTitle: 'titel',
    defaultColumns: ['titel', 'vermarktung', 'ort', 'objektstatus', '_status'],
  },
  versions: { drafts: true, maxPerDoc: 20 },
  access: { read: publishedOrLoggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  hooks: { afterChange: [afterChangeRebuild('Immobilie')], afterDelete: [afterDeleteRebuild('Immobilie')] },
  fields: [
    { name: 'titel', label: 'Titel (Exposé-Überschrift)', type: 'text', required: true },
    { name: 'teaser', label: 'Kurztitel in Listen', type: 'text', required: true },
    slugField('teaser'),
    {
      type: 'row',
      fields: [
        { name: 'vermarktung', label: 'Vermarktung', type: 'select', required: true, defaultValue: 'Kauf', options: ['Kauf', 'Miete'] },
        { name: 'objektart', label: 'Objektart', type: 'select', required: true, defaultValue: 'Haus', options: ['Haus', 'Wohnung', 'Grundstück', 'Gewerbe', 'Kapitalanlage'] },
        {
          name: 'objektstatus', label: 'Status', type: 'select', defaultValue: 'aktiv',
          options: [{ label: 'Aktiv', value: 'aktiv' }, { label: 'Reserviert', value: 'reserviert' }, { label: 'Verkauft / vermietet', value: 'verkauft' }],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'plz', label: 'PLZ', type: 'text', required: true },
        { name: 'ort', label: 'Ort', type: 'text', required: true },
      ],
    },
    { name: 'preis', label: 'Preis (Text, z. B. „450.000 €“ oder „Preis auf Anfrage“)', type: 'text' },
    { name: 'kurztext', label: 'Kurzbeschreibung (Listen)', type: 'textarea', required: true },
    { name: 'beschreibung', label: 'Beschreibung (Exposé)', type: 'richText' },
    { name: 'bilder', label: 'Bilder', type: 'upload', relationTo: 'media', hasMany: true, required: true },
    {
      name: 'daten',
      label: 'Eckdaten',
      type: 'group',
      fields: [
        { type: 'row', fields: [
          { name: 'zimmer', label: 'Zimmer', type: 'text' },
          { name: 'baeder', label: 'Badezimmer', type: 'text' },
          { name: 'baujahr', label: 'Baujahr', type: 'text' },
        ] },
        { type: 'row', fields: [
          { name: 'wohnflaeche', label: 'Wohn-/Nutzfläche (m²)', type: 'number' },
          { name: 'grundstueck', label: 'Grundstück (m²)', type: 'number' },
        ] },
        { name: 'heizung', label: 'Heizung', type: 'text' },
        { name: 'verfuegbar', label: 'Verfügbar ab', type: 'text' },
        { name: 'weitere', label: 'Weitere Merkmale', type: 'array', fields: [
          { name: 'bezeichnung', label: 'Bezeichnung', type: 'text', required: true },
          { name: 'wert', label: 'Wert', type: 'text', required: true },
        ] },
      ],
    },
    {
      name: 'energie',
      label: 'Energieausweis',
      type: 'group',
      fields: [
        { type: 'row', fields: [
          { name: 'art', label: 'Art', type: 'select', options: ['Bedarfsausweis', 'Verbrauchsausweis', 'liegt nicht vor'] },
          { name: 'klasse', label: 'Effizienzklasse', type: 'select', options: ['A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] },
          { name: 'kennwert', label: 'Kennwert (kWh/(m²·a))', type: 'number' },
        ] },
      ],
    },
    {
      name: 'lage',
      label: 'Lage für die Karte',
      type: 'group',
      admin: { description: 'Koordinaten der Immobilie. Auf der Website wird nur ein Umkreis von ca. 1 km gezeigt, leicht versetzt.' },
      fields: [
        { type: 'row', fields: [
          { name: 'lat', label: 'Breitengrad', type: 'number' },
          { name: 'lng', label: 'Längengrad', type: 'number' },
        ] },
      ],
    },
    { name: 'eingestellt', label: 'Eingestellt am', type: 'date', defaultValue: () => new Date().toISOString(), admin: { position: 'sidebar', date: { displayFormat: 'dd.MM.yyyy' } } },
    { name: 'externeId', label: 'ID in der Makler-Software', type: 'text', index: true, admin: { position: 'sidebar' } },
    seo(),
  ],
}
