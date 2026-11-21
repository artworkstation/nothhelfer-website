# Einrichtung auf dem Mittwald-Server (mStudio)

Diese Anleitung führt Schritt für Schritt durch die Einrichtung von
**immobilien-nothhelfer.de** auf dem Mittwald-vServer (mStudio, Container-Hosting).
Passwörter und Schlüssel trägst du immer selbst in mStudio bzw. GitHub ein –
nie in einen Chat und nie in eine Datei im Repository.

## So hängt alles zusammen

```
 Redaktion (Sascha, Nothhelfer)
        │  bearbeitet Inhalte
        ▼
 ┌──────────────────────────┐      speichert      ┌─────────────────────┐
 │ CMS-Container (Payload)  │ ───────────────────▶ │ PostgreSQL-Container │
 │ cms.immobilien-…de       │                      └─────────────────────┘
 │ Bilder: Volume /data/media
 └──────────┬───────────────┘
            │ „Veröffentlichen“ → Signal an GitHub
            ▼
 ┌──────────────────────────┐   rsync per SSH   ┌──────────────────────────┐
 │ GitHub Actions           │ ────────────────▶ │ Website-Container (nginx) │
 │ baut die Website (Astro) │                   │ www.immobilien-…de        │
 └──────────────────────────┘                   └──────────────────────────┘
 Formulare der Website senden direkt an das CMS (Bereich „Eingang → Anfragen“)
 und per E-Mail an die Adresse aus „Kontaktdaten & Einstellungen“.
```

Die Website selbst ist rein statisch: schnell, sicher, ohne Datenbankzugriff.
Nach dem Veröffentlichen im CMS ist sie nach ca. 1–2 Minuten aktualisiert.

---

## 1. Projekt in mStudio vorbereiten

1. In mStudio das Projekt auf dem vServer öffnen (z. B. „Nothhelfer Website“).
2. Unter **Zugänge → SSH/SFTP** einen SSH-Benutzer anlegen. Notieren:
   Benutzername und Host (steht dort, Form `ssh.xxx.project.host`).
3. Per SFTP (z. B. FileZilla) oder SSH im Projekt einen Ordner anlegen:
   `/html/website` mit dem Unterordner `public`.

## 2. Datenbank-Container (PostgreSQL)

**Container → Container erstellen**

| Feld | Wert |
|---|---|
| Name | `postgres` |
| Image | `postgres:17-alpine` |
| Umgebungsvariablen | `POSTGRES_USER=payload`<br>`POSTGRES_DB=nothhelfer`<br>`POSTGRES_PASSWORD=` *(langes Zufallspasswort, selbst erzeugen)* |
| Volume | neues Volume `db` → Mount-Pfad `/var/lib/postgresql/data` |
| Port | `5432` (nur intern, **nicht** öffentlich) |

## 3. CMS-Container (Payload)

Das Image wird automatisch von GitHub gebaut (Workflow „CMS-Image bauen“):
`ghcr.io/artworkstation/nothhelfer-website-cms:latest`

> Das Paket in GitHub ist anfangs privat. Entweder unter
> GitHub → Packages → *nothhelfer-website-cms* → Package settings auf **Public**
> stellen (das Image enthält keine Passwörter) – oder in mStudio eine
> Registry `ghcr.io` mit GitHub-Benutzer und einem Token (Recht `read:packages`) hinterlegen.

**Container → Container erstellen**

| Feld | Wert |
|---|---|
| Name | `cms` |
| Image | `ghcr.io/artworkstation/nothhelfer-website-cms:latest` |
| Volume | neues Volume `media` → Mount-Pfad `/data/media` |
| Port | `3000` |

Umgebungsvariablen (Vorlage: `cms/.env.example`):

