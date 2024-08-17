import React from "react";
import "./Filters.css";

const Filters = ({ filters, setFilters, searchQuery, setSearchQuery }) => {
  const airportTypes = ["small", "medium", "large", "heliport", "closed"];

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilters(
      filters.includes(value)
        ? filters.filter((f) => f !== value)
        : [...filters, value]
    );
  };

  return (
    <div className="filter-container">
      <div className="filter-type">
        <p>Type</p>
        <div className="filter-options">
          {" "}
          {airportTypes.map((type) => (
            <label key={type}>
              <input
                type="checkbox"
                value={type}
                checked={filters.includes(type)}
                onChange={handleFilterChange}
              />
              {type.replace("_", " ")}
            </label>
          ))}
        </div>
      </div>
      <div className="filter-search">
        <p>Filter by search</p>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Filters;
