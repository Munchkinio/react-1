import type { MovieProps } from '../../types/movie'
import './MovieDetails.css'

type MovieDetailsProps = {
  movie: MovieProps
  onSearchClick: () => void
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}min`
}

function MovieDetails({ movie, onSearchClick }: MovieDetailsProps) {
  return (
    <article className="movie-details" id={movie.movieId.toString()}>
      <header className="movie-details__header">
        <div className="movie-details__logo">
          <span className="movie-details__logo-netflix">netflix</span>
          <span className="movie-details__logo-roulette">roulette</span>
        </div>
        <button
          type="button"
          className="movie-details__search"
          aria-label="Open search"
          onClick={onSearchClick}
        >
          <svg
            className="movie-details__search-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      <div className="movie-details__content">
        <div className="movie-details__poster-wrap">
          <img
            className="movie-details__poster"
            src={movie.movieCover}
            alt={movie.movieTitle}
          />
        </div>

        <div className="movie-details__info">
          <div className="movie-details__title-row">
            <h1 className="movie-details__title">{movie.movieTitle}</h1>
            <span className="movie-details__rating">{movie.movieRating}</span>
          </div>

          <p className="movie-details__genres">
            {movie.movieRelevantGenre.join(', ')}
          </p>

          <div className="movie-details__meta">
            <span className="movie-details__year">
              {movie.movieReleaseDate.getFullYear()}
            </span>
            <span className="movie-details__duration">
              {formatDuration(movie.movieDuration)}
            </span>
          </div>

          <p className="movie-details__description">{movie.movieDescription}</p>
        </div>
      </div>
    </article>
  )
}

export default MovieDetails
