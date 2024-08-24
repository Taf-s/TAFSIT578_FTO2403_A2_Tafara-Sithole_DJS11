import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import { fetchShowsData } from "../utils/fetchShowsDataUtils";

const EpisodePlayerContext = createContext();

/**
 * Hook to access the EpisodePlayerContext.
 *
 * @return {object} The EpisodePlayerContext object.
 * 
/**
 * Hook to access the EpisodePlayerContext.
 *
 * @return {object} The EpisodePlayerContext object.
 */

export function useEpisodePlayer() {
  return useContext(EpisodePlayerContext);
}

/**
 * A React context provider for managing episode playback.
 *
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @return {JSX.Element} The EpisodePlayerContext provider.
 */

export function EpisodePlayerProvider({ children }) {
  // State variables to keep track of the currently playing episode,
  // whether the audio is playing, the list of shows, the current time
  // of the audio, the duration of the audio, and the index of the
  // current episode in the list of shows.
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shows, setShows] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [episodeIndex, setEpisodeIndex] = useState(0);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const playEpisode = (episode) => {
    setCurrentEpisode(episode);
    setIsPlayerOpen(true); // Update the state
  };

  const openPlayer = () => {
    setIsPlayerOpen(true);
  };

  const closePlayer = () => setIsPlayerOpen(false);

  // A reference to the audio element.
  const audioRef = useRef(null);

  // When the component mounts, fetch the list of shows.
  useEffect(() => {
    fetchShowsData(setShows, () => {});
  }, []);

  // Log the list of shows to the console for debugging purposes.
  useEffect(() => {
    console.log("Shows:", shows);
  }, [shows]);

  // When the audio element is loaded, set up event listeners
  // for when the audio is playing and when it's done playing.
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", () => {
        // When the audio is playing, set the current time to the
        // current time of the audio element.
        setCurrentTime(audioRef.current.currentTime);
      });
      audioRef.current.addEventListener("loadedmetadata", () => {
        // When the audio is done loading, set the duration to the
        // duration of the audio element.
        setDuration(audioRef.current.duration);
      });
    }
  }, []);

  // When the list of shows changes, update the current episode
  // to the episode at the current index.
  useEffect(() => {
    if (
      shows &&
      shows.length > 0 &&
      episodeIndex >= 0 &&
      episodeIndex < shows.length
    ) {
      console.log("Updating current episode");
      setCurrentEpisode(shows[episodeIndex]);
    }
  }, [shows, episodeIndex]);

  // When the current episode changes, update the audio element
  // to play the new episode.
  useEffect(() => {
    if (currentEpisode && currentEpisode.file) {
      audioRef.current.src = currentEpisode.file;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentEpisode, isPlaying]);

  // A function to play or pause the audio.
  const playPause = () => {
    if (audioRef.current) {
      console.log("Audio src:", audioRef.current.src);
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // A function to go to the previous episode.
  const previousEpisode = () => {
    console.log("Previous episode clicked");
    console.log("Current episode index:", episodeIndex);
    console.log("Shows length:", shows?.length);
    if (shows && shows.length > 0) {
      if (episodeIndex > 0) {
        setEpisodeIndex(episodeIndex - 1);
      } else {
        setEpisodeIndex(shows.length - 1);
      }
    }
    console.log("New episode index:", episodeIndex);
  };

  // A function to go to the next episode.
  const nextEpisode = () => {
    console.log("Next episode clicked");
    console.log("Current episode index:", episodeIndex);
    console.log("Shows length:", shows?.length);
    if (shows && shows.length > 0) {
      if (episodeIndex < shows.length - 1) {
        setEpisodeIndex(episodeIndex + 1);
      } else {
        setEpisodeIndex(0);
      }
    }
    console.log("New episode index:", episodeIndex);
  };

  // A function to format a time in seconds to a string
  // in the format "mm:ss".
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // A variable to keep track of the progress of the audio,
  // in terms of a percentage.
  const progress = (currentTime / duration) * 100;

  // Return the EpisodePlayerContext provider, which wraps
  // the child components in the EpisodePlayerContext.
  return (
    <EpisodePlayerContext.Provider
      value={{
        currentEpisode,
        setCurrentEpisode,
        isPlaying,
        playPause,
        shows,
        currentTime,
        duration,
        progress,
        previousEpisode,
        nextEpisode,
        formatTime,
        playEpisode,
        openPlayer,
        isPlayerOpen,
        closePlayer,
      }}
    >
      {children}
      {/* The audio element. */}
      <audio ref={audioRef} />
    </EpisodePlayerContext.Provider>
  );
}
