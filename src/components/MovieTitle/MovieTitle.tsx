import { useState } from 'react'
import './MovieTitle.css'
import type { MovieProps } from '../../types/movie'

type MovieTitle = {
  movie: MovieProps,
  onMovieClick: (movieId: number) => void
}

function MovieTitle({
  movie,
  onMovieClick,
}: MovieTitle) {
  const [isPopupOpen, togglePopup] = useState(false)

  return (
    <article className="movie-tile" onClick={() => onMovieClick(movie.movieId)}>
      <div className="movie-tile__poster-wrap">
        <button
          type="button"
          className="movie-tile__menu"
          aria-label="Open movie menu"
          onClick={(e) => {
            e.stopPropagation()
            togglePopup((prev) => !prev)
          }}
        >
          ⋮
        </button>
        {isPopupOpen && (
          <div className="movie-tile__menu-popup">
            <button
              type="button"
              className="movie-tile__menu-close"
              aria-label="Close movie menu"
              onClick={(e) => {
                e.stopPropagation()
                togglePopup(false)
              }}
            >
              ×
            </button>
            <ul className="movie-tile__menu-list">
              <li>Edit</li>
              <li>Delete</li>
            </ul>
          </div>
        )}
        <img
          className="movie-tile__poster"
          src={movie.movieCover}
          alt={movie.movieTitle}
        />
      </div>

      <div className="movie-tile__info">
        <div className="movie-tile__header">
          <h3 className="movie-tile__title">{movie.movieTitle}</h3>
          <span className="movie-tile__year">
            {movie.movieReleaseDate.getFullYear()}
          </span>
        </div>
        <p className="movie-tile__genres">
          {movie.movieRelevantGenre.join(', ')}
        </p>
      </div>
    </article>
  )
}

export default MovieTitle
