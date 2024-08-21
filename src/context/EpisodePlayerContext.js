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
  const audioRef = useRef(null);

  useEffect(() => {
    fetchShowsData().then((data) => {
      setShows(data);
    });
  }, []);

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

  useEffect(() => {
    if (currentEpisode && currentEpisode.file) {
      audioRef.current.src = currentEpisode.file;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentEpisode, isPlaying]);

  return (
    <EpisodePlayerContext.Provider
      value={{ currentEpisode, setCurrentEpisode, isPlaying, playPause, shows }}
    >
      {children}
      <audio ref={audioRef} />
    </EpisodePlayerContext.Provider>
  );
}
