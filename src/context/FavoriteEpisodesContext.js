import React, { createContext, useState, useEffect } from "react";

export const FavoriteEpisodesContext = createContext();

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

  const addFavoriteEpisode = (showId, seasonNumber, episode) => {
    setFavoriteEpisodes((prevFavorites) => {
      const updatedFavorites = Array.isArray(prevFavorites)
        ? [...prevFavorites]
        : [];

      const showIndex = updatedFavorites.findIndex(
        (item) => item.showId === showId
      );

      if (showIndex !== -1) {
        const seasonIndex = updatedFavorites[showIndex].seasons.findIndex(
          (season) => season.number === seasonNumber
        );
        if (seasonIndex !== -1) {
          const episodeExists = updatedFavorites[showIndex].seasons[
            seasonIndex
          ].episodes.some((ep) => ep.id === episode.id);
          if (!episodeExists) {
            updatedFavorites[showIndex].seasons[seasonIndex].episodes.push(
              episode
            );
          }
        } else {
          updatedFavorites[showIndex].seasons.push({
            number: seasonNumber,
            episodes: [episode],
          });
        }
      } else {
        updatedFavorites.push({
          showId,
          showTitle: episode.title,
          seasons: [
            {
              number: seasonNumber,
              episodes: [episode],
            },
          ],
        });
      }
      return updatedFavorites;
    });
  };

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

  // const isFavoriteEpisode = (showId, seasonNumber, episodeId) => {
  //   if (Array.isArray(favoriteEpisodes)) {
  //     return favoriteEpisodes.find(
  //       (item) =>
  //         item.showId === showId &&
  //         item.seasons.find(
  //           (season) =>
  //             season.number === seasonNumber &&
  //             season.episodes.find((episode) => episode.id === episodeId)
  //         )
  //     );
  //   } else {
  //     return false;
  //   }
  // };
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
