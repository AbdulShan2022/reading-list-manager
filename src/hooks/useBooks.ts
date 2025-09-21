import { useQuery } from "@tanstack/react-query";
import { bookService } from "../services/bookService";
import type { Book, FilterOption, SortOption } from "../types";
import { useMemo } from "react";

export const useBooks = (
  searchTerm: string = "",
  sortBy: SortOption = "none",
  selectedTag: FilterOption = null
) => {

  const {
    data: books = [],
    isLoading,
    error,
  } = useQuery<Book[], Error>({
    queryKey: ["books"],
    queryFn: bookService.getBooks,
    retry: 1,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000,
  });

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term)
      );
    }
    // Apply tag filter
    if (selectedTag) {
      filtered = filtered.filter((book) =>
        book.tags
          ?.map((t) => t.toLowerCase())
          .includes(selectedTag.toLowerCase())
      );
    }

    // Apply sorting
    if (sortBy.toLowerCase() !== "none") {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy.toLowerCase()) {
          case "title":
            return a.title.localeCompare(b.title);
          case "author":
            return a.author.localeCompare(b.author);
          case "rating":
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [books, searchTerm, sortBy, selectedTag]);

  return {
    books: filteredAndSortedBooks,
    isLoading,
    error,
    totalCount: books.length,
    filteredCount: filteredAndSortedBooks.length,
  };
};
