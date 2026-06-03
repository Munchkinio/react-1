import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/react-vite'

import DeleteMovie from './DeleteMovie'

const meta = {
  title: 'Components/DeleteMovie',
  component: DeleteMovie,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DeleteMovie>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    movieId: 1,
    onDelete: fn(),
    onClose: fn(),
  },
}
