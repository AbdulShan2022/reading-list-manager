import React from "react";
import { useApp } from "../contexts/useApp";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Search } from "lucide-react";
import type { SortOption } from "../types";
import { availableSorting, availableTags } from "../constants";

export const SearchAndFilter: React.FC = () => {
  const { state, dispatch } = useApp();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "SET_SORT_BY", payload: e.target.value as SortOption });
  };
  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch({
      type: "SET_SELECTED_TAG",
      payload: value === "all" ? null : value,
    });
  };

  const resetFilters = () => {
    dispatch({ type: "RESET_FILTERS" });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Books
            </label>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <Input
                type="text"
                placeholder="Search by title or author..."
                value={state.searchTerm}
                onChange={handleSearchChange}
                className="w-full h-[2.5rem] pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-58 relative">
          <label
            htmlFor="sortBy"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Sort by
          </label>
          <select
            id="sortBy"
            aria-label="Sort books by"
            value={state.sortBy}
            onChange={handleSortChange}
            style={{
              appearance: "none",
            }}
            className="w-full h-[2.5rem] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
          >
            <option value="none">None</option>
            {availableSorting.map((sortingOption) => (
              <option key={sortingOption} value={sortingOption}>
                {sortingOption}
              </option>
            ))}
          </select>
          <span className="size-3 text-xs absolute right-3 top-5/7 -translate-y-5/7 pointer-events-none text-gray-500">
            ▼
          </span>
        </div>
        <div className="w-full md:w-58 relative">
          <label
            htmlFor="tagFilter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Filter by Tag
          </label>
          <select
            id="tagFilter"
            aria-label="Filter books by tag"
            value={state.selectedTag ?? "all"}
            onChange={handleTagChange}
            style={{
              appearance: "none",
            }}
            className="w-full px-3 py-2 h-[2.5rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <span className="size-3 text-xs absolute right-3 top-5/7 -translate-y-5/7 pointer-events-none text-gray-500">
            ▼
          </span>
        </div>
        <Button
          variant="secondary"
          onClick={resetFilters}
          className="whitespace-nowrap"
          disabled={
            !state.searchTerm &&
            state.sortBy === "none" &&
            state.selectedTag === null
          }
        >
          Reset
        </Button>
      </div>
      {(state.searchTerm || state.sortBy !== "none" || state.selectedTag) && (
        <div className="mt-4 flex flex-auto items-center gap-2 text-sm text-gray-600">
          <span>Active filters:</span>
          <div className="flex flex-wrap gap-1">
            {state.searchTerm && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Search: "{state.searchTerm}"
              </span>
            )}
            {state.sortBy !== "none" && (
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                Sorted by: {state.sortBy}
              </span>
            )}
            {state.selectedTag && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                Tag: {state.selectedTag}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
