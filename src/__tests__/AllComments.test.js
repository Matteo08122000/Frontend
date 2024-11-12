import { waitFor } from "@testing-library/dom";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";
import { render, screen } from "@testing-library/react";
import Comments from "../components/Comments/Comments.jsx";
import { DarkModeContextProvider } from "../contexts/DarkModeContext";
import { MemoryRouter } from "react-router-dom";

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("Test All comments", () => {
  it("should fetch all comments", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify([
        { comment: "test", author: "matt", rate: "3", _id: "0123" },
      ])
    );

    render(
      <MemoryRouter>
        <DarkModeContextProvider>
          <Comments asin="123" />
        </DarkModeContextProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("test")).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://striveschool-api.herokuapp.com/api/books/123/comments/",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzAxNjY3NzBmMzg1MDAwMTUxYzE3YTkiLCJpYXQiOjE3MjgxNDUwMTUsImV4cCI6MTcyOTM1NDYxNX0.3t6CIhf8UTZ1zMV77_0SXidDpz0y814xuoln8tlUp-o",
          "Content-Type": "application/json",
        },
      }
    );

    expect(screen.getByTestId("edit-button")).toBeInTheDocument();
    expect(screen.getByTestId("delete-button")).toBeInTheDocument();
  });
});
