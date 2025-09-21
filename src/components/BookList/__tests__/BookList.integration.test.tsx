import { render, screen } from "@testing-library/react";
import { BookList } from "../BookList";
import { AppProvider } from "../../../contexts/AppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver;

// Mock bookService
vi.mock("../../../services/bookService", () => ({
  bookService: {
    getBooks: vi.fn(() =>
      Promise.resolve([
        { id: "1", title: "Test Book", author: "John", rating: 5, tags: [], createdAt: "2025-09-21" }
      ])
    ),
  },
}));

describe("BookList", () => {
  it("shows books from API", async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <BookList />
        </AppProvider>
      </QueryClientProvider>
    );

    // Use regex for flexibility
    expect(await screen.findByText(/Test Book/i)).toBeInTheDocument();
  });
});
