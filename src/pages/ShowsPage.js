import React, { useState, useContext } from "react";
import { ShowsContext } from "../context/ShowsContext"; // Adjust the import path as needed
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEpisodePlayer } from "../context/EpisodePlayerContext";

const ShowsPage = () => {
  let { showId } = useParams();
  const { shows, loading, error } = useContext(ShowsContext);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const { setCurrentEpisode } = useEpisodePlayer();

  const show = shows.find((show) => show.id === showId);

  const handleSeasonClick = async (season) => {
    try {
      // Directly get the episodes from the clicked season
      const episodes = season.episodes;

      // Update state with these episodes
      setEpisodes(episodes);

      // Set the selected season ID
      setSelectedSeason(season.season);
    } catch (err) {
      console.error("Error fetching episodes:", err);
    }
  };

  const handleEpisodeClick = (episode) => {
    console.log("handleEpisodeClick called with episode:", episode);
    setCurrentEpisode(episode);
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
        <Carousel showArrows={true} infinite={false}>
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
        </Carousel>
      </div>

      {selectedSeason && (
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Season {selectedSeason}: {episodes.length} Episodes
          </h2>
          <ol className="list-decimal list-inside">
            {episodes.map((episode) => (
              <li
                key={episode.id}
                className="bg-gray-200 rounded-lg shadow-md w-full mb-2"
                onClick={() => handleEpisodeClick(episode)}
              >
                <span className="text-lg leading-none">{episode.title}</span>
                <div className="">{episode.description}</div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default ShowsPage;
