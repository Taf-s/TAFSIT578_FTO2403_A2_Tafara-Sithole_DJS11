// src/pages/GenreShowsPage.js
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
// import { fetchShows } from "../services/fetchshow";
import { fetchShowsData } from "../utils/fetchShowsDataUtils";
import { GenresContext } from "../context/GenresContex";
import ShowCard from "../components/ShowCard";
import { genreMapping } from "../utils/genreUtils";
import { EpisodePlayerProvider } from "../context/EpisodePlayerContext";

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
      console.log("setShowsLoading:", setShowsLoading);
      fetchShowsData(currentGenre, setShows, setShowsLoading.bind(this));
    }
  }, [id, genres, shows]);

  if (loading || showsLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mt-4 font-bold text-3xl text-white animate-pulse">
          <div className="h-8 w-1/4  bg-gray-300 rounded-lg"></div>
        </div>
        <div className="mt-2 text-m text-white animate-pulse">
          <div className="h-12 bg-gray-300 rounded-lg"></div>
        </div>

        <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(8)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 animate-pulse"
              >
                <div className="h-48 bg-gray-300 rounded-lg"></div>
                <div className="mt-4 text-lg font-bold text-gray-300">
                  <div className="h-4 bg-gray-300 rounded-lg"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (!genre) {
    return <div>Genre not found</div>; // Handle genre not found
  }

  console.log(shows);
  return (
    <EpisodePlayerProvider>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mt-4 font-bold text-3xl text-white">{genre.title}</h1>
        <p className="mt-2 text-m text-white ">{genre.description}</p>

        {shows.length > 0 && (
          <div className=" mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
    </EpisodePlayerProvider>
  );
}

export default GenreShowsPage;
