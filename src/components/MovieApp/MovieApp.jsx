import React, { useEffect, useState } from "react";
import './MovieApp.css';
import SortBy from "../SortBy/SortBy";
import Search from "../Search/Search"

function MovieApp() {
  // API URL for fetching movie data
  const URL = "https://swapi.dev/api/films/?format=json";

  // State variables for managing movie data and sorting
  const [originalMovieList, setOriginalMovieList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [index, setIndex] = useState();
  const [sortBy, setSortBy] = useState("default");

  // Logging the current index for debugging
  console.log(index);

  // Function to fetch movie data from the API
  const getMovieData = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      const movies = data.results;
      setOriginalMovieList(movies);
      setMovieList(movies);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  // useEffect hook to fetch movie data on component mount
  useEffect(() => {
    getMovieData();
  }, []);

  // Function to handle movie search based on the input query
  const handleSearch = (query) => {
    if (!query) {
      // If the query is empty, reset the movie list to the original list
      setMovieList(originalMovieList);
    } else {
      // Filter movies based on the query and update the movie list
      const filteredMovies = originalMovieList.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setMovieList(filteredMovies);
    }
  };

  // Function to handle sorting of movies based on the selected option
  const handleSort = (option) => {
    // Create a copy of the current movie list to avoid mutating the state directly
    let sortedMovies = [...movieList];

    // Sorting logic based on the selected option
    if (option === "year") {
      sortedMovies.sort(
        (a, b) => new Date(a.release_date) - new Date(b.release_date)
      );
    } else if (option === "episode") {
      sortedMovies.sort((a, b) => a.episode_id - b.episode_id);
    }

    // Update the movie list with the sorted movies
    setMovieList(sortedMovies);
  };

  // JSX structure for rendering the component
  return (
    <>
      {/* Navigation section with SortBy and Search components */}
      <div className="nav">
        <SortBy onSort={handleSort} selectedSortOption={sortBy} />
        <Search movieList={movieList} onSearch={handleSearch} />
      </div>

      {/* Movie details section with episode list and details */}
      <div className="movie-details">
        <div className="episode-list-container">
          {/* Mapping through the movie list to display episode list */}
          {movieList.map((movie, index) => (
            <div
              key={index}
              onClick={() => setIndex(index)}
              className="episode-list"
            >
              <div className="sub-episode-list">
                <p className="list-data">EPISODE {movie.episode_id}</p>
                <p className="list-data">{movie.title} </p>
              </div>
              <p className="list-data">{movie.release_date} </p>
            </div>
          ))}
        </div>

        {/* Displaying episode details based on the selected index */}
        <div className="episode-details-container">
          <div className="episode-details">
            {index + 1 ? (
              <div>
                <h4>
                  EPISODE {movieList[index].episode_id} - 
                  {movieList[index].title}
                </h4>
                {movieList[index].opening_crawl}
              </div>
            ) : (
              "No movie selected"
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieApp;
