import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AddMovieForm from "../../src/components/AddMovieForm/AddMovieForm";
import { addMovie } from "../../src/api/movies";
import type { MovieProps } from "../../src/types/movie";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

jest.mock("../../src/api/movies", () => ({
  addMovie: jest.fn(),
}));

const createdMovie: MovieProps = {
  movieId: 999,
  movieTitle: "New Movie",
  movieCover: "https://example.com/poster.jpg",
  movieReleaseDate: new Date(2020, 0, 1),
  movieRelevantGenre: ["Drama"],
  movieRating: 8,
  movieDuration: 120,
  movieDescription: "A newly created movie for testing.",
};

const validForm = {
  movieTitle: "New Movie",
  movieReleaseDate: "2020-01-01",
  movieCover: "https://example.com/poster.jpg",
  movieRating: "8",
  movieRelevantGenre: "Drama",
  movieDuration: "120",
  movieDescription: "A newly created movie for testing.",
};

async function fillMovieForm(user: ReturnType<typeof userEvent.setup>) {
  await user.clear(screen.getByLabelText("Title"));
  await user.type(screen.getByLabelText("Title"), validForm.movieTitle);
  await user.clear(screen.getByLabelText("Release Date"));
  await user.type(screen.getByLabelText("Release Date"), validForm.movieReleaseDate);
  await user.clear(screen.getByLabelText("Movie URL"));
  await user.type(screen.getByLabelText("Movie URL"), validForm.movieCover);
  await user.clear(screen.getByLabelText("Rating"));
  await user.type(screen.getByLabelText("Rating"), validForm.movieRating);
  await user.clear(screen.getByLabelText("Genre"));
  await user.type(screen.getByLabelText("Genre"), validForm.movieRelevantGenre);
  await user.clear(screen.getByLabelText("Runtime"));
  await user.type(screen.getByLabelText("Runtime"), validForm.movieDuration);
  await user.clear(screen.getByLabelText("Overview"));
  await user.type(screen.getByLabelText("Overview"), validForm.movieDescription);
}

describe("AddMovieForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (addMovie as jest.Mock).mockResolvedValue(createdMovie);
  });

  test("navigates to created movie with returnSearch in state", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/new?search=matrix&genre=action"]}>
        <Routes>
          <Route path="/new" element={<AddMovieForm />} />
        </Routes>
      </MemoryRouter>,
    );

    await fillMovieForm(user);
    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(addMovie).toHaveBeenCalled();
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      {
        pathname: "/999",
        search: "?search=matrix&genre=action",
      },
      {
        state: {
          movie: createdMovie,
          returnSearch: "search=matrix&genre=action",
        },
      },
    );
  });
});
