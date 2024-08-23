import sortBy from "lodash/sortBy";

const sortShows = (shows, sortByOption) => {
  if (!Array.isArray(shows)) return shows;

  let sortedShows;

  switch (sortByOption) {
    case "title-asc":
      sortedShows = sortBy(shows, (show) => show.title.trim().toLowerCase());
      break;
    case "title-desc":
      sortedShows = sortBy(shows, (show) =>
        show.title.trim().toLowerCase()
      ).reverse();
      break;
    case "date-asc":
      sortedShows = sortBy(shows, (show) => new Date(show.updated));
      break;
    case "date-desc":
      sortedShows = sortBy(shows, (show) => new Date(show.updated)).reverse();
      break;
    default:
      sortedShows = shows;
  }

  return sortedShows;
};

export default sortShows;
