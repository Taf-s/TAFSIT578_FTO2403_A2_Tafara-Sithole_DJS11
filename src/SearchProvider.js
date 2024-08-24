import React, { createContext, useState, useContext, useEffect } from "react";
import { searchShows } from "./utils/search";

const SearchContext = createContext();

/**
 * Hook to access the search context.
 *
 * @return {object} The search context object containing searchQuery, handleSearch, filteredShows, and shows.
 */
export const useSearch = () => {
  return useContext(SearchContext);
};

const SearchProvider = ({ shows, children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredShows, setFilteredShows] = useState(shows);

  useEffect(() => {
    setFilteredShows(shows);
  }, [shows]);

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
      value={{ searchQuery, handleSearch, filteredShows, shows }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
export { SearchContext };
