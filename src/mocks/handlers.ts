import { http, HttpResponse } from "msw";

const books = [
  { id: "1", title: "Book One", author: "Author A", rating: 4.2, tags: ["Fiction"] },
  { id: "2", title: "Book Two", author: "Author B", rating: 3.8, tags: ["History"] },
  { id: "15", title: "Poems", author: "Author C", rating: 4.9, tags: ["Poetry"] },
];

const user = {
  id: "1",
  name: "Demo",
  readingList: [
    { bookId: "1", note: "Must-read introduction", addedAt: new Date().toISOString() },
    { bookId: "2", note: "Important themes", addedAt: new Date().toISOString() },
    { bookId: "15", note: "Interesting poetry", addedAt: new Date().toISOString() },
  ],
};

export const handlers = [
  // GET /books
  http.get("https://68c847ee5d8d9f514734e5f2.mockapi.io/api/v1/books", () => {
    return HttpResponse.json(books, { status: 200 });
  }),

  // GET /users/:id
  http.get("https://68c847ee5d8d9f514734e5f2.mockapi.io/api/v1/users/:id", () => {
    return HttpResponse.json(user, { status: 200 });
  }),
];
