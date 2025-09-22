import React from "react";
import { FixedSizeList as List } from "react-window";
import { useBooks } from "../../hooks/useBooks";
import { useApp } from "../../contexts/useApp";
import { BookListItem } from "./BookListItem";
import { BookListSkeleton } from "./BookListSkeleton";
import { ErrorMessage } from "../common/ErrorMessage";
import { Pagination } from "../common/Pagination";

const ITEM_HEIGHT = 110;

export const BookList: React.FC = () => {
  const { state } = useApp();
  const { books, isLoading, error, filteredCount } = useBooks(
    state.searchTerm,
    state.sortBy,
    state.selectedTag
  );

  const startIndex = (state.currentPage - 1) * state.itemsPerPage;
  const endIndex = startIndex + state.itemsPerPage;
  const paginatedBooks = books.slice(startIndex, endIndex);

  const Row = ({
    index,
    style,
  }: { index: number; style: React.CSSProperties;}) => (
    <div role="listitem">
      <BookListItem book={paginatedBooks[index]} style={style} />
    </div>
  );

  if (isLoading) return <BookListSkeleton />;

  if (error)
    return (
      <ErrorMessage message="Failed to load books" error={error.message} />
    );

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          Available Books
          <span className="bg-blue-100 text-blue-800 text-sm px-2 py-0.5 rounded-full">
            {filteredCount}
          </span>
        </h2>
      </div>
      {paginatedBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No books found</p>
          {state.searchTerm && (
            <p className="text-sm text-gray-400 mt-2">
              Try adjusting your search terms
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <List
            itemCount={paginatedBooks.length}
            height={(ITEM_HEIGHT + 14) * paginatedBooks.length }
            itemSize={ITEM_HEIGHT}
            width={'full'}
          >
            {Row}
          </List>
        </div>
      )}
      <Pagination
        currentPage={state.currentPage}
        totalItems={filteredCount}
        itemsPerPage={state.itemsPerPage}
      />
    </div>
  );
};
