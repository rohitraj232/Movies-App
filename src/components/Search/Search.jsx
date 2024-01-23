import React, { useState } from 'react';
import './Search.css';

// MovieSearch component for handling movie title search
const MovieSearch = ({ onSearch }) => {
  // State to manage the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle changes in the search input
  const handleChange = (e) => {
    // Update the search query and immediately trigger the search
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // This line triggers the search
  };

  // JSX structure for rendering the MovieSearch component
  return (
    <div className='search-container'>
      {/* Input field for entering the search query */}
      <input
        type='text'
        className='navbar-input-box'
        placeholder='Search by movie title...'
        value={searchQuery}
        onChange={handleChange}
      />
    </div>
  );
};

export default MovieSearch;
