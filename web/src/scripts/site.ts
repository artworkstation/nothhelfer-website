/* Gemeinsame Skripte: Smooth Scroll, Menü, Reveals, Formulare, Galerie, Liste, Wertermittlung, Karten */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)
const NH: any = ((window as any).NH = (window as any).NH || {})
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
NH.reduce = reduce
const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M3 12h17M14 6l6 6-6 6"/></svg>'

let lenis: Lenis | null = null
if (!reduce) {
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis!.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
}
NH.lenis = lenis
const scrollTo = (el: Element, offset = -80) =>
  lenis ? lenis.scrollTo(el as HTMLElement, { offset, duration: 1.3 }) : el.scrollIntoView({ behavior: 'smooth' })

// Anker-Links weich scrollen
document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest('a')
  if (!a) return
  const h = a.getAttribute('href') || ''
  if (h.startsWith('#') && h.length > 1) {
    const el = document.querySelector(h)
    if (!el) return
    e.preventDefault()
    scrollTo(el)
  }
})

// Toast
const toastEl = document.getElementById('toast')
let tt: number
function toast(msg: string) {
  if (!toastEl) return
  toastEl.textContent = msg
  toastEl.classList.add('on')
  clearTimeout(tt)
  tt = window.setTimeout(() => toastEl.classList.remove('on'), 2600)
}
NH.toast = toast

// Teilen-Button (Exposé)
document.querySelectorAll<HTMLElement>('[data-share]').forEach((b) =>
  b.addEventListener('click', async () => {
    const url = location.href
    if (navigator.share) { try { await navigator.share({ title: document.title, url }); return } catch { return } }
    try { await navigator.clipboard.writeText(url); toast('Link zum Exposé kopiert') } catch { toast(url) }
  }),
)

// Header ausblenden beim Runterscrollen
const hdr = document.getElementById('hdr')!
ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => hdr.classList.toggle('hide', s.scroll() > 200 && s.direction === 1) })

// Mobiles Menü
const mm = document.getElementById('mmenu')!
const burger = document.getElementById('burger')!
function setMenu(o: boolean) {
  mm.classList.toggle('open', o)
  burger.setAttribute('aria-expanded', String(o))
  if (lenis) o ? lenis.stop() : lenis.start()
}
burger.addEventListener('click', () => setMenu(true))
document.getElementById('mclose')!.addEventListener('click', () => setMenu(false))
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false) })
mm.querySelectorAll<HTMLButtonElement>('button.mi').forEach((b) =>
  b.addEventListener('click', () => {
    const li = b.parentElement!, sub = li.querySelector<HTMLElement>('.msub')!, open = !li.classList.contains('ex')
    mm.querySelectorAll('.mlist>li.ex').forEach((x) => { x.classList.remove('ex'); (x.querySelector('.msub') as HTMLElement).style.maxHeight = '0' })
    if (open) { li.classList.add('ex'); sub.style.maxHeight = sub.scrollHeight + 'px' }
  }),
)
mm.querySelectorAll<HTMLElement>('.mlist>li').forEach((li, i) => (li.style.transitionDelay = 0.15 + i * 0.05 + 's'))

// Formulare → Payload-Sammlung „anfragen“
document.querySelectorAll<HTMLFormElement>('form[data-anfrage]').forEach((f) =>
  f.addEventListener('submit', async (e) => {
    e.preventDefault()
    const btn = f.querySelector<HTMLButtonElement>('button[type=submit]')
    const errEl = f.querySelector<HTMLElement>('.err')
    if (errEl) errEl.textContent = ''
    const fd = new FormData(f)
    const fixed = ['name', 'email', 'telefon', 'objekt', 'nachricht', 'website']
    const daten: Record<string, string | string[]> = {}
    fd.forEach((v, k) => {
      if (fixed.includes(k) || k === 'datenschutz') return
      const val = String(v)
      if (!val) return
      if (k in daten) daten[k] = ([] as string[]).concat(daten[k] as any, val)
      else daten[k] = val
    })
    const body: Record<string, unknown> = { typ: f.dataset.anfrage, daten, datenschutz: fd.get('datenschutz') === 'on', seite: location.pathname }
    fixed.forEach((k) => { if (fd.get(k)) body[k] = String(fd.get(k)) })
    delete body.seite
    if (btn) btn.disabled = true
    try {
      const r = f.dataset.vorschau ? { ok: true } : await fetch(f.action, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!r.ok) throw new Error(String(r.status))
      const ok = document.getElementById(f.dataset.ok || '')
      f.style.display = 'none'
      if (ok) { ok.classList.add('on'); scrollTo(ok, -140) }
    } catch {
      if (errEl) errEl.textContent = 'Das hat leider nicht geklappt. Bitte ruf uns an oder schreib eine E-Mail.'
    } finally {
      if (btn) btn.disabled = false
    }
  }),
)

