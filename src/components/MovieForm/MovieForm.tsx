import type { FormEvent } from 'react'
import type { MovieProps } from '../../types/movie'
import './MovieForm.css'

type MovieFormProps = {
  movie?: MovieProps
  onFormSubmit: (movieData: MovieProps) => void
}

function formatDateForInput(date?: Date): string {
  if (!date) return ''

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function MovieForm({ movie, onFormSubmit }: MovieFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const rawData = Object.fromEntries(formData)

    const submittedMovie: MovieProps = {
      movieId: movie?.movieId ?? Date.now(),
      movieTitle: String(rawData.movieTitle),
      movieCover: String(rawData.movieCover),
      movieReleaseDate: new Date(String(rawData.movieReleaseDate)),
      movieRelevantGenre: String(rawData.movieRelevantGenre)
        .split(',')
        .map((genre) => genre.trim())
        .filter(Boolean),
      movieRating: Number(rawData.movieRating),
      movieDuration: Number(rawData.movieDuration),
      movieDescription: String(rawData.movieDescription),
    }

    onFormSubmit(submittedMovie)
  }

  return (
    <form onSubmit={handleSubmit} className="movie-form">
      <div className="movie-form__field">
        <label className="movie-form__label" htmlFor="movieTitle">
          Title
        </label>
        <input
          id="movieTitle"
          className="movie-form__input"
          name="movieTitle"
          type="text"
          defaultValue={movie?.movieTitle}
          placeholder="Moana"
          required
        />
      </div>

      <div className="movie-form__field">
        <label className="movie-form__label" htmlFor="movieReleaseDate">
          Release Date
        </label>
        <input
          id="movieReleaseDate"
          className="movie-form__input"
          name="movieReleaseDate"
          type="date"
          defaultValue={formatDateForInput(movie?.movieReleaseDate)}
          required
        />
      </div>

      <div className="movie-form__field">
        <label className="movie-form__label" htmlFor="movieCover">
          Movie URL
        </label>
        <input
          id="movieCover"
          className="movie-form__input"
          name="movieCover"
          type="url"
          defaultValue={movie?.movieCover}
          placeholder="https://"
          required
        />
      </div>

      <div className="movie-form__field">
        <label className="movie-form__label" htmlFor="movieRating">
          Rating
        </label>
        <input
          id="movieRating"
          className="movie-form__input"
          name="movieRating"
          type="number"
          min="0"
          max="10"
          step="0.1"
          defaultValue={movie?.movieRating}
          placeholder="7.8"
        />
      </div>

      <div className="movie-form__field">
        <label className="movie-form__label" htmlFor="movieRelevantGenre">
          Genre
        </label>
        <input
          id="movieRelevantGenre"
          className="movie-form__input"
          name="movieRelevantGenre"
          type="text"
          defaultValue={movie?.movieRelevantGenre?.join(', ')}
          placeholder="Enter genres"
          required
        />
      </div>

      <div className="movie-form__field">
        <label className="movie-form__label" htmlFor="movieDuration">
          Runtime
        </label>
        <input
          id="movieDuration"
          className="movie-form__input"
          name="movieDuration"
          type="number"
          min="1"
          defaultValue={movie?.movieDuration}
          placeholder="minutes"
          required
        />
      </div>

      <div className="movie-form__field movie-form__field--full">
        <label className="movie-form__label" htmlFor="movieDescription">
          Overview
        </label>
        <textarea
          id="movieDescription"
          className="movie-form__textarea"
          name="movieDescription"
          defaultValue={movie?.movieDescription}
          placeholder="Movie description"
          rows={5}
          required
        />
      </div>

      <div className="movie-form__actions">
        <button type="reset" className="movie-form__button movie-form__button--reset">
          Reset
        </button>
        <button type="submit" className="movie-form__button movie-form__button--submit">
          Submit
        </button>
      </div>
    </form>
  )
}

export default MovieForm
