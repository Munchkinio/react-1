import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/react-vite'

import MovieForm from '../MovieForm/MovieForm'
import DeleteMovie from '../DeleteMovie/DeleteMovie'
import Dialog from './Dialog'

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Dialog>

export default meta

type Story = StoryObj<typeof meta>

export const AddMovie: Story = {
  render: (args) => (
    <Dialog {...args}>
      <MovieForm onFormSubmit={fn()} />
    </Dialog>
  ),
  args: {
    title: 'Add movie',
    onClose: fn(),
  },
}

export const EditMovie: Story = {
  render: (args) => (
    <Dialog {...args}>
      <MovieForm
        movie={{
          movieId: 1,
          movieTitle: 'Moana',
          movieCover: 'https://upload.wikimedia.org/wikipedia/en/2/26/Moana_2_poster.jpg',
          movieReleaseDate: new Date(2016, 10, 23),
          movieRelevantGenre: ['Animation', 'Adventure'],
          movieRating: 7.8,
          movieDuration: 107,
          movieDescription: 'Moana sets sail on a daring mission to save her people.',
        }}
        onFormSubmit={fn()}
      />
    </Dialog>
  ),
  args: {
    title: 'Edit movie',
    onClose: fn(),
  },
}

export const DeleteMovieDialog: Story = {
  render: () => <DeleteMovie movieId={1} onDelete={fn()} onClose={fn()} />,
}
