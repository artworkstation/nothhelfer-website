import type { CollectionConfig } from 'payload'
import { APIError } from 'payload'
import { adminOnly, anyone, loggedIn } from '../access'

/**
 * Formular-Eingänge der Website (Kontakt, Objekt-Anfrage, Gutachten, Suchauftrag, Wertermittlung).
 * Jede Anfrage wird gespeichert und per E-Mail an den Empfänger aus den Einstellungen geschickt.
 */
export const Anfragen: CollectionConfig = {
  slug: 'anfragen',
  labels: { singular: 'Anfrage', plural: 'Anfragen' },
  admin: { group: 'Eingang', useAsTitle: 'name', defaultColumns: ['createdAt', 'typ', 'name', 'email', 'erledigt'] },
  access: { create: anyone, read: loggedIn, update: loggedIn, delete: adminOnly },
  defaultSort: '-createdAt',
  hooks: {
    beforeChange: [
      ({ data, operation, req }) => {
        // Spamschutz: verstecktes Feld darf nicht ausgefüllt sein
        if (operation === 'create' && !req.user && data?.website) throw new APIError('Spam', 400)
        if (data) delete data.website
        return data
      },
    ],
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return doc
        try {
          const s = (await req.payload.findGlobal({ slug: 'einstellungen' })) as { anfrageEmpfaenger?: string }
          const to = s?.anfrageEmpfaenger
          if (!to) return doc
          const zeilen = Object.entries((doc.daten as Record<string, unknown>) || {})
            .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : String(v)}`)
            .join('\n')
          await req.payload.sendEmail({
            to,
            replyTo: doc.email,
            subject: `Neue Anfrage (${doc.typ}) von ${doc.name}`,
            text: [
              `Art: ${doc.typ}`,
              `Name: ${doc.name}`,
              `E-Mail: ${doc.email}`,
              `Telefon: ${doc.telefon || '–'}`,
              doc.objekt ? `Objekt: ${doc.objekt}` : '',
              '',
              doc.nachricht || '',
              '',
              zeilen,
            ].filter((l) => l !== undefined).join('\n'),
          })
        } catch (e) {
          req.payload.logger.error({ err: e }, 'Anfrage-Mail konnte nicht gesendet werden')
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'typ', label: 'Art', type: 'select', required: true, defaultValue: 'kontakt',
      options: [
        { label: 'Kontakt', value: 'kontakt' },
        { label: 'Objekt-Anfrage', value: 'objekt' },
        { label: 'Gutachten', value: 'gutachten' },
        { label: 'Suchauftrag', value: 'suchauftrag' },
        { label: 'Wertermittlung', value: 'wertermittlung' },
      ],
    },
    { name: 'name', label: 'Name', type: 'text', required: true, maxLength: 200 },
    { name: 'email', label: 'E-Mail', type: 'email', required: true },
    { name: 'telefon', label: 'Telefon', type: 'text', maxLength: 60 },
    { name: 'objekt', label: 'Objekt', type: 'text', maxLength: 300 },
    { name: 'nachricht', label: 'Nachricht', type: 'textarea', maxLength: 5000 },
    { name: 'daten', label: 'Weitere Angaben', type: 'json' },
    { name: 'datenschutz', label: 'Datenschutz zugestimmt', type: 'checkbox', required: true },
    { name: 'website', type: 'text', admin: { hidden: true } },
    { name: 'erledigt', label: 'Erledigt', type: 'checkbox', admin: { position: 'sidebar' } },
    { name: 'notiz', label: 'Interne Notiz', type: 'textarea', admin: { position: 'sidebar' } },
  ],
}
