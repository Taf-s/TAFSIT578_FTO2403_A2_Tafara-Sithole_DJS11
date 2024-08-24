/**
 * Fetches preview data from the podcast API.
 *
 * @return {object} Preview data in JSON format
 */
export async function fetchPreviews() {
  try {
    const response = await fetch("https://podcast-api.netlify.app");
    if (!response.ok) {
      throw new Error("Failed to fetch previews");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching previews:", error);
    throw error;
  }
}
