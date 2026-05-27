import './GenreSelect.css'

type GenreSelectProps = {
  genres: string[]
  selectedGenre: string
  onSelect: (genre: string) => void
}

function GenreSelect({ genres, selectedGenre, onSelect }: GenreSelectProps) {
  return (
    <nav className="genre-select">
      <ul className="genre-select__list">
        {genres.map((genre) => (
          <li key={genre} className="genre-select__item">
            <button
              type="button"
              className={`genre-select__btn${genre === selectedGenre ? ' genre-select__btn--active' : ''}`}
              onClick={() => onSelect(genre)}
            >
              {genre}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default GenreSelect
