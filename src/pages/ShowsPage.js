import React, { useState, useContext } from "react";
import { ShowsContext } from "../context/ShowsContext"; // Adjust the import path as needed
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEpisodePlayer } from "../context/EpisodePlayerContext";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FavoriteEpisodesContext } from "../context/FavoriteEpisodesContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ShowsPage = () => {
  let { showId } = useParams();
  const { shows, loading, error } = useContext(ShowsContext);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const { setCurrentEpisode } = useEpisodePlayer();

  // Context Debugging
  const favoriteContext = useContext(FavoriteEpisodesContext);
  const { addFavoriteEpisode, removeFavoriteEpisode, isFavoriteEpisode } =
    favoriteContext || {};

  const show = shows.find((show) => show.id === showId);

  const handleSeasonClick = async (season) => {
    try {
      // Directly get the episodes from the clicked season
      const episodes = season.episodes;

      // Update state with these episodes
      setEpisodes(episodes);

      // Set the selected season number
      setSelectedSeason(season.season);
    } catch (err) {
      console.error("Error fetching episodes:", err);
    }
  };

  /**
   * This function is called when an episode is clicked.
   * It takes an episode object as an argument.
   * It logs the episode object to the console for debugging purposes.
   * It then calls the setCurrentEpisode function from the EpisodePlayerContext
   * and passes the episode object to it.
   * This function is used to update the current episode in the EpisodePlayerContext
   * when a user clicks on an episode.
   */
  const { playEpisode, openPlayer } = useEpisodePlayer();

  const handleEpisodeClick = (episode) => {
    setCurrentEpisode(episode);
    playEpisode(episode); // Use playEpisode to set the episode and open the player
    openPlayer();
  };

  const handleFavoriteClick = (e, episode) => {
    e.stopPropagation(); // Prevent triggering the episode click

    if (!addFavoriteEpisode || !removeFavoriteEpisode || !isFavoriteEpisode) {
      console.error("Favorite episode functions are not available");
      return;
    }

    // Find the current season object
    const currentSeason = show.seasons.find((s) => s.season === selectedSeason);

    if (!currentSeason) {
      console.error("Current season not found");
      return;
    }

    // Check if the episode is already a favorite
    if (isFavoriteEpisode(show.id, currentSeason.season, episode.episode)) {
      removeFavoriteEpisode(show.id, currentSeason.season, episode.episode);
    } else {
      // Add the favorite episode with additional data
      addFavoriteEpisode(
        show.id,
        show.title,
        currentSeason.season,
        currentSeason.title,
        currentSeason.image,
        episode
      );
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <div className="mb-6 relative">
          <div className="h-96 bg-gray-300 rounded-lg animate-pulse"></div>
          <div className="absolute top-0 left-0 right-0 p-4 text-customYellow bg-black bg-opacity-50 rounded-md flex flex-col justify-center items-left h-1/5 animate-pulse">
            <div className="h-8 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded-lg animate-pulse"></div>
          </div>
        </div>

        <div className="p-4 bg-customBlack rounded-lg shadow-md mt-4 animate-pulse">
          <div className="h-8 bg-gray-300 rounded-lg animate-pulse"></div>
        </div>

        <div className="mb-6">
          <Carousel showArrows={true} infinite={false}>
            {Array(5)
              ?.fill(null)
              ?.map((_, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-72 h-72 bg-gray-200 rounded-lg shadow-md flex flex-col items-center justify-center text-sm font-medium hover:bg-gray-300 cursor-pointer relative animate-pulse"
                >
                  <div className="h-72 bg-gray-300 rounded-lg animate-pulse"></div>
                  <div className="absolute top-0 left-0 right-0 p-4 text-customYellow bg-black bg-opacity-50 rounded-md flex flex-col justify-center items-left h-1/5 animate-pulse">
                    <div className="h-8 bg-gray-300 rounded-lg animate-pulse"></div>
                  </div>
                </div>
              ))}
          </Carousel>
        </div>

        <div>
          <div className="h-8 bg-gray-300 rounded-lg animate-pulse"></div>
          <ol className="list-decimal list-inside">
            {Array(5)
              ?.fill(null)
              ?.map((_, index) => (
                <li
                  key={index}
                  className="bg-customBackground rounded-lg shadow-md w-full mb-4 p-4 cursor-pointer border hover:border-customBlue animate-pulse"
                >
                  <div className="h-8 bg-gray-300 rounded-lg animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded-lg animate-pulse"></div>
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }

  if (error)
    return (
      <div className="text-center py-4 text-red-600">
        Error: {error.message}
      </div>
    );

  if (!show) return <div className="text-center py-4">Show not found</div>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Link to="/" className="text-xl text-white font-bold mb-4">
        <FaArrowLeft />
      </Link>
      <div className="mb-6 relative">
        <img
          src={show.image}
          alt={show.title}
          className="w-full h-96 object-cover object-center mx-auto rounded-lg shadow-lg"
        />
        <div className="absolute top-0 left-0 right-0 p-4 text-customYellow bg-black bg-opacity-50 rounded-md flex flex-col justify-center items-left h-1/5 ">
          <h1 className="text-3xl font-bold mb-2">{show.title}</h1>
          <p className="text-m">{show.seasons.length} Seasons</p>
          <p className="text-m">
            {show.genres?.map((genre, index) => (
              <span key={genre} className="mr-2">
                {genre}
              </span>
            ))}
          </p>
        </div>
        <div className="p-4 bg-customBlack rounded-lg shadow-md mt-4">
          <p className="text-base text-white">{show.description}</p>
        </div>
      </div>

      <div className="mb-6">
        <Carousel showArrows={true} infinite={false}>
          {show.seasons?.map((season) => (
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
              <div className="absolute top-0 left-0 right-0 p-4 text-customYellow bg-black bg-opacity-50 rounded-md flex flex-col justify-center items-left h-1/5">
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
            {episodes?.map((episode) => (
              <li
                key={episode.id}
                className="bg-customBackground rounded-lg shadow-md w-full mb-4 p-4 cursor-pointer border hover:border-customBlue flex flex-col"
                onClick={() => handleEpisodeClick(episode)}
              >
                <span className="text-2xl text-white leading-none mb-2">
                  {episode.title}
                </span>
                <div className="text-gray-400 flex items-center justify-between">
                  {episode.description}
                  <div className="favorite-button-container">
                    <button
                      className="ml-2"
                      onClick={(e) => handleFavoriteClick(e, episode)}
                    >
                      {isFavoriteEpisode &&
                      isFavoriteEpisode(
                        show.id,
                        selectedSeason,
                        episode.episode
                      ) ? (
                        <FaHeart className="text-lg text-customRed" />
                      ) : (
                        <FaRegHeart className="text-lg text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default ShowsPage;
