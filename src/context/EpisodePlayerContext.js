import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import { fetchShowsData } from "../utils/fetchShowsDataUtils";

const EpisodePlayerContext = createContext();

export function useEpisodePlayer() {
  return useContext(EpisodePlayerContext);
}

export function EpisodePlayerProvider({ children }) {
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shows, setShows] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [episodeIndex, setEpisodeIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    fetchShowsData().then((data) => {
      setShows(data);
    });
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(audioRef.current.currentTime);
      });
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current.duration);
      });
    }
  }, []);

  useEffect(() => {
    if (
      shows &&
      shows.length > 0 &&
      episodeIndex >= 0 &&
      episodeIndex < shows.length
    ) {
      setCurrentEpisode(shows[episodeIndex]);
    }
  }, [shows, episodeIndex]);

  useEffect(() => {
    if (currentEpisode && currentEpisode.file) {
      audioRef.current.src = currentEpisode.file;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentEpisode, isPlaying]);

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

  const previousEpisode = () => {
    if (episodeIndex > 0) {
      setEpisodeIndex(episodeIndex - 1);
    } else {
      setEpisodeIndex(shows.length - 1);
    }
  };

  const nextEpisode = () => {
    if (episodeIndex < shows.length - 1) {
      setEpisodeIndex(episodeIndex + 1);
    } else {
      setEpisodeIndex(0);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const progress = (currentTime / duration) * 100;

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
      }}
    >
      {children}
      <audio ref={audioRef} />
    </EpisodePlayerContext.Provider>
  );
}
