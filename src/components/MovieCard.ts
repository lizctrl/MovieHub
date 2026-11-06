import type { Media } from '../types'
import { imageUrl } from '../services/tmdb'
import { escapeHtml as e } from '../utils/dom'

export function movieCard(item: Media): string {
  const year = /^\d{4}-/.test(item.date) ? item.date.slice(0, 4) : 'Sin fecha'
  return `<article class="movie-card"><div class="poster-wrap"><img src="${imageUrl(item.poster)}" alt="Póster de ${e(item.title)}" loading="lazy" decoding="async" width="342" height="513"><span class="rating"><span aria-hidden="true">★</span> ${item.rating ? item.rating.toFixed(1) : 'S/V'}<span class="sr-only"> de 10</span></span></div><h3>${e(item.title)}</h3><p>${year}<span aria-hidden="true"> · </span>${item.type === 'movie' ? 'Película' : 'Serie'}</p></article>`
}
export function bindImageFallbacks(root: HTMLElement): void {
  root.querySelectorAll<HTMLImageElement>('img').forEach(img => {
    img.addEventListener('error', () => {
      img.src = '/images/poster-placeholder.svg'
    }, { once: true })
  })
}
