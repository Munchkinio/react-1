import MovieTitle from '../MovieTitle/MovieTitle'
import type { MovieProps } from '../../types/movie'
import './MovieListPage.css'

type MovieListPageProps = {
  movies: MovieProps[]
  onMovieClick: (movie: MovieProps) => void
  onEdit: (movie: MovieProps) => void
  onDelete: (movieId: number) => void
}

function MovieListPage({ movies, onMovieClick, onEdit, onDelete }: MovieListPageProps) {
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
