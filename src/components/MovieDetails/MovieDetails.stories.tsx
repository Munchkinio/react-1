import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/react-vite'

import type { MovieProps } from '../../types/movie'
import MovieDetails from './MovieDetails'

const mockMovie: MovieProps = {
  movieId: 1,
  movieTitle: 'Pulp Fiction',
  movieCover: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg',
  movieReleaseDate: new Date('1994'),
  movieRelevantGenre: ['Action & Adventure'],
  movieRairing: 8.9,
  movieDuration: 154,
  movieDescription:
    'Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together.',
}

const meta = {
  title: 'Components/MovieDetails',
  component: MovieDetails,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#232323' }],
    },
  },
} satisfies Meta<typeof MovieDetails>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    movie: mockMovie,
    onSearchClick: fn(),
  },
}
