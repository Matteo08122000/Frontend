import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookCard from "../components/BooksCard/BooksCard.jsx";
import { SelectedComment } from "../contexts/SelectedComment.jsx";
import { MemoryRouter } from "react-router-dom";

const mockToggleCardAsin = jest.fn();
const mockValue = {
  commentCardAsin: null,
  toggleCardAsin: mockToggleCardAsin,
};

describe("BookCard component", () => {
  it("changes border color on click and removes it from the previously selected card", () => {
    const { rerender } = render(
      <SelectedComment.Provider value={mockValue}>
        <MemoryRouter>
          <BookCard
            title="Test Book 1"
            price="10"
            category="Fiction"
            img="img1.jpg"
            asin="123"
          />
          <BookCard
            title="Test Book 2"
            price="15"
            category="Non-Fiction"
            img="img2.jpg"
            asin="456"
          />
        </MemoryRouter>
      </SelectedComment.Provider>
    );

    const firstCard = screen.getAllByRole("img")[0].closest(".Card-Box");
    const secondCard = screen.getAllByRole("img")[1].closest(".Card-Box");

    expect(firstCard).not.toHaveClass("border-5 border-danger");
    expect(secondCard).not.toHaveClass("border-5 border-danger");

    fireEvent.click(firstCard);

    mockValue.commentCardAsin = "123";

    rerender(
      <SelectedComment.Provider value={mockValue}>
        <MemoryRouter>
          <BookCard
            title="Test Book 1"
            price="10"
            category="Fiction"
            img="img1.jpg"
            asin="123"
          />
          <BookCard
            title="Test Book 2"
            price="15"
            category="Non-Fiction"
            img="img2.jpg"
            asin="456"
          />
        </MemoryRouter>
      </SelectedComment.Provider>
    );

    expect(firstCard).toHaveClass("border-5 border-danger");
    expect(secondCard).not.toHaveClass("border-5 border-danger");

    fireEvent.click(secondCard);

    mockValue.commentCardAsin = "456";

    rerender(
      <SelectedComment.Provider value={mockValue}>
        <MemoryRouter>
          <BookCard
            title="Test Book 1"
            price="10"
            category="Fiction"
            img="img1.jpg"
            asin="123"
          />
          <BookCard
            title="Test Book 2"
            price="15"
            category="Non-Fiction"
            img="img2.jpg"
            asin="456"
          />
        </MemoryRouter>
      </SelectedComment.Provider>
    );

    expect(firstCard).not.toHaveClass("border-5 border-danger");

    expect(secondCard).toHaveClass("border-5 border-danger");
  });
});
