import SearchForm from "../SearchForm/SearchForm";
import MovieListPage from "../MovieListPage/MovieListPage";
import MoviesToolbar from "../MoviesToolbar/MoviesToolbar";
import type { MovieProps } from "../../types/movie";
import { useState, useEffect } from "react";
import { getMovies } from "../../api/movies";
import { useNavigate, useSearchParams } from "react-router-dom";

type HomePageProps = {
  onAddMovie: () => void;
  onEditMovie: (movie: MovieProps) => void;
};

export function HomePage({ onAddMovie, onEditMovie }: HomePageProps) {
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

  const beginFetch = () => {
    setLoading(true);
    setError(null);
  };

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

  const handleMovieClick = (movie: MovieProps) => {
    navigate(`/movies/${movie.movieId}`, {
      state: { movie, returnSearch: searchParams.toString() },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMovieDelete = (_movieId: number) => {
    void _movieId;
    console.log("Movie deleted");
  };

  const handleSearch = (query: string) => {
    beginFetch();
    setSearchParams((prev) => {
      if (query) prev.set("search", query);
      else prev.delete("search");
      return prev;
    });
  };

  const handleGenre = (genre: string) => {
    beginFetch();
    setSearchParams((prev) => {
      if (genre === "all") prev.delete("genre");
      else prev.set("genre", genre);
      return prev;
    });
  };

  const handleSorting = (sorting: string) => {
    beginFetch();
    setSearchParams((prev) => {
      prev.set("sortBy", sorting);
      return prev;
    });
  };

  if (loading && movies.length === 0) return <p>Loading...</p>;
  if (error && movies.length === 0) return <p>Error: {error}</p>;

  return (
    <>
      <SearchForm
        searchQuery={searchQuery}
        onSearch={handleSearch}
        onAddMovie={onAddMovie}
      />
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
        onEdit={onEditMovie}
        onDelete={handleMovieDelete}
      />
    </>
  );
}
