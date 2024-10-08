// src/context/GenresContext.js
import React, { createContext, useState, useEffect } from "react";
import { fetchGenre } from "../services/fetchgenre";

export const GenresContext = createContext();

/**
 * A React context provider for managing genres data.
 *
 * @param {object} children - The child components to be wrapped with the genres context.
 * @return {JSX.Element} The JSX element containing the genres context provider.
 */

export const GenresProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const data = await fetchGenre(); // Fetch all genres (with basic info)
        setGenres(data);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      } finally {
        setLoading(false);
      }
    };

    getGenres();
  }, []);

  return (
    <GenresContext.Provider value={{ genres, loading }}>
      {children}
    </GenresContext.Provider>
  );
};
