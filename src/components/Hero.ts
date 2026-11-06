import type { Media } from '../types'
import { escapeHtml as e } from '../utils/dom'
import { imageUrl } from '../services/tmdb'

export function hero(item: Media): string {
  return `<section class="hero featured-hero" aria-labelledby="featured-title">${item.backdrop ? `<img class="hero-backdrop" src="${imageUrl(item.backdrop, 'w1280')}" alt="" fetchpriority="high">` : ''}<div class="hero-content"><p class="eyebrow">PELÍCULA DESTACADA · ESTA SEMANA</p><h2 id="featured-title">${e(item.title)}</h2><p class="featured-meta">★ ${item.rating ? item.rating.toFixed(1) + ' / 10' : 'Sin valoración'} · ${e(item.date.slice(0, 4) || 'Sin fecha')}</p><p class="hero-description">${e(item.overview || 'Todavía no hay una sinopsis disponible en español.')}</p><a class="button primary" href="#/movies">Explorar películas ↗</a><p class="hero-note">Detalles y favoritos disponibles en próximas etapas.</p></div></section>`
}
