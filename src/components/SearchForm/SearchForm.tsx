import { useState } from 'react'
import './SearchForm.css'

type SearchProps = {
  searchQuery: string
  onSearch: (query: string) => void
}

const POSTER_IMAGES = [
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=450&fit=crop',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop',
  'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&h=450&fit=crop',
  'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=300&h=450&fit=crop',
  'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop',
  'https://images.unsplash.com/photo-1594909129185-15505dc9cbfb?w=300&h=450&fit=crop',
  'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=300&h=450&fit=crop',
  'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=300&h=450&fit=crop',
  'https://images.unsplash.com/photo-1485846234665-8393b97e6c48?w=300&h=450&fit=crop',
  'https://images.unsplash.com/photo-1518676590939-597005090706?w=300&h=450&fit=crop',
  'https://images.unsplash.com/photo-1505682634904-d7c8d95dce50?w=300&h=450&fit=crop',
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=450&fit=crop',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop',
  'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&h=450&fit=crop',
  'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=300&h=450&fit=crop',
  'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop',
  'https://images.unsplash.com/photo-1594909129185-15505dc9cbfb?w=300&h=450&fit=crop',
  'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=300&h=450&fit=crop',
]

function SearchForm({ searchQuery, onSearch }: SearchProps) {
  const [query, setQuery] = useState(searchQuery)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleClear = () => {
    setQuery('')
  }

  return (
    <section className="search-form">
      <div className="search-form__posters" aria-hidden="true">
        {POSTER_IMAGES.map((src, index) => (
          <div
            key={index}
            className="search-form__poster"
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>

      <div className="search-form__overlay">
        <header className="search-form__header">
          <div className="search-form__logo">
            <span className="search-form__logo-netflix">netflix</span>
            <span className="search-form__logo-roulette">roulette</span>
          </div>
        </header>

        <div className="search-form__content">
          <h1 className="search-form__title">FIND YOUR MOVIE</h1>

          <form className="search-form__form" onSubmit={handleSubmit}>
            <div className="search-form__input-wrapper">
              <input
                type="text"
                className="search-form__input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What do you want to watch?"
              />
              {query.length > 0 && (
                <button
                  type="button"
                  className="search-form__clear"
                  onClick={handleClear}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
            <button type="submit" className="search-form__submit">
              SEARCH
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default SearchForm
