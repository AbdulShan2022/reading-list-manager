import React, { useState, useEffect } from "react";
import type { ReadingListItem as ReadingListItemType, Book } from "../../types";
import { StarRating } from "../ui/StarRating";
import { Button } from "../ui/Button";
import { Tags } from "../common/Tags";
import { useDebounce } from "../../hooks/useDebounce";
import { useReadingList } from "../../hooks/useReadingList";
import { Trash2 } from "lucide-react";

interface ReadingListItemProps {
  item: ReadingListItemType & { book: Book };
}

export const ReadingListItem: React.FC<ReadingListItemProps> = ({ item }) => {
  const { dispatch } = useReadingList();
  const [note, setNote] = useState(item.note);
  const debouncedNote = useDebounce(note, 1500);

  // Automatically update note in the context (and localStorage) when debounced
  useEffect(() => {
    if (debouncedNote !== item.note) {
      dispatch({
        type: "UPDATE_NOTE",
        payload: { bookId: item.bookId, note: debouncedNote },
      });
    }
  }, [debouncedNote, item.bookId, item.note, dispatch]);

  const handleRemove = () => {
    dispatch({ type: "REMOVE", payload: { bookId: item.bookId } });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 hover:shadow-md transition-shadow">
      <div data-testid="reading-list-item" className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900">
            {item.book.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{item.book.author}</p>
          <div className="mt-2 flex items-center gap-4">
            <StarRating rating={item.book.rating ?? 0} />
            <Tags tags={item.book.tags ?? []} />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add your thoughts about this book..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
            />
            <p className="text-xs text-gray-500 mt-1">
              Changes are saved automatically
            </p>
          </div>
        </div>
        <Button
          data-testid="remove-from-list"
          variant="danger"
          size="sm"
          onClick={handleRemove}
          className="ml-4 flex-shrink-0"
          aria-label={`Remove ${item.book.title} from reading list`}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};
