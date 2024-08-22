import React from "react";
import { useEpisodePlayer } from "../context/EpisodePlayerContext";
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";

function EpisodePlayer() {
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

  return (
    <div className="max-w-5xl mx-auto p-4 rounded-lg sticky bottom-0 z-50 left-0 right-0 bg-customBlack text-white flex flex-col md:flex-row items-center justify-between shadow-lg transition-all duration-300 ease-in-out">
      {currentEpisode ? (
        <div className="flex items-center w-full">
          {/* Episode Info */}
          <div className="flex items-center space-x-4 w-1/3">
            <img
              //   src={currentEpisode.season.image}
              alt={currentEpisode.title}
              className="w-12 h-12 object-cover rounded"
            />
            <div className="flex flex-col">
              <h2 className="text-lg font-bold truncate">
                {currentEpisode.title}
              </h2>
              <p className="text-sm text-gray-400 truncate">
                {currentEpisode.podcastName}
              </p>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center space-x-4 w-1/3">
            <button
              onClick={previousEpisode}
              className="text-customGreen text-2xl p-2 hover:text-customBlue transition-transform transform hover:scale-110"
              aria-label="Previous"
            >
              <FaStepBackward size={24} />
            </button>
            <button
              onClick={playPause}
              className="bg-customGreen text-gray-900 p-3 rounded-full transition-transform transform hover:scale-110 hover:bg-customBlue"
              aria-label="Play/Pause"
            >
              {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
            </button>
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
            <span className="text-sm text-gray-400">
              {formatTime(currentTime)}
            </span>
            <div className="relative w-full h-1 bg-gray-700 rounded overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-blue-500 rounded transition-width duration-500 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
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
