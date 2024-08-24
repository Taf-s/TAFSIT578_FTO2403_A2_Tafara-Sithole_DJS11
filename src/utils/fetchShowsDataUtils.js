import { fetchShows } from "../services/fetchshow";
export const fetchShowsData = async (
  // The current genre the user is browsing
  currentGenre,
  // A function that will be called to update the shows state
  setShows,
  // An optional function that will be called to update the loading state
  setShowsLoading = () => {}
) => {
  // Print a message to console so we can see that we called the function
  console.log("setShowsLoading:", setShowsLoading);
  // Set the loading state to true
  setShowsLoading(true);
  try {
    // Fetch all shows from the API
    const showData = await fetchShows();
    // Remove duplicates from the list of shows
    const uniqueShows = [
      ...new Set(showData.map((show) => JSON.stringify(show))),
    ].map((show) => JSON.parse(show));
    // Filter the shows to only include the ones that are in the current genre
    const filteredShows = uniqueShows.filter((show) =>
      currentGenre?.shows?.includes(show.id)
    );
    // Set the shows state to the filtered shows
    setShows(filteredShows);
  } catch (error) {
    // Print an error message if there was an error
    console.error("Error fetching shows:", error);
  } finally {
    // Reset the loading state to false
    setShowsLoading(false);
  }
};
