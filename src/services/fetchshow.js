import { fetchGenre } from "./fetchgenre";
export async function fetchShows() {
  try {
    // Step 1: Fetch all genres
    const genres = await fetchGenre();

    // Step 2: Extract all show IDs from all genres
    const allShowIds = genres.reduce(
      (acc, genre) => acc.concat(genre.shows),
      []
    );

    // Step 3: Fetch details for each show
    const showDetailsPromises = allShowIds.map(async (id) => {
      try {
        const showResponse = await fetch(
          `https://podcast-api.netlify.app/id/${id}`
        );
        if (!showResponse.ok) {
          throw new Error(`Failed to fetch show with ID ${id}`);
        }
        return await showResponse.json();
      } catch (error) {
        console.error(`Error fetching show with ID ${id}:`, error);
        return null; // Handle error by returning null or some default value
      }
    });

    // Wait for all the show details to be fetched
    const shows = await Promise.all(showDetailsPromises);

    // Filter out any null results due to errors
    return shows.filter((show) => show !== null);
  } catch (error) {
    console.error(`Failed to fetch all shows:`, error);
    return [];
  }
}
