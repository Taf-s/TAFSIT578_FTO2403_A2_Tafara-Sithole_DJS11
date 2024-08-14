// import React from "react";
import "./index.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import GenrePage from "./pages/GenrePage";
import FavouritesPage from "./pages/FavouritesPage";
import SearchProvider from "./context/searchProvider";
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
      <SearchProvider shows={shows}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/genre" element={<GenrePage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
        </Routes>
      </SearchProvider>
    </Router>
  );
}

export default App;
