import React from "react";
import { Link } from "react-router-dom";

function ShowCard({ show }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <Link to={`/show/${show.id}`}>
        <img
          src={show.image}
          alt={show.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <h2 className="text-2xl font-bold">{show.title}</h2>
        <p className="text-gray-600"> {show.seasons} Seasons</p>
        <p className="text-gray-600">
          Last Updated: {new Date(show.updated).toLocaleDateString()}
        </p>
        <div className="mt-2">
          {show.genres.map((genre) => (
            <span
              genre={genre}
              className="inline-block bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded-full mr-2"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowCard;
