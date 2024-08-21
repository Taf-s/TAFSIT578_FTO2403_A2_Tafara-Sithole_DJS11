import React from "react";
import { useEpisodePlayer } from "../context/EpisoidePlayerContext";

function EpisodePlayer() {
  const { currentEpisode, isPlaying, playPause } = useEpisodePlayer();

  console.log("EpisodePlayer currentEpisode:", currentEpisode);

  return (
    <div className="sticky bottom-0 z-1  left-0 right-0 bg-gray-900 text-white p-4 flex items-center justify-between shadow-lg z-50">
      {currentEpisode ? (
        <div className="flex items-center">
          <div className="flex-grow">
            <h2 className="text-lg font-bold">{currentEpisode.title}</h2>
          </div>
          <button
            onClick={playPause}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      ) : (
        <p>Select an episode to play</p>
      )}
    </div>
  );
}

export default EpisodePlayer;
