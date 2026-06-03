import { useState } from 'react'
import './App.css'
import Counter from './components/Counter/Counter'
import SearchForm from './components/SearchForm/SearchForm'
import GenreSelect from './components/GenreSelect/GenreSelect'
import Dialog from './components/Dialog/Dialog'
import MovieForm from './components/MovieForm/MovieForm'
import type { MovieProps } from './types/movie'
import { createPortal } from 'react-dom';

type DialogMode = 'add' | 'edit' | null

function App() {
  const handleSearch = (query: string) => console.log('User searched for: ', query)
  const genres = ['all', 'documentary', 'comedy', 'horror', 'crime']
  const [selectedGenre, setSelectedGenre] = useState(genres[0])
  const [dialogMode, setDialogMode] = useState<DialogMode>(null)
  const [editingMovie, setEditingMovie] = useState<MovieProps | undefined>()

  const handleGenre = (genre: string) => {
    setSelectedGenre(genre)
    console.log('User selected: ', genre, ' genre')
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
    handleCloseDialog()
  }

  return (
    <>
      <Counter count={0} />

      <SearchForm
        searchQuery="What do you want to watch?"
        onSearch={handleSearch}
        onAddMovie={handleAddMovie}
      />
      <GenreSelect genres={genres} selectedGenre={selectedGenre} onSelect={handleGenre} />

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