// Galerie (Exposé)
document.querySelectorAll<HTMLElement>('.gallery').forEach((g) => {
  const tr = g.querySelector<HTMLElement>('.track')!, n = tr.children.length, c = g.querySelector('.gcount')
  let i = 0
  const go = (k: number) => { i = (k + n) % n; tr.style.transform = `translateX(${-100 * i}%)`; if (c) c.textContent = `${i + 1} / ${n}` }
  g.querySelector('.gprev')?.addEventListener('click', () => go(i - 1))
  g.querySelector('.gnext')?.addEventListener('click', () => go(i + 1))
  let x0: number | null = null
  tr.addEventListener('touchstart', (e) => (x0 = e.touches[0].clientX), { passive: true })
  tr.addEventListener('touchend', (e) => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1)); x0 = null })
  if (n < 2) g.querySelectorAll<HTMLElement>('.gnav').forEach((b) => (b.style.display = 'none'))
  go(0)
})

document.querySelectorAll('details').forEach((d) => d.addEventListener('toggle', () => ScrollTrigger.refresh()))

// Angebotsliste mit Filter (Karten sind serverseitig gerendert, hier nur ein-/ausblenden)
const list = document.getElementById('objlist')
if (list) {
  const fb = document.getElementById('filterbar')
  const cards = Array.from(list.querySelectorAll<HTMLElement>('.obj'))
  const empty = document.getElementById('objempty')
  const more = document.getElementById('loadmore')
  let art = list.dataset.art || 'Alle', shown = 4
  document.getElementById('filtertoggle')?.addEventListener('click', () => { fb?.classList.toggle('open'); ScrollTrigger.refresh() })
  const render = () => {
    const ort = (document.getElementById('f-ort') as HTMLSelectElement | null)?.value || ''
    const typs = fb ? Array.from(fb.querySelectorAll<HTMLInputElement>('input[type=checkbox]:checked')).map((x) => x.value) : []
    const on = document.querySelector<HTMLElement>('#seg button.on')
    if (on) art = on.dataset.v || 'Alle'
    const res = cards.filter((c) => (art === 'Alle' || c.dataset.art === art) && (!ort || c.dataset.ort === ort) && (!typs.length || typs.includes(c.dataset.typ || '')))
    cards.forEach((c) => (c.style.display = 'none'))
    res.slice(0, shown).forEach((c) => (c.style.display = ''))
    const cnt = document.getElementById('objcount')
    if (cnt) cnt.textContent = res.length + (res.length === 1 ? ' Angebot' : ' Angebote')
    if (empty) empty.style.display = res.length ? 'none' : ''
    if (more) more.style.display = res.length > shown ? 'block' : 'none'
    ScrollTrigger.refresh()
  }
  fb?.addEventListener('change', render)
  document.querySelectorAll<HTMLButtonElement>('#seg button').forEach((b) =>
    b.addEventListener('click', () => { document.querySelectorAll('#seg button').forEach((x) => x.classList.remove('on')); b.classList.add('on'); render() }),
  )
  more?.addEventListener('click', () => { shown += 4; render() })
  render()
}

