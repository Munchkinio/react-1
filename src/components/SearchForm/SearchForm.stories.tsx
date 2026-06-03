import { fn } from "storybook/test";
import type { Meta, StoryObj } from '@storybook/react-vite';

import SearchForm from './SearchForm';

const meta = {
  component: SearchForm,
} satisfies Meta<typeof SearchForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    searchQuery: 'What do you want to watch?',
    onSearch: fn(),
    onAddMovie: fn(),
  },
};