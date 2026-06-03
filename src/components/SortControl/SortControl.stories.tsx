import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/react-vite'

import SortControl from './SortControl'

const meta = {
  title: 'Components/SortControl',
  component: SortControl,
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
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '18px 60px',
          borderBottom: '1px solid #424242',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SortControl>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    sortOptions: [
      { name: 'Release Date', id: 'releaseDate' },
      { name: 'Title', id: 'title' },
    ],
    currentSelection: 'releaseDate',
    onSelection: fn(),
  },
}
