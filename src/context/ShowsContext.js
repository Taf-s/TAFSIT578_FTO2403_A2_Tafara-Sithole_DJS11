import React, { createContext, useState, useEffect } from "react";
import { fetchShows } from "../services/fetchshow";

export const ShowsContext = createContext();

/**
 * A React context provider for managing shows data.
 *
 * @param {object} children - The child components to be wrapped with the shows context.
 * @return {JSX.Element} The JSX element containing the shows context provider.
 */
export const ShowsProvider = ({ children }) => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fetches and sets the shows data.
   *
   * @return {Promise<void>} Resolves when the shows data has been fetched and set.
   */
  useEffect(() => {
    const getShows = async () => {
      try {
        const data = await fetchShows(); // Fetch all shows (with basic info)
        setShows(data);
      } catch (error) {
        console.error("Failed to fetch shows:", error);
      } finally {
        setLoading(false);
      }
    };

    getShows();
  }, []);

  return (
    <ShowsContext.Provider value={{ shows, loading }}>
      {children}
    </ShowsContext.Provider>
  );
};
