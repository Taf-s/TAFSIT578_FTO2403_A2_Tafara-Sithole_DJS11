import React, { createContext, useState, useContext } from "react";
import { searchShows } from "../utils/search";

const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

const SearchProvider = ({ shows, children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredShows, setFilteredShows] = useState(shows);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      setFilteredShows(searchShows(shows, query));
    } else {
      setFilteredShows(shows);
    }
  };

  return (
    <SearchContext.Provider
      value={{ searchQuery, handleSearch, filteredShows }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
