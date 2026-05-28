import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "../../src/components/Counter/Counter";

describe("Counter", () => {
  test("renders initial count", () => {
    const initialCount = 0;

    render(<Counter count={initialCount}/>);
    expect(screen.getByText(`Component count is ${initialCount}`)).toBeInTheDocument();
  });

  test("user clicks sub button", async () => {
    const user = userEvent.setup();

    render(<Counter count={0}/>);
    await user.click(screen.getByRole('button', { name: 'Sub' }));
    expect(screen.getByText("Component count is -1")).toBeInTheDocument();
  });

  test("user clicks add button", async () => {
    const user = userEvent.setup();

    render(<Counter count={0}/>);
    await user.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByText("Component count is 1")).toBeInTheDocument();
  });
});