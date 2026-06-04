import MovieDetails from "../MovieDetails/MovieDetails";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../../api/movies";
import { useEffect, useState } from "react";

export function MovieDetailsPage() {
  const { id } = useParams();
  const movieId = Number(id);
  const navigate = useNavigate();
  const { state } = useLocation();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [movie, setMovie] = useState(state?.movie);

  const beginFetch = () => {
    setLoading(true);
    setError(null);
  };

  useEffect(() => {
    if (!id || Number.isNaN(movieId)) {
      setError("Invalid movie id");
      setLoading(false);
      return;
    }

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

    beginFetch();

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
  }, [movieId, state?.movie]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!movie) return <p>Movie not found</p>;

  const returnSearch = (state as { returnSearch?: string } | null)?.returnSearch;

  const handleBackToSearch = () => {
    if (returnSearch) {
      navigate({ pathname: "/", search: `?${returnSearch}` });
      return;
    }
    navigate("/");
  };

  return (
    <>
      <MovieDetails
        key={movieId}
        movie={movie}
        onSearchClick={handleBackToSearch}
      />
    </>
  );
}
