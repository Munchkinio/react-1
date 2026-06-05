import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  MemoryRouter,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import EditMovieForm from "../../src/components/EditMovieForm/EditMovieForm";
import type { MovieListOutletContext } from "../../src/components/MovieListComponent/MovieListComponent";
import { getMovieById, updateMovie } from "../../src/api/movies";
import type { MovieProps } from "../../src/types/movie";

jest.mock("../../src/api/movies", () => ({
  getMovieById: jest.fn(),
  updateMovie: jest.fn(),
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

function renderEditMovieForm({
  initialPath = "/424785/edit",
  state,
  onMovieUpdated = jest.fn(),
}: {
  initialPath?: string;
  state?: { movie?: MovieProps };
  onMovieUpdated?: MovieListOutletContext["onMovieUpdated"];
} = {}) {
  const outletContext: MovieListOutletContext = {
    searchQuery: "",
    onSearch: jest.fn(),
    onMovieUpdated,
  };

  return render(
    <MemoryRouter
      initialEntries={[{ pathname: initialPath, state }]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/" element={<div data-testid="home">Home</div>} />
        <Route
          path="/:movieId/edit"
          element={<Outlet context={outletContext} />}
        >
          <Route index element={<EditMovieForm />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe("EditMovieForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("uses movie from navigation state without fetching", async () => {
    renderEditMovieForm({ state: { movie: mockMovie } });

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByLabelText("Rating")).toHaveValue(0);
    expect(getMovieById).not.toHaveBeenCalled();
  });

  test("fetches movie when navigation state is missing", async () => {
    (getMovieById as jest.Mock).mockResolvedValue(mockMovie);

    renderEditMovieForm();

    expect(await screen.findByLabelText("Rating")).toHaveValue(0);
    expect(getMovieById).toHaveBeenCalledWith(424785);
  });

  test("shows error for invalid movie id", async () => {
    renderEditMovieForm({ initialPath: "/invalid/edit" });

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Error: Invalid movie id",
    );
    expect(getMovieById).not.toHaveBeenCalled();
  });

  test("shows load error when fetch fails", async () => {
    (getMovieById as jest.Mock).mockRejectedValue(new Error("Network error"));

    renderEditMovieForm();

    expect(await screen.findByRole("alert")).toHaveTextContent("Network error");
  });

  test("submits updated rating and navigates home", async () => {
    const user = userEvent.setup();
    const onMovieUpdated = jest.fn();
    const updatedMovie = { ...mockMovie, movieRating: 7 };

    (updateMovie as jest.Mock).mockResolvedValue(updatedMovie);

    renderEditMovieForm({
      state: { movie: mockMovie },
      onMovieUpdated,
    });

    const ratingInput = await screen.findByLabelText("Rating");
    await user.clear(ratingInput);
    await user.type(ratingInput, "7");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(updateMovie).toHaveBeenCalledWith(
        424785,
        expect.objectContaining({ movieRating: 7 }),
      );
    });

    expect(onMovieUpdated).toHaveBeenCalledWith(updatedMovie);

    await waitFor(() => {
      expect(screen.getByTestId("home")).toBeInTheDocument();
    });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("shows submit error when update fails", async () => {
    const user = userEvent.setup();

    (updateMovie as jest.Mock).mockRejectedValue(new Error("Update failed"));

    renderEditMovieForm({ state: { movie: mockMovie } });

    await user.click(await screen.findByRole("button", { name: "Submit" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Update failed");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("closes dialog and navigates home", async () => {
    const user = userEvent.setup();

    renderEditMovieForm({ state: { movie: mockMovie } });

    await user.click(await screen.findByRole("button", { name: "Close dialog" }));

    expect(screen.getByTestId("home")).toBeInTheDocument();
  });
});
