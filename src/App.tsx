import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Counter from './components/Counter/Counter'
import SearchForm from './components/SearchForm/SearchForm'
import GenreSelect from './components/GenreSelect/GenreSelect'

function App() {
  const [count, setCount] = useState(0);
  const handleSearch = (query: string) => console.log('User searched for: ', query);
  const genres = ['all', 'documentary', 'comedy', 'horror', 'crime'];
  const [selectedGenre, setSelectedGenre] = useState(genres[0]);
  const handleGenre = (genre: string) => {
    setSelectedGenre(genre);
    console.log('User selected: ', genre, ' genre');
  };

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
      </section>

      <Counter count={0}/>

      <SearchForm searchQuery="Find your best movie" onSearch={handleSearch} />
      <GenreSelect genres={genres} selectedGenre={selectedGenre} onSelect={handleGenre} />

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
