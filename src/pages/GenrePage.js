import React, { useContext } from "react";
import { GenresContext } from "../context/GenresContex";
import GenreCard from "../components/GenreCard";
function GenrePage() {
  const { genres, loading } = useContext(GenresContext);

  if (loading) {
    return <div>Loading genres...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Genres</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {genres.map((genre) => (
          <GenreCard key={genre.id} genre={genre} />
        ))}
      </div>
    </div>
  );
}

export default GenrePage;
