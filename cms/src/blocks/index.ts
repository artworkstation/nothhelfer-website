import type { Block } from 'payload'
import { faqArray, headline, image, label, link } from '../fields'

/**
 * Bausteine für Seiten. Jeder Block hat in Astro (web/src/components/blocks)
 * eine passende Komponente mit identischem blockType.
 */

const kacheln = {
  name: 'kacheln',
  label: 'Schnelleinstiege (Kacheln)',
  type: 'array' as const,
  maxRows: 3,
  labels: { singular: 'Kachel', plural: 'Kacheln' },
  fields: [
    { name: 'text', label: 'Text (Zeilenumbruch erlaubt)', type: 'textarea' as const, required: true },
    image('bild', 'Bild'),
    link(),
  ],
}

const button = (name = 'button', lbl = 'Button') => ({
  name,
  label: lbl,
  type: 'group' as const,
  fields: [
    { name: 'text', label: 'Beschriftung', type: 'text' as const },
    link(),
  ],
})

export const HeroSzene: Block = {
  slug: 'heroSzene',
  labels: { singular: 'Startbild mit Schriftzug-Szene', plural: 'Startbilder' },
  fields: [
    { name: 'headline', label: 'Headline', type: 'text', required: true },
    { name: 'subline', label: 'Unterzeile', type: 'text' },
    { name: 'sublineAkzent', label: 'Unterzeile – hervorgehobener Teil', type: 'text' },
    image('bild', 'Startmotiv', true),
    kacheln,
    { name: 'claim', label: 'Satz unter dem Schriftzug', type: 'text' },
  ],
}

export const Seitenkopf: Block = {
  slug: 'seitenkopf',
  labels: { singular: 'Seitenkopf (Bild)', plural: 'Seitenköpfe' },
  fields: [
    image('bild', 'Bild', true),
    { name: 'kurz', label: 'Niedrige Höhe', type: 'checkbox' },
    kacheln,
  ],
}

export const Intro: Block = {
  slug: 'intro',
  labels: { singular: 'Einleitung (H1)', plural: 'Einleitungen' },
  fields: [
    label(),
    ...headline(),
    { name: 'lead', label: 'Einleitungssatz (blau)', type: 'textarea' },
    { name: 'text', label: 'Weiterer Text', type: 'textarea' },
  ],
}

export const Warum: Block = {
  slug: 'warum',
  labels: { singular: 'Text mit Wortfärbung + Großbild', plural: 'Texte mit Wortfärbung' },
  fields: [
    label('warum NOTHHELFER'),
    { name: 'text', label: 'Text (färbt sich beim Scrollen grau)', type: 'textarea', required: true },
    { name: 'textAkzent', label: 'Text-Fortsetzung (färbt sich blau)', type: 'textarea' },
    image('bild', 'Großbild'),
    { name: 'video', label: 'Video (ersetzt das Bild, mp4, stumm im Loop)', type: 'upload', relationTo: 'media' },
  ],
}

export const Pfeile: Block = {
  slug: 'pfeile',
  labels: { singular: 'Pfeil-Bildband', plural: 'Pfeil-Bildbänder' },
  fields: [
    { name: 'zeile1', label: 'Headline (blauer Teil)', type: 'text' },
    { name: 'zeile2', label: 'Headline (Fortsetzung)', type: 'text' },
    image('bildLinks', 'Bild für die beiden linken Pfeile', true),
    image('bildRechts', 'Bild für die beiden rechten Pfeile', true),
    { name: 'text', label: 'Text (grau, Zeilenumbrüche erlaubt)', type: 'textarea' },
    { name: 'textAkzent', label: 'Text (blau, Zeilenumbrüche erlaubt)', type: 'textarea' },
    button(),
  ],
}

export const Stufen: Block = {
  slug: 'stufen',
  labels: { singular: 'Schritte (nummeriert)', plural: 'Schritte' },
  fields: [
    label('drei Stufen-Methodik'),
    ...headline(),
    button(),
    {
      name: 'schritte',
      label: 'Schritte',
      type: 'array',
      labels: { singular: 'Schritt', plural: 'Schritte' },
      fields: [
        { name: 'titel', label: 'Titel (dunkel)', type: 'text', required: true },
        { name: 'text', label: 'Fortsetzung (hellgrau)', type: 'text' },
      ],
    },
  ],
}

