export async function fetchGenre() {
  const genres = [];
  console.log(genres);

  for (let id = 1; id <= 9; id++) {
    try {
      const url = `https://podcast-api.netlify.app/genre/${id}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch genre with ID ${id}`);
      }

      const data = await response.json();
      genres.push(data);
    } catch (error) {
      console.error(`Error fetching genre with ID ${id}:`, error);
      break;
    }
  }

  return genres;
}
