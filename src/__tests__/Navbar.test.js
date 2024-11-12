import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { DarkModeContextProvider } from "../contexts/DarkModeContext";
import { BookProvider } from "../contexts/bookcontexts.jsx";
import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar/Navbar.jsx";

describe("test navbar component", () => {
  it("should render navbar component", () => {
    render(
      <MemoryRouter>
        <DarkModeContextProvider>
          <BookProvider>
            <Navbar />
          </BookProvider>
        </DarkModeContextProvider>
      </MemoryRouter>,
    );
    const buttonNavDark = screen.getByText("Dark Mode");
    fireEvent.click(buttonNavDark);
    expect(buttonNavDark).toBeInTheDocument();
  });
});
