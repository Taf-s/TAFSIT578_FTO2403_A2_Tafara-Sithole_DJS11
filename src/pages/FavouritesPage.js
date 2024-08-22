// FavoritesPage.js
import React, { useContext } from "react";
import { FavoriteEpisodesContext } from "../context/FavoriteEpisodesContext";

const FavoritesPage = () => {
  const { favoriteEpisodes, removeFavoriteEpisode } = useContext(
    FavoriteEpisodesContext
  );

  return (
    <div>
      <h1>Favorites</h1>
      <ul>
        {favoriteEpisodes?.list?.map((episodeId) => (
          <li key={episodeId}>
            <h2>{favoriteEpisodes[episodeId].title}</h2>
            <p>{favoriteEpisodes[episodeId].description}</p>
            <button onClick={() => removeFavoriteEpisode(episodeId)}>
              Remove from Favorites
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
