import React, { createContext, useState, useEffect } from "react";
import { fetchShows } from "../services/fetchshow";

export const ShowsContext = createContext();

export const ShowsProvider = ({ children }) => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getShows = async () => {
      try {
        const data = await fetchShows(); // Fetch all shows (with basic info)
        setShows(data);
        console.log("SHLOG22", { shows });
      } catch (error) {
        console.error("Failed to fetch shows:", error);
      } finally {
        setLoading(false);
      }
    };

    getShows();
  });

  return (
    <ShowsContext.Provider value={{ shows, loading }}>
      {children}
    </ShowsContext.Provider>
  );
};
