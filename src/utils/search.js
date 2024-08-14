export function searchShows(shows, query) {
  return shows.filter(
    (show) =>
      show.name.toLowerCase().includes(query.toLowerCase()) ||
      show.genres.some((genre) =>
        genre.toLowerCase().includes(query.toLowerCase())
      )
  );
}
