import MovieDetails from "../MovieDetails/MovieDetails";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../../api/movies";
import { useEffect, useState } from "react";

export function MovieDetailsPage() {
  const { id } = useParams();
  const movieId = Number(id);
  const navigate = useNavigate();
  const { state } = useLocation();

  const isInvalidMovieId =
    !id ||
    !Number.isFinite(movieId) ||
    !Number.isInteger(movieId) ||
    movieId <= 0;

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(() => !isInvalidMovieId);
  const [movie, setMovie] = useState(state?.movie);

  useEffect(() => {
    if (isInvalidMovieId) return;

    if (movie?.movieId === movieId) {
      setLoading(false);
      return;
    }

    const passedMovie = state?.movie;
    if (passedMovie?.movieId === movieId) {
      setMovie(passedMovie);
      setLoading(false);
      return;
    }

    let isCurrent = true;

    setLoading(true);
    setError(null);

    getMovieById(movieId)
      .then((data) => {
        if (!isCurrent) return;
        setMovie(data);
      })
      .catch((err) => {
        if (!isCurrent) return;
        setError(err.message);
      })
      .finally(() => {
        if (!isCurrent) return;
        setLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [isInvalidMovieId, movieId, state?.movie, movie?.movieId]);

  if (isInvalidMovieId) return <p>Error: Invalid movie id</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!movie) return <p>Movie not found</p>;

  const returnSearch = (state as { returnSearch?: string } | null)
    ?.returnSearch;

  const handleBackToSearch = () => {
    if (returnSearch) {
      navigate({ pathname: "/", search: `?${returnSearch}` });
      return;
    }
    navigate("/");
  };

  return (
    <MovieDetails
      key={movieId}
      movie={movie}
      onSearchClick={handleBackToSearch}
    />
  );
}
