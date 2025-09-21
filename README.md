# Reading List Manager

A React + TypeScript application to manage personal reading list.  
Built with **React Query**, **Context API**, and **TailwindCSS**.

---

# 1.Features
- Browse and search books
- Filter by tags, sort by title/author/rating
- Maintain a personal reading list with notes
- Offline mode support (localStorage persistence)
- Error handling and retry logic with React Query
- Responsive UI with Tailwind

---

# 2.Tech Stack
- React 19.1.1
- TypeScript
- Vite (or CRA, depending on setup)
- React Query (`@tanstack/react-query`)
- Axios
- TailwindCSS
- MockAPI for backend data

---

# 3. Installation
```bash
git clone https://github.com/your-username/reading-list-manager.git
cd reading-list-manager
npm install
```

Run locally

```bash
npm run dev
```

Open http://localhost:5173

Run Tests

```bash
npm run test
```

Run cypress

```bash
npm run cypress:open
```

# 4. Notes on Assumptions

- Only **one user (`id=1`)** is supported for simplicity. Multi-user support would require authentication and backend changes.  
- Filtering & sorting are done **client-side**. For real APIs, you’d offload this to the backend.  
- Offline mode relies entirely on `localStorage`. There’s no queueing/sync mechanism for changes made while offline.  
- API failures are simulated only for development/testing. Production API should not include failure simulation.  
- Pagination is **client-side only**, assuming the book dataset is relatively small.  

---

# 5. Short Write-up

### Error & Retry Handling
- **React Query** retries failed requests up to 2 times with exponential backoff (`retryDelay`).  
- Axios interceptors catch API failures and normalize error messages.  
- In case of user data failure, a retry button (`ErrorMessage`) is shown to manually refetch.  

### Performance Optimizations
- React Query caches book/user data for **5 minutes (`staleTime`)** to avoid redundant network calls.  
- Filtering and sorting logic is wrapped in `useMemo` to prevent unnecessary recalculations.  
- Notes input uses a `useDebounce` hook to batch updates → avoids spamming localStorage/context on every keystroke.  

### Trade-offs & Shortcuts
- Client-side filtering/sorting/pagination keeps backend simple but limits scalability.  
- Offline mode uses only localStorage → quick and simple, but no syncing when reconnecting.  
- Single hardcoded user keeps logic straightforward, but not realistic for multi-user environments.  
- API failure simulation adds resilience testing but would not exist in production.  

---
