import React, { createContext, useReducer } from 'react';
import type { SortOption, FilterOption } from '../types';

interface AppState {
  searchTerm: string;
  sortBy: SortOption;
  currentPage: number;
  itemsPerPage: number;
  selectedTag: FilterOption;
}

type AppAction =
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_SORT_BY'; payload: SortOption }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'SET_SELECTED_TAG'; payload: FilterOption }
  | { type: 'RESET_FILTERS' };

const initialState: AppState = {
  searchTerm: '',
  sortBy: 'none',
  currentPage: 1,
  itemsPerPage: 10,
  selectedTag: null,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload, currentPage: 1 };
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload, currentPage: 1 };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_SELECTED_TAG':
      return { ...state, selectedTag: action.payload, currentPage: 1 };
    case 'RESET_FILTERS':
      return { ...initialState, itemsPerPage: state.itemsPerPage };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
export {AppContext, AppProvider}