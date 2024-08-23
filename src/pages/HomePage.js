import React, { useContext, useState, useEffect } from "react";
import { SearchContext } from "../SearchProvider";
import ShowCard from "../components/ShowCard";
import sortShows from "../utils/sortShows";

function HomePage() {
  const { shows, filteredShows } = useContext(SearchContext);

  // Always start with shows sorted alphabetically (A-Z)
  const showsToSort = filteredShows || shows;

  const [sortedShows, setSortedShows] = useState([]);
  const [sortBy, setSortBy] = useState("title-asc");

  useEffect(() => {
    // Default to alphabetical order (A-Z)
    const initialSortedShows = sortShows(showsToSort, "title-asc");
    setSortedShows(initialSortedShows);
  }, [showsToSort]);

  useEffect(() => {
    // Apply selected sorting
    const sorted = sortShows(showsToSort, sortBy);
    setSortedShows(sorted);
  }, [showsToSort, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-4 mt-20">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-customBackground hover:bg-customRed rounded-md p-2 mb-4"
        >
          <option value="title-asc">A-Z</option>
          <option value="title-desc">Z-A</option>
          <option value="date-asc">Oldest</option>
          <option value="date-desc">Newest</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedShows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
