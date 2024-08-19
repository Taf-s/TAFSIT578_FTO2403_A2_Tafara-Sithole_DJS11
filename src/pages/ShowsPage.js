import React, { useState, useContext } from "react";
import { ShowsContext } from "../context/ShowsContext"; // Adjust the import path as needed
import { useParams } from "react-router-dom";

const ShowsPage = () => {
  let { showId } = useParams();
  const { shows, loading, error } = useContext(ShowsContext);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [episode, setEpisodes] = useState([]);

  console.log("SHOW ID", showId);

  const show = shows.find((show) => show.id === showId);

  const handleSeasonClick = async (season) => {
    try {
      const response = await fetch(
        `https://podcast-api.netlify.app/show/${showId}/season/${season}`
      );
      const data = await response.json();
      setEpisodes(data.episodes);
      setSelectedSeason(season);
    } catch (err) {
      console.error("Error fetching episodes:", err);
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-4 text-red-600">
        Error: {error.message}
      </div>
    );

  if (!show) return <div className="text-center py-4">Show not found</div>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-6 relative">
        <img
          src={show.image}
          alt={show.title}
          className="w-full h-96 object-cover object-center mx-auto rounded-lg shadow-lg"
        />
        <div className="absolute top-0 left-0 right-0 p-4 text-white bg-black bg-opacity-20 rounded-md flex flex-col justify-center items-left h-1/5 ">
          <h1 className="text-3xl font-bold mb-2">{show.title}</h1>
          <p className="text-m">{show.seasons.length} Seasons</p>
          <p className="text-m">
            {show.genres.map((genre, index) => (
              <span key={genre} className="mr-2">
                {genre}
              </span>
            ))}
          </p>
        </div>
        <div className="p-4 bg-gray-200 rounded-lg shadow-md mt-4">
          <p className="text-base">{show.description}</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex overflow-x-auto space-x-4  transition duration-300 transform hover:scale-105 hover:translate-y-2 hover:rotate-0 hover:shadow-2xl">
          {show.seasons.map((season) => (
            <div
              key={season.id}
              onClick={() => handleSeasonClick(season)}
              className="flex-shrink-0 w-72 h-72 bg-gray-200 rounded-lg shadow-md flex flex-col items-center justify-center text-sm font-medium hover:bg-gray-300 cursor-pointer relative"
            >
              <img
                src={season.image}
                alt={season.title}
                className="w-full rounded-lg object-cover object-center"
              />
              <div className="absolute top-0 left-0 right-0 p-4 text-white bg-black bg-opacity-20 rounded-md flex flex-col justify-center items-left h-1/5">
                <h2 className="text-lg font-bold">{season.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedSeason && (
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Episodes for Season {selectedSeason}
          </h2>
          <ul className="list-disc pl-5">
            {show.episodes.map((episode) => (
              <li key={episode.id} className="mb-2">
                {episode.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShowsPage;
