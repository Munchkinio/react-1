import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SearchForm from "../../src/components/SearchForm/SearchForm";

function renderSearchForm(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("SearchForm", () => {
  test("renders empty input with placeholder", () => {
    const onSearchMock = jest.fn();
    renderSearchForm(<SearchForm onSearch={onSearchMock} />);
    expect(screen.getByPlaceholderText("What do you want to watch?")).toHaveValue("");
  });

  test("user clicks search button", async () => {
    const user = userEvent.setup();
    const onSearchMock = jest.fn();

    renderSearchForm(<SearchForm onSearch={onSearchMock} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'Project Hail Mary');
    await user.click(screen.getByRole('button', { name: 'SEARCH' }));
    expect(screen.getByDisplayValue("Project Hail Mary")).toBeInTheDocument();
    expect(onSearchMock).toHaveBeenCalledWith('Project Hail Mary');
  });

  test("user press enter button", async () => {
    const user = userEvent.setup();
    const onSearchMock = jest.fn();

    renderSearchForm(<SearchForm onSearch={onSearchMock} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'Terminator 2');
    await user.keyboard('{Enter}');
    expect(screen.getByDisplayValue("Terminator 2")).toBeInTheDocument();
    expect(onSearchMock).toHaveBeenCalledWith('Terminator 2');
  });

  test("syncs input when searchQuery prop changes", () => {
    const { rerender } = renderSearchForm(
      <SearchForm searchQuery="Zootopia" onSearch={jest.fn()} />
    );
    expect(screen.getByRole("textbox")).toHaveValue("Zootopia");

    rerender(
      <MemoryRouter>
        <SearchForm searchQuery="Interstellar" onSearch={jest.fn()} />
      </MemoryRouter>
    );
    expect(screen.getByRole("textbox")).toHaveValue("Interstellar");
  });

  test("user clears search input", async () => {
    const user = userEvent.setup();
    const onSearchMock = jest.fn();

    renderSearchForm(<SearchForm onSearch={onSearchMock} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'Matrix');
    expect(screen.getByRole('button', { name: 'Clear search' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(input).toHaveValue('');
    expect(onSearchMock).toHaveBeenCalledWith('');
    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument();
  });

  test("user clicks add movie button", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<SearchForm onSearch={jest.fn()} />} />
          <Route path="/new" element={<div>Add movie page</div>} />
        </Routes>
      </MemoryRouter>,
    );
    await user.click(screen.getByRole("button", { name: "+ Add movie" }));
    expect(screen.getByText("Add movie page")).toBeInTheDocument();
  });
});
