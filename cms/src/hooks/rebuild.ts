/**
 * Löst nach dem Veröffentlichen einen Neuaufbau der Website aus
 * (GitHub Actions → Astro-Build → Upload zu Mittwald).
 * Mehrere Änderungen innerhalb von 30 Sekunden werden zusammengefasst.
 */
let timer: ReturnType<typeof setTimeout> | null = null

export function scheduleRebuild(reason: string): void {
  const token = process.env.GITHUB_DISPATCH_TOKEN
  const repo = process.env.GITHUB_REPO // z. B. artworkstation/nothhelfer-website
  if (!token || !repo) return
  if (timer) clearTimeout(timer)
  timer = setTimeout(async () => {
    timer = null
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ event_type: 'cms-publish', client_payload: { reason } }),
      })
      if (!res.ok) console.error('[rebuild] GitHub antwortet', res.status, await res.text())
      else console.log('[rebuild] Website-Neuaufbau angestoßen:', reason)
    } catch (e) {
      console.error('[rebuild] fehlgeschlagen', e)
    }
  }, 30_000)
}

type Doc = { _status?: string; titel?: string; name?: string } | undefined

export const afterChangeRebuild =
  (what: string) =>
  ({ doc, previousDoc }: { doc: Doc; previousDoc?: Doc }) => {
    // nur bei Veröffentlichung bzw. wenn ein veröffentlichtes Dokument zurückgezogen wird
    if (doc?._status === undefined || doc._status === 'published' || previousDoc?._status === 'published') {
      scheduleRebuild(`${what}: ${doc?.titel || doc?.name || ''}`)
    }
    return doc
  }

export const afterDeleteRebuild =
  (what: string) =>
  ({ doc }: { doc: Doc }) => {
    scheduleRebuild(`${what} gelöscht: ${doc?.titel || doc?.name || ''}`)
    return doc
  }