export const Karten: Block = {
  slug: 'karten',
  labels: { singular: 'Karten (3er-Raster)', plural: 'Karten' },
  fields: [
    label(),
    ...headline(),
    { name: 'text', label: 'Text rechts', type: 'textarea' },
    {
      name: 'hintergrund',
      label: 'Hintergrund',
      type: 'select',
      defaultValue: 'weiss',
      options: [
        { label: 'Weiß', value: 'weiss' },
        { label: 'Hellgrau', value: 'hell' },
      ],
    },
    {
      name: 'karten',
      label: 'Karten',
      type: 'array',
      labels: { singular: 'Karte', plural: 'Karten' },
      fields: [
        image('bild', 'Bild'),
        { name: 'tag', label: 'Kleine Kennzeichnung', type: 'text' },
        { name: 'neu', label: '„Neu“-Marke', type: 'checkbox' },
        { name: 'titel', label: 'Titel', type: 'text', required: true },
        { name: 'text', label: 'Text', type: 'textarea' },
        link(),
        { name: 'buttonText', label: 'Button-Text', type: 'text', defaultValue: 'Mehr erfahren' },
        {
          name: 'icon',
          label: 'Button-Symbol',
          type: 'select',
          defaultValue: 'plus',
          options: [
            { label: 'Plus', value: 'plus' },
            { label: 'Pfeil', value: 'pfeil' },
          ],
        },
      ],
    },
  ],
}

export const Kundenstimmen: Block = {
  slug: 'kundenstimmen',
  labels: { singular: 'Kundenstimmen-Slider', plural: 'Kundenstimmen-Slider' },
  fields: [
    { name: 'headline', label: 'Headline', type: 'text', defaultValue: 'Überzeug dich selbst.' },
    label('Kundenstimmen'),
    image('bild', 'Bild'),
    { name: 'anzahl', label: 'Anzahl Stimmen', type: 'number', defaultValue: 5 },
    { name: 'hinweis', label: 'Hinweis unter dem Slider', type: 'text' },
  ],
}

export const Service: Block = {
  slug: 'service',
  labels: { singular: 'Service-Dreiklang (große Wörter)', plural: 'Service-Dreiklänge' },
  fields: [
    label('unser Service'),
    {
      name: 'zeilen',
      label: 'Zeilen',
      type: 'array',
      labels: { singular: 'Zeile', plural: 'Zeilen' },
      fields: [
        { name: 'wort', label: 'Großes Wort', type: 'text', required: true },
        { name: 'text', label: 'Text', type: 'textarea' },
        image('bild', 'Hintergrundbild (beim Überfahren)'),
        link(),
      ],
    },
    { name: 'outro', label: 'Abschlusstext', type: 'textarea' },
    { name: 'buttonText', label: 'Button-Text', type: 'text', defaultValue: 'Jetzt anrufen' },
  ],
}

export const Angebote: Block = {
  slug: 'angebote',
  labels: { singular: 'Immobilienangebote', plural: 'Immobilienangebote' },
  fields: [
    ...headline(),
    { name: 'text', label: 'Text', type: 'textarea' },
    {
      name: 'vermarktung',
      label: 'Welche Angebote?',
      type: 'select',
      defaultValue: 'alle',
      options: [
        { label: 'Alle', value: 'alle' },
        { label: 'Nur Kauf', value: 'Kauf' },
        { label: 'Nur Miete', value: 'Miete' },
      ],
    },
    { name: 'anzahl', label: 'Anzahl (0 = alle)', type: 'number', defaultValue: 3 },
    { name: 'mitFilter', label: 'Mit Suchfilter (für die Angebotsseite)', type: 'checkbox' },
    { name: 'hintergrund', label: 'Hellgrauer Hintergrund', type: 'checkbox', defaultValue: true },
  ],
}

