import MovieListPage from "../MovieListPage/MovieListPage";
import MoviesToolbar from "../MoviesToolbar/MoviesToolbar";
import type { MovieProps } from "../../types/movie";
import { useState, useEffect, useCallback, useMemo } from "react";
import { getMovies } from "../../api/movies";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";

export type MovieListOutletContext = {
  searchQuery: string;
  onSearch: (query: string) => void;
  onMovieUpdated: (movie: MovieProps) => void;
};

export function MovieListComponent() {
  const genres = ["all", "documentary", "comedy", "horror", "crime"];
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") ?? "";
  const selectedGenre = searchParams.get("genre") ?? "all";
  const sortOption = searchParams.get("sortBy") ?? "release_date";

  const MOVIE_SORT_OPTIONS = [
    { name: "Release Date", id: "release_date" },
    { name: "Title", id: "title" },
  ] as const;

  const navigate = useNavigate();

  useEffect(() => {
    let isCurrent = true;

    getMovies({
      filter: selectedGenre === "all" ? undefined : selectedGenre,
      search: searchQuery || "",
      searchBy: searchQuery ? "title" : undefined,
      sortBy: sortOption,
      sortOrder: "desc",
    })
      .then((data) => {
        if (!isCurrent) return;
        setMovies(data);
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
  }, [searchQuery, selectedGenre, sortOption]);

  const handleMovieUpdated = useCallback( (updated: MovieProps) => {
    setMovies((prev) =>
      prev.map((item) =>
        item.movieId === updated.movieId ? updated : item,
      ),
    );
  }, []);

  const handleMovieClick = (movie: MovieProps) => {
    navigate(`/${movie.movieId}`, {
      state: { movie, returnSearch: searchParams.toString() },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditMovie = (movie: MovieProps) => {
    const search = searchParams.toString();
    navigate(
      {
        pathname: `/${movie.movieId}/edit`,
        search: search ? `?${search}` : "",
      },
      { state: { movie } },
    );
  };

  const handleMovieDelete = (_movieId: number) => {
    void _movieId;
    console.log("Movie deleted");
  };

  const handleSearch = (query: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (query) next.set("search", query);
      else next.delete("search");
      return next;
    });
  };

  const handleGenre = (genre: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (genre === "all") next.delete("genre");
      else next.set("genre", genre);
      return next;
    });
  };

  const handleSorting = (sorting: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("sortBy", sorting);
      return next;
    });
  };

  const outletContext = useMemo<MovieListOutletContext>(
    () => ({
      searchQuery,
      onSearch: handleSearch,
      onMovieUpdated: handleMovieUpdated,
    }),
    [searchQuery, handleMovieUpdated],
  );

  if (loading && movies.length === 0) return <p>Loading...</p>;
  if (error && movies.length === 0) return <p>Error: {error}</p>;

  return (
    <>
      <Outlet context={outletContext} />
      <MoviesToolbar
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreSelect={handleGenre}
        sortOptions={[...MOVIE_SORT_OPTIONS]}
        currentSort={sortOption}
        onSortSelect={handleSorting}
      />
      <MovieListPage
        movies={movies}
        onMovieClick={handleMovieClick}
        onEdit={handleEditMovie}
        onDelete={handleMovieDelete}
        searchQuery={searchQuery}
        selectedGenre={selectedGenre}
        onClearSearch={() => handleSearch("")}
      />
    </>
  );
}
