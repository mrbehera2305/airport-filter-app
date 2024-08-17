import React, { useState } from "react";
import Filters from "../filters/Filters";
import AirportTable from "../airportTable/AirportTable";
import { PiSquaresFourFill } from "react-icons/pi";
import "./AirportFilter.css";

function AirportFilter() {
  const [filters, setFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 4; // Configurable item count

  return (
    <>
      <div className="header">
        <h1>
          Filter <span>airports</span>
        </h1>
        <PiSquaresFourFill className="header-icon" />
      </div>

      <Filters
        filters={filters}
        setFilters={setFilters}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <AirportTable
        filters={filters}
        searchQuery={searchQuery}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
}

export default AirportFilter;
