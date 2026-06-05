import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import Dialog from "../Dialog/Dialog";
import MovieForm from "../MovieForm/MovieForm";
import { addMovie } from "../../api/movies";
import type { MovieProps } from "../../types/movie";

function AddMovieForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const navigateWithSearch = (pathname: string, movie?: MovieProps) => {
    const search = searchParams.toString();
    navigate(
      {
        pathname,
        search: search ? `?${search}` : "",
      },
      movie ? { state: { movie } } : undefined,
    );
  };

  const handleClose = () => {
    navigateWithSearch("/");
  };

  const handleFormSubmit = async (movieData: MovieProps) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const { movieId: _movieId, ...payload } = movieData;
      void _movieId;
      const created = await addMovie(payload);
      navigateWithSearch(`/${created.movieId}`, created);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to add movie",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <Dialog title="Add movie" onClose={handleClose}>
      {submitError && <p role="alert">{submitError}</p>}
      <MovieForm onFormSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
    </Dialog>,
    document.body,
  );
}

export default AddMovieForm;
