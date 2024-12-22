import React from "react";

interface SearchBarProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  totalBooks: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearch, totalBooks }) => (
  <div className="flex justify-between items-center mb-6">
    <input
      type="text"
      placeholder="Search books..."
      value={searchQuery}
      onChange={(e) => onSearch(e.target.value)}
      className="w-1/6 px-4 py-1 text-foreground rounded-md border border-white/20 focus:outline-none focus:ring focus:ring-white-400 bg-background text-sm"
    />
    <span className="border border-white/20 text-foreground px-3 py-1 rounded-md text-xs font-medium">
      {totalBooks} books
    </span>
  </div>
);

export default SearchBar;