export const Kompetenz: Block = {
  slug: 'kompetenz',
  labels: { singular: 'Kompetenz / Porträt', plural: 'Kompetenz-Blöcke' },
  fields: [
    label('Expertise'),
    { name: 'headline', label: 'Headline (Zeilenumbrüche = neue Zeile)', type: 'textarea' },
    image('portrait', 'Porträt'),
    image('bild', 'Großes Bild rechts'),
    { name: 'text', label: 'Text', type: 'richText' },
    button(),
    {
      name: 'fakten',
      label: 'Fakten (große Zahlen)',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'zahl', label: 'Zahl/Wert', type: 'text', required: true },
        { name: 'einheit', label: 'Einheit (z. B. km)', type: 'text' },
        { name: 'zaehlen', label: 'Hochzählen animieren', type: 'checkbox', defaultValue: true },
        { name: 'text', label: 'Beschriftung', type: 'text' },
      ],
    },
  ],
}

export const RatgeberTeaser: Block = {
  slug: 'ratgeberTeaser',
  labels: { singular: 'Ratgeber-Beiträge', plural: 'Ratgeber-Beiträge' },
  fields: [
    { name: 'headline', label: 'Headline', type: 'text', defaultValue: 'Ratgeber' },
    { name: 'anzahl', label: 'Anzahl (0 = alle)', type: 'number', defaultValue: 3 },
  ],
}

export const Cta: Block = {
  slug: 'cta',
  labels: { singular: 'Abschluss mit Großbild', plural: 'Abschlüsse' },
  fields: [
    ...headline(),
    { name: 'text', label: 'Text', type: 'textarea' },
    image('bild', 'Hintergrundbild'),
    {
      name: 'buttons',
      label: 'Buttons',
      type: 'array',
      maxRows: 3,
      fields: [
        { name: 'text', label: 'Beschriftung', type: 'text', required: true },
        link(),
      ],
    },
  ],
}

export const CtaBand: Block = {
  slug: 'ctaBand',
  labels: { singular: 'Kontakt-Band (dunkel)', plural: 'Kontakt-Bänder' },
  fields: [
    { name: 'titel', label: 'Titel', type: 'text', defaultValue: 'Lass uns sprechen.' },
    { name: 'text', label: 'Text', type: 'textarea' },
  ],
}

export const Prozess: Block = {
  slug: 'prozess',
  labels: { singular: 'Ablauf (Liste mit Nummern)', plural: 'Abläufe' },
  fields: [
    label('Der Prozess'),
    {
      name: 'schritte',
      label: 'Schritte',
      type: 'array',
      fields: [
        { name: 'titel', label: 'Titel', type: 'text', required: true },
        { name: 'text', label: 'Text', type: 'textarea' },
      ],
    },
  ],
}

export const Liste: Block = {
  slug: 'liste',
  labels: { singular: 'Häkchen-Liste', plural: 'Häkchen-Listen' },
  fields: [
    label(),
    ...headline(),
    {
      name: 'punkte',
      label: 'Punkte',
      type: 'array',
      fields: [{ name: 'text', label: 'Text', type: 'text', required: true }],
    },
    { name: 'hinweis', label: 'Hinweis darunter', type: 'text' },
    {
      name: 'hintergrund',
      label: 'Hintergrund',
      type: 'select',
      defaultValue: 'weiss',
      options: [
        { label: 'Weiß', value: 'weiss' },
        { label: 'Hellgrau', value: 'hell' },
        { label: 'Dunkel', value: 'dunkel' },
      ],
    },
  ],
}

export const Text: Block = {
  slug: 'text',
  labels: { singular: 'Freier Text', plural: 'Freie Texte' },
  fields: [label(), ...headline(), { name: 'inhalt', label: 'Inhalt', type: 'richText' }],
}

export const Region: Block = {
  slug: 'region',
  labels: { singular: 'Regionskarte (40 km)', plural: 'Regionskarten' },
  fields: [
    label('Unser Gebiet'),
    ...headline(),
    { name: 'text', label: 'Text', type: 'textarea' },
    { name: 'gemeinden', label: 'Verlinkte Gemeinden', type: 'relationship', relationTo: 'gemeinden', hasMany: true },
    { name: 'referenzen', label: 'Referenzpunkte auf der Karte anzeigen', type: 'checkbox' },
  ],
}

