// Favorites Page

import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { FavoriteEpisodesContext } from "../context/FavoriteEpisodesContext";

function FavoritesPage() {
  const { favoriteEpisodes, removeFavoriteEpisode } = useContext(
    FavoriteEpisodesContext
  );

  // Add error checking
  if (!Array.isArray(favoriteEpisodes)) {
    return <p>Error: Unable to load favorite episodes.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-20 mt-20 text-white">
        Favorite Episodes
      </h1>
      {favoriteEpisodes.length === 0 ? (
        <p>No favorite episodes yet.</p>
      ) : (
        favoriteEpisodes.map((show) => (
          <div key={show.id} className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">{show.title}</h2>
            {show.seasons.map((season) => (
              <div key={`${show.id}-${season.season}`} className="mb-6">
                <div className="flex items-center mb-4">
                  <img
                    src={season.image}
                    alt={`Season ${season.season}`}
                    className="w-16 h-16 rounded mr-4"
                  />
                  <h3 className="text-lg text-white">{season.title}</h3>
                </div>
                <ul>
                  {season.episodes.map((episode) => (
                    <li
                      key={`${show.id}-${season.season}-${episode.episode}`}
                      className="bg-customBackground rounded-lg shadow-md w-full mb-4 p-4 cursor-pointer border hover:border-customBlue flex flex-col"
                    >
                      <span className="text-2xl text-white leading-none mb-2">
                        {episode.title}
                      </span>
                      <div className="text-gray-400 flex items-center justify-between">
                        <div className="flex-1">
                          <p className="mb-2">{episode.description}</p>
                          <p className="text-gray-400">
                            Episode {episode.episode}
                          </p>
                        </div>
                        <div className="favorite-button-container">
                          <button
                            className="ml-2"
                            onClick={() =>
                              removeFavoriteEpisode(
                                show.id,
                                season.season,
                                episode.episode
                              )
                            }
                          >
                            <FaTrash className="text-lg text-customRed" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default FavoritesPage;
