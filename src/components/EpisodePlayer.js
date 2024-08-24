import React from "react";
import { useEpisodePlayer } from "../context/EpisodePlayerContext";
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";

function EpisodePlayer() {
  // Grab the episode player context
  const {
    currentEpisode,
    isPlaying,
    playPause,
    currentTime,
    duration,
    progress,
    previousEpisode,
    nextEpisode,
    formatTime,
  } = useEpisodePlayer();

  // Create a JSX element for the episode player
  return (
    <div className="max-w-5xl mx-auto p-4 rounded-lg sticky bottom-0 z-50 left-0 right-0 bg-customBlack text-white flex flex-col md:flex-row items-center justify-between shadow-lg transition-all duration-300 ease-in-out">
      {/* If there is a current episode, display it */}
      {currentEpisode ? (
        <div className="flex items-center w-full">
          {/* Episode Info */}
          <div className="flex items-center space-x-4 w-1/3">
            {/* Episode Image (TODO: Implement) */}
            <img
              //   src={currentEpisode.season.image}
              alt={currentEpisode.title}
              className="w-12 h-12 object-cover rounded"
            />
            <div className="flex flex-col">
              {/* Episode Title */}
              <h2 className="text-base text-wrap font-bold truncate">
                {currentEpisode.title}
              </h2>
              {/* Episode Podcast Name */}
              <p className="text-sm text-gray-400 truncate">
                {currentEpisode.podcastName}
              </p>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center space-x-4 w-1/3">
            {/* Previous Button */}
            <button
              onClick={previousEpisode}
              className="text-customGreen text-2xl p-2 hover:text-customBlue transition-transform transform hover:scale-110"
              aria-label="Previous"
            >
              <FaStepBackward size={24} />
            </button>
            {/* Play/Pause Button */}
            <button
              onClick={playPause}
              className="bg-customGreen text-gray-900 p-3 rounded-full transition-transform transform hover:scale-110 hover:bg-customBlue"
              aria-label="Play/Pause"
            >
              {/* Conditionally render the play/pause icon */}
              {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
            </button>
            {/* Next Button */}
            <button
              onClick={nextEpisode}
              className="text-customGreen text-2xl p-2 hover:text-customBlue transition-transform transform hover:scale-110"
              aria-label="Next"
            >
              <FaStepForward size={24} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-1/3">
            {/* Current Time */}
            <span className="text-sm text-gray-400">
              {formatTime(currentTime)}
            </span>
            {/* Progress Bar Background */}
            <div className="relative w-full h-1 bg-gray-700 rounded overflow-hidden">
              {/* Progress Bar Foreground (conditional width) */}
              <div
                className="absolute top-0 left-0 h-full bg-blue-500 rounded transition-width duration-500 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            {/* Duration */}
            <span className="text-sm text-gray-400">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      ) : (
        <p>Select an episode to play</p>
      )}
    </div>
  );
}

export default EpisodePlayer;
