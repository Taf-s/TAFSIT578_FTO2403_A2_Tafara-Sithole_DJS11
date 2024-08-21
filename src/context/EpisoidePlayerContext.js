import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";

const EpisodePlayerContext = createContext();

export function useEpisodePlayer() {
  return useContext(EpisodePlayerContext);
}

export function EpisodePlayerProvider({ children }) {
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const playPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(
    (isPlaying) => {
      if (currentEpisode && audioRef.current) {
        audioRef.current.src = currentEpisode.audioUrl;
        if (isPlaying) {
          audioRef.current.play();
        }
      }
    },
    [currentEpisode]
  );

  return (
    <EpisodePlayerContext.Provider
      value={{ currentEpisode, setCurrentEpisode, isPlaying, playPause }}
    >
      {children}
      <audio ref={audioRef} />
    </EpisodePlayerContext.Provider>
  );
}
