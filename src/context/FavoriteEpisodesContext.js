// FavoriteEpisodesContext.js
import { createContext, useState, useEffect } from "react";

const FavoriteEpisodesContext = createContext();

const FavoriteEpisodesProvider = ({ children }) => {
  const [favoriteEpisodes, setFavoriteEpisodes] = useState(() => {
    const storedEpisodes = localStorage.getItem("favoriteEpisodes");
    return storedEpisodes ? JSON.parse(storedEpisodes) : {};
  });

  useEffect(() => {
    localStorage.setItem("favoriteEpisodes", JSON.stringify(favoriteEpisodes));
  }, [favoriteEpisodes]);

  const updateFavoriteEpisode = (episode) => {
    setFavoriteEpisodes((prevFavorites) => ({
      ...prevFavorites,
      [episode.id]: episode,
    }));
  };

  const removeFavoriteEpisode = (episodeId) => {
    setFavoriteEpisodes((prevFavorites) => {
      const updatedFavorites = { ...prevFavorites };
      delete updatedFavorites[episodeId];
      return updatedFavorites;
    });
  };

  return (
    <FavoriteEpisodesContext.Provider
      value={{ favoriteEpisodes, updateFavoriteEpisode, removeFavoriteEpisode }}
    >
      {children}
    </FavoriteEpisodesContext.Provider>
  );
};

export { FavoriteEpisodesProvider, FavoriteEpisodesContext };
