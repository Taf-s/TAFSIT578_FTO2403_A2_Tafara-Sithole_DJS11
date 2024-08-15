import React, { useContext } from "react";
import { SearchContext } from "../SearchProvider";
import ShowCard from "../components/ShowCard";

function HomePage() {
  const { filteredShows } = useContext(SearchContext);
  console.log("filteredShows:", filteredShows);

  if (filteredShows.length === 0) {
    return <div>No shows available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredShows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
