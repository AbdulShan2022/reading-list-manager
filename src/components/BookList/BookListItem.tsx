import React from "react";
import type { Book } from "../../types";
import { StarRating } from "../ui/StarRating";
import { Button } from "../ui/Button";
import { Tags } from "../common/Tags";
import { useReadingList } from "../../hooks/useReadingList";

interface BookListItemProps {
  book: Book;
  style: React.CSSProperties;
}

export const BookListItem: React.FC<BookListItemProps> = ({ book, style }) => {
  const { state, dispatch } = useReadingList();
  const isInReadingList = !!state.items[book.id];

  const handleAddToList = () => {
    if (!isInReadingList) {
      dispatch({
        type: "ADD",
        payload: {
          bookId: book.id,
          note: "",
          addedAt: new Date().toISOString(),
          book, // include the book data for display
        },
      });
    }
  };

  return (
    <div
      style={style}
      className="flex items-center !relative  mb-[-6rem] p-4 border rounded-lg border-gray-100 hover:bg-gray-50 hover:shadow-md transition-shadow"
    >
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mt-1">{book.author}</p>

        <div className="mt-2 flex items-center gap-4">
          <StarRating rating={book.rating ?? 0} />
          <Tags tags={book.tags ?? []} />
        </div>
      </div>
      <div className="ml-4 flex-shrink-0">
        <Button
          data-testid="add-to-list"
          variant={isInReadingList ? "secondary" : "primary"}
          size="sm"
          onClick={handleAddToList}
          disabled={isInReadingList}
        >
          {isInReadingList ? "Added" : "Add to List"}
        </Button>
      </div>
    </div>
  );
};
