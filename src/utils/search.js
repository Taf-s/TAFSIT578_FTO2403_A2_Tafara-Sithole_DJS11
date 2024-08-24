export function searchShows(shows, query) {
  return shows.filter((show) => {
    const showTitle = show.title?.toLowerCase() || "";
    const showGenres = show.genres || [];

    return (
      showTitle.includes((query || "").toLowerCase()) ||
      showGenres.some((genre) =>
        genre
          .toString()
          .toLowerCase()
          .includes((query || "").toLowerCase())
      )
    );
  });
}
