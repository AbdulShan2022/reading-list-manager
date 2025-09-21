import type { ReadingListItem as ReadingListItemType } from "../types";

export type Item = { bookId: string; addedAt: string; note: string };
export type State = {
  items: Record<string, ReadingListItemType>;
};

export type Action =
  | { type: "INIT"; payload: ReadingListItemType[] }
  | { type: "ADD"; payload: ReadingListItemType }
  | { type: "REMOVE"; payload: { bookId: string } }
  | { type: "UPDATE_NOTE"; payload: { bookId: string; note: string } };


export const initialState: State = { items: {} };

export function readingListReducer(state: State, action: Action): State {
  switch (action.type) {
    case "INIT": {
      const items: Record<string, ReadingListItemType> = {};
      action.payload.forEach(
        (it) => (items[it.bookId] = { ...items[it.bookId], ...it })
      );
      return { items };
    }
    case "ADD":
      if (state.items[action.payload.bookId]) return state;
      return {
        items: { ...state.items, [action.payload.bookId]: action.payload },
      };
    case "REMOVE": {
      const { [action.payload.bookId]: _, ...rest } = state.items;
      return { items: rest };
    }
    case "UPDATE_NOTE": {
      const existing = state.items[action.payload.bookId];
      if (!existing) return state;
      return {
        items: {
          ...state.items,
          [action.payload.bookId]: { ...existing, note: action.payload.note },
        },
      };
    }
    default:
      return state;
  }
}
