import React from 'react';

const SearchBar = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search profiles by name..."
      className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;
