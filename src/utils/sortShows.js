export const sortShows = (shows, sortBy) => {
  switch (sortBy) {
    case "title-asc":
      return [...shows].sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return [...shows].sort((a, b) => b.title.localeCompare(a.title));
    case "date-asc":
      return [...shows].sort(
        (a, b) => new Date(a.updated) - new Date(b.updated)
      );
    case "date-desc":
      return [...shows].sort(
        (a, b) => new Date(b.updated) - new Date(a.updated)
      );
    default:
      return shows;
  }
};
