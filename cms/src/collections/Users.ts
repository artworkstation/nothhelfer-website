import { APIError, type CollectionConfig } from 'payload'

const adminEmail = () => (process.env.ADMIN_EMAIL || '').trim().toLowerCase()
import { adminField, adminOnly, isAdmin } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Benutzer', plural: 'Benutzer' },
  admin: { useAsTitle: 'email', group: 'Verwaltung', defaultColumns: ['name', 'email', 'rolle'] },
  auth: { tokenExpiration: 60 * 60 * 8, maxLoginAttempts: 5, lockTime: 15 * 60 * 1000 },
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: ({ req }) => (isAdmin({ req }) ? true : { id: { equals: req.user?.id } }),
    update: ({ req }) => (isAdmin({ req }) ? true : { id: { equals: req.user?.id } }),
    admin: ({ req }) => Boolean(req.user),
  },
  hooks: {
    // Ersteinrichtung: Solange es keinen Benutzer gibt, darf sich nur die Adresse
    // aus ADMIN_EMAIL registrieren – sie wird automatisch Admin.
    // Ist ADMIN_EMAIL nicht gesetzt (nur lokal), wird der erste Benutzer Admin.
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation !== 'create') return data
        const { totalDocs } = await req.payload.count({ collection: 'users', overrideAccess: true, req })
        if (totalDocs === 0 && adminEmail() && String(data.email || '').trim().toLowerCase() !== adminEmail()) {
          throw new APIError('Der erste Zugang ist für die hinterlegte Admin-Adresse reserviert.', 403, undefined, true)
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create' || doc.rolle === 'admin') return doc
        const { totalDocs } = await req.payload.count({ collection: 'users', overrideAccess: true, req })
        if (totalDocs !== 1) return doc
        if (adminEmail() && String(doc.email).toLowerCase() !== adminEmail()) return doc
        return req.payload.update({ collection: 'users', id: doc.id, data: { rolle: 'admin' }, overrideAccess: true, req })
      },
    ],
  },
  fields: [
    { name: 'name', label: 'Name', type: 'text' },
    {
      name: 'rolle',
      label: 'Rolle',
      type: 'select',
      required: true,
      defaultValue: 'redakteur',
      saveToJWT: true,
      access: { create: adminField, update: adminField },
      options: [
        { label: 'Admin (alle Rechte)', value: 'admin' },
        { label: 'Redakteur (Inhalte pflegen)', value: 'redakteur' },
      ],
    },
  ],
}
