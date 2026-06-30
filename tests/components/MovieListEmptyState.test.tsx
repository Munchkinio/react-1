import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MovieListEmptyState from "../../src/components/MovieListEmptyState/MovieListEmptyState";

describe("MovieListEmptyState", () => {
  const mockClearSearch = jest.fn();

  beforeEach(() => {
    mockClearSearch.mockClear();
  });

  test("renders generic message when no search or genre filter", () => {
    render(
      <MovieListEmptyState
        searchQuery=""
        selectedGenre="all"
        onClearSearch={mockClearSearch}
      />,
    );

    expect(screen.getByText("No movies found.")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  test("renders search message and clear button when searchQuery is set", () => {
    render(
      <MovieListEmptyState
        searchQuery="batman"
        selectedGenre="all"
        onClearSearch={mockClearSearch}
      />,
    );

    expect(screen.getByText(/No movies found for.*batman/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /clear search/i })).toBeInTheDocument();
  });

  test("clear search button calls onClearSearch", async () => {
    const user = userEvent.setup();

    render(
      <MovieListEmptyState
        searchQuery="batman"
        selectedGenre="all"
        onClearSearch={mockClearSearch}
      />,
    );

    await user.click(screen.getByRole("button", { name: /clear search/i }));
    expect(mockClearSearch).toHaveBeenCalledTimes(1);
  });

  test("renders genre message when genre is not all and no search", () => {
    render(
      <MovieListEmptyState
        searchQuery=""
        selectedGenre="horror"
        onClearSearch={mockClearSearch}
      />,
    );

    expect(screen.getByText(/No movies found in the.*horror/i)).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  test("search message takes priority when both search and genre are set", () => {
    render(
      <MovieListEmptyState
        searchQuery="spiderman"
        selectedGenre="horror"
        onClearSearch={mockClearSearch}
      />,
    );

    expect(screen.getByText(/No movies found for.*spiderman/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /clear search/i })).toBeInTheDocument();
  });
});
