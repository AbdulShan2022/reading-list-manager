import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "./contexts/AppContext";
import { ReadingListProvider } from "./contexts/ReadingListContext";
import { BookList } from "./components/BookList/BookList";
import { ReadingList } from "./components/ReadingList/ReadingList";
import { SearchAndFilter } from "./components/SearchAndFilter";
import { Header } from "./components/common/Header";
import { Footer } from "./components/common/Footer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2, retryDelay: 1000, staleTime: 300_000 },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ReadingListProvider>
          <div className="min-h-screen flex flex-col bg-gray-100">
            <Header />
            <div className="container mx-auto px-4 py-4 sm:mb-4 flex-1">
              <div className="mb-8">
                <SearchAndFilter />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <BookList />
                </div>
                <div className="lg:col-span-1">
                  <ReadingList />
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </ReadingListProvider>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App;
