export function catalogPage(type: 'movie' | 'tv'): string {
  const movies = type === 'movie'
  return `<section class="container page-section"><p class="eyebrow">${movies ? 'LA MAGIA DEL CINE' : 'HISTORIAS QUE CONTINÚAN'}</p><h1 id="page-title" tabindex="-1">${movies ? 'Películas' : 'Series'}</h1><p class="page-description">${movies ? 'Tu próximo descubrimiento, en la gran pantalla.' : 'Encuentra tu próxima maratón.'}</p><div class="empty-state"><span class="empty-icon" aria-hidden="true">${movies ? '▤' : '▣'}</span><h2>El catálogo está en camino</h2><p>En la etapa 2 conectaremos TMDB para mostrar ${movies ? 'películas' : 'series'} reales, tendencias y novedades.</p><a class="button secondary" href="#/">Volver al inicio</a></div></section>`
}
