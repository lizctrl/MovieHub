import type { NavigationItem, Route } from '../types'

const items: NavigationItem[] = [
  { path: '/', label: 'Inicio' },
  { path: '/movies', label: 'Películas' },
  { path: '/tv', label: 'Series' },
  { path: '/favorites', label: 'Favoritos' },
]

export function createNavbar(): HTMLElement {
  const header = document.createElement('header')
  header.className = 'site-header'
  header.innerHTML = `
    <div class="navbar container">
      <a class="brand" href="#/" aria-label="MovieHub, inicio"><span class="brand-icon" aria-hidden="true">▶</span>Movie<span>Hub</span></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation">Menú <span aria-hidden="true">☰</span></button>
      <nav id="primary-navigation" aria-label="Navegación principal">
        ${items.map(item => `<a href="#${item.path}">${item.label}</a>`).join('')}
      </nav>
      <span class="nav-caption">TU PRÓXIMA GRAN HISTORIA</span>
    </div>`
  const toggle = header.querySelector<HTMLButtonElement>('.menu-toggle')!
  const nav = header.querySelector<HTMLElement>('nav')!
  const close = () => {
    toggle.setAttribute('aria-expanded', 'false')
    nav.classList.remove('is-open')
  }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true'
    toggle.setAttribute('aria-expanded', String(open))
    nav.classList.toggle('is-open', open)
  })
  nav.addEventListener('click', close)
  header.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      close()
      toggle.focus()
    }
  })
  return header
}

export function updateNavbar(header: HTMLElement, route: Route | null): void {
  header.querySelectorAll<HTMLAnchorElement>('nav a').forEach(link => {
    if (link.hash === `#${route}`) link.setAttribute('aria-current', 'page')
    else link.removeAttribute('aria-current')
  })
}