| Variable | Wert |
|---|---|
| `DATABASE_URL` | `postgres://payload:PASSWORT@postgres:5432/nothhelfer` |
| `PAYLOAD_SECRET` | langes Zufallspasswort (z. B. `openssl rand -hex 32`) |
| `PAYLOAD_PUBLIC_SERVER_URL` | `https://cms.immobilien-nothhelfer.de` (vor dem Livegang: die Testdomain) |
| `SITE_URL` | `https://www.immobilien-nothhelfer.de` (vor dem Livegang: die Testdomain) |
| `EXTRA_ORIGINS` | weitere Adressen, die Formulare senden dürfen, kommagetrennt (z. B. Testdomain) |
| `GITHUB_REPO` | `artworkstation/nothhelfer-website` |
| `GITHUB_DISPATCH_TOKEN` | siehe Schritt 6 |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | Postfach für den Versand der Formular-E-Mails (siehe Schritt 7) |

Beim ersten Start legt das CMS alle Datenbanktabellen selbst an (Migrationen
laufen automatisch). In den Container-Logs steht dann „Migrated … initial“.

## 4. Website-Container (nginx)

**Container → Container erstellen**

| Feld | Wert |
|---|---|
| Name | `website` |
| Image | `nginx:1.27-alpine` |
| Volume | Projektpfad `/html/website` → Mount-Pfad `/usr/share/nginx/html` |
| Volume | Projektpfad `/html/website/nginx.conf` → Mount-Pfad `/etc/nginx/conf.d/default.conf` |
| Port | `80` |

Die Datei `nginx.conf` und der Ordner `public` werden von GitHub Actions
hochgeladen (Schritt 6). Bis zum ersten Upload zeigt nginx seine Standardseite.

## 5. Domains

Unter **Domains** im Projekt:

| Adresse | zeigt auf |
|---|---|
| `www.immobilien-nothhelfer.de` | Container `website`, Port 80 |
| `immobilien-nothhelfer.de` | Weiterleitung auf `www.` |
| `cms.immobilien-nothhelfer.de` | Container `cms`, Port 3000 |

**Vor dem Livegang** bleiben die Domains beim bisherigen Anbieter. Zum Testen
nutzen wir die von Mittwald vergebenen Testadressen (`…project.space`) oder
Subdomains wie `neu.immobilien-nothhelfer.de`, falls die DNS-Einträge beim
alten Anbieter gesetzt werden können. Diese Adressen in `SITE_URL` /
`PAYLOAD_PUBLIC_SERVER_URL` / `EXTRA_ORIGINS` sowie in GitHub (`SITE_URL`,
`CMS_URL`) eintragen.

