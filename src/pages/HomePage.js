import React, { useContext, useState, useEffect } from "react";
import { SearchContext } from "../SearchProvider";
import ShowCard from "../components/ShowCard";
import { sortShows } from "../utils/sortShows";

function HomePage() {
  const { filteredShows } = useContext(SearchContext);

  const [sortedShows, setSortedShows] = useState([]);

  const [sortBy, setSortBy] = useState("title-asc");

  useEffect(() => {
    setSortedShows(sortShows(filteredShows, sortBy));
  }, [filteredShows, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-4 mt-20">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-customBackground hover:bg-customRed rounded-md p-2 mb-4"
        >
          <option value="title-asc " className="text-white">
            A-Z
          </option>
          <option value="title-desc " className="text-white">
            Z-A
          </option>
          <option value="date-asc " className="text-white">
            Oldest
          </option>
          <option value="date-desc " className="text-white">
            Newest
          </option>
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
