import type { Route } from './types'
import { homePage } from './pages/Home'
import { catalogPage } from './pages/Catalog'
import { favoritesPage } from './pages/Favorites'
import { mountContent } from './pages/Content'

const routes: Record<Route, { title: string; render: () => string }> = {
  '/': { title: 'Descubre tu próxima historia', render: homePage },
  '/movies': { title: 'Películas', render: () => catalogPage('movie') },
  '/tv': { title: 'Series', render: () => catalogPage('tv') },
  '/favorites': { title: 'Mis favoritos', render: favoritesPage },
}

export function startRouter(outlet: HTMLElement, onRoute: (route: Route | null) => void): void {
  let controller: AbortController | undefined
  function render(moveFocus: boolean): void {
    controller?.abort()
    controller = new AbortController()
    const path = (location.hash.slice(1) || '/').split('?')[0] || '/'
    const route = Object.hasOwn(routes, path) ? path as Route : null
    const page = route ? routes[route] : null
    outlet.innerHTML = page ? page.render() : `<section class="container page-section"><p class="eyebrow">404</p><h1 id="page-title" tabindex="-1">Esta historia no existe.</h1><p class="page-description">La página que buscas no está disponible.</p><a class="button primary" href="#/">Volver al inicio</a></section>`
    if (route) mountContent(outlet, route, controller.signal)
    document.title = `${page?.title ?? 'Página no encontrada'} · MovieHub`
    onRoute(route)
    if (moveFocus) {
      outlet.querySelector<HTMLElement>('#page-title')?.focus({ preventScroll: true })
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }
  window.addEventListener('hashchange', () => render(true))
  render(false)
}
