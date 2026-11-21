/** Lexical-JSON (Payload richText) → HTML. Deckt die im Editor üblichen Knoten ab. */
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function text(n: any): string {
  let t = esc(n.text || '')
  const f = n.format || 0
  if (f & 1) t = `<strong>${t}</strong>`
  if (f & 2) t = `<em>${t}</em>`
  if (f & 8) t = `<u>${t}</u>`
  if (f & 16) t = `<code>${t}</code>`
  return t
}

function node(n: any): string {
  const kids = () => (n.children || []).map(node).join('')
  switch (n.type) {
    case 'root': return kids()
    case 'text': return text(n)
    case 'linebreak': return '<br>'
    case 'paragraph': { const k = kids(); return k ? `<p>${k}</p>` : '' }
    case 'heading': return `<${n.tag}>${kids()}</${n.tag}>`
    case 'list': return `<${n.tag || (n.listType === 'number' ? 'ol' : 'ul')}>${kids()}</${n.tag || 'ul'}>`
    case 'listitem': return `<li>${kids()}</li>`
    case 'quote': return `<blockquote>${kids()}</blockquote>`
    case 'link':
    case 'autolink': {
      const url = n.fields?.url || n.url || '#'
      const ext = n.fields?.newTab ? ' target="_blank" rel="noopener"' : ''
      return `<a href="${esc(url)}"${ext}>${kids()}</a>`
    }
    case 'upload': {
      const v = n.value
      return v?.url ? `<figure><img src="${esc(v.url)}" alt="${esc(v.alt || '')}" loading="lazy"></figure>` : ''
    }
    case 'horizontalrule': return '<hr>'
    default: return kids()
  }
}

export function richText(data: any): string {
  if (!data) return ''
  if (typeof data === 'string') return `<p>${esc(data)}</p>`
  return node(data.root || data)
}

/** Text mit Zeilenumbrüchen → HTML mit <br> */
export const br = (s?: string | null) => esc(s || '').replace(/\n/g, '<br>')
