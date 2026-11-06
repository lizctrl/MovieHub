export type Route = '/' | '/movies' | '/tv' | '/favorites'
export interface NavigationItem { path: Route; label: string }
export type MediaType = 'movie' | 'tv'
export interface Media {
  id: number
  type: MediaType
  title: string
  overview: string
  poster: string | null
  backdrop: string | null
  date: string
  rating: number
}
