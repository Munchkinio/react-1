import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { MovieProps } from '../../types/movie'

import MovieForm from './MovieForm'

const mockMovie: MovieProps = {
  movieId: 1,
  movieTitle: 'Moana',
  movieCover: 'https://upload.wikimedia.org/wikipedia/en/2/26/Moana_2_poster.jpg',
  movieReleaseDate: new Date(2016, 10, 23),
  movieRelevantGenre: ['Animation', 'Adventure'],
  movieRating: 7.8,
  movieDuration: 107,
  movieDescription: 'Moana sets sail on a daring mission to save her people.',
}

const meta = {
  title: 'Components/MovieForm',
  component: MovieForm,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#232323' }],
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          padding: '40px 20px',
          boxSizing: 'border-box',
          background: '#232323',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '920px',
            padding: '28px 36px 36px',
            boxSizing: 'border-box',
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof MovieForm>

export default meta

type Story = StoryObj<typeof meta>

export const Add: Story = {
  args: {
    onFormSubmit: fn(),
  },
}

export const Edit: Story = {
  args: {
    movie: mockMovie,
    onFormSubmit: fn(),
  },
}
