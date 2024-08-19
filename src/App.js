// import React from "react";
import "./index.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import GenrePage from "./pages/GenrePage";
import GenreShowsPage from "./pages/GenreShowsPage";
import FavouritesPage from "./pages/FavouritesPage";
import SearchProvider from "./SearchProvider";
import { GenresProvider } from "./context/GenresContex";
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
      <GenresProvider>
        <SearchProvider shows={shows}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/genre" element={<GenrePage />} />
            <Route
              path="/genre/:id"
              element={<GenreShowsPage shows={shows} />}
            />
            <Route path="/favourites" element={<FavouritesPage />} />
          </Routes>
        </SearchProvider>
      </GenresProvider>
    </Router>
  );
}

export default App;
