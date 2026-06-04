import { useState, type MouseEvent } from 'react'
import './MovieTitle.css'
import type { MovieProps } from '../../types/movie'

type MovieTitleProps = {
  movie: MovieProps
  onMovieClick: (movie: MovieProps) => void
  onEdit: (movie: MovieProps) => void
  onDelete: (movieId: number) => void
}

function MovieTitle({
  movie,
  onMovieClick,
  onEdit,
  onDelete,
}: MovieTitleProps) {
  const [isPopupOpen, togglePopup] = useState(false)
  const [imageLoadFailed, setImageLoadFailed] = useState(false)
  const [prevCover, setPrevCover] = useState(movie.movieCover)

  if (movie.movieCover !== prevCover) {
    setPrevCover(movie.movieCover)
    setImageLoadFailed(false)
  }

  const hasPosterError = !movie.movieCover || imageLoadFailed

  const handleOpenMovie = () => onMovieClick(movie)

  const handleEdit = (event: MouseEvent) => {
    event.stopPropagation()
    togglePopup(false)
    onEdit(movie)
  }

  const handleDelete = (event: MouseEvent) => {
    event.stopPropagation()
    togglePopup(false)
    onDelete(movie.movieId)
  }

  return (
    <article
      className="movie-tile"
      role="button"
      tabIndex={0}
      onClick={handleOpenMovie}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget) return
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleOpenMovie()
        }
      }}
    >
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
              <li>
                <button type="button" className="movie-tile__menu-item" onClick={handleEdit}>
                  Edit
                </button>
              </li>
              <li>
                <button type="button" className="movie-tile__menu-item" onClick={handleDelete}>
                  Delete
                </button>
              </li>
            </ul>
          </div>
        )}
        {hasPosterError ? (
          <div className="movie-tile__poster movie-tile__poster--placeholder" aria-hidden="true">
            No image
          </div>
        ) : (
          <img
            className="movie-tile__poster"
            src={movie.movieCover}
            alt={movie.movieTitle}
            onError={() => setImageLoadFailed(true)}
          />
        )}
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
