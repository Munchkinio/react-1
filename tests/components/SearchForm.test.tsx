import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchForm from "../../src/components/SearchForm/SearchForm";

describe("SearchForm", () => {
  test("renders initial input", () => {
    const onSearchMock = jest.fn();
    render(<SearchForm searchQuery="Find your best movie" onSearch={onSearchMock} onAddMovie={jest.fn()} />);
    expect(screen.getByDisplayValue("Find your best movie")).toBeInTheDocument();
  });

  test("user clicks search button", async () => {
    const user = userEvent.setup();
    const onSearchMock = jest.fn();

    render(<SearchForm searchQuery="Find your best movie" onSearch={onSearchMock} onAddMovie={jest.fn()} />);
    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'Project Hail Mary');
    await user.click(screen.getByRole('button', { name: 'SEARCH' }));
    expect(screen.getByDisplayValue("Project Hail Mary")).toBeInTheDocument();
    expect(onSearchMock).toHaveBeenCalledWith('Project Hail Mary');
  });

  test("user press enter button", async () => {
    const user = userEvent.setup();
    const onSearchMock = jest.fn();

    render(<SearchForm searchQuery="Find your best movie" onSearch={onSearchMock} onAddMovie={jest.fn()} />);
    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'Terminator 2');
    await user.keyboard('{Enter}');
    expect(screen.getByDisplayValue("Terminator 2")).toBeInTheDocument();
    expect(onSearchMock).toHaveBeenCalledWith('Terminator 2');
  });

  test("user clears search input", async () => {
    const user = userEvent.setup();

    render(<SearchForm searchQuery="Find your best movie" onSearch={jest.fn()} onAddMovie={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Clear search' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument();
  });
});