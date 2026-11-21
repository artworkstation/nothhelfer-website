import type { CollectionConfig } from 'payload'
import { anyone, loggedIn } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Bild / Datei', plural: 'Bilder & Dateien' },
  admin: { group: 'Inhalte' },
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  fields: [
    {
      name: 'alt',
      label: 'Alternativtext (Bildbeschreibung für Google & Barrierefreiheit)',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    // Auf dem Server liegt dieser Ordner auf einem dauerhaften Volume (siehe EINRICHTUNG.md)
    staticDir: process.env.MEDIA_DIR || 'media',
    mimeTypes: ['image/*', 'video/mp4', 'video/webm', 'application/pdf'],
    focalPoint: true,
    imageSizes: [
      { name: 'klein', width: 640 },
      { name: 'mittel', width: 1280 },
      { name: 'gross', width: 2200 },
    ],
    formatOptions: { format: 'webp', options: { quality: 82 } },
  },
}
