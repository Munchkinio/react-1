import MovieTitle from '../MovieTitle/MovieTitle'
import MovieListEmptyState from '../MovieListEmptyState/MovieListEmptyState'
import type { MovieProps } from '../../types/movie'
import './MovieListPage.css'

type MovieListPageProps = {
  movies: MovieProps[]
  onMovieClick: (movie: MovieProps) => void
  onEdit: (movie: MovieProps) => void
  onDelete: (movieId: number) => void
  searchQuery?: string
  selectedGenre?: string
  onClearSearch?: () => void
}

function MovieListPage({
  movies,
  onMovieClick,
  onEdit,
  onDelete,
  searchQuery = '',
  selectedGenre = 'all',
  onClearSearch = () => {},
}: MovieListPageProps) {
  if (movies.length === 0) {
    return (
      <section className="movie-list">
        <MovieListEmptyState
          searchQuery={searchQuery}
          selectedGenre={selectedGenre}
          onClearSearch={onClearSearch}
        />
      </section>
    )
  }

  const countLabel = movies.length === 1 ? 'movie found' : 'movies found'

  return (
    <section className="movie-list">
      <p className="movie-list__count">
        {movies.length} {countLabel}
      </p>

      <ul className="movie-list__grid">
        {movies.map((movie) => (
          <li key={movie.movieId} className="movie-list__item">
            <MovieTitle
              movie={movie}
              onMovieClick={onMovieClick}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default MovieListPage
