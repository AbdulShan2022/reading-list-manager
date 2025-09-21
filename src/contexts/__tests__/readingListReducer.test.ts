import { describe, it, expect } from "vitest";
import { readingListReducer, initialState, type State, type Action } from "../readingListReducer";
import { type Book } from "../../types";

describe("readingListReducer", () => {
  const sampleBook: Book = {
    id: "1",
    title: "Test Book",
    author: "John Doe",
    rating: 5,
    tags: ["fiction"],
    createdAt: "2025-09-21",
  };

  it("adds item", () => {
    const action: Action = {
      type: "ADD",
      payload: {
        bookId: sampleBook.id,
        addedAt: "2025-09-21",
        note: "",
        book: sampleBook, // ✅ provide the full Book object
      },
    };

    const result: State = readingListReducer(initialState, action);
    expect(result.items[sampleBook.id]).toBeDefined();
    expect(result.items[sampleBook.id].book.title).toBe("Test Book");
  });

  it("updates note", () => {
    const state: State = {
      items: {
        [sampleBook.id]: {
          bookId: sampleBook.id,
          addedAt: "2025-09-21",
          note: "",
          book: sampleBook,
        },
      },
    };

    const action: Action = {
      type: "UPDATE_NOTE",
      payload: { bookId: sampleBook.id, note: "hello" },
    };

    const result: State = readingListReducer(state, action);
    expect(result.items[sampleBook.id].note).toBe("hello");
  });
});
