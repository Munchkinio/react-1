import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GenreSelect from "../../src/components/GenreSelect/GenreSelect";

describe("GenreSelect", () => {
  test("genre initial render", () => {
    const onGenreClickMock = jest.fn();
    const genres = ['all', 'documentary', 'comedy', 'horror', 'crime'];
    render(<GenreSelect genres={genres} selectedGenre={genres[0]} onSelect={onGenreClickMock} />);
    expect(screen.getByRole('button', { name: 'all' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'all' })).toHaveClass('genre-select__btn--active');
    expect(screen.getByRole('button', { name: 'documentary' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'comedy' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'horror' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'crime' })).toBeInTheDocument();
  });

  test("user clicks another genre", async () => {
    const user = userEvent.setup();
    const onGenreClickMock = jest.fn();
    const genres = ['all', 'documentary', 'comedy', 'horror', 'crime'];

    render(<GenreSelect genres={genres} selectedGenre={genres[0]} onSelect={onGenreClickMock} />);
    await user.click(screen.getByRole('button', { name: 'documentary' }));
    expect(onGenreClickMock).toHaveBeenCalledWith('documentary');
  });
});