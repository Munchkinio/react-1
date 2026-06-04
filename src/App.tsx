import { useState, useEffect } from 'react'
import './App.css'
import SearchForm from './components/SearchForm/SearchForm'
import Dialog from './components/Dialog/Dialog'
import MovieForm from './components/MovieForm/MovieForm'
import type { MovieProps } from './types/movie'
import { createPortal } from 'react-dom';
import MovieListPage from './components/MovieListPage/MovieListPage'
import { getMovies } from './api/movies'
import MovieDetails from './components/MovieDetails/MovieDetails'
import MoviesToolbar from './components/MoviesToolbar/MoviesToolbar'

type DialogMode = 'add' | 'edit' | null

const MOVIE_SORT_OPTIONS = [
  { name: 'Release Date', id: 'release_date' },
  { name: 'Title', id: 'title' },
] as const

function App() {
  const handleSearch = (query: string) => setQuery(query)
  const genres = ['all', 'documentary', 'comedy', 'horror', 'crime']
  const [searchQuery, setQuery] = useState<string | undefined>(undefined)
  const [sortOption, setSorting] = useState('release_date')
  const [selectedGenre, setSelectedGenre] = useState(genres[0])
  const [selectedMovie, setSelectedMovie] = useState<MovieProps | undefined>(undefined);
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [editingMovie, setEditingMovie] = useState<MovieProps | undefined>();
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isCurrent = true

    setLoading(true)
    setError(null)

    getMovies({
      filter: selectedGenre === 'all' ? undefined : selectedGenre,
      search: searchQuery || '',
      searchBy: searchQuery ? 'title' : undefined,
      sortBy: sortOption,
      sortOrder: 'desc',
    })
      .then((data) => {
        if (!isCurrent) return
        setMovies(data)
      })
      .catch((err) => {
        if (!isCurrent) return
        setError(err.message)
      })
      .finally(() => {
        if (!isCurrent) return
        setLoading(false)
      })

    return () => {
      isCurrent = false
    }
  }, [searchQuery, selectedGenre, sortOption])

  const handleGenre = (genre: string) => {
    setSelectedGenre(genre);
  }

  const handleAddMovie = () => {
    setEditingMovie(undefined)
    setDialogMode('add')
  }

  const handleCloseDialog = () => {
    setDialogMode(null)
    setEditingMovie(undefined)
  }

  const handleFormSubmit = (movieData: MovieProps) => {
    console.log(dialogMode === 'add' ? 'Movie added: ' : 'Movie updated: ', movieData)
    handleCloseDialog();
  }

  const handleMovieClick = (movie: MovieProps) => {
    setSelectedMovie(movie);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleMovieDetailsClose = () => {
    setSelectedMovie(undefined);
  }

  const handleMovieEdit = (_movie: MovieProps) => {
    console.log('Movie edited')
  }
  const handleMovieDelete = (_movieId: number) => { console.log('Movie deleted') }

  const handleSorting = (sorting: string) => {
    setSorting(sorting);
  }

  if (loading && movies.length === 0) return <p>Loading...</p>
  if (error && movies.length === 0) return <p>Error: {error}</p>

  return (
    <>
      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} onSearchClick={handleMovieDetailsClose} />
      ) : (
        <>
          <SearchForm
            onSearch={handleSearch}
            onAddMovie={handleAddMovie}
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
            onEdit={handleMovieEdit}
            onDelete={handleMovieDelete}
          />
        </>
      )}

      {dialogMode && createPortal(
        <Dialog
          title={dialogMode === 'add' ? 'Add movie' : 'Edit movie'}
          onClose={handleCloseDialog}
        >
          <MovieForm movie={editingMovie} onFormSubmit={handleFormSubmit} />
        </Dialog>,
        document.body
      )}

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
