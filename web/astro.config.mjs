// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

const SITE = process.env.SITE_URL || 'https://www.immobilien-nothhelfer.de'

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { format: 'directory' },
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !/\/(impressum|datenschutz|agb)\/$/.test(page),
    }),
  ],
})
