import React, { useContext, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { SearchContext } from "../SearchProvider";
import ShowCard from "../components/ShowCard";
import sortShows from "../utils/sortShows";
import "swiper/css";
import "swiper/css/bundle";
/**
 * A functional component representing the Home Page of the application.
 * It displays a carousel of shows, a dropdown to sort shows, and a grid of shows.
 * The shows are sorted based on the selected option in the dropdown.
 *
 * @return {JSX.Element} The JSX element representing the Home Page.
 */
function HomePage() {
  /**
   * Get the shows from the SearchContext.
   */
  const { shows, filteredShows } = useContext(SearchContext);

  /**
   * If the user has searched for something, use the filtered shows.
   * Otherwise use the full list of shows.
   */
  // Always start with shows sorted alphabetically (A-Z)
  const showsToSort = filteredShows || shows;

  /**
   * The state that stores the sorted shows.
   */
  const [sortedShows, setSortedShows] = useState([]);

  /**
   * The state that stores the selected sort option.
   */
  const [sortBy, setSortBy] = useState("title-asc");

  /**
   * When the component mounts or the shows change, default to alphabetical order (A-Z).
   */
  useEffect(() => {
    // Default to alphabetical order (A-Z)
    const initialSortedShows = sortShows(showsToSort, "title-asc");
    setSortedShows(initialSortedShows);
  }, [showsToSort]);

  /**
   * When the user selects a new sorting option, re-sort the shows.
   */
  useEffect(() => {
    // Apply selected sorting
    const sorted = sortShows(showsToSort, sortBy);
    setSortedShows(sorted);
  }, [showsToSort, sortBy]);

  /**
   * Get the first 5 shows to display in the carousel.
   */
  const carouselShows = sortedShows.slice(0, 10);

  return (
    <div>
      {/* Carousel Section */}
      <div className="my-8 mt-4">
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          slidesPerView={3}
          spaceBetween={30} // Adjusted space between slides
          navigation
          pagination={{ clickable: true }}
        >
          {carouselShows.map((show) => (
            <SwiperSlide key={show.id}>
              <ShowCard show={show} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Sort Dropdown */}
        <div className="flex justify-end mb-4 mt-20">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-customBackground hover:bg-customRed rounded-md p-2 mb-4"
          >
            {/* Options for the dropdown */}
            <option value="title-asc">A-Z</option>
            <option value="title-desc">Z-A</option>
            <option value="date-asc">Oldest</option>
            <option value="date-desc">Newest</option>
          </select>
        </div>

        {/* Grid of Shows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Map the sorted shows to ShowCard components */}
          {sortedShows.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
