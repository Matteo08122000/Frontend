import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Welcome from "../components/Welcome/Welcome.jsx";

describe("Welcome render Correctly", () => {
  it("should render correctly message", () => {
    render(<Welcome />);

    const WelcomeMessage = screen.getByText("Benvenuto!");
    expect(WelcomeMessage).toBeInTheDocument();
  });
});
