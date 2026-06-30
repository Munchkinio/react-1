import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link, MemoryRouter, Route, Routes, useOutletContext } from "react-router-dom";
import { MovieListComponent } from "../../src/components/MovieListComponent/MovieListComponent";
import type { MovieListOutletContext } from "../../src/components/MovieListComponent/MovieListComponent";
import { getMovies } from "../../src/api/movies";
import type { MovieProps } from "../../src/types/movie";

jest.mock("../../src/api/movies", () => ({
  getMovies: jest.fn(),
}));

const mockMovie: MovieProps = {
  movieId: 424785,
  movieTitle: "Transformers 7",
  movieCover: "https://example.com/poster.jpg",
  movieReleaseDate: new Date(2019, 5, 26),
  movieRelevantGenre: ["Action"],
  movieRating: 0,
  movieDuration: 107,
  movieDescription: "Plot unknown for testing purposes.",
};

function OutletProbe() {
  const { onMovieUpdated } = useOutletContext<MovieListOutletContext>();

  return (
    <>
      <button
        type="button"
        onClick={() =>
          onMovieUpdated({ ...mockMovie, movieTitle: "Transformers Updated" })
        }
      >
        Patch movie title
      </button>
      <Link to="/424785/edit">Go edit</Link>
    </>
  );
}

function renderMovieList(initialEntry = "/") {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/" element={<MovieListComponent />}>
          <Route index element={<OutletProbe />} />
          <Route path=":movieId/edit" element={<div>Edit route</div>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe("MovieListComponent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getMovies as jest.Mock).mockResolvedValue([mockMovie]);
  });

  test("loads movies and renders list", async () => {
    renderMovieList();

    expect(await screen.findByText("Transformers 7")).toBeInTheDocument();
    expect(getMovies).toHaveBeenCalledTimes(1);
  });

  test("patches movie in list via onMovieUpdated", async () => {
    const user = userEvent.setup();

    renderMovieList();

    await screen.findByText("Transformers 7");
    await user.click(screen.getByRole("button", { name: "Patch movie title" }));

    await waitFor(() => {
      expect(screen.getByText("Transformers Updated")).toBeInTheDocument();
    });
    expect(screen.queryByText("Transformers 7")).not.toBeInTheDocument();
  });

  test("does not refetch movies when child route changes", async () => {
    const user = userEvent.setup();

    renderMovieList("/");

    await screen.findByText("Transformers 7");
    expect(getMovies).toHaveBeenCalledTimes(1);

    await user.click( screen.getByRole("link", { name: "Go edit" }));

    expect(await screen.findByText("Edit route")).toBeInTheDocument();
    expect(getMovies).toHaveBeenCalledTimes(1);
  });

  test("shows empty state when API returns no movies", async () => {
    (getMovies as jest.Mock).mockResolvedValue([]);

    renderMovieList();

    expect(await screen.findByText("No movies found.")).toBeInTheDocument();
    expect(screen.queryByText(/\d+ movies.*found/i)).not.toBeInTheDocument();
  });

  test("shows search-specific empty state when search param is set", async () => {
    (getMovies as jest.Mock).mockResolvedValue([]);

    renderMovieList("/?search=batman");

    expect(await screen.findByText(/No movies found for.*batman/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /clear search/i })).toBeInTheDocument();
  });
});
