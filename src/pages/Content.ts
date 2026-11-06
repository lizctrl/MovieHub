import { tmdb, hasToken } from '../services/tmdb'
import type { Media, Route } from '../types'
import { movieCard, bindImageFallbacks } from '../components/MovieCard'
import { loadingSkeleton } from '../components/LoadingSkeleton'
import { hero } from '../components/Hero'
import { escapeHtml as e } from '../utils/dom'

type Section = { title: string; load: (signal: AbortSignal) => Promise<Media[]>; featured?: boolean }
export function mountContent(root: HTMLElement, route: Route, signal: AbortSignal): void {
  if (route === '/favorites') return
  const home = route === '/'
  const host = document.createElement('div')
  host.className = 'live-content'
  if (home) root.querySelector('.hero')?.remove()
  else root.querySelector('.empty-state')?.remove()
  const heading = home ? document.createElement('h1') : null
  if (heading) {
    heading.id = 'page-title'; heading.tabIndex = -1; heading.className = 'sr-only'
    heading.textContent = 'Descubre películas y series'; host.append(heading)
  }
  const target = home ? root : root.querySelector('.page-section')!
  target.prepend(host)
  if (!home) target.append(host)
  if (!hasToken) {
    host.innerHTML += `<section class="container setup-state"><p class="eyebrow">CONECTA TU CATÁLOGO</p><h2>Tu entrada al universo de TMDB</h2><p>Configura <code>VITE_TMDB_READ_ACCESS_TOKEN</code> en <code>.env.local</code> y reinicia el servidor de desarrollo para ver películas y series reales.</p><p>Consulta el README para obtener tu token. Las credenciales VITE_ son públicas en el navegador.</p><a class="button primary" href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer">Obtener token en TMDB ↗</a></section>`
    return
  }
  const sections: Section[] = home ? [
    { title: 'Tendencias de la semana', load: tmdb.trending, featured: true },
    { title: 'Películas populares', load: tmdb.popularMovies },
    { title: 'Series populares', load: tmdb.popularSeries },
    { title: 'Mejor valoradas', load: tmdb.topMovies },
  ] : route === '/movies' ? [
    { title: 'Películas populares', load: tmdb.popularMovies },
    { title: 'Mejor valoradas', load: tmdb.topMovies },
  ] : [
    { title: 'Series populares', load: tmdb.popularSeries },
    { title: 'Series en tendencia', load: tmdb.trendingSeries },
  ]
  const featured = document.createElement('div')
  if (home) host.append(featured)
  sections.forEach(section => {
    const element = document.createElement('section')
    element.className = home ? 'container media-section' : 'media-section'
    const title = document.createElement('h2'); title.textContent = section.title
    const body = document.createElement('div'); body.setAttribute('aria-live', 'polite')
    element.append(title, body); host.append(element)
    async function load(): Promise<void> {
      body.setAttribute('aria-busy', 'true'); body.innerHTML = loadingSkeleton()
      try {
        const items = await section.load(signal)
        if (signal.aborted) return
        body.innerHTML = items.length ? `<div class="media-grid">${items.slice(0, home ? 6 : 18).map(movieCard).join('')}</div>` : '<p class="content-message">No hay títulos disponibles en este momento.</p>'
        if (section.featured) {
          const movie = items.find(item => item.type === 'movie' && item.backdrop) ?? items.find(item => item.type === 'movie')
          if (movie) { featured.innerHTML = hero(movie); bindImageFallbacks(featured) }
        }
        bindImageFallbacks(body)
      } catch (error) {
        if (signal.aborted) return
        body.innerHTML = `<div class="content-message" role="alert"><p>${e(error instanceof Error ? error.message : 'No pudimos cargar el contenido.')}</p><button class="button secondary" type="button">Reintentar</button></div>`
        body.querySelector('button')?.addEventListener('click', () => { void load() })
      } finally {
        if (!signal.aborted) body.setAttribute('aria-busy', 'false')
      }
    }
    void load()
  })
}
