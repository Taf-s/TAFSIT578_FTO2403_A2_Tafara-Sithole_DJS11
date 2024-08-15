import React from "react";
import { Link } from "react-router-dom";

function ShowCard({ show }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden relative transition duration-300 transform hover:scale-105 hover:translate-y-2 hover:rotate-0 hover:shadow-2xl">
      <Link to={`/show/${show.id}`}>
        <img
          src={show.image}
          alt={show.name}
          className="w-full h-full object-cover"
        />
      </Link>
      <div className="absolute bottom-3 left-3 right-3 p-4 bg-black bg-opacity-50 rounded-md flex flex-col justify-center items-left h-1/3">
        <div className="text-white">
          <h2 className="text-lg font-bold">{show.title}</h2>
          <p className="text-sm text-gray-200"> {show.seasons} Seasons</p>
          <p className="text-sm text-gray-200">
            Last Updated: {new Date(show.updated).toLocaleDateString()}
          </p>
          <div className="mt-2 flex flex-wrap">
            {show.genres.map((genre) => (
              <span
                genre={genre}
                className="inline-block bg-gray-200 text-gray-800 text-xs px-1 py-0.5 rounded-full mr-1 mb-1"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowCard;
