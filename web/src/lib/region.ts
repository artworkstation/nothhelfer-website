/** Schematische Regionskarte (40 km um Ulm) als SVG – ohne externe Karten, daher ohne Cookie-Hinweis nutzbar */
const TOWNS: [string, number, number][] = [
  ['Ulm', 48.3984, 9.9916], ['Neu-Ulm', 48.3923, 10.0114], ['Senden', 48.3256, 10.0447],
  ['Blaustein', 48.4136, 9.9181], ['Dornstadt', 48.4703, 9.9441], ['Erbach', 48.3283, 9.8869],
  ['Ehingen', 48.2836, 9.7236], ['Blaubeuren', 48.4122, 9.7847], ['Langenau', 48.4986, 10.1197],
  ['Elchingen', 48.4519, 10.0953], ['Laupheim', 48.2289, 9.8797], ['Illertissen', 48.2236, 10.1036],
  ['Weißenhorn', 48.3036, 10.1561], ['Vöhringen', 48.2786, 10.0844], ['Günzburg', 48.4527, 10.2771],
  ['Bubesheim', 48.4333, 10.24], ['Leipheim', 48.4486, 10.2214], ['Beimerstetten', 48.4806, 9.9839],
]
const CENTER: [number, number] = [48.3984, 9.9916]
const OFF: Record<string, [number, number]> = { Ulm: [-34, -8], 'Neu-Ulm': [8, 16], Blaustein: [-66, 4], Blaubeuren: [-74, 4], Dornstadt: [-66, -2], Erbach: [-50, 4], Elchingen: [8, -4], Günzburg: [8, -6], Bubesheim: [8, 12], Ehingen: [-56, 4], Laupheim: [-62, 4] }

function proj(lat: number, lon: number, scale = 6.6, cx = 330, cy = 300): [number, number] {
  const x = (lon - CENTER[1]) * Math.cos((CENTER[0] * Math.PI) / 180) * 111.32
  const y = (CENTER[0] - lat) * 110.57
  return [cx + x * scale, cy + y * scale]
}
function rng(seed: number) {
  let s = seed >>> 0
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
}
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

export function regionMap(opts: { refs?: number; highlight?: { name: string; lat: number; lng: number } | null; seed?: number } = {}) {
  const { refs = 0, highlight = null, seed = 3 } = opts
  const W = 660, H = 600
  const s = [`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Region 40 Kilometer um Ulm"><rect width="${W}" height="${H}" fill="#eceee8"/>`]
  const [cx, cy] = proj(...CENTER)
  const r40 = 40 * 6.6
  s.push(`<circle cx="${cx}" cy="${cy}" r="${r40}" fill="rgba(48,47,119,.07)" stroke="#302f77" stroke-dasharray="5 6"/>`)
  s.push(`<circle cx="${cx}" cy="${cy}" r="${r40 / 2}" fill="none" stroke="#302f77" stroke-opacity=".35" stroke-dasharray="3 6"/>`)
  const donau: [number, number][] = [[48.26, 9.62], [48.28, 9.72], [48.33, 9.89], [48.38, 9.96], [48.395, 9.99], [48.41, 10.05], [48.43, 10.1], [48.445, 10.22], [48.455, 10.29], [48.48, 10.38]]
  const iller: [number, number][] = [[48.15, 10.12], [48.22, 10.1], [48.28, 10.08], [48.33, 10.05], [48.38, 10.01], [48.395, 9.995]]
  for (const [river, w] of [[donau, 7], [iller, 4]] as const) {
    const pts = river.map(([a, b]) => proj(a, b).map((v) => v.toFixed(1)).join(',')).join(' ')
    s.push(`<polyline points="${pts}" fill="none" stroke="#bcd6ec" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"/>`)
  }
  const rnd = rng(seed)
  for (let i = 0; i < refs; i++) {
    const a = rnd() * 6.283, d = Math.pow(rnd(), 0.8) * r40 * 0.95
    s.push(`<circle cx="${(cx + d * Math.cos(a)).toFixed(1)}" cy="${(cy + d * Math.sin(a)).toFixed(1)}" r="4" fill="#302f77" fill-opacity=".55"/>`)
  }
  s.push('<g font-family="Roboto, sans-serif" font-size="12" fill="#3f4a52">')
  const towns = [...TOWNS]
  if (highlight && !towns.some((t) => t[0] === highlight.name)) towns.push([highlight.name, highlight.lat, highlight.lng])
  for (const [n, la, lo] of towns) {
    const hl = highlight?.name === n
    if ((n === 'Beimerstetten' || n === 'Leipheim') && !hl) continue
    const [x, y] = proj(la, lo)
    const [dx, dy] = OFF[n] || [8, 4]
    const big = n === 'Ulm' || n === 'Neu-Ulm'
    s.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${hl ? 6 : big ? 4 : 3}" fill="${hl || big ? '#302f77' : '#3f4a52'}"/>`)
    s.push(`<text x="${(x + dx).toFixed(1)}" y="${(y + dy).toFixed(1)}" font-size="${hl || big ? 14 : 12}" font-weight="${hl || big ? 500 : 400}" fill="${hl ? '#302f77' : '#3f4a52'}">${esc(n)}</text>`)
  }
  s.push(`<text x="${cx}" y="${cy - r40 - 8}" text-anchor="middle" fill="#302f77" font-size="12">40 km</text><text x="${cx}" y="${cy - r40 / 2 - 6}" text-anchor="middle" fill="#302f77" fill-opacity=".6" font-size="11">20 km</text></g></svg>`)
  return `<div class="mapbox">${s.join('')}</div>`
}

/** Versetzt den Kreismittelpunkt um bis zu ~350 m (deterministisch je Objekt), damit die genaue Adresse nicht ablesbar ist */
export function versatz(lat: number, lng: number, key: string): [number, number] {
  let h = 0
  for (const c of key) h = (h * 31 + c.charCodeAt(0)) >>> 0
  const r = rng(h)
  const ang = r() * Math.PI * 2, dist = 150 + r() * 200
  return [lat + (dist * Math.cos(ang)) / 111320, lng + (dist * Math.sin(ang)) / (111320 * Math.cos((lat * Math.PI) / 180))]
}
