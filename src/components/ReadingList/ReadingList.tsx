import React from "react";
import { useReadingList } from "../../hooks/useReadingList";
import { useBooks } from "../../hooks/useBooks";
import { useUser } from "../../hooks/useUser";
import { ReadingListItem } from "./ReadingListItem";
import { ReadingListSkeleton } from "./ReadingListSkeleton";
import { ErrorMessage } from "../common/ErrorMessage";
import type { Book, ReadingListItem as ReadingListItemType } from "../../types";

export const ReadingList: React.FC = () => {
  const { state: readingListState } = useReadingList();
  const { books: allBooks } = useBooks();

  const {
    isLoading: userLoading,
    error: userError,
    refetch: refetchUser,
  } = useUser("1");
  
  // Merge reading list items with book details
  const readingListWithBooks = React.useMemo(() => {
    return Object.values(readingListState.items)
      .map((item) => {
        const book = allBooks.find((b) => b.id === item.bookId);
        return book ? { ...item, book } : null;
      })
      .filter(
        (item): item is ReadingListItemType & { book: Book } => item !== null
      );
  }, [readingListState.items, allBooks]);

  if (userLoading) return <ReadingListSkeleton />;
  if (userError)
    return (
      <ErrorMessage
        message="Failed to load reading list"
        error={userError.message}
        onRetry={refetchUser}
      />
    );

  return (
    <div className="bg-white rounded-lg shadow p-4 md:max-h-[85.31rem] md:overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          My Reading List
          <span data-testid="reading-list-count" className="bg-blue-100 text-blue-800 text-sm px-2 py-0.5 rounded-full">
            {readingListWithBooks.length}
          </span>
        </h2>
      </div>
      {readingListWithBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Your reading list is empty</p>
          <p className="text-sm text-gray-400 mt-2">
            Add books from the list to get started
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {readingListWithBooks.map((item) => (
            <ReadingListItem key={item.bookId} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
