import React, { useState } from 'react';
import './SortBy.css';

// SortBy component for handling sorting options
const SortBy = ({ onSort, selectedSortOption }) => {
  // State to manage the visibility of the dropdown
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the visibility of the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to close the dropdown
  const closeDropdown = () => {
    setIsOpen(false);
  };

  // JSX structure for rendering the SortBy component
  return (
    <div className="dropdown">
      <div className="dropdown-controls">
        {/* Button to toggle the dropdown visibility */}
        <button className='sort-by-btn' onClick={toggleDropdown}>Sort by...</button>
      </div>
      {/* Dropdown content section */}
      {isOpen && (
        <div className="dropdown-content">
          <div className="dropdown-header">
            {/* Header for the dropdown with sort caption and close button */}
            <span className='sort-caption'>Sort by</span>
            <button onClick={closeDropdown} className="close-button">
              &times;
            </button>
          </div>
          {/* Dropdown options */}
          <p onClick={() => onSort('year')} className="dropdown-option">Year</p>
          <p onClick={() => onSort('episode')} className="dropdown-option">Episode</p>
          {/* Additional dropdown options can be added here */}
        </div>
      )}
    </div>
  );
};

export default SortBy;
