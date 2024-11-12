import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { DarkModeContextProvider } from "../contexts/DarkModeContext";
import { SelectedCommentProvider } from "../contexts/SelectedComment";
import BookCard from "../components/BooksCard/BooksCard";
import { MemoryRouter } from "react-router-dom";
import { BookProvider } from "../contexts/bookcontexts";

describe("Test BookCard Component", () => {
  it("should render card with passed props", () => {
    const { getByText } = render(
      <MemoryRouter>
        <DarkModeContextProvider>
          <SelectedCommentProvider>
            <BookProvider>
              <BookCard
                asin={"123"}
                img={"https://picsum.photos/200"}
                title={"LOTR"}
                category={"fantasy"}
                price={"5"}
              />
            </BookProvider>
          </SelectedCommentProvider>
        </DarkModeContextProvider>
      </MemoryRouter>
    );

    const button = getByText("dettagli");
    expect(button).toBeInTheDocument();
  });
});
