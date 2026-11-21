/* Startseite & Bausteine mit Szenen: Hero-Schriftzug, Wortfärbung, Pfeile, Stufen, Service, Kundenstimmen */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const hdr = document.getElementById('hdr')!
const $ = (s: string) => document.querySelector<HTMLElement>(s)

// Kundenstimmen-Slider
document.querySelectorAll<HTMLElement>('.stimmen[data-slider]').forEach((root) => {
  const btns = root.querySelectorAll<HTMLButtonElement>('.pager button'), qs = root.querySelectorAll<HTMLElement>('.quotes .q')
  if (qs.length < 2) return
  let cur = 0, timer = 0
  const show = (n: number) => {
    if (n === cur) return
    const a = qs[cur], b = qs[n]
    gsap.to(a, { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in', onComplete: () => { a.classList.remove('on'); gsap.set(a, { y: 0 }) } })
    b.classList.add('on')
    gsap.fromTo(b, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.35, ease: 'expo.out' })
    btns[cur].classList.remove('on'); btns[n].classList.add('on'); cur = n
  }
  const auto = () => { clearInterval(timer); if (!reduce) timer = window.setInterval(() => show((cur + 1) % qs.length), 6000) }
  btns.forEach((b, i) => b.addEventListener('click', () => { show(i); auto() }))
  auto()
})

// Wortweise Einfärbung beim Scrollen
document.querySelectorAll<HTMLElement>('[data-words]').forEach((p) => {
  let html = ''
  p.childNodes.forEach((n) => {
    const accent = n.nodeType === 1
    ;(n.textContent || '').split(/(\s+)/).forEach((w) => {
      if (!w.trim()) { html += w; return }
      html += `<span class="w" data-c="${accent ? '#302f77' : '#3f4a52'}">${w}</span>`
    })
  })
  p.innerHTML = html
  if (reduce) { p.querySelectorAll<HTMLElement>('.w').forEach((w) => (w.style.color = w.dataset.c!)); return }
  const tl = gsap.timeline({ scrollTrigger: { trigger: p, start: 'top 80%', end: 'bottom 45%', scrub: true } })
  p.querySelectorAll<HTMLElement>('.w').forEach((w, i) => tl.to(w, { color: w.dataset.c, duration: 1 }, i * 0.5))
})

const hero = $('#hero')
if (hero) {
  const next = hero.nextElementSibling
  if (next) ScrollTrigger.create({ trigger: next, start: 'top 70px', onEnter: () => hdr.classList.add('solid'), onLeaveBack: () => hdr.classList.remove('solid') })
  const pens = gsap.utils.toArray<SVGPathElement>('.pen')
  const total = pens.reduce((a, p) => a + parseFloat(p.dataset.l || '0'), 0)
  if (reduce) {
    gsap.set(pens, { strokeDashoffset: 0, visibility: 'visible' })
    gsap.set('#claim', { opacity: 1 })
  } else {
    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .from('#heroBg', { scale: 1.18, duration: 2.4, ease: 'power3.out' })
      .from('#heroCopy .ln > span', { yPercent: 115, duration: 1.4, stagger: 0.15 }, 0.25)
      .from('#tiles .tile, .mcta a', { y: 80, opacity: 0, duration: 1.2, stagger: 0.1 }, 0.6)

    const scene = gsap.timeline({ scrollTrigger: { trigger: '#hero', start: 'top top', end: '+=260%', scrub: 1, pin: true, anticipatePin: 1 } })
    scene.to('#hint', { opacity: 0, duration: 0.05 }, 0)
      .to('#heroCopy', { yPercent: -60, opacity: 0, duration: 0.22, ease: 'none' }, 0)
      .to('#tiles', { y: -120, opacity: 0, duration: 0.2, ease: 'none' }, 0.02)
      .to('#cloud', { opacity: 0, duration: 0.2, ease: 'none' }, 0.04)
      .to('#heroBg', { scale: 1.14, yPercent: -4, duration: 1, ease: 'none' }, 0)
      .to('#dusk', { opacity: 1, duration: 0.3, ease: 'none' }, 0.08)
      .to('#dusk2', { opacity: 1, duration: 0.3, ease: 'none' }, 0.2)
    let t = 0.34
    const span = 0.42
    pens.forEach((p) => {
      const d = (parseFloat(p.dataset.l || '0') / total) * span
      scene.set(p, { visibility: 'visible' }, t).to(p, { strokeDashoffset: 0, duration: d, ease: 'none' }, t)
      t += d
    })
    scene.to('#claim', { opacity: 1, y: -6, duration: 0.08 }, 0.78)
      .to('#fog', { yPercent: -95, duration: 0.2, ease: 'none' }, 0.86)
      .to('#sign', { yPercent: -20, opacity: 0, duration: 0.12, ease: 'none' }, 0.92)
  }
}

if (!reduce) {
  gsap.utils.toArray<HTMLElement>('.imgwide').forEach((w) => {
    gsap.to(w, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: w, start: 'top 90%', end: 'top 25%', scrub: true } })
    const m = w.querySelector('img,video')
    if (m) gsap.to(m, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: w, start: 'top bottom', end: 'bottom top', scrub: true } })
  })

  // Pfeile: fahren gestaffelt ein, Bild läuft leicht gegen die Bewegung
  gsap.utils.toArray<HTMLElement>('.chev').forEach((chev) => {
    gsap.from(chev.querySelectorAll('.cv'), { x: 160, opacity: 0, duration: 1.5, ease: 'expo.out', stagger: 0.12, scrollTrigger: { trigger: chev, start: 'top 80%' } })
    chev.querySelectorAll('image').forEach((im) => {
      const x = +(im.getAttribute('x') || 0)
      gsap.fromTo(im, { attr: { x: x - 20 } }, { attr: { x: x + 20 }, ease: 'none', scrollTrigger: { trigger: chev, start: 'top bottom', end: 'bottom top', scrub: true } })
    })
  })

  gsap.utils.toArray<HTMLElement>('.steps').forEach((list) => {
    list.querySelectorAll<HTMLElement>('.step').forEach((st) => {
      gsap.timeline({ scrollTrigger: { trigger: st, start: 'top 85%' } })
        .to(st, { '--sx': 1, duration: 1.2, ease: 'expo.inOut' })
        .from(st.children, { y: 30, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.08 }, 0.3)
    })
    gsap.to(list, { '--sx': 1, scrollTrigger: { trigger: list, start: 'bottom 90%' }, duration: 1.2, ease: 'expo.inOut' })
  })

  gsap.utils.toArray<HTMLElement>('.st-img img').forEach((im) =>
    gsap.fromTo(im, { yPercent: -10 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: im.parentNode as Element, start: 'top bottom', end: 'bottom top', scrub: true } }),
  )
  gsap.utils.toArray<HTMLElement>('.service .row').forEach((r) => {
    gsap.from(r.querySelector('.word'), { xPercent: 25, ease: 'none', scrollTrigger: { trigger: r, start: 'top bottom', end: 'top 45%', scrub: true } })
    gsap.from(r.querySelector('.arr'), { x: -60, opacity: 0, ease: 'none', scrollTrigger: { trigger: r, start: 'top bottom', end: 'top 50%', scrub: true } })
  })
  gsap.utils.toArray<HTMLElement>('.cta').forEach((c) => {
    const bg = c.querySelector('.bg')
    if (bg) gsap.fromTo(bg, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: c, start: 'top bottom', end: 'bottom top', scrub: true } })
  })
} else {
  document.querySelectorAll<HTMLElement>('.steps').forEach((l) => { l.style.setProperty('--sx', '1'); l.querySelectorAll<HTMLElement>('.step').forEach((s) => s.style.setProperty('--sx', '1')) })
}
