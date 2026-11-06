export function loadingSkeleton(): string {
  return `<p class="sr-only" role="status">Cargando contenido de TMDB…</p><div class="media-grid" aria-hidden="true">${Array.from({ length: 6 }, () => '<div class="skeleton-card"><div></div><span></span><span></span></div>').join('')}</div>`
}