// Online-Wertermittlung (Orientierungsrechnung)
const wiz = document.getElementById('wiz')
if (wiz) {
  const steps = wiz.querySelectorAll<HTMLElement>('.ws'), data: Record<string, string> = {}
  let cur = 0
  const back = wiz.querySelector<HTMLElement>('#wback')!, next = wiz.querySelector<HTMLElement>('#wnext')!
  const show = (k: number, quiet = false) => {
    cur = k
    steps.forEach((s, i) => s.classList.toggle('on', i === k))
    ;(wiz.querySelector('.prog i') as HTMLElement).style.width = ((k + 1) / steps.length) * 100 + '%'
    back.style.visibility = k ? 'visible' : 'hidden'
    next.style.display = k === steps.length - 1 ? 'none' : ''
    next.innerHTML = (k === steps.length - 2 ? 'Ergebnis anzeigen ' : 'Weiter ') + ARROW
    if (!quiet) scrollTo(wiz, -120)
  }
  wiz.querySelectorAll<HTMLElement>('.opts').forEach((g) =>
    g.addEventListener('click', (e) => {
      const o = (e.target as HTMLElement).closest<HTMLElement>('.opt')
      if (!o) return
      g.querySelectorAll('.opt').forEach((x) => x.classList.remove('on'))
      o.classList.add('on')
      data[g.dataset.k!] = o.dataset.v!
    }),
  )
  const val = (id: string) => (document.getElementById(id) as HTMLInputElement).value
  const calc = () => {
    const base: Record<string, number> = { Ulm: 4300, 'Neu-Ulm': 4100, Blaustein: 3700, Senden: 3600, Dornstadt: 3500, Erbach: 3400, Langenau: 3400, Elchingen: 3700, andere: 3300 }
    const typ = data.typ || 'Haus', zust = data.zust || 'gepflegt'
    const ort = val('w-ort'), wfl = +val('w-wfl') || 120, bj = +val('w-bj') || 1990, gr = +val('w-gr') || 0
    let p = base[ort] || 3300
    if (typ === 'Wohnung') p *= 1.05
    if (typ === 'Mehrfamilienhaus') p *= 0.85
    p *= ({ 'renovierungsbedürftig': 0.78, gepflegt: 1, modernisiert: 1.1, neuwertig: 1.22 } as Record<string, number>)[zust]
    p *= bj > 2015 ? 1.15 : bj > 2000 ? 1.06 : bj > 1980 ? 1 : 0.92
    const v = p * wfl + (typ !== 'Wohnung' ? gr * 120 : 0)
    const lo = Math.round((v * 0.9) / 5000) * 5000, hi = Math.round((v * 1.1) / 5000) * 5000
    const f = (n: number) => n.toLocaleString('de-DE') + ' €'
    document.getElementById('w-res')!.textContent = f(lo) + ' – ' + f(hi)
    const sum = `${typ} in ${ort === 'andere' ? 'der Region' : ort} · ca. ${wfl} m² · Baujahr ${bj} · ${zust}`
    document.getElementById('w-sum')!.textContent = sum
    const hid = document.getElementById('w-daten') as HTMLInputElement | null
    if (hid) hid.value = `${sum} · Indikation ${f(lo)} – ${f(hi)}`
  }
  next.addEventListener('click', () => { if (cur === steps.length - 2) calc(); show(Math.min(cur + 1, steps.length - 1)) })
  back.addEventListener('click', () => show(Math.max(cur - 1, 0)))
  show(0, true)
}

// Karten (OpenStreetMap) erst nach Zustimmung laden – DSGVO
document.querySelectorAll<HTMLElement>('.lmap').forEach((box) => {
  const start = async () => {
    box.classList.add('on')
    const L = (await import('leaflet')).default
    await import('leaflet/dist/leaflet.css')
    const lat = +box.dataset.lat!, lng = +box.dataset.lng!, r = +(box.dataset.r || 0)
    const map = L.map(box.querySelector('.mapc') as HTMLElement, { scrollWheelZoom: false }).setView([lat, lng], r ? 14 : 16)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '© OpenStreetMap-Mitwirkende' }).addTo(map)
    if (r) L.circle([lat, lng], { radius: r, color: '#302f77', weight: 1.5, dashArray: '6 6', fillColor: '#302f77', fillOpacity: 0.14 }).addTo(map)
    else L.circleMarker([lat, lng], { radius: 9, color: '#fff', weight: 2, fillColor: '#302f77', fillOpacity: 1 }).addTo(map)
  }
  box.querySelector('button')?.addEventListener('click', () => { try { localStorage.setItem('nh-karten', '1') } catch {} ; start() })
  try { if (localStorage.getItem('nh-karten') === '1') start() } catch {}
})

// Reveals (alle Seiten)
if (!reduce) {
  gsap.utils.toArray<HTMLElement>('.ln > span').forEach((el) => {
    if (el.closest('#heroCopy')) return
    gsap.from(el, { yPercent: 115, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: el.parentNode as Element, start: 'top 90%' } })
  })
  gsap.utils.toArray<HTMLElement>('.fadeup').forEach((el) =>
    gsap.from(el, { y: 40, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 92%' } }),
  )
  gsap.utils.toArray<HTMLElement>('.par img, .page-hero img').forEach((im) =>
    gsap.fromTo(im, { yPercent: -8 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: im.parentNode as Element, start: 'top bottom', end: 'bottom top', scrub: true } }),
  )
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const to = +el.dataset.count!, o = { v: to > 1000 ? to - 80 : 0 }
    gsap.to(o, { v: to, duration: 2, ease: 'power3.out', onUpdate: () => (el.textContent = String(Math.round(o.v))), scrollTrigger: { trigger: el, start: 'top 90%' } })
  })
  gsap.utils.toArray<SVGCircleElement>('.mapbox .pulse').forEach((c) =>
    gsap.fromTo(c, { attr: { r: 0 }, opacity: 0.6 }, { attr: { r: +(c.dataset.r || 0) }, opacity: 0, duration: 2.4, repeat: -1, ease: 'power2.out' }),
  )
}
window.addEventListener('load', () => ScrollTrigger.refresh())
