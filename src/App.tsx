import { useRef, useState } from 'react'

import './App.css'
import MovieCard from './components/MovieCard'
import SearchIcon from './img/search.svg'
import { Movie, MovieResponse } from './models/movie'

const API_URL = `http://www.omdbapi.com/?apikey=33911476`

function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const searchRef = useRef('')

  const searchMovies = async () => {
    const response = await fetch(`${API_URL}&s=${searchRef.current}`)
    const data = (await response.json()) as MovieResponse
    setMovies(data.Search)
  }

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    (searchRef.current = e.target.value)

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search for movies"
          onChange={handleInputSearch}
        />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies()} />
      </div>

      <div className="container">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
