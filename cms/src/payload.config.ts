import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { de } from '@payloadcms/translations/languages/de'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Anfragen } from './collections/Anfragen'
import { Gemeinden } from './collections/Gemeinden'
import { Kundenstimmen } from './collections/Kundenstimmen'
import { Media } from './collections/Media'
import { Objekte } from './collections/Objekte'
import { Pages } from './collections/Pages'
import { Ratgeber } from './collections/Ratgeber'
import { Users } from './collections/Users'
import { Einstellungen } from './globals/Einstellungen'
import { Navigation } from './globals/Navigation'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const siteUrl = process.env.SITE_URL || 'http://localhost:4321'
const serverURL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'
const origins = [siteUrl, serverURL, ...(process.env.EXTRA_ORIGINS || '').split(',').filter(Boolean)]

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' – Nothhelfer CMS' },
    livePreview: {
      url: ({ data }) => `${siteUrl}/${(data as { pfad?: string })?.pfad === 'startseite' ? '' : (data as { pfad?: string })?.pfad || ''}`,
      collections: ['pages'],
    },
  },
  i18n: { supportedLanguages: { de }, fallbackLanguage: 'de' },
  collections: [Pages, Objekte, Ratgeber, Kundenstimmen, Gemeinden, Media, Anfragen, Users],
  globals: [Einstellungen, Navigation],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  cors: origins,
  csrf: origins,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    // In Produktion werden Tabellen über Migrationen angelegt (siehe EINRICHTUNG.md)
    prodMigrations: migrations,
  }),
  email: process.env.SMTP_HOST
    ? nodemailerAdapter({
        defaultFromAddress: process.env.SMTP_FROM || 'website@immobilien-nothhelfer.de',
        defaultFromName: 'Website Immobilien Nothhelfer',
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        },
      })
    : undefined,
  sharp,
  upload: { limits: { fileSize: 50_000_000 } },
})
