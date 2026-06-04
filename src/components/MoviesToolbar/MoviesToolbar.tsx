import GenreSelect from '../GenreSelect/GenreSelect'
import SortControl from '../SortControl/SortControl'
import './MoviesToolbar.css'

type SortOption = {
  name: string
  id: string
}

type MoviesToolbarProps = {
  genres: string[]
  selectedGenre: string
  onGenreSelect: (genre: string) => void
  sortOptions: SortOption[]
  currentSort: string
  onSortSelect: (sortId: string) => void
}

function MoviesToolbar({
  genres,
  selectedGenre,
  onGenreSelect,
  sortOptions,
  currentSort,
  onSortSelect,
}: MoviesToolbarProps) {
  return (
    <div className="movies-toolbar">
      <GenreSelect genres={genres} selectedGenre={selectedGenre} onSelect={onGenreSelect} />
      <SortControl
        sortOptions={sortOptions}
        currentSelection={currentSort}
        onSelection={onSortSelect}
      />
    </div>
  )
}

export default MoviesToolbar
