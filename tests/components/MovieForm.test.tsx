import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MovieForm from "../../src/components/MovieForm/MovieForm";
import type { MovieProps } from "../../src/types/movie";

const mockMovie: MovieProps = {
  movieId: 424785,
  movieTitle: "Transformers 7",
  movieCover: "https://example.com/poster.jpg",
  movieReleaseDate: new Date(2019, 5, 26),
  movieRelevantGenre: ["Action"],
  movieRating: 0,
  movieDuration: 107,
  movieDescription: "Plot unknown for testing.",
};

describe("MovieForm", () => {
  test("submits updated rating from number input", async () => {
    const user = userEvent.setup();
    const onFormSubmit = jest.fn();

    render(<MovieForm movie={mockMovie} onFormSubmit={onFormSubmit} />);

    const ratingInput = screen.getByLabelText("Rating");
    await user.clear(ratingInput);
    await user.type(ratingInput, "7");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(onFormSubmit).toHaveBeenCalledTimes(1);
    expect(onFormSubmit.mock.calls[0][0].movieRating).toBe(7);
  });

  test("keeps user input after parent re-render", async () => {
    const user = userEvent.setup();

    const { rerender } = render(
      <MovieForm movie={mockMovie} onFormSubmit={jest.fn()} />,
    );

    const ratingInput = screen.getByLabelText("Rating");
    await user.clear(ratingInput);
    await user.type(ratingInput, "7");
    expect(ratingInput).toHaveValue(7);

    rerender(
      <MovieForm movie={{ ...mockMovie }} onFormSubmit={jest.fn()} isSubmitting />,
    );

    expect(ratingInput).toHaveValue(7);
  });

  test("reset restores values from movie prop", async () => {
    const user = userEvent.setup();

    render(<MovieForm movie={mockMovie} onFormSubmit={jest.fn()} />);

    const ratingInput = screen.getByLabelText("Rating");
    await user.clear(ratingInput);
    await user.type(ratingInput, "7");
    await user.click(screen.getByRole("button", { name: "Reset" }));

    expect(ratingInput).toHaveValue(0);
  });

  test("disables actions while submitting", () => {
    render(
      <MovieForm movie={mockMovie} onFormSubmit={jest.fn()} isSubmitting />,
    );

    expect(screen.getByRole("button", { name: "Submitting..." })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Reset" })).toBeDisabled();
  });

  test("rejects whitespace-only title", async () => {
    const user = userEvent.setup();

    render(<MovieForm movie={mockMovie} onFormSubmit={jest.fn()} />);

    await user.clear(screen.getByLabelText("Title"));
    await user.type(screen.getByLabelText("Title"), "   ");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findByText("Title is required")).toBeInTheDocument();
  });

  test("rejects whitespace-only genres", async () => {
    const user = userEvent.setup();

    render(<MovieForm movie={mockMovie} onFormSubmit={jest.fn()} />);

    await user.clear(screen.getByLabelText("Genre"));
    await user.type(screen.getByLabelText("Genre"), "  ,  ");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      await screen.findByText("At least one genre is required"),
    ).toBeInTheDocument();
  });
});
