import React from "react";
import { Link } from "react-router-dom";
import { genreMapping } from "../utils/genreUtils";

function ShowCard({ show }) {
  // This component takes in a show object as a prop.
  // The show object is expected to have the following properties:
  // - id: a unique identifier for the show
  // - title: the title of the show
  // - image: the URL of the show's image
  // - genres: an array of genre IDs associated with the show
  // - seasons: an array of season objects associated with the show
  // - updated: a timestamp indicating when the show was last updated

  // We log the show object to the console for debugging purposes.
  console.log("Rendering show:", show);

  // We also log the genres and seasons arrays to the console,
  // so we can see their structure.
  console.log("Show genres:", show.genres);
  console.log("Show seasons:", show.seasons);

  // We return a JSX element that represents the show card.
  // The element is a div with a class of "bg-white shadow-lg rounded-lg overflow-hidden relative".
  // This sets up the basic styling for the card.
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden relative transition duration-300 transform hover:scale-105 hover:translate-y-2 hover:rotate-0 hover:shadow-2xl">
      {/* We wrap the card in a Link component, so that when the user clicks the card, */}
      {/* they will be taken to a page displaying more information about the show. */}
      <Link to={`/show/${show.id}`}>
        {/* We display the show's image inside the card. */}
        <img
          src={show.image}
          alt={show.name}
          className="w-full h-full object-cover"
        />
      </Link>
      {/* We add a div with an absolute position to the card. */}
      {/* This div will contain the text that displays on top of the card. */}
      <div className="absolute bottom-3 left-3 right-3 p-4 bg-black bg-opacity-80 rounded-md flex flex-col justify-center items-left h-1/3">
        {/* Inside the div, we add a div with a class of "text-customYellow". */}
        {/* This sets the color of the text to a custom yellow color. */}
        <div className="text-customYellow">
          {/* We display the show's title inside the div. */}
          <h2 className="text-lg font-bold">{show.title}</h2>
          {/* We could display the number of seasons the show has here, */}
          {/* but for now, we're commenting it out. */}
          {/* <p className="text-sm text-gray-200"> {show.season} Seasons</p> */}
          {/* We display the timestamp of when the show was last updated. */}
          <p className="text-sm text-customYellow">
            Last Updated: {new Date(show.updated).toLocaleDateString()}
          </p>
          {/* We display an array of genre names associated with the show. */}
          {/* We use the genreMapping object to map the genre IDs */}
          {/* to human-readable genre names. */}
          <div className="mt-2 flex flex-wrap">
            {Array.isArray(show.genres) &&
              show.genres.map((genre, index) => (
                <span
                  key={index}
                  className="inline-block  text-customYellow text-xs px-1 py-0 mr-1 mb-1"
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
