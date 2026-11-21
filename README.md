# immobilien-nothhelfer.de

Neue Website für **Immobilien Nothhelfer IVD**, Ulm – umgesetzt von Artwork Station.

| Ordner | Inhalt |
|---|---|
| `web/` | Website (Astro, statisch) – Layout, Animationen (GSAP, Lenis), alle Seitentypen |
| `cms/` | Redaktionssystem (Payload CMS, PostgreSQL) – Seiten aus Bausteinen, Immobilien, Ratgeber, Anfragen |
| `docs/EINRICHTUNG.md` | Schritt-für-Schritt-Anleitung für den Mittwald-Server |
| `.github/workflows/` | automatischer Bau & Upload der Website, Docker-Image des CMS |

## Wie es funktioniert

- Inhalte werden im CMS gepflegt (`cms.immobilien-nothhelfer.de/admin`).
  Jede Seite besteht aus **Bausteinen** (Startbild-Szene, Pfeil-Bildband, Service-Dreiklang,
  Karten, Angebote, FAQ …). Jeder Baustein hat in `web/src/components/blocks/` eine
  gleichnamige Komponente.
- Beim **Veröffentlichen** schickt das CMS ein Signal an GitHub; GitHub Actions baut die
  Website neu und lädt sie zu Mittwald hoch (ca. 1–2 Minuten).
- Formulare (Kontakt, Objekt-Anfrage, Gutachten, Suchauftrag) senden direkt an das CMS
  (`Eingang → Anfragen`) und per E-Mail.
- Karten (OpenStreetMap) laden erst nach Klick (DSGVO). Bei Immobilien wird nur ein
  leicht versetzter Kreis mit ca. 1 km Durchmesser gezeigt.
- SEO/GEO: sprechende URLs, Meta-Felder je Seite, Sitemap, `robots.txt`, `llms.txt`,
  strukturierte Daten (RealEstateAgent, RealEstateListing, Article, FAQPage, BreadcrumbList).

## Seiten

`/` · `/immobilien/` (+ `kaufen/`, `mieten/`, `suchauftrag/`, Exposés `/immobilien/<objekt>/`) ·
`/verkaufen/` (+ `online-wertermittlung/`) · `/gutachten/` (+ `verkehrswertgutachten/`, `kurzbewertung/`) ·
`/region/ulm-neu-ulm/`, `/region/alb-donau-kreis/` · `/immobilienmakler-<gemeinde>/` ·
`/ueber-uns/` (+ `erik-nothhelfer/`, `referenzen/`, `kundenstimmen/`) · `/ratgeber/<beitrag>/` ·
`/kontakt/` · `/impressum/` · `/datenschutz/` · `/agb/`

Neue Seiten legt die Redaktion im CMS unter **Seiten** an – der Pfad (z. B. `verkaufen/erbe`)
wird automatisch zur URL.

## Lokal entwickeln

Voraussetzungen: Node.js 22, PostgreSQL (oder Docker).

```bash
# 1. CMS
cd cms
cp .env.example .env          # DATABASE_URL, PAYLOAD_SECRET, MEDIA_DIR=media eintragen
npm ci
npm run migrate               # Tabellen anlegen
npm run seed                  # Inhalte aus dem Prototyp einspielen
npm run dev                   # http://localhost:3000/admin

# 2. Website
cd ../web
cp .env.example .env
npm ci
npm run dev                   # http://localhost:4321 (lädt Inhalte live aus dem CMS)
npm run build                 # statische Seiten nach dist/
```

Alternativ alles mit Docker: siehe Kopf von `docker-compose.yml`.

Hinweis: `npm run dev` im CMS gleicht die Datenbank automatisch an das Schema an.
Wer Felder ändert, erzeugt anschließend eine Migration (`npm run migrate:create name`),
damit der Server sie beim nächsten Start übernimmt.

## Offene Punkte

- Schnittstelle zur Makler-Software / Portalen (OpenImmo) – Feld `externeId` ist vorbereitet
- Neues Fassadenfoto (Frontansicht) für die Startseite, Video statt Nachtbild
- Echte Kundenstimmen, Rechtstexte, Öffnungszeiten, Team-Angaben, Gründungsjahr prüfen
- Texte, die noch nah an der Vorlage findrealestate.com sind, eigenständig formulieren
