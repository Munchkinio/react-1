import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Dialog from "../Dialog/Dialog";
import MovieForm from "../MovieForm/MovieForm";
import { getMovieById, updateMovie } from "../../api/movies";
import type { MovieListOutletContext } from "../MovieListComponent/MovieListComponent";
import type { MovieProps } from "../../types/movie";

function EditMovieForm() {
  const { movieId: id } = useParams();
  const movieId = Number(id);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const { onMovieUpdated } = useOutletContext<MovieListOutletContext>();

  const isInvalidMovieId =
    !id ||
    !Number.isFinite(movieId) ||
    !Number.isInteger(movieId) ||
    movieId <= 0;

  const [movie, setMovie] = useState<MovieProps | undefined>();
  const [loading, setLoading] = useState(() => !isInvalidMovieId);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (isInvalidMovieId) return;

    const passedMovie = (state as { movie?: MovieProps } | null)?.movie;
    if (passedMovie?.movieId === movieId) {
      setMovie(passedMovie);
      setLoading(false);
      return;
    }

    let isCurrent = true;
    setLoading(true);
    setLoadError(null);

    getMovieById(movieId)
      .then((data) => {
        if (!isCurrent) return;
        setMovie(data);
      })
      .catch((error) => {
        if (!isCurrent) return;
        setLoadError(
          error instanceof Error ? error.message : "Failed to load movie",
        );
      })
      .finally(() => {
        if (!isCurrent) return;
        setLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [isInvalidMovieId, movieId, state]);

  const navigateWithSearch = (pathname: string) => {
    const search = searchParams.toString();
    navigate({
      pathname,
      search: search ? `?${search}` : "",
    });
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
      const updated = await updateMovie(movieId, payload);
      onMovieUpdated(updated);
      navigateWithSearch("/");
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to update movie",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const dialogContent = (() => {
    if (isInvalidMovieId) {
      return <p role="alert">Error: Invalid movie id</p>;
    }
    if (loading) {
      return <p>Loading...</p>;
    }
    if (loadError) {
      return <p role="alert">{loadError}</p>;
    }
    if (!movie) {
      return <p>Movie not found</p>;
    }

    return (
      <>
        {submitError && <p role="alert">{submitError}</p>}
        <MovieForm
          key={movie.movieId}
          movie={movie}
          onFormSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      </>
    );
  })();

  return createPortal(
    <Dialog title="Edit movie" onClose={handleClose}>
      {dialogContent}
    </Dialog>,
    document.body,
  );
}

export default EditMovieForm;
