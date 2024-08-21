// src/pages/GenreShowsPage.js
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchShows } from "../services/fetchshow";
import { GenresContext } from "../context/GenresContex";
import ShowCard from "../components/ShowCard";
import { genreMapping } from "../utils/genreUtils";

function GenreShowsPage() {
  const { id } = useParams(); // Get genre ID from the route
  const { genres, loading } = useContext(GenresContext);
  const [genre, setGenre] = useState(null);
  const [shows, setShows] = useState([]);
  const [showsLoading, setShowsLoading] = useState(false);

  useEffect(() => {
    const currentGenre = genres.find((genre) => genre.id === parseInt(id));
    setGenre(currentGenre);

    if (!shows.length && currentGenre) {
      const fetchShowsData = async () => {
        setShowsLoading(true); // Set loading state
        try {
          const showData = await fetchShows(); // Fetch all shows
          const uniqueShows = [
            ...new Set(showData.map((show) => JSON.stringify(show))),
          ].map((show) => JSON.parse(show));
          const filteredShows = uniqueShows.filter((show) =>
            currentGenre.shows.includes(show.id)
          ); // Filter shows by genre
          setShows(filteredShows); // Set shows in state
        } catch (error) {
          console.error("Error fetching shows:", error);
        } finally {
          setShowsLoading(false); // Reset loading state
        }
      };
      fetchShowsData();
    }
  }, [id, genres, shows]);

  if (loading || showsLoading) {
    return <div>Loading genre shows...</div>; // Show loading state
  }

  if (!genre) {
    return <div>Genre not found</div>; // Handle genre not found
  }

  console.log(shows);
  return (
    <div>
      <h1>{genre.title}</h1>
      <p>{genre.description}</p>

      {shows.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {shows.map((show) => (
            <ShowCard
              key={show.id}
              show={show}
              genre={genreMapping[show.genreId]}
            /> // Render ShowCard component for each show
          ))}
        </div>
      )}
    </div>
  );
}

export default GenreShowsPage;
