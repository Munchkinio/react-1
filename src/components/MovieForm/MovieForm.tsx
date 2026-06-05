import { useForm } from "react-hook-form";
import type { FormEvent } from "react";
import type { MovieProps } from "../../types/movie";
import "./MovieForm.css";

export type MovieFormValues = {
  movieTitle: string;
  movieReleaseDate: string;
  movieCover: string;
  movieRating: string;
  movieRelevantGenre: string;
  movieDuration: string;
  movieDescription: string;
};

type MovieFormProps = {
  movie?: MovieProps;
  onFormSubmit: (movieData: MovieProps) => void | Promise<void>;
  isSubmitting?: boolean;
};

function formatDateForInput(date?: Date): string {
  if (!date) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateFromInput(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getDefaultValues(movie?: MovieProps): MovieFormValues {
  return {
    movieTitle: movie?.movieTitle ?? "",
    movieReleaseDate: formatDateForInput(movie?.movieReleaseDate),
    movieCover: movie?.movieCover ?? "",
    movieRating:
      movie?.movieRating === undefined ? "" : String(movie.movieRating),
    movieRelevantGenre: movie?.movieRelevantGenre?.join(", ") ?? "",
    movieDuration:
      movie?.movieDuration === undefined ? "" : String(movie.movieDuration),
    movieDescription: movie?.movieDescription ?? "",
  };
}

function MovieForm({ movie, onFormSubmit, isSubmitting = false }: MovieFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MovieFormValues>({
    defaultValues: getDefaultValues(movie),
  });

  const onSubmit = handleSubmit((data) => {
    void onFormSubmit({
      movieId: movie?.movieId ?? 0,
      movieTitle: data.movieTitle.trim(),
      movieCover: data.movieCover.trim(),
      movieReleaseDate: parseDateFromInput(data.movieReleaseDate),
      movieRelevantGenre: data.movieRelevantGenre
        .split(",")
        .map((genre) => genre.trim())
        .filter(Boolean),
      movieRating: Number(data.movieRating),
      movieDuration: Number(data.movieDuration),
      movieDescription: data.movieDescription.trim(),
    });
  });

  const handleReset = (event: FormEvent) => {
    event.preventDefault();
    reset(getDefaultValues(movie));
  };

  return (
    <form onSubmit={onSubmit} className="movie-form" noValidate>
      <div className="movie-form__field">
        <label className="movie-form__label" htmlFor="movieTitle">
          Title
        </label>
        <input
          id="movieTitle"
          className="movie-form__input"
          type="text"
          placeholder="Moana"
          aria-invalid={errors.movieTitle ? true : undefined}
          {...register("movieTitle", {
            required: "Title is required",
            minLength: {
              value: 2,
              message: "Title must be at least 2 characters",
            },
          })}
        />
        {errors.movieTitle && (
          <span className="movie-form__error" role="alert">
            {errors.movieTitle.message}
          </span>
        )}
      </div>

      <div className="movie-form__field">
        <label className="movie-form__label" htmlFor="movieReleaseDate">
          Release Date
        </label>
        <input
          id="movieReleaseDate"
          className="movie-form__input"
          type="date"
          aria-invalid={errors.movieReleaseDate ? true : undefined}
          {...register("movieReleaseDate", {
            required: "Release date is required",
          })}
        />
        {errors.movieReleaseDate && (
          <span className="movie-form__error" role="alert">
            {errors.movieReleaseDate.message}
          </span>
        )}
      </div>

      <div className="movie-form__field">
        <label className="movie-form__label" htmlFor="movieCover">
          Movie URL
        </label>
        <input
          id="movieCover"
          className="movie-form__input"
          type="url"
          placeholder="https://"
          aria-invalid={errors.movieCover ? true : undefined}
          {...register("movieCover", {
            required: "Poster URL is required",
            pattern: {
              value: /^https?:\/\/.+/i,
              message: "Enter a valid URL starting with http:// or https://",
            },
          })}
        />
        {errors.movieCover && (
          <span className="movie-form__error" role="alert">
            {errors.movieCover.message}
          </span>
        )}
      </div>

      <div className="movie-form__field">
        <label className="movie-form__label" htmlFor="movieRating">
          Rating
        </label>
        <input
          id="movieRating"
          className="movie-form__input"
          type="number"
          step="0.1"
          min="0"
          max="10"
          placeholder="7.8"
          aria-invalid={errors.movieRating ? true : undefined}
          {...register("movieRating", {
            required: "Rating is required",
            validate: (value) => {
              const parsed = Number(value);
              if (!Number.isFinite(parsed)) return "Rating must be a valid number";
              if (parsed < 0) return "Rating must be at least 0";
              if (parsed > 10) return "Rating must be at most 10";
              return true;
            },
          })}
        />
        {errors.movieRating && (
          <span className="movie-form__error" role="alert">
            {errors.movieRating.message}
          </span>
        )}
      </div>

      <div className="movie-form__field">
        <label className="movie-form__label" htmlFor="movieRelevantGenre">
          Genre
        </label>
        <input
          id="movieRelevantGenre"
          className="movie-form__input"
          type="text"
          placeholder="Enter genres"
          aria-invalid={errors.movieRelevantGenre ? true : undefined}
          {...register("movieRelevantGenre", {
            required: "At least one genre is required",
          })}
        />
        {errors.movieRelevantGenre && (
          <span className="movie-form__error" role="alert">
            {errors.movieRelevantGenre.message}
          </span>
        )}
      </div>

      <div className="movie-form__field">
        <label className="movie-form__label" htmlFor="movieDuration">
          Runtime
        </label>
        <input
          id="movieDuration"
          className="movie-form__input"
          type="number"
          min="1"
          placeholder="minutes"
          aria-invalid={errors.movieDuration ? true : undefined}
          {...register("movieDuration", {
            required: "Runtime is required",
            validate: (value) => {
              const parsed = Number(value);
              if (!Number.isFinite(parsed)) return "Runtime must be a valid number";
              if (parsed < 1) return "Runtime must be at least 1 minute";
              return true;
            },
          })}
        />
        {errors.movieDuration && (
          <span className="movie-form__error" role="alert">
            {errors.movieDuration.message}
          </span>
        )}
      </div>

      <div className="movie-form__field movie-form__field--full">
        <label className="movie-form__label" htmlFor="movieDescription">
          Overview
        </label>
        <textarea
          id="movieDescription"
          className="movie-form__textarea"
          placeholder="Movie description"
          rows={5}
          aria-invalid={errors.movieDescription ? true : undefined}
          {...register("movieDescription", {
            required: "Overview is required",
            minLength: {
              value: 10,
              message: "Overview must be at least 10 characters",
            },
          })}
        />
        {errors.movieDescription && (
          <span className="movie-form__error" role="alert">
            {errors.movieDescription.message}
          </span>
        )}
      </div>

      <div className="movie-form__actions">
        <button
          type="button"
          className="movie-form__button movie-form__button--reset"
          onClick={handleReset}
          disabled={isSubmitting}
        >
          Reset
        </button>
        <button
          type="submit"
          className="movie-form__button movie-form__button--submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default MovieForm;
