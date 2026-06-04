import { render, screen } from '@testing-library/react'
import MovieDetails from '../../src/components/MovieDetails/MovieDetails'
import type { MovieProps } from '../../src/types/movie'

const mockMovie: MovieProps = {
  movieId: 1,
  movieTitle: 'Pulp Fiction',
  movieCover: 'poster.jpg',
  movieReleaseDate: new Date(1994, 0, 1),
  movieRelevantGenre: ['Action & Adventure'],
  movieRating: 8.9,
  movieDuration: 154,
  movieDescription: 'Pulp Fiction description',
}

describe('MovieDetails', () => {
  test('renders movie details', () => {
    const onSearchClick = jest.fn()

    render(<MovieDetails movie={mockMovie} onSearchClick={onSearchClick} />)

    expect(screen.getByRole('heading', { name: 'Pulp Fiction' })).toBeInTheDocument()
    expect(screen.getByAltText('Pulp Fiction')).toBeInTheDocument()
    expect(screen.getByText('8.9')).toBeInTheDocument()
    expect(screen.getByText('1994')).toBeInTheDocument()
    expect(screen.getByText('2h 34min')).toBeInTheDocument()
    expect(screen.getByText('Pulp Fiction description')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open search' })).toBeInTheDocument()
  })

  test('renders placeholder when poster is missing', () => {
    render(
      <MovieDetails
        movie={{ ...mockMovie, movieCover: '' }}
        onSearchClick={jest.fn()}
      />
    )

    expect(screen.getByText('No image')).toBeInTheDocument()
    expect(screen.queryByAltText('Pulp Fiction')).not.toBeInTheDocument()
  })
})
