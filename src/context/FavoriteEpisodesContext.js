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

  console.log("favoriteEpisodes", favoriteEpisodes);

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
    const timestamp = new Date().toLocaleString(); // Capture the current timestamp

    // Make a copy of the current favorite episodes
    setFavoriteEpisodes((prevFavorites) => {
      const updatedFavorites = Array.isArray(prevFavorites)
        ? [...prevFavorites]
        : [];

      // Find the show in the list of favorite episodes
      const showIndex = updatedFavorites.findIndex(
        (item) => item.showId === showId
      );

      // If the show is already in the list of favorite episodes
      if (showIndex !== -1) {
        // Find the season in the show's seasons
        const seasonIndex = updatedFavorites[showIndex].seasons.findIndex(
          (season) => season.number === seasonNumber
        );

        // If the season is already in the list of seasons
        if (seasonIndex !== -1) {
          // Check if the episode is already in the list of episodes for that season
          const episodeExists = updatedFavorites[showIndex].seasons[
            seasonIndex
          ].episodes.some((ep) => ep.id === episode.id);

          // If the episode is not already in the list of episodes
          if (!episodeExists) {
            // Add the episode to the list of episodes for that season
            updatedFavorites[showIndex].seasons[seasonIndex].episodes.push({
              ...episode,
              timestamp, // Add the current timestamp to the episode
            });
          }
        } else {
          // Add the season to the list of seasons for that show
          // and add the episode to the list of episodes for that season
          updatedFavorites[showIndex].seasons.push({
            number: seasonNumber,
            image: seasonImage,
            episodes: [{ ...episode, timestamp }],
          });
        }
      } else {
        // Add the show to the list of favorite episodes
        // and add the season to the list of seasons for that show
        // and add the episode to the list of episodes for that season
        updatedFavorites.push({
          showId,
          showTitle,
          // episode.title,
          seasons: [
            {
              number: seasonNumber,
              image: seasonImage,
              episodes: [{ ...episode, timestamp }],
            },
          ],
        });
      }

      // Return the updated list of favorite episodes
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

  const removeFavoriteEpisode = (showId, seasonNumber, episodeId) => {
    setFavoriteEpisodes((prevFavorites) => {
      const updatedFavorites = Array.isArray(prevFavorites)
        ? [...prevFavorites]
        : [];

      return updatedFavorites
        .map((item) => {
          if (item.showId !== showId) return item;
          return {
            ...item,
            seasons: item.seasons
              .map((season) => {
                if (season.number !== seasonNumber) return season;
                return {
                  ...season,
                  episodes: season.episodes.filter(
                    (episode) => episode.id !== episodeId
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
    // Step 1: Find the show with the given showId
    const show = favoriteEpisodes.find((show) => show.showId === showId);
    if (!show) {
      return false; // Show not found
    }

    // Step 2: Find the season with the given seasonNumber
    const season = show.seasons.find(
      (season) => season.number === seasonNumber
    );
    if (!season) {
      return false; // Season not found
    }

    // Step 3: Check if the episode exists in the episodes array
    const episodeExists = season.episodes.includes(episodeNumber);

    // Step 4: Return true if the episode exists, otherwise false
    return episodeExists;
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
