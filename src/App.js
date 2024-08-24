// import React from "react";
import "./index.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import GenrePage from "./pages/GenrePage";
import ShowsPage from "./pages/ShowsPage.js";
import GenreShowsPage from "./pages/GenreShowsPage";
import FavouritesPage from "./pages/FavouritesPage";
import SearchProvider from "./SearchProvider";
import EpisodePlayer from "./components/EpisodePlayer.js";
import { GenresProvider } from "./context/GenresContex";
import { ShowsProvider } from "./context/ShowsContext";
import { EpisodePlayerProvider } from "./context/EpisodePlayerContext.js";
import { FavoriteEpisodesProvider } from "./context/FavoriteEpisodesContext.js";
import { fetchPreviews } from "./services/fetchpreviews";

function App() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const getShows = async () => {
      try {
        const data = await fetchPreviews();
        setShows(data);
      } catch (error) {
        console.error("Failed to fetch shows:", error);
      }
    };

    getShows();
  }, []);

  return (
    <Router>
      <ShowsProvider>
        <GenresProvider>
          <FavoriteEpisodesProvider>
            <EpisodePlayerProvider>
              <SearchProvider shows={shows}>
                <div>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/genre" element={<GenrePage />} />
                    <Route path="/show/:showId" element={<ShowsPage />} />
                    <Route
                      path="/genre/:id"
                      element={<GenreShowsPage shows={shows} />}
                    />
                    <Route path="/favourites" element={<FavouritesPage />} />
                  </Routes>
                  <EpisodePlayer />
                </div>
              </SearchProvider>
            </EpisodePlayerProvider>
          </FavoriteEpisodesProvider>
        </GenresProvider>
      </ShowsProvider>
    </Router>
  );
}

export default App;