SSL-Zertifikate (Let's Encrypt) stellt Mittwald automatisch aus.

## 6. GitHub verbinden (automatischer Neubau)

### 6a. Schlüssel für den Upload

1. Auf dem eigenen Rechner ein Schlüsselpaar nur für den Upload erzeugen:
   `ssh-keygen -t ed25519 -f nothhelfer_deploy -C github-deploy` (ohne Passphrase).
2. Den **öffentlichen** Teil (`nothhelfer_deploy.pub`) in mStudio beim
   SSH-Benutzer aus Schritt 1 hinterlegen.
3. In GitHub: Repository → **Settings → Secrets and variables → Actions**.

**Secrets** (geheim):

| Name | Inhalt |
|---|---|
| `DEPLOY_SSH_KEY` | Inhalt der Datei `nothhelfer_deploy` (privater Schlüssel) |
| `DEPLOY_SSH_HOST` | SSH-Host aus Schritt 1 |
| `DEPLOY_SSH_USER` | SSH-Benutzer aus Schritt 1 |
| `DEPLOY_PATH` | absoluter Pfad zu `/html/website` (wird in mStudio beim SSH-Zugang angezeigt) |

**Variables** (nicht geheim):

| Name | Inhalt |
|---|---|
| `CMS_URL` | `https://cms.immobilien-nothhelfer.de` |
| `SITE_URL` | `https://www.immobilien-nothhelfer.de` |
| `DEPLOY_ENABLED` | `true` (erst setzen, wenn alles oben eingetragen ist) |

### 6b. Signal „Veröffentlicht“ vom CMS an GitHub

1. GitHub → Profilbild → **Settings → Developer settings → Personal access tokens
   → Fine-grained tokens → Generate new token**.
2. Name `nothhelfer-cms-publish`, Ablauf z. B. 1 Jahr (Erinnerung im Kalender!),
   Repository access: **Only select repositories → nothhelfer-website**.
3. Permissions → Repository permissions → **Contents: Read and write**.
4. Token kopieren und in mStudio beim Container `cms` als
   `GITHUB_DISPATCH_TOKEN` eintragen, Container neu starten.

Test: Im CMS eine Seite speichern und veröffentlichen → in GitHub unter
**Actions** startet nach ca. 30 Sekunden „Website bauen & veröffentlichen“.

## 7. E-Mail für Formulare

Formular-Anfragen landen immer im CMS unter **Eingang → Anfragen**.
Zusätzlich verschickt das CMS eine E-Mail an die Adresse aus
**Kontaktdaten & Einstellungen → Formular-Anfragen gehen an**.

Dafür ein Postfach als Absender anlegen, z. B. `website@immobilien-nothhelfer.de`
(beim heutigen E-Mail-Anbieter oder nach dem Umzug bei Mittwald) und die
SMTP-Zugangsdaten beim Container `cms` eintragen.

> **Wichtig beim Domain-Umzug:** Wenn die Domain zu Mittwald umzieht, müssen
> auch die Postfächer von `@immobilien-nothhelfer.de` (z. B. `info@`) vorher
> bei Mittwald angelegt bzw. die MX-Einträge auf den bisherigen Mail-Anbieter
> gesetzt werden – sonst kommen E-Mails nicht mehr an.

## 8. Erste Benutzer anlegen

1. `https://cms.immobilien-nothhelfer.de/admin` öffnen.
2. Beim ersten Aufruf fragt das CMS nach dem ersten Benutzer:
   **weihs@artwork-station.de**, Rolle **Administrator**.
3. Danach unter **Verwaltung → Benutzer → Neu**:
   **info@immobilien-nothhelfer.de**, Rolle **Redakteur**.

| Rolle | darf |
|---|---|
| Administrator | alles, inkl. Benutzer anlegen/löschen |
| Redakteur | Seiten, Immobilien, Ratgeber, Bilder, Anfragen bearbeiten |

## 9. Startinhalte einspielen (einmalig)

Damit nicht alles von Hand angelegt werden muss, gibt es ein Werkzeug-Image,
das alle Inhalte aus dem Prototyp einspielt (Seiten, Bilder, Beispielobjekte):

1. In mStudio vorübergehend einen Container anlegen:
   Image `ghcr.io/artworkstation/nothhelfer-website-cms:tools`,
   **gleiche Umgebungsvariablen und gleiches Volume `media`** wie der `cms`-Container.
2. Starten – er läuft einmal durch („Fertig. Alle Inhalte … sind angelegt.“)
   und beendet sich.
3. Container wieder löschen.

Das Werkzeug legt nur an, was noch fehlt – doppelter Start schadet nicht.

## 10. Checkliste Livegang

- [ ] Alle Inhalte geprüft und freigegeben (Platzhalter, Kundenstimmen, Rechtstexte)
- [ ] Beispielobjekte gelöscht bzw. echte Objekte angelegt
- [ ] Formular-Test: Anfrage kommt im CMS und per E-Mail an
- [ ] Auth-Code beim bisherigen Anbieter angefordert, Domain-Umzug zu Mittwald beauftragt
- [ ] E-Mail-Postfächer umgezogen bzw. MX-Einträge geklärt
- [ ] `SITE_URL`, `PAYLOAD_PUBLIC_SERVER_URL`, GitHub-Variablen auf die echten Adressen
- [ ] Weiterleitungen alter URLs (alte Seite → neue Seite) eingetragen
- [ ] Google Search Console: Sitemap `https://www.immobilien-nothhelfer.de/sitemap-index.xml`
- [ ] Backups: Mittwald sichert Volumes täglich – zusätzlich Datenbank-Export einplanen

## Lokale Entwicklung

Siehe `README.md`. Kurzfassung mit Docker:

```bash
docker compose up -d --build          # Datenbank + CMS
docker compose run --rm seed          # Startinhalte
cd web && cp .env.example .env && npm ci && npm run dev   # Website auf :4321
```
