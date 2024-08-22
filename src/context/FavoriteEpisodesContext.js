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
    setFavoriteEpisodes((prevEpisodes) => ({
      ...prevEpisodes,
      [episode.id]: episode,
    }));
  };

  const removeFavoriteEpisode = (episodeId) => {
    setFavoriteEpisodes((prevEpisodes) => {
      const newEpisodes = { ...prevEpisodes };
      delete newEpisodes[episodeId];
      return newEpisodes;
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
