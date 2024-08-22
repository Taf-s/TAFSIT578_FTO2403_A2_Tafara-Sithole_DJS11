// src/pages/GenrePage.js
import { Link } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { GenresContext } from "../context/GenresContex";
import { fetchShows } from "../services/fetchshow";

function GenrePage() {
  const { genres, loading } = useContext(GenresContext);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetchShows().then((data) => setShows(data));
  }, []);

  if (loading || shows.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden relative "
              >
                <div className=" w-full h-96 animate-pulse bg-gray-300 rounded-lg"></div>
                <div className="absolute bottom-3 left-3 right-3 p-4 bg-gray-200 rounded-md flex flex-col justify-center items-center h-1/5">
                  <div className="bg-gray-200 h-4"></div>
                  <div className="bg-gray-200 h-2 mt-2"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {genres.map((genre) => {
          const randomShowId =
            genre.shows[Math.floor(Math.random() * genre.shows.length)];
          const randomShow = shows.find((show) => show.id === randomShowId);
          const showImage = randomShow.image || null;

          return (
            <div
              key={genre.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden relative transition duration-300 transform hover:scale-105 hover:translate-y-2 hover:rotate-0 hover:shadow-2xl"
            >
              <Link to={`/genre/${genre.id}`}>
                <img
                  src={showImage}
                  alt={genre.title}
                  className="w-full object-cover"
                />
              </Link>
              <div className="absolute bottom-3 left-3 right-3 p-4 bg-black bg-opacity-80 rounded-md flex flex-col justify-center items-center h-1/5">
                <div className="text-customYellow">
                  <h2 className="text-xl font-bold">{genre.title}</h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GenrePage;
