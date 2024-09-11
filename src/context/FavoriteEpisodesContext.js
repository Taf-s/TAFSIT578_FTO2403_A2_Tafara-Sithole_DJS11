// Favorite Episodes Context

import React, { createContext, useState, useEffect } from "react";

export const FavoriteEpisodesContext = createContext();

/**
 * Provider component for the FavoriteEpisodesContext.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @return {JSX.Element} The provider component.
 */

export function FavoriteEpisodesProvider({ children }) {
  const [favoriteEpisodes, setFavoriteEpisodes] = useState(() => {
    const savedFavorites = localStorage.getItem("favoriteEpisodes");
    if (savedFavorites) {
      try {
        return JSON.parse(savedFavorites);
      } catch (error) {
        console.error(error);
        return [];
      }
    } else {
      return [];
    }
  });

  useEffect(() => {
    /**
     * Handles changes to the local storage, specifically for favorite episodes.
     *
     * @return {void} No return value, updates the favorite episodes state.
     */

    const handleStorageChange = () => {
      const savedFavorites = localStorage.getItem("favoriteEpisodes");
      if (savedFavorites) {
        setFavoriteEpisodes(JSON.parse(savedFavorites));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteEpisodes", JSON.stringify(favoriteEpisodes));
  }, [favoriteEpisodes]);

  /**
   * Adds a favorite episode to the list of favorite episodes.
   *
   * @param {string} showId - The ID of the show that the episode belongs to.
   * @param {string} showTitle - The title of the show.
   * @param {number} seasonNumber - The number of the season that the episode belongs to.
   * @param {string} seasonTitle - The title of the season.
   * @param {string} seasonImage - The URL of the image associated with the season.
   * @param {object} episode - The episode to be added to the list of favorite episodes.
   * @return {void}
   */
  const addFavoriteEpisode = (
    showId,
    showTitle,
    seasonNumber,
    seasonTitle,
    seasonImage,
    episode
  ) => {
    const timestamp = new Date().toISOString(); // Define timestamp here

    setFavoriteEpisodes((prevFavorites) => {
      // Ensure prevFavorites is an array
      const updatedFavorites = Array.isArray(prevFavorites)
        ? [...prevFavorites]
        : [];

      // Find the show in the favorites
      const showIndex = updatedFavorites.findIndex(
        (show) => show.id === showId
      );

      if (showIndex !== -1) {
        // Show exists, find the season
        const seasonIndex = updatedFavorites[showIndex].seasons.findIndex(
          (season) => season.season === seasonNumber
        );

        if (seasonIndex !== -1) {
          // Season exists, check if episode already exists
          const episodeExists = updatedFavorites[showIndex].seasons[
            seasonIndex
          ].episodes.some((ep) => ep.episode === episode.episode);

          if (!episodeExists) {
            // Add new episode to existing season
            updatedFavorites[showIndex].seasons[seasonIndex].episodes.push({
              ...episode,
              timestamp,
            });
          }
        } else {
          // Add new season with the episode
          updatedFavorites[showIndex].seasons.push({
            season: seasonNumber,
            title: seasonTitle,
            image: seasonImage,
            episodes: [{ ...episode, timestamp }],
          });
        }
      } else {
        // Add new show with the season and episode
        updatedFavorites.push({
          id: showId,
          title: showTitle,
          seasons: [
            {
              season: seasonNumber,
              title: seasonTitle,
              image: seasonImage,
              episodes: [{ ...episode, timestamp }],
            },
          ],
        });
      }
      return updatedFavorites;
    });
  };

  /**
   * Removes a favorite episode from the list of favorite episodes.
   *
   * @param {string} showId - The ID of the show that the episode belongs to.
   * @param {number} seasonNumber - The number of the season that the episode belongs to.
   * @param {string} episodeId - The ID of the episode to be removed.
   * @return {void}
   */

  const removeFavoriteEpisode = (showId, seasonNumber, episodeNumber) => {
    setFavoriteEpisodes((prevFavorites) => {
      const updatedFavorites = Array.isArray(prevFavorites)
        ? [...prevFavorites]
        : [];

      return updatedFavorites
        .map((item) => {
          if (item.id !== showId) return item;
          return {
            ...item,
            seasons: item.seasons
              .map((season) => {
                if (season.season !== seasonNumber) return season;
                return {
                  ...season,
                  episodes: season.episodes.filter(
                    (episode) => episode.episode !== episodeNumber
                  ),
                };
              })
              .filter((season) => season.episodes.length > 0),
          };
        })
        .filter((item) => item.seasons.length > 0);
    });
  };

  function isFavoriteEpisode(showId, seasonNumber, episodeNumber) {
    if (!Array.isArray(favoriteEpisodes)) {
      return false;
    }

    if (episodeNumber === undefined) {
      return false;
    }

    const isFavorite = favoriteEpisodes.some(
      (show) =>
        show.id === showId &&
        show.seasons.some(
          (season) =>
            season.season === seasonNumber &&
            season.episodes.some((episode) => episode.episode === episodeNumber)
        )
    );

    return isFavorite;
  }

  return (
    <FavoriteEpisodesContext.Provider
      value={{
        favoriteEpisodes,
        addFavoriteEpisode,
        removeFavoriteEpisode,
        isFavoriteEpisode,
      }}
    >
      {children}
    </FavoriteEpisodesContext.Provider>
  );
}
