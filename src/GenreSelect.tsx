import type { Genre } from './types'
import './GenreSelect.css'

type GenreProps = {
  genres: Genre[]
  activeGenre: Genre
  onSelect: (genre: Genre) => void
}

function GenreSelect({ genres, activeGenre, onSelect }: GenreProps) {
  return (
    <nav className="genre-select">
      <ul className="genre-select__list">
        {genres.map((genre) => (
          <li key={genre.id} className="genre-select__item">
            <button
              type="button"
              className={`genre-select__btn${genre.id === activeGenre.id ? ' genre-select__btn--active' : ''}`}
              onClick={() => onSelect(genre)}
            >
              {genre.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default GenreSelect
