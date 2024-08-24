# Podcast App

This is a React-based podcast application that allows users to browse and listen to podcasts. The app fetches data from a podcast API and organizes it into Shows, Seasons, and Episodes.

## Table of Contents

- [Project Structure](#project-structure)
- [Setup](#setup)
- [Components](#components)
- [Routing](#routing)
- [Styling](#styling)
- [Features](#features)
- [API Endpoints](#api-endpoints)

## Project Structure

The project is organized as follows:

src/
│
├── assets/
│ └── logo.png
|
├── components/
│ ├── EpisodePlayer.js #The component comtaining the episode player
│ ├── Navbar.js # Navigation bar component
│ ├── ShowList.js # Component to list all shows
│ ├── ShowCard.js # Component to display a single show with preview and details
│ ├── SeasonList.js # Component to list all seasons of a show
│ ├── SeasonCard.js # Component to display a single season with preview and details
│ ├── EpisodeList.js # Component to list all episodes in a season
│ └── EpisodePlayer.js # Component to play an episode
│
├── context/
├── EpisodePlayerContext.js #Provides episode player context
├── favoriteEpisodeContext.js #Provides favorite Episode context
├── GenresContext.js #Provides Genres context
├── ShowsContext.js #Provides Shows context
│ └── SearchProvider.js
|
├── pages/
│ ├── HomePage.js # Homepage with all shows listed
│ ├── ShowPage.js # Detailed view of a specific show with seasons
│ ├── GenrePage.js # Genre-specific page
│ ├── GenreShowsPage.js # Genre-shoes page
│ ├── FavouritesPage.js # Detailed view of all favourite shows
│
├── services/
│ ├── fetchPreviews.js # Fetches show previews from API endpoitn
│ ├── fetchGenre.js # Fetches genre from api ednpoint
│ └── fetchShow.js # Fetches shows from API endpoint
|
├── utils/
│ └── fetchShowsDataUtils.js # Utility function to format dates
│ └── genreUtils.js # Utility function that has genre mapping object
│ └── search.js # Utility function to handle searching
│ └── sortShows.js # Utility function for sorting shows
└── search.js # Utility function for searching/filtering shows, seasons, or episodes
│
├── App.js # Main application component
├── index.js # Entry point for React
└── index.css # Tailwind CSS imports

## Setup

### 1. Clone the repository

git clone https://github.com/your-username/podcast-app.git
cd podcast-app

### 2. Install Dependencies

npm install

### 3. Setup Tailwind CSS

Ensure Tailwind CSS is installed and configured. The necessary directives have been added to index.css.

### 4. Start the development server

npm start

## Components

### Navbar

The Navbar component is located in `src/components/Navbar.js`. It handles the main navigation for the app, with links to the homepage, all shows, genres, and the search page. The navigation is responsive and includes a toggleable menu for mobile devices.

### ShowList

Displays a list of all available shows, sorted alphabetically by default.

### ShowCard

Displays a single show’s preview image, name, number of seasons, last updated date, and associated genres.

### SeasonList

Displays all seasons of a specific show.

### SeasonCard

Displays a single season’s preview image, name, and the number of episodes.

### EpisodeList

Lists all episodes within a specific season.

### EpisodePlayer

Plays a selected episode using a placeholder audio track.

## Utils

- **formatDate.js**: Utility function to format dates.
- **search.js**: Utility function to search and filter shows, seasons, or episodes.
- \*\* fetchShowsDataUtils.js: Utility function to handle fetching show data.
- \*\*genreUtils.js: Utility function that has genre mapping object.
- \*\*sortShows.js: Utility function for sorting shows.

## Routing

The application uses `react-router-dom` for routing. The main routes are defined in `App.js`, which includes:

- `/`: `HomePage`
- `/show/:id`: `ShowPage`
- `/genre/:id`: `GenrePage`
- `/season/:id`: `SeasonPage`
- `/search`: `SearchPage`

## Styling

The application uses Tailwind CSS for styling. The `index.css` file imports the necessary Tailwind directives. The design is mobile-first, with responsive layouts handled by Tailwind's utility classes.

## Features

- **Alphabetical Sorting of Shows**: Shows are sorted alphabetically by default.
- **Listen to Episodes**: Users can play a placeholder audio track for any episode.
- **Season-Specific View**: Users can view all episodes in a selected season.
- **Toggle Between Seasons**: Users can switch between seasons of a show.
- **Show Preview Images**: Preview images are displayed when browsing shows.
- **Number of Seasons**: The number of seasons is displayed for each show.
- **Human-Readable Last Updated Date**: Shows the date when a show was last updated in a human-readable format.
- **Show Genres**: Displays the genres associated with each show.
- **Season Preview Images**: Displays a preview image for each season.
- **Number of Episodes in a Season**: The number of episodes is displayed for each season.
- **Back to Show View**: Users can navigate back to the show view from the season-specific view.

## API Endpoints

The app interacts with the following API endpoints:

- `https://podcast-api.netlify.app`: Returns an array of `PREVIEW` objects.
- `https://podcast-api.netlify.app/genre/<ID>`: Returns a `GENRE` object.
- `https://podcast-api.netlify.app/id/<ID>`: Returns a `SHOW` object with embedded `SEASON` and `EPISODE` objects.

## Future Work

- Implement additional features like user authentication, favorites, and more.
- Add more detailed views and functionality as needed.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
