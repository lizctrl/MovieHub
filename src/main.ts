import './styles/main.css'
import { createNavbar, updateNavbar } from './components/Navbar'
import { startRouter } from './router'

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('No se encontró el contenedor de MovieHub.')

app.innerHTML = `<a class="skip-link" href="#main-content">Saltar al contenido</a>`
const navbar = createNavbar()
const main = document.createElement('main')
main.id = 'main-content'
main.tabIndex = -1
const footer = document.createElement('footer')
footer.className = 'site-footer container'
footer.innerHTML = `<a class="brand footer-brand" href="#/">Movie<span>Hub</span></a><p>Hecho con pasión por las historias <span aria-hidden="true">·</span> Code by Liz</p><span class="footer-note">EL CINE NOS CONECTA.</span>`
const attribution = document.createElement('section')
attribution.className = 'attribution container'
attribution.setAttribute('aria-label', 'Acerca de los datos de MovieHub')
attribution.innerHTML = `<a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" aria-label="The Movie Database"><img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8f56807c8c39f25c1b937bf831e3c722c30c3b7782fbcf666b7947cd5f0edcbb.svg" alt="TMDB" width="100" height="14"></a><p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>`
app.append(navbar, main, attribution, footer)
app.querySelector<HTMLAnchorElement>('.skip-link')?.addEventListener('click', event => {
  event.preventDefault()
  main.focus()
  main.scrollIntoView({ block: 'start' })
})
startRouter(main, route => updateNavbar(navbar, route))
