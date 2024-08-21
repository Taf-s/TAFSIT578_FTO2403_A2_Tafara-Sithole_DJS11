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
import { EpisodePlayerProvider } from "./context/EpisoidePlayerContext";
import { fetchPreviews } from "./services/fetchpreviews";

function App() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const getShows = async () => {
      try {
        const data = await fetchPreviews();
        console.log("Fetched Shows: ", data); // Check if data is being fetched correctly
        setShows(data);
      } catch (error) {
        console.error("Failed to fetch shows:", error);
      }
    };

    getShows();
  }, []);

  return (
    <Router>
      <EpisodePlayerProvider>
        <ShowsProvider>
          <GenresProvider>
            <SearchProvider shows={shows}>
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
            </SearchProvider>
          </GenresProvider>
        </ShowsProvider>
      </EpisodePlayerProvider>
    </Router>
  );
}

export default App;
