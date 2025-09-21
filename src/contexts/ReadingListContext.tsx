import React, { createContext, useEffect, useReducer } from "react";
import type { ReadingListItem as ReadingListItemType } from "../types";
import { bookService } from "../services/bookService";
import { userService } from "../services/userService";
import { LOCAL_READING_LIST_KEY } from "../constants/storage";
import { readingListReducer, initialState, type State, type Action } from "./readingListReducer";

const ReadingListContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

const ReadingListProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(readingListReducer, initialState);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_READING_LIST_KEY);
      if (raw) {
        const parsed: ReadingListItemType[] = JSON.parse(raw);
        dispatch({ type: "INIT", payload: parsed });
      }
    } catch (e) {
      console.warn("Could not parse reading list from localStorage", e);
    }
  }, []);

  // Fetch initial reading list from API (if online)
  useEffect(() => {
    const fetchReadingList = async () => {
      if (!navigator.onLine) return; // skip if offline
      try {
        const user = await userService.getUser("1"); // get user
        const allBooks = await bookService.getBooks(); // fetch all books
        const readingListWithBooks: ReadingListItemType[] = user.readingList
          .map((item) => {
            const book = allBooks.find((b) => b.id === item.bookId);
            return book ? { ...item, book } : null;
          })
          .filter((item): item is ReadingListItemType => item !== null);
        dispatch({ type: "INIT", payload: readingListWithBooks });
      } catch (e) {
        console.error("Failed to fetch initial reading list:", e);
      }
    };

    fetchReadingList();
  }, []);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    const arr = Object.values(state.items);
    localStorage.setItem(LOCAL_READING_LIST_KEY, JSON.stringify(arr));
  }, [state.items]);

  return (
    <ReadingListContext.Provider value={{ state, dispatch }}>
      {children}
    </ReadingListContext.Provider>
  );
};

export { ReadingListProvider, ReadingListContext };