export const Kontakt: Block = {
  slug: 'kontakt',
  labels: { singular: 'Kontaktformular', plural: 'Kontaktformulare' },
  fields: [
    label('Kontakt'),
    ...headline(),
    {
      name: 'formular',
      label: 'Formular-Art',
      type: 'select',
      defaultValue: 'kontakt',
      options: [
        { label: 'Allgemeiner Kontakt', value: 'kontakt' },
        { label: 'Gutachten-Anfrage', value: 'gutachten' },
        { label: 'Suchauftrag', value: 'suchauftrag' },
      ],
    },
    { name: 'mitKontaktdaten', label: 'Kontaktdaten und Karte links anzeigen (Kontaktseite)', type: 'checkbox' },
  ],
}

export const Faq: Block = {
  slug: 'faq',
  labels: { singular: 'Häufige Fragen (FAQ)', plural: 'FAQs' },
  fields: [label('Häufige Fragen'), ...headline(), faqArray()],
}

export const Team: Block = {
  slug: 'team',
  labels: { singular: 'Team', plural: 'Teams' },
  fields: [
    label('Team'),
    {
      name: 'mitglieder',
      label: 'Personen',
      type: 'array',
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'funktion', label: 'Funktion', type: 'text' },
        image('bild', 'Foto'),
        link(),
      ],
    },
  ],
}

export const Zeitstrahl: Block = {
  slug: 'zeitstrahl',
  labels: { singular: 'Zeitstrahl', plural: 'Zeitstrahlen' },
  fields: [
    label('Stationen'),
    ...headline(),
    {
      name: 'eintraege',
      label: 'Einträge',
      type: 'array',
      fields: [
        { name: 'jahr', label: 'Jahr/Zeitraum', type: 'text', required: true },
        { name: 'text', label: 'Text', type: 'textarea', required: true },
      ],
    },
  ],
}

export const Referenzen: Block = {
  slug: 'referenzen',
  labels: { singular: 'Referenzen (Karte + Liste)', plural: 'Referenzen' },
  fields: [
    label('Referenzen'),
    { name: 'text', label: 'Text', type: 'textarea' },
    {
      name: 'eintraege',
      label: 'Vermittelte Objekte',
      type: 'array',
      fields: [
        { name: 'titel', label: 'Objektart', type: 'text', required: true },
        { name: 'ort', label: 'Ort', type: 'text' },
        { name: 'jahr', label: 'Jahr', type: 'text' },
      ],
    },
  ],
}

export const Wertermittlung: Block = {
  slug: 'wertermittlung',
  labels: { singular: 'Online-Wertermittlung (Tool)', plural: 'Online-Wertermittlungen' },
  fields: [
    {
      name: 'hinweis',
      label: 'Hinweis beim Ergebnis',
      type: 'textarea',
      defaultValue:
        'Erste Orientierung auf Basis von Durchschnittswerten. Für eine verlässliche Bewertung meldet sich Erik Nothhelfer persönlich.',
    },
  ],
}

export const Ansprechpartner: Block = {
  slug: 'ansprechpartner',
  labels: { singular: 'Porträt mit Text', plural: 'Porträts mit Text' },
  fields: [
    { name: 'name', label: 'Name / Headline', type: 'text', required: true },
    image('portrait', 'Porträt'),
    image('bild', 'Großes Bild'),
    { name: 'text', label: 'Text', type: 'richText' },
    button(),
  ],
}

export const Siegel: Block = {
  slug: 'siegel',
  labels: { singular: 'Siegel & Mitgliedschaften', plural: 'Siegel' },
  fields: [
    label('Auszeichnungen & Mitgliedschaften'),
    {
      name: 'punkte',
      label: 'Punkte',
      type: 'array',
      fields: [{ name: 'text', label: 'Text', type: 'text', required: true }],
    },
  ],
}

export const allBlocks: Block[] = [
  HeroSzene,
  Seitenkopf,
  Intro,
  Warum,
  Pfeile,
  Stufen,
  Karten,
  Kundenstimmen,
  Service,
  Angebote,
  Kompetenz,
  Ansprechpartner,
  RatgeberTeaser,
  Cta,
  CtaBand,
  Prozess,
  Liste,
  Text,
  Region,
  Kontakt,
  Faq,
  Team,
  Zeitstrahl,
  Referenzen,
  Siegel,
  Wertermittlung,
]
