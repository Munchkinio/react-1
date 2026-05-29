import { fn } from "storybook/test";
import type { Meta, StoryObj } from '@storybook/react-vite';

import GenreSelect from './GenreSelect';

const meta = {
  component: GenreSelect,
} satisfies Meta<typeof GenreSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "genres": [
      "all", "documentary", "comedy", "horror", "crime"
    ],

    "selectedGenre": "all",
    "onSelect": fn(),
  },
};