import type { GlobalConfig } from 'payload'
import { anyone, loggedIn } from '../access'
import { scheduleRebuild } from '../hooks/rebuild'

export const Einstellungen: GlobalConfig = {
  slug: 'einstellungen',
  label: 'Kontaktdaten & Einstellungen',
  admin: { group: 'Verwaltung' },
  access: { read: anyone, update: loggedIn },
  hooks: { afterChange: [({ doc }) => { scheduleRebuild('Einstellungen'); return doc }] },
  fields: [
    { name: 'firma', label: 'Firmenname', type: 'text', defaultValue: 'Immobilien Nothhelfer IVD' },
    { name: 'inhaber', label: 'Inhaber', type: 'text', defaultValue: 'Erik Nothhelfer' },
    { type: 'row', fields: [
      { name: 'strasse', label: 'Straße', type: 'text', defaultValue: 'Fischergasse 21' },
      { name: 'plz', label: 'PLZ', type: 'text', defaultValue: '89073' },
      { name: 'ort', label: 'Ort', type: 'text', defaultValue: 'Ulm' },
    ] },
    { type: 'row', fields: [
      { name: 'telefon', label: 'Telefon', type: 'text', defaultValue: '0731 61202' },
      { name: 'fax', label: 'Fax', type: 'text', defaultValue: '0731 61220' },
      { name: 'email', label: 'E-Mail', type: 'email', defaultValue: 'info@immobilien-nothhelfer.de' },
    ] },
    { name: 'portrait', label: 'Porträt Ansprechpartner (Formulare)', type: 'upload', relationTo: 'media' },
    { name: 'termine', label: 'Termine / Öffnungszeiten', type: 'textarea', defaultValue: 'Im Büro, am Telefon oder per Video – nach Vereinbarung.' },
    { type: 'row', fields: [
      { name: 'lat', label: 'Büro Breitengrad', type: 'number', defaultValue: 48.3972 },
      { name: 'lng', label: 'Büro Längengrad', type: 'number', defaultValue: 9.9893 },
    ] },
    { name: 'anfrageEmpfaenger', label: 'Formular-Anfragen gehen an', type: 'email', defaultValue: 'info@immobilien-nothhelfer.de' },
    { name: 'claimFooter', label: 'Satz im Footer', type: 'text' },
    {
      name: 'social', label: 'Social Media', type: 'array',
      fields: [
        { name: 'name', label: 'Netzwerk', type: 'text', required: true },
        { name: 'url', label: 'URL', type: 'text', required: true },
      ],
    },
  ],
}
