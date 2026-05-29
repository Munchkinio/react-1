import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SortControl from '../../src/components/SortControl/SortControl'

describe('SortControl', () => {
  test('renders sort control', () => {
    const onSelection = jest.fn()
    const sortOptions = [
      { name: 'Release Date', id: 'releaseDate' },
      { name: 'Title', id: 'title' },
    ]

    render(
      <SortControl
        sortOptions={sortOptions}
        currentSelection="releaseDate"
        onSelection={onSelection}
      />,
    )

    expect(screen.getByText('Sort by')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Release Date' })).toBeInTheDocument()
  })

  test('opens dropdown with sort options', async () => {
    const user = userEvent.setup()
    const onSelection = jest.fn()
    const sortOptions = [
      { name: 'Release Date', id: 'releaseDate' },
      { name: 'Title', id: 'title' },
    ]

    render(
      <SortControl
        sortOptions={sortOptions}
        currentSelection="releaseDate"
        onSelection={onSelection}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Release Date' }))

    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Title' })).toBeInTheDocument()
    expect(screen.getByRole('option', { selected: true })).toHaveTextContent('Release Date')
  })

  test('selects sort option', async () => {
    const user = userEvent.setup()
    const onSelection = jest.fn()
    const sortOptions = [
      { name: 'Release Date', id: 'releaseDate' },
      { name: 'Title', id: 'title' },
    ]

    render(
      <SortControl
        sortOptions={sortOptions}
        currentSelection="releaseDate"
        onSelection={onSelection}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Release Date' }))
    await user.click(screen.getByRole('button', { name: 'Title' }))

    expect(onSelection).toHaveBeenCalledWith('title')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  test('closes dropdown on outside click', async () => {
    const user = userEvent.setup()
    const onSelection = jest.fn()
    const sortOptions = [
      { name: 'Release Date', id: 'releaseDate' },
      { name: 'Title', id: 'title' },
    ]

    render(
      <SortControl
        sortOptions={sortOptions}
        currentSelection="releaseDate"
        onSelection={onSelection}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Release Date' }))
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    await user.click(screen.getByText('Sort by'))

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(onSelection).not.toHaveBeenCalled()
  })
})
