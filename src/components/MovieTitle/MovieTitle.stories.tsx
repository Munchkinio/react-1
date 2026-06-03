import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/react-vite'

import type { MovieProps } from '../../types/movie'
import MovieTitle from './MovieTitle'

const mockMovie: MovieProps = {
  movieId: 1,
  movieTitle: 'Bohemian Rhapsody',
  movieCover: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Bohemian_Rhapsody_poster.png',
  movieReleaseDate: new Date(2018, 0, 1),
  movieRelevantGenre: ['Drama', 'Biography', 'Music'],
  movieRating: 8.9,
  movieDuration: 134,
  movieDescription:
    'Bohemian Rhapsody is a foot-stomping celebration of Queen, their music and their extraordinary lead singer Freddie Mercury.',
}

const meta = {
  title: 'Components/MovieTitle',
  component: MovieTitle,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#232323' }],
    },
  },
} satisfies Meta<typeof MovieTitle>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    movie: mockMovie,
    onMovieClick: fn(),
    onEdit: fn(),
    onDelete: fn(),
  },
}
