import type { Media, MediaType } from '../types'

const baseUrl = 'https://api.themoviedb.org/3/'
export const hasToken = Boolean(import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN?.trim())
export class TmdbError extends Error {}

function object(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
function string(value: unknown): string { return typeof value === 'string' ? value : '' }
function imagePath(value: unknown): string | null {
  return typeof value === 'string' && /^\/[a-zA-Z0-9_.-]+$/.test(value) ? value : null
}
export function parseMedia(value: unknown, fallback?: MediaType): Media | null {
  if (!object(value)) return null
  const type = value.media_type ?? fallback
  if ((type !== 'movie' && type !== 'tv') || typeof value.id !== 'number' || !Number.isInteger(value.id) || value.id <= 0) return null
  const title = string(type === 'movie' ? value.title : value.name)
  if (!title) return null
  return {
    id: value.id, type, title, overview: string(value.overview),
    poster: imagePath(value.poster_path), backdrop: imagePath(value.backdrop_path),
    date: string(type === 'movie' ? value.release_date : value.first_air_date),
    rating: typeof value.vote_average === 'number' && Number.isFinite(value.vote_average) ? Math.min(10, Math.max(0, value.vote_average)) : 0,
  }
}
export function imageUrl(path: string | null, size: 'w342' | 'w1280' = 'w342'): string {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : '/images/poster-placeholder.svg'
}
export async function getMedia(path: string, signal: AbortSignal, type?: MediaType): Promise<Media[]> {
  const token = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN?.trim()
  if (!token) throw new TmdbError('Falta configurar el token de TMDB.')
  const url = new URL(path, baseUrl)
  url.searchParams.set('language', 'es-ES')
  const timeout = new AbortController()
  const timer = setTimeout(() => timeout.abort(), 15000)
  let response: Response
  try {
    response = await fetch(url, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' }, signal: AbortSignal.any([signal, timeout.signal]) })
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) throw new TmdbError('TMDB rechazó la credencial. Revisa tu token de lectura y reinicia Vite.')
      if (response.status === 429) throw new TmdbError('TMDB recibió demasiadas peticiones. Espera un momento y vuelve a intentar.')
      throw new TmdbError(`TMDB no está disponible (HTTP ${response.status}). Intenta de nuevo.`)
    }
    const data: unknown = await response.json()
    if (!object(data) || !Array.isArray(data.results)) throw new TmdbError('TMDB devolvió una respuesta inesperada.')
    return data.results.map(item => parseMedia(item, type)).filter((item): item is Media => item !== null)
  } catch (error) {
    if (signal.aborted) throw error
    if (error instanceof TmdbError) throw error
    throw new TmdbError(timeout.signal.aborted ? 'TMDB tardó demasiado en responder. Intenta de nuevo.' : 'No pudimos conectar con TMDB. Comprueba tu conexión e intenta de nuevo.')
  } finally { clearTimeout(timer) }
}
export const tmdb = {
  trending: (signal: AbortSignal) => getMedia('trending/all/week', signal),
  popularMovies: (signal: AbortSignal) => getMedia('movie/popular', signal, 'movie'),
  popularSeries: (signal: AbortSignal) => getMedia('tv/popular', signal, 'tv'),
  topMovies: (signal: AbortSignal) => getMedia('movie/top_rated', signal, 'movie'),
  trendingSeries: (signal: AbortSignal) => getMedia('trending/tv/week', signal, 'tv'),
}
