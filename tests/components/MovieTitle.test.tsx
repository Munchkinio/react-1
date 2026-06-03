import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MovieTitle from '../../src/components/MovieTitle/MovieTitle'
import type { MovieProps } from '../../src/types/movie'

const mockMovie: MovieProps = {
  movieId: 1,
  movieTitle: 'Bohemian Rhapsody',
  movieCover: 'poster.jpg',
  movieReleaseDate: new Date(2018, 0, 1),
  movieRelevantGenre: ['Drama', 'Biography', 'Music'],
  movieRating: 8.9,
  movieDuration: 134,
  movieDescription: 'Bohemian Rhapsody description',
}

describe('MovieTitle', () => {
  test('renders movie card', () => {
    const onMovieClick = jest.fn()

    render(<MovieTitle movie={mockMovie} onMovieClick={onMovieClick} />)

    expect(screen.getByRole('heading', { name: 'Bohemian Rhapsody' })).toBeInTheDocument()
    expect(screen.getByAltText('Bohemian Rhapsody')).toBeInTheDocument()
    expect(screen.getByText('2018')).toBeInTheDocument()
    expect(screen.getByText('Drama, Biography, Music')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open movie menu' })).toBeInTheDocument()
  })

  test('opens popup menu', async () => {
    const user = userEvent.setup()
    const onMovieClick = jest.fn()

    render(<MovieTitle movie={mockMovie} onMovieClick={onMovieClick} />)

    await user.click(screen.getByRole('button', { name: 'Open movie menu' }))

    expect(screen.getByText('Edit')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close movie menu' })).toBeInTheDocument()
    expect(onMovieClick).not.toHaveBeenCalled()
  })

  test('calls onMovieClick when tile is clicked', async () => {
    const user = userEvent.setup()
    const onMovieClick = jest.fn()

    render(<MovieTitle movie={mockMovie} onMovieClick={onMovieClick} />)

    await user.click(screen.getByRole('heading', { name: 'Bohemian Rhapsody' }))

    expect(onMovieClick).toHaveBeenCalledTimes(1)
    expect(onMovieClick).toHaveBeenCalledWith(mockMovie.movieId)
  })
})
