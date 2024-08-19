// src/pages/GenreShowsPage.js
import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import { fetchGenre } from "../services/fetchgenre";
import ShowCard from "../components/ShowCard";

function GenreShowsPage() {
  //   const { id } = useParams();
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGenre = async () => {
      try {
        const data = await fetchGenre(); // Fetch genre with basic show info
        setGenre(data);
      } catch (error) {
        console.error("Failed to fetch genre shows:", error);
      } finally {
        setLoading(false);
      }
    };

    getGenre();
  }, []);

  if (loading) {
    return <div>Loading genre shows...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">{genre.title}</h1>
      <p className="mb-4">{genre.description}</p>
      <div className="grid grid-cols-2 gap-4">
        {genre.shows.map((showId) => (
          <ShowCard key={showId} showId={showId} />
        ))}
      </div>
    </div>
  );
}

export default GenreShowsPage;
