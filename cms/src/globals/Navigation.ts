import type { GlobalConfig } from 'payload'
import { anyone, loggedIn } from '../access'
import { link } from '../fields'
import { scheduleRebuild } from '../hooks/rebuild'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  admin: { group: 'Verwaltung' },
  access: { read: anyone, update: loggedIn },
  hooks: { afterChange: [({ doc }) => { scheduleRebuild('Navigation'); return doc }] },
  fields: [
    {
      name: 'hauptmenue',
      label: 'Hauptmenü',
      type: 'array',
      labels: { singular: 'Menüpunkt', plural: 'Menüpunkte' },
      fields: [
        { name: 'text', label: 'Text', type: 'text', required: true },
        link(),
        {
          name: 'unterpunkte', label: 'Unterpunkte', type: 'array',
          fields: [
            { name: 'text', label: 'Text', type: 'text', required: true },
            link(),
          ],
        },
      ],
    },
  ],
}
