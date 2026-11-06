export function homePage(): string {
  return `<section class="hero" aria-labelledby="page-title">
    <div class="hero-art" aria-hidden="true"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="cinema-frame"><span>MH</span><small>UNA NUEVA PERSPECTIVA</small></div><span class="art-caption">EL COMIENZO DE UNA GRAN HISTORIA</span></div>
    <div class="hero-content"><p class="eyebrow"><span></span> PARA QUIENES AMAN LAS HISTORIAS</p>
    <h1 id="page-title" tabindex="-1">Tu próxima<br>obsesión empieza <em>aquí.</em></h1>
    <p class="hero-description">Un universo de películas y series por descubrir. Encuentra historias que se queden contigo.</p>
    <div class="actions"><a class="button primary" href="#/movies">Explorar películas <span aria-hidden="true">↗</span></a><a class="button secondary" href="#/tv">Descubrir series</a></div>
    <p class="hero-note">SIN REGISTROS. SOLO BUENAS HISTORIAS.</p></div>
  </section>
  <section class="discover container" aria-labelledby="discover-title"><div class="section-heading"><div><p class="eyebrow">ELIGE TU PRÓXIMO PLAN</p><h2 id="discover-title">Hay una historia para ti.</h2></div><span class="muted">Descubre. Explora. Vuelve.</span></div>
  <div class="discovery-grid">
    <a class="discovery-card" href="#/movies"><span class="category-number">01 / CINE</span><span class="category-icon" aria-hidden="true">▤</span><h3>Películas</h3><p>Historias para desconectar del mundo.</p><span class="card-link">Explorar películas <span aria-hidden="true">↗</span></span></a>
    <a class="discovery-card" href="#/tv"><span class="category-number">02 / SERIES</span><span class="category-icon" aria-hidden="true">▣</span><h3>Series</h3><p>Un episodio más. Y después otro.</p><span class="card-link">Descubrir series <span aria-hidden="true">↗</span></span></a>
    <a class="discovery-card" href="#/favorites"><span class="category-number">03 / TU COLECCIÓN</span><span class="category-icon" aria-hidden="true">♡</span><h3>Favoritos</h3><p>Un lugar para las historias que eliges.</p><span class="card-link">Ver mi colección <span aria-hidden="true">↗</span></span></a>
  </div><p class="stage-note">Datos e imágenes de TMDB. La búsqueda, los detalles y los favoritos llegarán en las próximas etapas.</p></section>`
}
