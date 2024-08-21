import React from "react";
import { Link } from "react-router-dom";
import { genreMapping } from "../utils/genreUtils";

function ShowCard({ show }) {
  // Logging the entire show object
  console.log("Rendering show:", show);

  // Logging the genres and seasons to check their structure
  console.log("Show genres:", show.genres);
  console.log("Show seasons:", show.seasons);

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
          {/* <p className="text-sm text-gray-200"> {show.season} Seasons</p> */}
          <p className="text-sm text-white">
            Last Updated: {new Date(show.updated).toLocaleDateString()}
          </p>
          <div className="mt-2 flex flex-wrap">
            {Array.isArray(show.genres) &&
              show.genres.map((genre, index) => (
                <span
                  key={index}
                  className="inline-block  text-white text-xs px-1 py-0 mr-1 mb-1"
                >
                  {genreMapping[genre]}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowCard;
