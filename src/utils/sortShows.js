import sortBy from "lodash/sortBy";

/**
 * Sorts an array of shows based on the specified sort option.
 *
 * @param {Array} shows - The array of shows to be sorted.
 * @param {string} sortByOption - The option to sort the shows by. Can be "title-asc", "title-desc", "date-asc", or "date-desc".
 * @return {Array} The sorted array of shows. If the input is not an array, it is returned as is.
 */
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
