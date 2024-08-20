// src/components/GenreCard.js
import React from "react";
import { Link } from "react-router-dom";

function GenreCard({ genre }) {
  // const randomShow = shows[Math.floor(Math.random() * shows.length)];
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden relative transition duration-300 transform hover:scale-105 hover:translate-y-2 hover:rotate-0 hover:shadow-2xl">
      <Link to={`/genre/${genre.id}`}>
        {/* <img
          src={randomShow.image}
          alt={randomShow.name}
          className="w-full h-full object-cover"
        /> */}
      </Link>
      <div className="absolute bottom-3 left-3 right-3 p-4 bg-black bg-opacity-50 rounded-md flex flex-col justify-center items-left h-1/3">
        <div className="text-white">
          <h2 className="text-xl font-bold">{genre.title}</h2>
        </div>
      </div>
    </div>
  );
}

export default GenreCard;
