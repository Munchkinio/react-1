import './MovieListEmptyState.css'

type MovieListEmptyStateProps = {
  searchQuery: string
  selectedGenre: string
  onClearSearch: () => void
}

function MovieListEmptyState({ searchQuery, selectedGenre, onClearSearch }: MovieListEmptyStateProps) {
  if (searchQuery) {
    return (
      <div className="movie-list-empty">
        <p className="movie-list-empty__message">
          No movies found for &#34;{searchQuery}&#34;.
        </p>
        <button
          type="button"
          className="movie-list-empty__action"
          onClick={onClearSearch}
        >
          Clear search
        </button>
      </div>
    )
  }

  if (selectedGenre !== 'all') {
    return (
      <div className="movie-list-empty">
        <p className="movie-list-empty__message">
          No movies found in the &#34;{selectedGenre}&#34; genre.
        </p>
      </div>
    )
  }

  return (
    <div className="movie-list-empty">
      <p className="movie-list-empty__message">No movies found.</p>
    </div>
  )
}

export default MovieListEmptyState
