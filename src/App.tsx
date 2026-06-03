import { useState } from 'react'
import './App.css'
import Counter from './components/Counter/Counter'
import SearchForm from './components/SearchForm/SearchForm'
import GenreSelect from './components/GenreSelect/GenreSelect'

function App() {
  const handleSearch = (query: string) => console.log('User searched for: ', query)
  const genres = ['all', 'documentary', 'comedy', 'horror', 'crime']
  const [selectedGenre, setSelectedGenre] = useState(genres[0])
  const handleGenre = (genre: string) => {
    setSelectedGenre(genre)
    console.log('User selected: ', genre, ' genre')
  }

  return (
    <>
      <Counter count={0} />

      <SearchForm searchQuery="Find your best movie" onSearch={handleSearch} />
      <GenreSelect genres={genres} selectedGenre={selectedGenre} onSelect={handleGenre} />

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
