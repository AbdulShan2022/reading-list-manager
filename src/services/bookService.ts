import apiClient from "./client"
import type { Book } from "../types";

export const bookService = {
  getBooks: async (): Promise<Book[]> => {
    const response = await apiClient.get<Book[]>("/books");
    return response.data;
  },
};
