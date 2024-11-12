import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Comments from "../components/Comments/Comments";
import { fetchComments } from "../Api/api";

jest.mock("../Api/api", () => ({
  fetchComments: jest.fn(),
}));

const mockComments = [
  {
    _id: "1",
    author: "Author 1",
    comment: "This is the first comment",
  },
  {
    _id: "2",
    author: "Author 2",
    comment: "This is the second comment",
  },
];

describe("Comments component", () => {
  beforeEach(() => {
    fetchComments.mockResolvedValue(mockComments);
  });

  it("renders and displays comments for a selected book", async () => {
    render(<Comments asin="123" />);

    await waitFor(() => {
      expect(screen.getByText("This is the first comment")).toBeInTheDocument();
      expect(
        screen.getByText("This is the second comment")
      ).toBeInTheDocument();
      expect(screen.getByText("Author 1")).toBeInTheDocument();
      expect(screen.getByText("Author 2")).toBeInTheDocument();
    });
  });

  it("displays a message if no comments are found", async () => {
    fetchComments.mockResolvedValueOnce([]);

    render(<Comments asin="123" />);

    await waitFor(() => {
      expect(
        screen.getByText("Nessun Commento per Questo libro")
      ).toBeInTheDocument();
    });
  });
});
