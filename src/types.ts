export interface Books {
  book: Book[]
}
export interface Book {
  id: string;
  title: string;
  author: string;
  rating: number;
  tags: string[];
  createdAt: string;
}

export interface ReadingListItem {
  bookId: string;
  note: string;
  addedAt: string;
  book: Book
}

export interface User {
  id: string | number;
  username: string;
  notes: string;
  readingList: ReadingListItem[];
}

export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  error?: string;
}

export type SortOption = 'title' | 'rating' | 'author' | 'none';
export type FilterOption = string | null | 'all';