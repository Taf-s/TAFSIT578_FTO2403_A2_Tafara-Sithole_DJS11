import { fetchShows } from "../services/fetchshow";
export const fetchShowsData = async (
  currentGenre,
  setShows,
  setShowsLoading = () => {}
) => {
  console.log("setShowsLoading:", setShowsLoading);
  setShowsLoading(true); // Set loading state
  try {
    const showData = await fetchShows(); // Fetch all shows
    const uniqueShows = [
      ...new Set(showData.map((show) => JSON.stringify(show))),
    ].map((show) => JSON.parse(show));
    const filteredShows = uniqueShows.filter((show) =>
      currentGenre?.shows?.includes(show.id)
    ); // Filter shows by genre
    setShows(filteredShows); // Set shows in state
  } catch (error) {
    console.error("Error fetching shows:", error);
  } finally {
    setShowsLoading(false); // Reset loading state
  }
};
